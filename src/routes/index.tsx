import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, ShieldCheck, Zap } from "lucide-react";
import { DragonMark, Particles } from "@/components/vip/Chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PROFESSOR OFFICIAL — أداة كشف لعبة التفاحة" },
      {
        name: "description",
        content: "منصة PROFESSOR OFFICIAL لكشف مربعات لعبة التفاحة على 1XBET و GREENBET بتفعيل VIP.",
      },
      { property: "og:title", content: "PROFESSOR OFFICIAL" },
      { property: "og:description", content: "تفعيل VIP وكشف لعبة التفاحة بأناقة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Splash,
});

const PHASES = [
  { label: "تهيئة النظام الآمن", icon: ShieldCheck },
  { label: "تشفير الاتصال بالسيرفر", icon: Lock },
  { label: "تحميل خوارزمية الكشف", icon: Zap },
  { label: "جاهز للانطلاق", icon: ShieldCheck },
];

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + Math.random() * 6 + 2)));
    }, 95);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setLeaving(true);
      const t = setTimeout(() => navigate({ to: "/platforms" }), 700);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [progress, navigate]);

  const activePhase = Math.min(PHASES.length - 1, Math.floor(progress / 26));

  return (
    <main
      className={`page-bg screen-frame relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-6 py-12 transition-all duration-700 ${
        leaving ? "scale-[1.06] opacity-0 blur-sm" : "opacity-100"
      }`}
    >
      <Particles />

      {/* header rail */}
      <div className="animate-rise relative z-10 flex w-full max-w-sm items-center justify-between">
        <span className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
        <span className="mx-3 rounded-full border border-primary/35 px-3 py-1 text-[8px] font-bold tracking-[0.5em] text-primary/90">
          PREMIUM
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
      </div>

      {/* core emblem */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="animate-glow-pulse pointer-events-none absolute h-80 w-80 rounded-full bg-primary/20 blur-[130px]" />

        <div className="relative flex h-52 w-52 items-center justify-center">
          <span className="ring-conic animate-spin-slow absolute inset-0 rounded-full" />
          <span className="ring-conic absolute inset-6 rounded-full [animation:spin-slow_11s_linear_infinite_reverse]" />
          <span className="absolute inset-11 rounded-full border border-primary/25" />
          <span className="absolute inset-11 overflow-hidden rounded-full">
            <span className="animate-scan block h-3 w-full bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
          </span>
          <DragonMark size={112} className="relative animate-rise" />
        </div>

        <h1 className="text-shimmer mt-9 text-[1.6rem] font-extrabold leading-none tracking-[0.16em]">
          PROFESSOR
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-l from-primary to-transparent" />
          <span className="text-[11px] font-bold tracking-[0.5em] text-primary">OFFICIAL</span>
          <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
        </div>
        <p className="mt-3 text-[10px] tracking-[0.32em] text-muted-foreground/70">
          V 5.0 · VIP DETECTION SUITE
        </p>
      </div>

      {/* phases + progress */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-5 grid grid-cols-2 gap-2">
          {PHASES.map((ph, i) => {
            const Icon = ph.icon;
            const state = i < activePhase ? "done" : i === activePhase ? "now" : "idle";
            return (
              <div
                key={ph.label}
                className={`card-elite flex items-center gap-2 rounded-2xl px-3 py-2.5 transition-all duration-500 ${
                  state === "idle"
                    ? "opacity-35"
                    : state === "now"
                      ? "-translate-y-0.5 shadow-[var(--glow-sm)]"
                      : "opacity-90"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 shrink-0 ${
                    state === "done"
                      ? "text-success"
                      : state === "now"
                        ? "animate-glow-pulse text-primary"
                        : "text-muted-foreground"
                  }`}
                />
                <span className="text-[9.5px] leading-tight text-foreground/85">{ph.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mb-2 flex items-center justify-between text-[9px] tracking-[0.3em] text-muted-foreground">
          <span className="neon-text text-sm font-extrabold text-primary">
            {Math.floor(progress)}%
          </span>
          <span>LOADING</span>
        </div>
        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-secondary/60">
          <div
            className="h-full rounded-full transition-[width] duration-200 ease-out"
            style={{
              width: `${progress}%`,
              backgroundImage: "var(--gradient-primary)",
              boxShadow: "var(--glow-md)",
            }}
          />
        </div>
        <p className="mt-6 text-center text-[9px] tracking-[0.42em] text-muted-foreground/60">
          SECURE • ENCRYPTED • VIP
        </p>
      </div>
    </main>
  );
}
