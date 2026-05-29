import Link from "next/link";
import {
  Zap,
  Wrench,
  Settings,
  PoundSterling,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
  Users,
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
    href: "/#quote-form",
  },
];

function ServicesGrid() {
  return (
    <section className="bg-carbon-900 py-10 sm:py-12">
      <Container>
        <ScrollReveal>
          <div className="rounded-2xl border border-carbon-700 bg-carbon-900/60 backdrop-blur p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-carbon-800 sm:divide-y-0 sm:divide-x sm:[&>*:nth-child(-n+2)]:border-b sm:[&>*:nth-child(-n+2)]:border-carbon-800 lg:[&>*]:border-b-0 lg:[&>*:nth-child(-n+3)]:border-b lg:[&>*:nth-child(-n+3)]:border-carbon-800">
              {items.map((item, index) => (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  delay={index * 0.06}
                  className="h-full"
                >
                  <Link
                    href={item.href}
                    className="hover-card group flex h-full min-h-[96px] items-center gap-4 p-4 sm:p-5 transition-colors hover:bg-carbon-800/40"
                  >
                    <div className="hover-icon-glow flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg border border-mint-500/40 bg-carbon-900">
                      <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-mint-500" />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-mint-500 transition-colors leading-snug">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-carbon-400 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="https://www.gassaferegister.co.uk"
              rel="nofollow noopener"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-mint-500/40 bg-carbon-800 px-5 py-2 transition-colors hover:bg-mint-500/10"
            >
              <ShieldCheck className="h-4 w-4 text-mint-500" />
              <span className="text-sm font-semibold text-white">
                Gas Safe Registered
              </span>
            </a>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm font-bold text-mint-400">Excellent</span>
              <span className="text-sm text-carbon-300">on Trustpilot</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-carbon-700 bg-carbon-800 px-5 py-2">
              <Users className="h-4 w-4 text-mint-500" />
              <span className="text-sm text-carbon-200">
                Trusted by{" "}
                <span className="font-bold text-mint-400">8,200+</span> customers
                across East Kilbride
              </span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export { ServicesGrid };
