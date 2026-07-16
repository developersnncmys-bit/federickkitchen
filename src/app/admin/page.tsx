import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import { listRecords } from "@/lib/store";
import LoginGate from "@/components/admin/LoginGate";
import Dashboard from "@/components/admin/Dashboard";

export const metadata: Metadata = {
  title: "Admin",
  // The house's own panel — keep it out of the index entirely.
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminPage() {
  if (!(await isAuthed())) return <LoginGate />;

  const records = await listRecords();
  return <Dashboard records={records} />;
}
