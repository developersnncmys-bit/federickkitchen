import { inquirySchema, fieldErrors } from "@/lib/validation";
import { createInquiry } from "@/lib/store";
import { notifyNew } from "@/lib/notify";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Please check the highlighted fields.",
        fields: fieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const record = await createInquiry(parsed.data);
  void notifyNew(record);

  return Response.json({ id: record.id }, { status: 201 });
}
