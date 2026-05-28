import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Preview | EKBC",
  description: "Stage 1 CMS preview for the East Kilbride Boiler Company website.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
