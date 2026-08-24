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
      className={`page-bg screen-frame relative flex min-h-screen flex-col items-center justify-between overflow-hidden py-14 transition-opacity duration-700 ${
        leaving ? "scale-105 opacity-0" : "opacity-100"
      }`}
    >
      <Particles />

      {/* top badge */}
      <div className="animate-fade-up relative z-10 flex flex-col items-center gap-2">
        <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-[9px] font-bold tracking-[0.45em] text-primary">
          PREMIUM ACCESS
        </span>
        <span className="text-[8px] tracking-[0.5em] text-muted-foreground/70">V 4.0 · 2026</span>
      </div>

      {/* core */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <div className="animate-glow-pulse pointer-events-none absolute h-72 w-72 rounded-full bg-primary/25 blur-[120px]" />

        <div className="relative flex h-48 w-48 items-center justify-center">
          {/* rotating rings */}
          <span className="absolute inset-0 animate-spin rounded-[38%] border border-primary/40 [animation-duration:14s]" />
          <span className="absolute inset-3 animate-spin rounded-[42%] border border-primary-glow/40 [animation-direction:reverse] [animation-duration:9s]" />
          <span className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-primary-glow [animation-duration:3.5s]" />
          <DragonMark size={118} className="relative" />
        </div>

        <h1 className="neon-text mt-8 text-[2rem] font-extrabold leading-none tracking-[0.32em] text-foreground">
          DRAGON
        </h1>
        <div className="mt-2 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-l from-primary to-transparent" />
          <span className="text-sm font-bold tracking-[0.6em] text-primary">VIP</span>
          <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
        </div>
      </div>

      {/* progress block */}
      <div className="relative z-10 w-4/5 max-w-xs">
        <div className="glass mb-4 space-y-1.5 rounded-2xl px-3 py-2.5">
          {PHASES.map((ph, i) => {
            const Icon = ph.icon;
            const state = i < activePhase ? "done" : i === activePhase ? "now" : "idle";
            return (
              <p
                key={ph.label}
                className={`flex items-center gap-2 text-[10px] transition-all duration-500 ${
                  state === "idle"
                    ? "text-muted-foreground/40"
                    : state === "now"
                      ? "text-primary"
                      : "text-success"
                }`}
              >
                <Icon className={`h-3 w-3 ${state === "now" ? "animate-glow-pulse" : ""}`} />
                {ph.label}
              </p>
            );
          })}
        </div>

        <div className="mb-1.5 flex items-center justify-between text-[9px] tracking-[0.3em] text-muted-foreground">
          <span className="neon-text font-bold text-primary">{Math.floor(progress)}%</span>
          <span>LOADING</span>
        </div>
        <div className="relative h-[5px] w-full overflow-hidden rounded-full bg-secondary/70">
          <div
            className="h-full rounded-full transition-[width] duration-200 ease-out"
            style={{
              width: `${progress}%`,
              backgroundImage: "var(--gradient-primary)",
              boxShadow: "var(--glow-md)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 flex justify-between px-[12%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-full w-px bg-background/70" />
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-[9px] tracking-[0.4em] text-muted-foreground/70">
          SECURE • ENCRYPTED • VIP
        </p>
      </div>
    </main>
  );
}
