import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, Check, ChevronLeft, Copy, Gamepad2, Lock } from "lucide-react";
import imgDownload from "@/assets/cond-download.png";
import imgTelegram from "@/assets/cond-telegram.png";
import imgPromo from "@/assets/cond-promo.png";
import imgDeposit from "@/assets/cond-deposit.png";
import imgId from "@/assets/cond-id.png";
import gameCrash from "@/assets/game-crash.png";
import gameMines from "@/assets/game-mines.png";
import gameApple from "@/assets/game-apple.png";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { PLATFORMS, getPlatform, saveUserId, type PlatformId } from "@/lib/session";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "شروط التفعيل VIP — DRAGON VIP" },
      {
        name: "description",
        content: "أكمل شروط التفعيل واختر لعبتك: Crash أو Gems Mines أو Apple of Fortune.",
      },
      { property: "og:title", content: "شروط التفعيل VIP — DRAGON VIP" },
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
  { id: "mines", name: "Gems Mines", img: gameMines, to: "/mines" },
  { id: "apple", name: "Apple of Fortune", img: gameApple, to: "/apple" },
];

function Card({
  n,
  image,
  title,
  desc,
  children,
  delay,
  done,
}: {
  n: number;
  image: string;
  title: string;
  desc: string;
  children?: React.ReactNode;
  delay: number;
  done?: boolean;
}) {
  return (
    <article
      className="glass animate-fade-up group relative overflow-hidden rounded-[26px] p-4 text-right transition-all duration-300 hover:-translate-y-1 hover:neon-border"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1"
        style={{ backgroundImage: "var(--gradient-primary)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative flex items-start gap-3">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={512}
          height={512}
          className="h-[74px] w-[74px] shrink-0 rounded-2xl border border-border bg-secondary/40 object-contain p-1.5 shadow-[var(--glow-sm)] transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex-1">
          <div className="flex items-center justify-end gap-2">
            <h2 className="neon-text text-sm font-extrabold text-foreground">{title}</h2>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold ${
                done
                  ? "bg-success text-background"
                  : "gradient-primary text-primary-foreground shadow-[var(--glow-sm)]"
              }`}
            >
              {done ? <Check className="h-3 w-3" /> : n}
            </span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children && <div className="relative mt-3">{children}</div>}
    </article>
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
    navigator.clipboard?.writeText("A77N");
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

        <section className="px-4 pt-[50px]">
          <div className="glass animate-fade-up relative overflow-hidden rounded-[28px] p-5 text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl"
            />
            <DragonMark size={54} className="relative mx-auto animate-glow-pulse" />
            <h2 className="neon-text relative mt-2 text-2xl font-extrabold text-foreground">
              خطوات التفعيل
            </h2>
            <p className="relative mt-1 text-xs text-muted-foreground">
              أكمل الشروط بالترتيب لتفعيل أداة {p.name}
            </p>
            <div className="relative mx-auto mt-4 max-w-xs">
              <div className="h-[5px] w-full overflow-hidden rounded-full bg-secondary/70">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundImage: "var(--gradient-primary)",
                    boxShadow: "var(--glow-sm)",
                  }}
                />
              </div>
              <p className="mt-2 text-[10px] tracking-[0.3em] text-muted-foreground">
                التقدم {progress}%
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-3.5 px-4">
          <Card
            n={1}
            delay={0}
            image={imgDownload}
            title="تحميل المنصة"
            desc={`قم بتحميل وتثبيت التطبيق الرسمي لمنصة ${p.name} على هاتفك.`}
          >
            <div className="flex items-center justify-end gap-2 rounded-xl border border-border bg-secondary/40 px-3 py-2">
              <span className="text-[10px] text-muted-foreground">Dragon VIP × {p.name}</span>
              <DragonMark size={22} />
            </div>
          </Card>

          <Card
            n={2}
            delay={80}
            image={imgTelegram}
            title="قناة التلجرام"
            desc="انضم لقناتنا الحصرية للحصول على التحديثات والإشارات اليومية."
          >
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="gradient-primary flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-[1.03]"
            >
              انضمام الآن <ChevronLeft className="h-3.5 w-3.5" />
            </a>
          </Card>

          <Card
            n={3}
            delay={160}
            image={imgPromo}
            title="البروموكود"
            desc="سجل باستخدام البروموكود الخاص بنا للحصول على البونص:"
            done={copied}
          >
            <button
              onClick={copy}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-input bg-secondary/60 px-3 py-2.5 transition-colors hover:bg-secondary"
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
          </Card>

          <Card
            n={4}
            delay={240}
            image={imgDeposit}
            title="الإيداع"
            desc="قم بعمل إيداع أولي بقيمة 250 جنيه أو 5 دولار لتفعيل الحساب."
          >
            <div className="grid grid-cols-2 gap-2">
              <span className="rounded-xl border border-border bg-secondary/40 py-2 text-center text-[11px] font-bold text-gold">
                250 EGP
              </span>
              <span className="rounded-xl border border-border bg-secondary/40 py-2 text-center text-[11px] font-bold text-gold">
                5 USD
              </span>
            </div>
          </Card>

          <Card
            n={5}
            delay={320}
            image={imgId}
            title="الـ ID الخاص بك"
            desc="أدخل الـ ID الخاص بك في المنصة للتأكد من التفعيل."
            done={!!id.trim()}
          >
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              inputMode="numeric"
              placeholder="مثال: 1029384756"
              className="w-full rounded-xl border border-input bg-background/60 px-3 py-2.5 text-right text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:shadow-[var(--glow-sm)]"
            />
          </Card>

          {/* Game selection */}
          <div className="animate-fade-up glass rounded-[26px] p-4" style={{ animationDelay: "400ms" }}>
            <h3 className="flex items-center justify-end gap-2 text-sm font-extrabold text-foreground">
              اختر اللعبة <Gamepad2 className="h-4 w-4 text-primary" />
            </h3>
            <p className="mt-1 text-right text-[11px] text-muted-foreground">
              لازم تختار لعبة واحدة لتشغيل الكاشف الخاص بها.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {GAMES.map((g) => {
                const active = game === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setGame(g.id)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all duration-300 ${
                      active
                        ? "neon-border border-primary bg-primary/15 -translate-y-1"
                        : "border-border bg-background/50 hover:bg-secondary/50"
                    }`}
                  >
                    <img
                      src={g.img}
                      alt={g.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-14 w-14 object-contain drop-shadow-[0_0_12px_var(--primary-glow)]"
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
            className="gradient-primary mt-2 w-full rounded-2xl py-4 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-lg)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            {ready ? "أكملت الشروط، ابدأ الربح" : "أكمل الـ ID واختر لعبة"}
          </button>
          {!ready && (
            <p className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
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
          <p className="neon-text text-sm font-extrabold">DRAGON VIP</p>
          <p className="text-xs tracking-widest text-muted-foreground">جارٍ تفعيل الحساب VIP...</p>
        </div>
      )}
    </main>
  );
}
