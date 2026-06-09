import { redirect } from "next/navigation";

// The new admin home is the dashboard. /admin auto-forwards there so
// the client never lands on the legacy Stage 1 preview by accident.
// The previous /admin contents are preserved at /admin/preview for
// reference.

export const dynamic = "force-dynamic";

export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}
