import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DragonMark, Particles } from "@/components/vip/Chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DRAGON VIP — أداة كشف لعبة التفاحة" },
      {
        name: "description",
        content: "منصة DRAGON VIP لكشف مربعات لعبة التفاحة على 1XBET و GREENBET بتفعيل VIP.",
      },
      { property: "og:title", content: "DRAGON VIP" },
      { property: "og:description", content: "تفعيل VIP وكشف لعبة التفاحة بأناقة." },
    ],
  }),
  component: Splash,
});

const PHASES = [
  "تهيئة النظام الآمن...",
  "تشفير الاتصال بالسيرفر...",
  "تحميل خوارزمية الكشف...",
  "جاهز للانطلاق",
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

  const phase = PHASES[Math.min(PHASES.length - 1, Math.floor(progress / 26))]!;

  return (
    <main
      className={`page-bg screen-frame relative flex min-h-screen flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <Particles />

      {/* halo layers */}
      <div className="animate-glow-pulse pointer-events-none absolute h-80 w-80 rounded-full bg-primary/25 blur-[110px]" />
      <div className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full border border-primary/20" />
      <div className="pointer-events-none absolute h-[19rem] w-[19rem] rounded-full border border-primary/25" />

      <div className="animate-fade-up relative z-10 flex flex-col items-center px-8 text-center">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full">
          <span className="absolute inset-0 animate-spin rounded-full border border-transparent border-l-primary-glow border-t-primary [animation-duration:6s]" />
          <DragonMark size={126} />
        </div>

        <h1 className="neon-text mt-7 text-3xl font-extrabold tracking-[0.3em] text-foreground">
          DRAGON VIP
        </h1>
        <span className="mt-3 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-[0.35em] text-primary">
          PREMIUM ACCESS
        </span>
      </div>

      <div className="absolute bottom-[18%] z-10 w-3/4 max-w-xs">
        <div className="mb-2 flex items-center justify-between text-[10px] tracking-widest text-muted-foreground">
          <span>{Math.floor(progress)}%</span>
          <span>{phase}</span>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="animate-glow-pulse h-full rounded-full transition-[width] duration-200 ease-out"
            style={{
              width: `${progress}%`,
              backgroundImage: "var(--gradient-primary)",
              boxShadow: "var(--glow-md)",
            }}
          />
        </div>
      </div>

      <p className="absolute bottom-6 z-10 text-[9px] tracking-[0.4em] text-muted-foreground/70">
        SECURE • ENCRYPTED • VIP
      </p>
    </main>
  );
}
