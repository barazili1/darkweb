import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Apple } from "lucide-react";
import { Particles, TopBar } from "@/components/vip/Chrome";
import { WinnersFeed } from "@/components/vip/WinnersFeed";
import { getUserId } from "@/lib/session";

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
type Cell = "idle" | "flash" | "safe" | "burnt";

function generate(): Cell[] {
  const cells: Cell[] = [];
  for (let r = 0; r < ROWS; r++) {
    const safe = Math.floor(Math.random() * COLS);
    for (let c = 0; c < COLS; c++) cells.push(c === safe ? "safe" : "burnt");
  }
  return cells;
}

function ApplePage() {
  const [userId, setUserId] = useState("");
  const [cells, setCells] = useState<Cell[]>(() => Array(ROWS * COLS).fill("idle"));
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const start = () => {
    if (running) return;
    clearTimers();
    setRunning(true);
    setCells(Array(ROWS * COLS).fill("flash"));
    const result = generate();
    for (let r = 0; r < ROWS; r++) {
      timers.current.push(
        setTimeout(
          () => {
            setCells((prev) => {
              const next = [...prev];
              for (let c = 0; c < COLS; c++) next[r * COLS + c] = result[r * COLS + c]!;
              return next;
            });
            if (r === ROWS - 1) setRunning(false);
          },
          900 + r * 320,
        ),
      );
    }
  };

  const restart = () => {
    clearTimers();
    setRunning(false);
    setCells(Array(ROWS * COLS).fill("idle"));
  };

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-10">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="كاشف لعبة التفاحة"
          right={
            <span className="block truncate rounded-lg border border-border bg-secondary/50 px-2 py-1 text-[9px] text-muted-foreground">
              ID: {userId}
            </span>
          }
        />

        <div className="px-4 pt-4">
          <div className="glass grid grid-cols-5 gap-1.5 rounded-2xl p-2.5">
            {cells.map((cell, i) => (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-lg border text-lg transition-all duration-500 ${
                  cell === "safe"
                    ? "border-primary bg-primary/15 shadow-[var(--glow-sm)] scale-100"
                    : cell === "burnt"
                      ? "border-border/50 bg-background/60 opacity-40"
                      : cell === "flash"
                        ? "animate-glow-pulse border-primary/70 bg-primary/20"
                        : "border-border bg-background/50"
                }`}
              >
                {cell === "safe" ? (
                  <Apple className="h-5 w-5 text-gold drop-shadow-[0_0_10px_var(--gold)]" fill="currentColor" />
                ) : cell === "burnt" ? (
                  <Apple className="h-5 w-5 text-muted-foreground/40" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={start}
              disabled={running}
              className="gradient-primary rounded-xl py-3.5 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-lg)] transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
            >
              {running ? "جارٍ الكشف..." : "Start"}
            </button>
            <button
              onClick={restart}
              className="rounded-xl border border-primary/60 bg-secondary/60 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              Restart
            </button>
          </div>

          <div className="mt-5">
            <WinnersFeed title="أرباح لعبة التفاحة — مباشر" appleOnly />
          </div>
        </div>
      </div>
    </main>
  );
}
