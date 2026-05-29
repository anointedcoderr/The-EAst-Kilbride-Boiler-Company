import Image from "next/image";
import Link from "next/link";
import { Shield, CheckCircle, Phone, Award, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteSettings } from "@/data/siteSettings";

const trustPoints = [
  {
    icon: Shield,
    title: "Up to 12-Year Warranty",
    description:
      "Industry-leading warranty cover on selected new boilers, your home is protected for years to come.",
  },
  {
    icon: CheckCircle,
    title: "Guaranteed Best Prices",
    description:
      "We'll match any like-for-like quote. Unbeatable boiler prices across East Kilbride.",
  },
  {
    icon: Shield,
    title: "Gas Safe Experts",
    description:
      "All our engineers are Gas Safe Experts with 20+ years experience and full public liability insurance. Your safety is our absolute priority.",
  },
];

const stats = [
  { value: "8,200+", label: "HAPPY EK CUSTOMERS" },
  { value: "12", suffix: "yr", label: "MAX WARRANTY" },
  { value: "24", suffix: "hr", label: "INSTALLATION" },
];

function WhyTrustUs() {
  return (
    <section className="bg-carbon-900 py-16 lg:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="left">
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-carbon-600 bg-carbon-800">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/engineer-portrait.jpg"
                    alt="EKBC engineer in front of branded company van"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-carbon-900/80 via-transparent to-transparent"
                  />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-mint-500/50 bg-carbon-900/85 backdrop-blur px-3 py-1.5">
                    <Award className="h-3.5 w-3.5 text-mint-500" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-mint-400">
                      Which? Best Boiler Award
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 flex flex-col items-center gap-0.5 rounded-xl bg-mint-500 px-3 py-2 shadow-lg shadow-mint-500/30">
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-extrabold text-carbon-900 leading-none">
                        4.9
                      </span>
                      <Star className="h-4 w-4 fill-carbon-900 text-carbon-900" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-carbon-900">
                      8,200+ Reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-lg border border-carbon-600 bg-carbon-800 px-4 py-3">
                <Shield className="h-5 w-5 shrink-0 text-mint-500" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-white">
                    OUR CREW&apos;S TRUE CREDENTIALS
                  </p>
                  <p className="text-xs text-carbon-300">
                    20+ Years Experience, Fully Insured,{" "}
                    <a
                      href="https://www.gassaferegister.co.uk"
                      rel="nofollow noopener"
                      target="_blank"
                      className="text-mint-500 underline hover:text-mint-400"
                    >
                      Gas Safe Experts
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <div className="flex flex-col gap-8">
                {trustPoints.map((point) => (
                  <div
                    key={point.title}
                    className="hover-card flex gap-4 rounded-lg p-3 transition-colors"
                  >
                    <div className="hover-icon-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-mint-500/40 bg-carbon-800">
                      <point.icon className="h-6 w-6 text-mint-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-carbon-300">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
                {stats.map((stat, index) => (
                  <ScrollReveal key={stat.label} direction="up" delay={index * 0.1}>
                    <div className="flex h-full min-w-0 flex-col items-center justify-center rounded-lg border border-carbon-600 bg-carbon-800 p-3 sm:p-4 text-center">
                      <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-none text-mint-500">
                        {stat.value}
                        {stat.suffix && (
                          <span className="text-sm sm:text-base lg:text-lg font-semibold text-mint-400">
                            {stat.suffix}
                          </span>
                        )}
                      </p>
                      <p className="mt-1.5 text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase leading-tight tracking-wide text-carbon-400">
                        {stat.label}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="#quote-form"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-mint-500 px-8 py-4 text-lg font-bold text-carbon-900 transition-colors hover:bg-mint-400"
                >
                  GET A FREE QUOTE
                </Link>
                <span className="text-sm text-carbon-300">
                  or call{" "}
                  <a
                    href={siteSettings.phoneHref}
                    className="inline-flex items-center gap-1 font-semibold text-mint-500 hover:text-mint-400"
                  >
                    <Phone className="h-4 w-4" />
                    {siteSettings.phone}
                  </a>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

export { WhyTrustUs };
