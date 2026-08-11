import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DragonMark } from "@/components/vip/Chrome";

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

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(100, p + Math.random() * 7 + 2);
      });
    }, 90);
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

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background transition-opacity duration-700 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-glow-pulse pointer-events-none absolute h-72 w-72 rounded-full bg-primary/30 blur-[90px]" />

      <div className="animate-fade-up relative z-10 flex flex-col items-center">
        <DragonMark size={150} />
        <h1 className="neon-text mt-6 text-3xl font-extrabold tracking-[0.28em]">DRAGON VIP</h1>
        <p className="mt-2 text-[11px] tracking-[0.3em] text-muted-foreground">PREMIUM ACCESS</p>
      </div>

      <div className="absolute bottom-[22%] w-2/3 max-w-xs">
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
        <p className="mt-3 text-center text-[10px] tracking-widest text-muted-foreground">
          {Math.floor(progress)}%
        </p>
      </div>
    </main>
  );
}
