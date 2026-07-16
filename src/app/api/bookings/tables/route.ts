import { tableBookingSchema, fieldErrors } from "@/lib/validation";
import { createTableBooking } from "@/lib/store";
import { notifyNew } from "@/lib/notify";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = tableBookingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Please check the highlighted fields.",
        fields: fieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const result = await createTableBooking(parsed.data);

  if ("seatsLeft" in result) {
    return Response.json(
      {
        error:
          result.seatsLeft === 0
            ? "That sitting is fully booked. Try another time."
            : `Only ${result.seatsLeft} seats left at that sitting. Try a smaller party or another time.`,
      },
      { status: 409 },
    );
  }

  void notifyNew(result.booking);

  return Response.json(
    {
      id: result.booking.id,
      reference: result.booking.id.slice(0, 8).toUpperCase(),
      status: result.booking.status,
    },
    { status: 201 },
  );
}
