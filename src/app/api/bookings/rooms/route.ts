import { roomBookingSchema, fieldErrors } from "@/lib/validation";
import { createRoomBooking } from "@/lib/store";
import { notifyNew } from "@/lib/notify";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = roomBookingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Please check the highlighted fields.",
        fields: fieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const record = await createRoomBooking(parsed.data);
  if (!record) {
    return Response.json(
      {
        error:
          "That room was just taken for those nights. Try different dates, or another room.",
      },
      { status: 409 },
    );
  }

  // Don't hold the guest's request open on the mail provider.
  void notifyNew(record);

  return Response.json(
    {
      id: record.id,
      reference: record.id.slice(0, 8).toUpperCase(),
      status: record.status,
    },
    { status: 201 },
  );
}
