import Link from "next/link";
import {
  Zap,
  Wrench,
  Settings,
  PoundSterling,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  {
    icon: Zap,
    title: "BOILER INSTALLATION",
    subtitle: "FROM £1,299",
    href: "/services/new-boiler-installation",
  },
  {
    icon: Wrench,
    title: "BOILER REPAIR",
    subtitle: "FAST RESPONSE",
    href: "/services/boiler-repair",
  },
  {
    icon: Settings,
    title: "ANNUAL SERVICE",
    subtitle: "GAS SAFE CHECKED",
    href: "/services/boiler-servicing",
  },
  {
    icon: PoundSterling,
    title: "BOILER PRICES",
    subtitle: "FIXED PRICE",
    href: "/boilers",
  },
  {
    icon: MapPin,
    title: "AREAS WE COVER",
    subtitle: "ALL G74/G75 POSTCODES",
    href: "/areas",
  },
  {
    icon: MessageSquare,
    title: "FREE QUOTE",
    subtitle: "60 SECONDS",
    href: "#quote",
  },
];

function ServicesGrid() {
  return (
    <section className="bg-carbon-900 py-12">
      <Container>
        <div className="rounded-xl border border-carbon-600 bg-carbon-800 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-carbon-700/50"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-mint-500/40 bg-carbon-900">
                  <item.icon className="h-6 w-6 text-mint-500" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-white">
                    {item.title}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-carbon-400">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export { ServicesGrid };
