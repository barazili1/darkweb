import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import bg from "@/assets/casino-bg.jpg";
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
    <main className="page-bg screen-frame relative min-h-screen pb-10">
      <img
        src={bg}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 blur-md"
      />
      <Particles />
      <div className="relative z-10">
        <TopBar title="اختيار المنصة" right={<OnlineUsers />} />

        <div className="space-y-4 px-4 pt-5">
          {(Object.keys(PLATFORMS) as PlatformId[]).map((id, i) => {
            const p = PLATFORMS[id];
            return (
              <button
                key={id}
                onClick={() => choose(id)}
                className="animate-fade-up glass group flex w-full items-center gap-4 rounded-2xl p-4 text-right transition-all duration-300 hover:-translate-y-1 hover:neon-border active:scale-[0.99]"
                style={{
                  animationDelay: `${i * 120}ms`,
                  backgroundImage: `linear-gradient(120deg, ${p.accent}22, transparent 60%)`,
                }}
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border text-base font-extrabold"
                  style={{ color: p.accent, boxShadow: `0 0 22px ${p.accent}66` }}
                >
                  {p.short}
                </span>
                <span className="flex-1">
                  <span className="block text-xl font-extrabold tracking-wide">{p.name}</span>
                  <span className="block text-xs text-muted-foreground">{p.tagline}</span>
                </span>
                <span className="text-primary-glow transition-transform group-hover:-translate-x-1">
                  ‹
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-4 pt-6">
          <WinnersFeed />
        </div>
      </div>

      {connecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-6 backdrop-blur-md">
          <div className="glass animate-fade-up neon-border w-full max-w-sm space-y-3 rounded-2xl p-5">
            {STEPS.slice(0, Math.max(step, 1)).map((s, i) => {
              const done = i < step - 1 || i < STEPS.length - 1 ? i < step - 1 : false;
              const isLast = i === STEPS.length - 1;
              const finished = i < step - 1 || (isLast && step >= STEPS.length);
              return (
                <p
                  key={s}
                  className={`animate-fade-up flex items-center gap-2 text-xs ${
                    isLast && finished ? "text-success" : "text-foreground"
                  } ${done ? "opacity-80" : ""}`}
                >
                  {finished ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-primary-glow" />
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
