import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, Check, ChevronLeft, Copy } from "lucide-react";
import imgDownload from "@/assets/cond-download.png";
import imgTelegram from "@/assets/cond-telegram.png";
import imgPromo from "@/assets/cond-promo.png";
import imgDeposit from "@/assets/cond-deposit.png";
import imgId from "@/assets/cond-id.png";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { PLATFORMS, getPlatform, saveUserId, type PlatformId } from "@/lib/session";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "شروط التفعيل VIP — DRAGON VIP" },
      {
        name: "description",
        content: "أكمل شروط التفعيل: التحميل، التلجرام، البروموكود، الإيداع والـ ID.",
      },
      { property: "og:title", content: "شروط التفعيل VIP — DRAGON VIP" },
      { property: "og:description", content: "خطوات تفعيل حساب VIP خطوة بخطوة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConditionsPage,
});

function Step({
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
      className="animate-fade-up relative pr-7 text-right"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* timeline rail */}
      <span
        aria-hidden
        className="absolute right-[13px] top-8 -bottom-4 w-px bg-gradient-to-b from-primary/60 to-transparent"
      />
      <span
        className={`absolute right-0 top-2 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-extrabold shadow-[var(--glow-sm)] ${
          done
            ? "bg-success text-background"
            : "gradient-primary text-primary-foreground"
        }`}
      >
        {done ? <Check className="h-3.5 w-3.5" /> : n}
      </span>

      <div className="glass group relative overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1 hover:neon-border">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative flex items-center gap-3">
          <img
            src={image}
            alt={title}
            loading="lazy"
            width={512}
            height={512}
            className="h-16 w-16 shrink-0 rounded-2xl border border-border bg-secondary/40 object-contain p-1 shadow-[var(--glow-sm)] transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex-1">
            <h2 className="neon-text text-sm font-extrabold text-foreground">{title}</h2>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        </div>
        {children && <div className="relative mt-3">{children}</div>}
      </div>
    </article>
  );
}

function ConditionsPage() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<PlatformId>("1xbet");
  const [copied, setCopied] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  useEffect(() => {
    if (!loading) return undefined;
    const t = setTimeout(() => navigate({ to: "/apple" }), 5000);
    return () => clearTimeout(t);
  }, [loading, navigate]);

  const p = PLATFORMS[platform];
  const filled = (copied ? 1 : 0) + (id.trim() ? 1 : 0);
  const progress = Math.round(((3 + filled) / 5) * 100);

  const copy = () => {
    navigator.clipboard?.writeText("A77N");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = () => {
    if (!id.trim()) return;
    saveUserId(id.trim());
    setLoading(true);
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
          <div className="glass animate-fade-up relative overflow-hidden rounded-3xl p-4 text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-14 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl"
            />
            <span className="relative inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-primary">
              5 خطوات فقط
            </span>
            <h2 className="neon-text relative mt-3 text-2xl font-extrabold text-foreground">
              خطوات التفعيل
            </h2>
            <p className="relative mt-1 text-xs text-muted-foreground">
              أكمل الخطوات بالترتيب لتفعيل أداة {p.name}
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

        <section className="mt-6 space-y-4 px-4">
          <Step
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
          </Step>

          <Step
            n={2}
            delay={90}
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
          </Step>

          <Step
            n={3}
            delay={180}
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
          </Step>

          <Step
            n={4}
            delay={270}
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
          </Step>

          <Step
            n={5}
            delay={360}
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
          </Step>

          <button
            onClick={submit}
            disabled={!id.trim()}
            className="gradient-primary mt-3 w-full rounded-2xl py-4 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-lg)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            أكملت الشروط، ابدأ الربح
          </button>
        </section>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background/85 backdrop-blur-md">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-l-primary-glow border-t-primary shadow-[var(--glow-md)]" />
            <DragonMark size={72} className="animate-glow-pulse" />
          </div>
          <p className="text-xs tracking-widest text-muted-foreground">جارٍ تفعيل الحساب VIP...</p>
        </div>
      )}
    </main>
  );
}
