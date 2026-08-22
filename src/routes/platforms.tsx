import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Loader2, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import bg from "@/assets/casino-bg.jpg";
import platformArt from "@/assets/platform-generic.png";
import { OnlineUsers, Particles, TopBar } from "@/components/vip/Chrome";
import { WinnersFeed } from "@/components/vip/WinnersFeed";
import { PLATFORMS, savePlatform, type PlatformId } from "@/lib/session";

export const Route = createFileRoute("/platforms")({
  head: () => ({
    meta: [
      { title: "اختيار المنصة — DRAGON VIP" },
      { name: "description", content: "اختر منصتك 1XBET أو GREENBET لبدء تفعيل حساب VIP." },
      { property: "og:title", content: "اختيار المنصة — DRAGON VIP" },
      { property: "og:description", content: "اختر منصتك لبدء تفعيل حساب VIP." },
    ],
  }),
  component: PlatformsPage,
});

const STEPS = [
  "جارٍ الاتصال بسيرفر المنصة...",
  "جارٍ التحقق من الـ ID الخاص بك...",
  "تم الاتصال بالمنصة بنجاح!",
];

const STATS = [
  { label: "نسبة النجاح", value: "97%" },
  { label: "لاعب نشط", value: "14.5K" },
  { label: "سحب اليوم", value: "$82K" },
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
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 blur-xl"
      />
      <Particles />
      <div className="relative z-10">
        <TopBar title="اختيار المنصة" right={<OnlineUsers />} />

        {/* Hero */}
        <section className="px-4 pt-[50px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-widest text-primary">
            <Zap className="h-3 w-3" /> VIP ACCESS
          </span>
          <h2 className="neon-text mt-3 text-2xl font-extrabold text-foreground">اختر منصتك</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            حدد المنصة التي تلعب عليها لتشغيل أداة الكشف الخاصة بك
          </p>
        </section>

        {/* Stats strip */}
        <section className="mt-5 grid grid-cols-3 gap-2 px-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up glass rounded-2xl px-2 py-3 text-center"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="neon-text text-base font-extrabold text-primary">{s.value}</p>
              <p className="mt-0.5 text-[9px] tracking-wide text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Platform cards */}
        <section className="mt-6 space-y-5 px-4">
          {(Object.keys(PLATFORMS) as PlatformId[]).map((id, i) => {
            const p = PLATFORMS[id];
            return (
              <button
                key={id}
                onClick={() => choose(id)}
                className="animate-fade-up glass group relative w-full overflow-hidden rounded-[28px] p-5 text-right transition-all duration-300 hover:-translate-y-1.5 hover:neon-border active:scale-[0.99]"
                style={{
                  animationDelay: `${i * 120}ms`,
                  backgroundImage: `linear-gradient(135deg, ${p.accent}2e, transparent 60%)`,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: p.accent, opacity: 0.4 }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px"
                  style={{ background: `linear-gradient(90deg,transparent,${p.accent},transparent)` }}
                />
                <div className="relative flex items-center gap-4">
                  <div
                    className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border"
                    style={{ background: `${p.accent}1a` }}
                  >
                    <img
                      src={platformArt}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-14 w-14 object-contain drop-shadow-[0_0_20px_var(--primary-glow)]"
                    />
                  </div>
                  <div className="flex-1">
                    <span
                      className="inline-block rounded-md px-2 py-0.5 text-[10px] font-extrabold tracking-widest"
                      style={{ color: p.accent, background: `${p.accent}26` }}
                    >
                      {p.short}
                    </span>
                    <h3 className="neon-text mt-1 text-2xl font-extrabold tracking-wide text-foreground">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{p.tagline}</p>
                  </div>
                  <span className="text-2xl text-primary transition-transform group-hover:-translate-x-1">
                    ‹
                  </span>
                </div>

                <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
                  <span className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" /> موثوقة
                  </span>
                  <span className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" /> نسبة نجاح 97%
                  </span>
                  <span className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-primary" /> سحب فوري
                  </span>
                </div>

                <span className="relative mt-4 block w-full rounded-xl border border-primary/40 bg-primary/10 py-2 text-center text-[11px] font-bold tracking-widest text-primary transition-colors group-hover:bg-primary/20">
                  اتصال وبدء التفعيل
                </span>
              </button>
            );
          })}
        </section>

        {/* Winners dashboard — very bottom */}
        <section className="mt-24 px-4">
          <WinnersFeed />
        </section>
      </div>

      {connecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-6 backdrop-blur-md">
          <div className="glass animate-fade-up neon-border w-full max-w-sm space-y-3 rounded-2xl p-5">
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
      )}
    </main>
  );
}
