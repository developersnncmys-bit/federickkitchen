import { z } from "zod";
import { rooms, timeSlots, bookingStatuses } from "@/lib/site";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a YYYY-MM-DD date.")
  .refine((d) => !Number.isNaN(Date.parse(d)), "That date isn't real.");

const contact = {
  name: z.string().trim().min(2, "Tell us your name.").max(80),
  email: z.email("That email doesn't look right.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "We need a working phone number.")
    .max(20)
    .regex(/^[+0-9 ()-]+$/, "Digits, spaces, and + only."),
  notes: z.string().trim().max(1000).optional().default(""),
};

export const roomBookingSchema = z
  .object({
    ...contact,
    room: z.enum(rooms.map((r) => r.slug) as [string, ...string[]]),
    checkIn: isoDate,
    checkOut: isoDate,
    guests: z.coerce.number().int().min(1).max(4),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: "Check-out has to be after check-in.",
    path: ["checkOut"],
  })
  .refine((d) => d.checkIn >= today(), {
    message: "That date has already passed.",
    path: ["checkIn"],
  })
  .refine(
    (d) => {
      const room = rooms.find((r) => r.slug === d.room);
      return !room || d.guests <= room.guests;
    },
    { message: "That's more guests than the room sleeps.", path: ["guests"] },
  );

export const tableBookingSchema = z.object({
  ...contact,
  date: isoDate.refine((d) => d >= today(), "That date has already passed."),
  time: z.enum(timeSlots as unknown as [string, ...string[]]),
  partySize: z.coerce.number().int().min(1).max(24),
});

export const inquirySchema = z.object({
  subject: z.string().trim().min(2).max(120),
  name: contact.name,
  email: contact.email,
  phone: contact.phone,
  message: z.string().trim().min(5, "Tell us a little more.").max(2000),
});

export const statusSchema = z.object({
  status: z.enum(bookingStatuses),
});

/** Local (IST) calendar day — using UTC here would reject "today" all evening. */
export function today(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

/** Flattens a ZodError into { field: message } for the form to render inline. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}
