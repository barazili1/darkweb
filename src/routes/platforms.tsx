import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ChevronLeft, Loader2, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import bg from "@/assets/casino-bg.jpg";
import logo1xbet from "@/assets/logo-1xbet.png";
import logoGreenbet from "@/assets/logo-greenbet.jpg";
import dragonLogo from "@/assets/dragon-logo.png";


const LOGOS: Record<string, string> = { "1xbet": logo1xbet, greenbet: logoGreenbet };
import { OnlineUsers, Particles, TopBar } from "@/components/vip/Chrome";
import { PLATFORMS, savePlatform, type PlatformId } from "@/lib/session";

export const Route = createFileRoute("/platforms")({
  head: () => ({
    meta: [
      { title: "اختيار المنصة — DRAGON VIP" },
      { name: "description", content: "اختر منصتك 1XBET أو GREENBET لبدء تفعيل حساب VIP." },
      { property: "og:title", content: "اختيار المنصة — DRAGON VIP" },
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
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15 blur-2xl"
      />
      <Particles />
      <div className="relative z-10">
        <TopBar title="اختيار المنصة" right={<OnlineUsers />} />

        {/* Hero */}
        <section className="px-4 pt-[50px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-[0.3em] text-primary">
            <Zap className="h-3 w-3" /> VIP ACCESS
          </span>
          <h2 className="neon-text mt-3 text-2xl font-extrabold text-foreground">اختر منصتك</h2>
          <p className="mx-auto mt-1 max-w-[260px] text-xs leading-relaxed text-muted-foreground">
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
                className="animate-fade-up glass group relative flex flex-col items-center overflow-hidden rounded-3xl px-3 pb-3 pt-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:neon-border active:scale-[0.98]"
                style={{
                  animationDelay: `${i * 110}ms`,
                  backgroundImage: `linear-gradient(160deg, ${p.accent}33, transparent 62%)`,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-3xl"
                  style={{ background: p.accent, opacity: 0.35 }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-5 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg,transparent,${p.accent},transparent)`,
                  }}
                />

                <div
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${p.accent}1f` }}
                >
                  <img
                    src={LOGOS[id]}
                    alt={p.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-12 w-12 rounded-xl object-contain drop-shadow-[0_0_18px_var(--primary-glow)]"
                  />
                </div>

                <span
                  className="relative mt-3 inline-block rounded-md px-2 py-0.5 text-[9px] font-extrabold tracking-[0.2em]"
                  style={{ color: p.accent, background: `${p.accent}26` }}
                >
                  {p.short}
                </span>
                <h3 className="neon-text mt-1 text-lg font-extrabold leading-tight text-foreground">
                  {p.name}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
                  {p.tagline}
                </p>

                <div className="relative mt-3 w-full space-y-1 border-t border-border pt-2">
                  <span className="flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
                    <ShieldCheck className="h-3 w-3 text-primary" /> موثوقة · سحب فوري
                  </span>
                </div>

                <span className="relative mt-2.5 flex w-full items-center justify-center gap-1 rounded-xl border border-primary/40 bg-primary/10 py-2 text-[10px] font-bold tracking-widest text-primary transition-colors group-hover:bg-primary/20">
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
                className="animate-fade-up glass flex flex-col items-center rounded-2xl px-2 py-3 text-center"
                style={{ animationDelay: `${300 + i * 80}ms` }}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-6 backdrop-blur-md">
          <div className="glass animate-fade-up neon-border w-full max-w-sm rounded-3xl p-6">
            <div className="mb-5 flex flex-col items-center">
              <img
                src={dragonLogo}
                alt="DRAGON VIP"
                width={256}
                height={256}
                className="h-20 w-20 animate-pulse object-contain drop-shadow-[0_0_28px_var(--primary-glow)]"
              />
            </div>
            <div className="space-y-3">
            {STEPS.slice(0, step + 1).map((s, i) => {

              const finished = i < step;
              return (
                <p
                  key={s}
                  className={`animate-fade-up flex items-center gap-2 text-xs ${
                    finished && i === STEPS.length - 1 ? "text-success" : "text-foreground"
                  }`}
                >
                  {finished ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
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
