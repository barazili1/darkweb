import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ChevronLeft, Loader2, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import bg from "@/assets/casino-bg.jpg";
import logo1xbet from "@/assets/logo-1xbet.png";
import logoGreenbet from "@/assets/logo-greenbet.jpg";
import dragonLogo from "@/assets/dragon-logo.png";
import { OnlineUsers, Particles, TopBar } from "@/components/vip/Chrome";
import { PLATFORMS, savePlatform, type PlatformId } from "@/lib/session";

const LOGOS: Record<string, string> = { "1xbet": logo1xbet, greenbet: logoGreenbet };

export const Route = createFileRoute("/platforms")({
  head: () => ({
    meta: [
      { title: "اختيار المنصة — PROFESSOR OFFICIAL" },
      { name: "description", content: "اختر منصتك 1XBET أو GREENBET لبدء تفعيل حساب VIP." },
      { property: "og:title", content: "اختيار المنصة — PROFESSOR OFFICIAL" },
      { property: "og:description", content: "اختر منصتك لبدء تفعيل حساب VIP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlatformsPage,
});

const STEPS = [
  "جارٍ تحميل سيرفر المنصة...",
  "جارٍ استخراج أكواد الفوز...",
  "تم الاستخراج بنجاح!",
];

const STATS = [
  { label: "نسبة النجاح", value: "97%", icon: TrendingUp },
  { label: "لاعب نشط", value: "14.5K", icon: ShieldCheck },
  { label: "سحب اليوم", value: "$82K", icon: Zap },
];

const TICKER = [
  "سحب ناجح · $420",
  "تفعيل VIP جديد",
  "دقة الكشف 97%",
  "سحب ناجح · 2,500 EGP",
  "سيرفر مستقر",
];

function PlatformsPage() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!connecting) return;
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 1100);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => navigate({ to: "/conditions" }), 900);
    return () => clearTimeout(t);
  }, [connecting, step, navigate]);

  const choose = (id: PlatformId) => {
    savePlatform(id);
    setStep(0);
    setConnecting(true);
  };

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-16">
      <img
        src={bg}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10 blur-3xl"
      />
      <Particles />
      <div className="relative z-10">
        <TopBar title="اختيار المنصة" right={<OnlineUsers />} />

        {/* ticker */}
        <div className="mt-[50px] overflow-hidden border-y border-primary/20 py-1.5">
          <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="flex items-center gap-1.5 text-[9px] tracking-widest text-muted-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-primary shadow-[var(--glow-sm)]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <section className="animate-rise px-5 pt-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1 text-[9px] font-bold tracking-[0.35em] text-primary">
            <Sparkles className="h-3 w-3" /> VIP ACCESS
          </span>
          <h2 className="text-shimmer mt-3 text-[1.7rem] font-extrabold leading-tight">
            اختر منصتك
          </h2>
          <p className="mx-auto mt-1.5 max-w-[270px] text-[11px] leading-relaxed text-muted-foreground">
            حدد المنصة التي تلعب عليها لتشغيل أداة الكشف الخاصة بك
          </p>
        </section>

        {/* Platform cards — side by side */}
        <section className="mt-6 grid grid-cols-2 gap-3 px-4">
          {(Object.keys(PLATFORMS) as PlatformId[]).map((id, i) => {
            const p = PLATFORMS[id];
            return (
              <button
                key={id}
                onClick={() => choose(id)}
                className="card-elite animate-rise group relative flex flex-col items-center overflow-hidden rounded-[28px] px-3 pb-3 pt-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/70 hover:shadow-[var(--glow-md)] active:scale-[0.97]"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-70"
                  style={{ background: p.accent, opacity: 0.3 }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg,transparent,${p.accent},transparent)`,
                  }}
                />

                <div className="relative flex h-20 w-20 items-center justify-center">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full opacity-70 blur-md"
                    style={{ background: `${p.accent}33` }}
                  />
                  <span className="ring-conic absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-spin-slow group-hover:opacity-100" />
                  <img
                    src={LOGOS[id]}
                    alt={p.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="relative h-12 w-12 rounded-xl object-contain drop-shadow-[0_0_18px_var(--primary-glow)] transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <span
                  className="relative mt-3 inline-block rounded-md px-2 py-0.5 text-[9px] font-extrabold tracking-[0.25em]"
                  style={{ color: p.accent, background: `${p.accent}26` }}
                >
                  {p.short}
                </span>
                <h3 className="neon-text mt-1.5 text-[17px] font-extrabold leading-tight text-foreground">
                  {p.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
                  {p.tagline}
                </p>

                <span className="relative mt-3 flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 text-primary" /> موثوقة · سحب فوري
                </span>

                <span className="gradient-primary relative mt-3 flex w-full items-center justify-center gap-1 rounded-2xl py-2.5 text-[10px] font-extrabold tracking-widest text-primary-foreground shadow-[var(--glow-sm)] transition-transform duration-300 group-hover:scale-[1.03]">
                  اتصال <ChevronLeft className="h-3 w-3" />
                </span>
              </button>
            );
          })}
        </section>

        {/* Stats strip */}
        <section className="mt-6 grid grid-cols-3 gap-2 px-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="card-elite animate-rise flex flex-col items-center rounded-2xl px-2 py-3 text-center"
                style={{ animationDelay: `${320 + i * 90}ms` }}
              >
                <Icon className="mb-1 h-3.5 w-3.5 text-primary" />
                <p className="neon-text text-base font-extrabold text-primary">{s.value}</p>
                <p className="mt-0.5 text-[9px] tracking-wide text-muted-foreground">{s.label}</p>
              </div>
            );
          })}
        </section>
      </div>

      {connecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-6 backdrop-blur-xl">
          <div className="card-elite animate-rise w-full max-w-sm rounded-[30px] p-6 shadow-[var(--glow-lg)]">
            <div className="mb-5 flex flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <span className="ring-conic animate-spin-slow absolute inset-0 rounded-full" />
                <img
                  src={dragonLogo}
                  alt="PROFESSOR OFFICIAL"
                  width={256}
                  height={256}
                  className="h-16 w-16 animate-glow-pulse object-contain drop-shadow-[0_0_28px_var(--primary-glow)]"
                />
              </div>
              <p className="text-shimmer mt-2 text-[11px] font-extrabold tracking-[0.3em]">
                PROFESSOR OFFICIAL
              </p>
            </div>
            <div className="space-y-2.5">
              {STEPS.slice(0, step + 1).map((s, i) => {
                const finished = i < step;
                return (
                  <p
                    key={s}
                    className={`animate-fade-up flex items-center gap-2 rounded-xl border border-primary/20 px-3 py-2 text-[11px] ${
                      finished && i === STEPS.length - 1 ? "text-success" : "text-foreground"
                    }`}
                  >
                    {finished ? (
                      <Check className="h-4 w-4 shrink-0 text-success" />
                    ) : (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                    )}
                    {s}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
