import { z } from "zod";
import { availabilityFor, seatsLeft } from "@/lib/store";
import { timeSlots } from "@/lib/site";

const roomQuery = z.object({
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const tableQuery = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  if (params.get("type") === "table") {
    const parsed = tableQuery.safeParse({ date: params.get("date") });
    if (!parsed.success) {
      return Response.json({ error: "A valid date is required." }, { status: 400 });
    }

    const slots = await Promise.all(
      timeSlots.map(async (time) => ({
        time,
        seatsLeft: await seatsLeft(parsed.data.date, time),
      })),
    );
    return Response.json({ slots });
  }

  const parsed = roomQuery.safeParse({
    checkIn: params.get("checkIn"),
    checkOut: params.get("checkOut"),
  });
  if (!parsed.success) {
    return Response.json(
      { error: "Valid check-in and check-out dates are required." },
      { status: 400 },
    );
  }
  if (parsed.data.checkOut <= parsed.data.checkIn) {
    return Response.json(
      { error: "Check-out has to be after check-in." },
      { status: 400 },
    );
  }

  const rooms = await availabilityFor(parsed.data.checkIn, parsed.data.checkOut);
  return Response.json({ rooms });
}
