import { z } from "zod";
import { passwordMatches, startSession, endSession } from "@/lib/auth";

const schema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Enter the password." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json(
      { error: "No admin password is configured on the server. Set ADMIN_PASSWORD." },
      { status: 500 },
    );
  }

  // Blunt throttle against someone sitting on the form guessing.
  await new Promise((r) => setTimeout(r, 400));

  if (!passwordMatches(parsed.data.password)) {
    return Response.json({ error: "That password isn't right." }, { status: 401 });
  }

  await startSession();
  return Response.json({ ok: true });
}

export async function DELETE() {
  await endSession();
  return Response.json({ ok: true });
}
