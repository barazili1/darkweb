import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Apple, Bomb, Play, RotateCcw, Sparkles } from "lucide-react";
import { Particles, TopBar } from "@/components/vip/Chrome";
import { WinnersFeed } from "@/components/vip/WinnersFeed";
import { getPlatform, getUserId, PLATFORMS } from "@/lib/session";

export const Route = createFileRoute("/apple")({
  head: () => ({
    meta: [
      { title: "كاشف لعبة التفاحة — DRAGON VIP" },
      { name: "description", content: "شبكة كشف الخانات الآمنة في لعبة التفاحة بأسلوب VIP." },
      { property: "og:title", content: "كاشف لعبة التفاحة — DRAGON VIP" },
      { property: "og:description", content: "اكشف الخانات الآمنة في لعبة التفاحة." },
    ],
  }),
  component: ApplePage,
});

const ROWS = 10;
const COLS = 5;
const COEF = [1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68];

type Matrix = boolean[][]; // true = rotten

function generateMatrix(): Matrix {
  return Array.from({ length: ROWS }, () => {
    const safe = Math.floor(Math.random() * COLS);
    return Array.from({ length: COLS }, (_, c) => c !== safe);
  });
}

function ApplePage() {
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState("");
  const [grid, setGrid] = useState<Matrix | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    const p = getPlatform();
    setPlatform(p ? PLATFORMS[p].name : "");
    return clear;
  }, [clear]);

  const start = () => {
    if (running) return;
    clear();
    setGrid(generateMatrix());
    setRevealed(0);
    setRunning(true);
    for (let i = 1; i <= ROWS; i++) {
      timers.current.push(
        setTimeout(() => {
          setRevealed(i);
          if (i === ROWS) setRunning(false);
        }, i * 320),
      );
    }
  };

  const restart = () => {
    clear();
    setRunning(false);
    setRevealed(0);
    setGrid(null);
  };

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-10">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="كاشف لعبة التفاحة"
          right={
            <span className="block truncate rounded-lg border border-border bg-secondary/60 px-2 py-1 text-[9px] text-muted-foreground">
              ID: {userId}
            </span>
          }
        />

        <div className="px-4 pt-[50px]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Predictor
              </p>
              <h1 className="neon-text text-2xl font-extrabold">Apple of Fortune</h1>
            </div>
            {platform && (
              <span className="rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                {platform}
              </span>
            )}
          </div>

          <div className="glass space-y-1.5 overflow-x-auto rounded-2xl p-2.5">
            {Array.from({ length: ROWS }).map((_, r) => {
              const open = revealed > r;
              const active = running && revealed === r;
              return (
                <div
                  key={r}
                  className={`flex items-center gap-2 rounded-xl px-1.5 py-1 transition-all duration-300 ${
                    active ? "bg-primary/10 shadow-[var(--glow-sm)]" : ""
                  }`}
                >
                  <span
                    className={`w-14 shrink-0 text-center text-[11px] font-extrabold ${
                      open ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {COEF[r]?.toFixed(2)}x
                  </span>
                  <div className="flex flex-1 justify-end gap-1.5">
                    {Array.from({ length: COLS }).map((_, c) => {
                      const rotten = grid?.[r]?.[c] === true;
                      const isSafe = open && !rotten;
                      return (
                        <div
                          key={c}
                          className={`flex h-10 w-[60px] shrink-0 items-center justify-center rounded-lg border transition-all duration-500 ${
                            isSafe
                              ? "border-primary bg-primary/15 shadow-[var(--glow-sm)]"
                              : open
                                ? "border-border/60 bg-muted/50 opacity-60"
                                : active
                                  ? "animate-glow-pulse border-primary/70 bg-primary/15"
                                  : "border-border bg-background/60"
                          }`}
                        >
                          {open ? (
                            isSafe ? (
                              <Apple
                                className="h-5 w-5 text-gold drop-shadow-[0_0_10px_var(--gold)]"
                                fill="currentColor"
                              />
                            ) : (
                              <Bomb className="h-4 w-4 text-muted-foreground/70" />
                            )
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={start}
              disabled={running}
              className="gradient-primary flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-lg)] transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
            >
              <Play className="h-4 w-4" /> Start
            </button>
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 rounded-xl border border-primary/60 bg-secondary/60 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              <RotateCcw className="h-4 w-4" /> Restart
            </button>
          </div>

          <div className="mt-24">
            <WinnersFeed title="أرباح لعبة التفاحة — مباشر" appleOnly />
          </div>
        </div>
      </div>
    </main>
  );
}
