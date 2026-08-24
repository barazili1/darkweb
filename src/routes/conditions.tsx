import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, Check, ChevronLeft, Copy, Gamepad2, Lock, Sparkles } from "lucide-react";
import imgDownload from "@/assets/cond-download.png";
import imgTelegram from "@/assets/cond-telegram.png";
import imgPromo from "@/assets/cond-promo.png";
import imgDeposit from "@/assets/cond-deposit.png";
import imgId from "@/assets/cond-id.png";
import gameCrash from "@/assets/game-crash.png";
import gameApple from "@/assets/game-apple.png";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { PLATFORMS, getPlatform, saveUserId, type PlatformId } from "@/lib/session";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "شروط التفعيل VIP — PROFESSOR OFFICIAL" },
      {
        name: "description",
        content: "أكمل شروط التفعيل واختر لعبتك: Crash أو Apple of Fortune.",
      },
      { property: "og:title", content: "شروط التفعيل VIP — PROFESSOR OFFICIAL" },
      { property: "og:description", content: "خطوات تفعيل حساب VIP واختيار اللعبة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConditionsPage,
});

type GameId = "crash" | "mines" | "apple";

const GAMES: { id: GameId; name: string; img: string; to: string }[] = [
  { id: "crash", name: "Crash", img: gameCrash, to: "/crash" },
  { id: "apple", name: "Apple of Fortune", img: gameApple, to: "/apple" },
];

function Step({
  n,
  image,
  title,
  desc,
  children,
  delay,
  done,
  last,
}: {
  n: number;
  image: string;
  title: string;
  desc: string;
  children?: React.ReactNode;
  delay: number;
  done?: boolean;
  last?: boolean;
}) {
  return (
    <li className="animate-fade-up relative flex gap-3" style={{ animationDelay: `${delay}ms` }}>
      {/* rail */}
      <div className="relative flex w-10 shrink-0 flex-col items-center">
        <span
          className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[12px] font-extrabold transition-colors ${
            done
              ? "border-success/60 bg-success/15 text-success"
              : "border-primary/60 bg-primary/10 text-primary shadow-[var(--glow-sm)]"
          }`}
        >
          {done ? <Check className="h-4 w-4" /> : n}
        </span>
        {!last && (
          <span
            aria-hidden
            className="absolute top-10 bottom-0 w-px"
            style={{
              background: "linear-gradient(180deg,var(--primary),transparent)",
              opacity: 0.5,
            }}
          />
        )}
      </div>

      <article className="group relative mb-4 flex-1 overflow-hidden rounded-[26px] border border-primary/25 p-3.5 text-right transition-all duration-300 hover:border-primary/70 hover:shadow-[var(--glow-md)]">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
        />
        <div className="relative flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="neon-text text-[14px] font-extrabold text-foreground">{title}</h2>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{desc}</p>
          </div>
          <img
            src={image}
            alt={title}
            loading="lazy"
            width={512}
            height={512}
            className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_0_16px_var(--primary-glow)] transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        {children && <div className="relative mt-3">{children}</div>}
      </article>
    </li>
  );
}

function ConditionsPage() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<PlatformId>("1xbet");
  const [copied, setCopied] = useState(false);
  const [id, setId] = useState("");
  const [game, setGame] = useState<GameId | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  useEffect(() => {
    if (!loading || !game) return undefined;
    const to = GAMES.find((g) => g.id === game)!.to;
    const t = setTimeout(() => navigate({ to }), 5000);
    return () => clearTimeout(t);
  }, [loading, game, navigate]);

  const p = PLATFORMS[platform];
  const filled = (copied ? 1 : 0) + (id.trim() ? 1 : 0) + (game ? 1 : 0);
  const progress = Math.round(((3 + filled) / 6) * 100);
  const ready = !!id.trim() && !!game;

  const copy = () => {
    navigator.clipboard?.writeText(p.promo);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-16">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="شروط التفعيل VIP"
          right={<BadgeCheck className="mr-auto h-5 w-5 text-primary" />}
        />

        {/* Hero */}
        <section className="px-4 pt-[50px]">
          <div className="animate-fade-up relative flex items-center gap-3 overflow-hidden rounded-[28px] border border-primary/30 p-4 text-right">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-primary/25 blur-3xl"
            />
            <div className="relative min-w-0 flex-1">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[9px] font-bold tracking-[0.25em] text-primary">
                <Sparkles className="h-3 w-3" /> VIP
              </span>
              <h1 className="neon-text mt-1.5 text-xl font-extrabold text-foreground">
                خطوات التفعيل
              </h1>
              <p className="mt-1 text-[11px] text-muted-foreground">
                أكمل الشروط بالترتيب لتفعيل أداة {p.name}
              </p>
              <div className="mt-3 h-[5px] w-full overflow-hidden rounded-full bg-secondary/70">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundImage: "var(--gradient-primary)",
                    boxShadow: "var(--glow-sm)",
                  }}
                />
              </div>
              <p className="mt-1.5 text-[10px] tracking-[0.3em] text-muted-foreground">
                التقدم {progress}%
              </p>
            </div>
            <DragonMark size={64} className="relative shrink-0 animate-glow-pulse" />
          </div>
        </section>

        <section className="mt-5 px-4">
          <ul className="relative">
            <Step
              n={1}
              delay={0}
              image={imgDownload}
              title="تحميل المنصة"
              desc={`قم بتحميل وتثبيت التطبيق الرسمي لمنصة ${p.name} على هاتفك.`}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="gradient-primary flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-[1.03]"
              >
                تحميل {p.name} <ChevronLeft className="h-3.5 w-3.5" />
              </a>
            </Step>

            <Step
              n={2}
              delay={70}
              image={imgTelegram}
              title="قناة التلجرام"
              desc="انضم لقناتنا الحصرية للحصول على التحديثات والإشارات اليومية."
            >
              <a
                href="https://t.me/THEAGLE2"
                target="_blank"
                rel="noreferrer"
                className="gradient-primary flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-[1.03]"
              >
                انضمام الآن <ChevronLeft className="h-3.5 w-3.5" />
              </a>
            </Step>

            <Step
              n={3}
              delay={140}
              image={imgPromo}
              title="البروموكود"
              desc="سجل باستخدام البروموكود الخاص بنا للحصول على البونص:"
              done={copied}
            >
              <button
                onClick={copy}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-primary/40 px-3 py-2.5 transition-colors hover:bg-primary/10"
              >
                <span className="neon-text text-lg font-extrabold tracking-[0.35em] text-primary">
                  A77N
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  {copied ? "تم النسخ" : "نسخ"}
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4 text-primary" />
                  )}
                </span>
              </button>
            </Step>

            <Step
              n={4}
              delay={210}
              image={imgDeposit}
              title="الإيداع"
              desc="قم بعمل إيداع أولي بقيمة 250 جنيه أو 5 دولار لتفعيل الحساب."
            >
              <div className="grid grid-cols-2 gap-2">
                <span className="rounded-xl border border-primary/25 py-2 text-center text-[11px] font-bold text-gold">
                  250 EGP
                </span>
                <span className="rounded-xl border border-primary/25 py-2 text-center text-[11px] font-bold text-gold">
                  5 USD
                </span>
              </div>
            </Step>

            <Step
              n={5}
              delay={280}
              image={imgId}
              title="الـ ID الخاص بك"
              desc="أدخل الـ ID الخاص بك في المنصة للتأكد من التفعيل."
              done={!!id.trim()}
              last
            >
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                inputMode="numeric"
                placeholder="مثال: 1029384756"
                className="w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-right text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:shadow-[var(--glow-sm)]"
              />
            </Step>
          </ul>

          {/* Game selection */}
          <div
            className="animate-fade-up rounded-[28px] border border-primary/30 p-4"
            style={{ animationDelay: "340ms" }}
          >
            <h3 className="flex items-center justify-end gap-2 text-sm font-extrabold text-foreground">
              اختر اللعبة <Gamepad2 className="h-4 w-4 text-primary" />
            </h3>
            <p className="mt-1 text-right text-[11px] text-muted-foreground">
              لازم تختار لعبة واحدة لتشغيل الكاشف الخاص بها.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {GAMES.map((g) => {
                const active = game === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setGame(g.id)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all duration-300 ${
                      active
                        ? "neon-border -translate-y-1 border-primary bg-primary/15"
                        : "border-primary/25 hover:bg-primary/10"
                    }`}
                  >
                    <img
                      src={g.img}
                      alt={g.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-16 w-16 object-contain drop-shadow-[0_0_12px_var(--primary-glow)]"
                    />
                    <span
                      className={`text-center text-[10px] font-bold leading-tight ${active ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {g.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              if (!ready) return;
              saveUserId(id.trim());
              setLoading(true);
            }}
            disabled={!ready}
            className="gradient-primary mt-4 w-full rounded-2xl py-4 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-lg)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            {ready ? "أكملت الشروط، ابدأ الربح" : "أكمل الـ ID واختر لعبة"}
          </button>
          {!ready && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
              <Lock className="h-3 w-3" /> الزر يتفعل بعد إدخال الـ ID واختيار اللعبة
            </p>
          )}
        </section>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background/85 backdrop-blur-md">
          <div className="relative flex h-36 w-36 items-center justify-center">
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-l-primary-glow border-t-primary shadow-[var(--glow-md)]" />
            <DragonMark size={82} className="animate-glow-pulse" />
          </div>
          <p className="neon-text text-sm font-extrabold">PROFESSOR OFFICIAL</p>
          <p className="text-xs tracking-widest text-muted-foreground">جارٍ تفعيل الحساب VIP...</p>
        </div>
      )}
    </main>
  );
}
