import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in | EKBC Admin",
  description: "Sign in to manage the East Kilbride Boiler Company admin.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { next, error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-carbon-950 px-4 py-10">
      <LoginForm next={next} hasError={error === "invalid"} />
    </main>
  );
}
