import { isAuthed } from "@/lib/auth";
import { updateStatus } from "@/lib/store";
import { statusSchema } from "@/lib/validation";
import { notifyStatus } from "@/lib/notify";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/admin/bookings/[id]">,
) {
  if (!(await isAuthed())) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Unknown status." }, { status: 422 });
  }

  const record = await updateStatus(id, parsed.data.status);
  if (!record) {
    return Response.json({ error: "No such booking." }, { status: 404 });
  }

  // Let the guest know, without holding the panel open on the mail provider.
  void notifyStatus(record);

  return Response.json({ record });
}
