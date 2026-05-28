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
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const items = [
  {
    id: "installation",
    icon: Zap,
    title: "BOILER INSTALLATION",
    subtitle: "FROM £1,299",
    href: "/services/new-boiler-installation/",
  },
  {
    id: "repair",
    icon: Wrench,
    title: "BOILER REPAIR",
    subtitle: "FAST RESPONSE",
    href: "/services/boiler-repair/",
  },
  {
    id: "service",
    icon: Settings,
    title: "ANNUAL SERVICE",
    subtitle: "GAS SAFE CHECKED",
    href: "/services/boiler-servicing/",
  },
  {
    id: "prices",
    icon: PoundSterling,
    title: "BOILER PRICES",
    subtitle: "FIXED PRICE",
    href: "/boilers/",
  },
  {
    id: "areas",
    icon: MapPin,
    title: "AREAS WE COVER",
    subtitle: "ALL G74/G75 POSTCODES",
    href: "/areas-we-serve/",
  },
  {
    id: "quote",
    icon: MessageSquare,
    title: "FREE QUOTE",
    subtitle: "60 SECONDS",
    href: "/#quote",
  },
];

function ServicesGrid() {
  return (
    <section className="bg-carbon-900 py-10 sm:py-12">
      <Container>
        <ScrollReveal>
          <div className="rounded-xl border border-carbon-600 bg-carbon-800 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
              {items.map((item, index) => (
                <ScrollReveal key={item.id} direction="up" delay={index * 0.06}>
                  <Link
                    href={item.href}
                    className="hover-card group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-carbon-700/50 min-h-[64px]"
                  >
                    <div className="hover-icon-glow flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg border border-mint-500/40 bg-carbon-900">
                      <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-mint-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-mint-500 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-carbon-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export { ServicesGrid };
