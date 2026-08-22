import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { WinnersFeed } from "@/components/vip/WinnersFeed";
import { getPlatform, getUserId, PLATFORMS } from "@/lib/session";
import { fetchCrashOdd, isVip } from "@/lib/firebase";

export const Route = createFileRoute("/crash")({
  head: () => ({
    meta: [
      { title: "كاشف لعبة الطيارة Crash — DRAGON VIP" },
      { name: "description", content: "توقع أودد لعبة الطيارة Crash مباشرة بأسلوب VIP." },
      { property: "og:title", content: "كاشف لعبة الطيارة Crash — DRAGON VIP" },
      { property: "og:description", content: "توقع الأودد قبل الانفجار في لعبة الطيارة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CrashPage,
});

function CrashPage() {
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState("");
  const [odd, setOdd] = useState(1);
  const [target, setTarget] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    setPlatform(PLATFORMS[getPlatform()].name);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const start = async () => {
    if (running) return;
    const remote = isVip(getUserId()) ? await fetchCrashOdd() : null;
    const t = remote ?? Math.round((1 + Math.random() * 5) * 100) / 100;
    setTarget(t);
    setOdd(1);
    setRunning(true);
    const t0 = performance.now();
    const dur = 2600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setOdd(1 + (t - 1) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const restart = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setRunning(false);
    setOdd(1);
    setTarget(0);
  };

  const progress = target > 1 ? Math.min(1, (odd - 1) / (target - 1)) : 0;

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-10">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="كاشف الطيارة"
          right={
            <span className="block truncate rounded-lg border border-border bg-secondary/60 px-2 py-1 text-[9px] text-muted-foreground">
              ID: {userId}
            </span>
          }
        />

        <div className="flex flex-col items-center px-4 pt-[50px]">
          <DragonMark size={68} className="animate-glow-pulse" />
          <h1 className="neon-text mt-2 text-xl font-extrabold">
            Crash <span className="text-primary">×</span> {platform}
          </h1>

          {/* Board */}
          <div
            className="glass relative mt-5 overflow-hidden rounded-3xl"
            style={{ width: "calc(100% - 50px)", height: 200 }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.68 0.26 275/25%) 1px,transparent 1px),linear-gradient(90deg,oklch(0.68 0.26 275/25%) 1px,transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="crashline" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.55 0.24 285)" />
                  <stop offset="55%" stopColor="oklch(0.72 0.22 300)" />
                  <stop offset="100%" stopColor="oklch(0.85 0.18 320)" />
                </linearGradient>
                <filter id="crashglow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                ref={pathRef}
                d={d}
                fill="none"
                stroke="url(#crashline)"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                filter="url(#crashglow)"
                strokeDasharray={dash}
                strokeDashoffset={dash * (1 - drawProgress)}
              />
            </svg>
            <span
              className="absolute h-3.5 w-3.5 rounded-full border-2 border-background bg-primary shadow-[var(--glow-lg)] transition-none"
              style={{
                left: `calc(${endX}% - 7px)`,
                bottom: `calc(${100 - endY}% - 7px)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`neon-text text-4xl font-extrabold tabular-nums ${running ? "text-primary" : "text-foreground"}`}
              >
                x{odd.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 grid w-full grid-cols-2 gap-3">
            <button
              onClick={() => void start()}
              disabled={running}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-extrabold text-background shadow-[var(--glow-md)] transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
            >
              <Play className="h-4 w-4" /> بدأ
            </button>
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 rounded-2xl border border-primary/70 bg-transparent py-3.5 text-sm font-bold text-primary shadow-[var(--glow-sm)] transition-colors hover:bg-primary/10"
            >
              <RotateCcw className="h-4 w-4" /> إعادة بدأ
            </button>
          </div>

          <div className="mt-10 w-full">
            <WinnersFeed title="أرباح لعبة الطيارة — مباشر" />
          </div>
        </div>
      </div>
    </main>
  );
}
