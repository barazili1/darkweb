import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, Check, Copy } from "lucide-react";
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
}: {
  n: number;
  image: string;
  title: string;
  desc: string;
  children?: React.ReactNode;
  delay: number;
}) {
  return (
    <article
      className="animate-fade-up glass relative overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:neon-border"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
      />
      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={image}
            alt={title}
            loading="lazy"
            width={512}
            height={512}
            className="h-20 w-20 rounded-2xl border border-border bg-secondary/40 object-contain p-1.5 shadow-[var(--glow-sm)]"
          />
          <span className="gradient-primary absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-extrabold text-primary-foreground shadow-[var(--glow-sm)]">
            {n}
          </span>
        </div>
        <div className="flex-1 space-y-2 text-right">
          <h2 className="text-base font-extrabold text-primary">{title}</h2>
          <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
          {children}
        </div>
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

        <section className="px-4 pt-[50px] text-center">
          <h2 className="neon-text text-2xl font-extrabold text-primary">خطوات التفعيل</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            أكمل الخطوات الخمس بالترتيب لتفعيل أداة {p.name}
          </p>
        </section>

        <section className="mt-6 space-y-4 px-4">
          <Step
            n={1}
            delay={0}
            image={imgDownload}
            title="تحميل المنصة"
            desc={`قم بتحميل وتثبيت التطبيق الرسمي لمنصة ${p.name} على هاتفك.`}
          >
            <div className="flex items-center justify-end gap-2 pt-1">
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
              className="gradient-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-105"
            >
              انضمام الآن
            </a>
          </Step>

          <Step
            n={3}
            delay={180}
            image={imgPromo}
            title="البروموكود"
            desc="سجل باستخدام البروموكود الخاص بنا للحصول على البونص:"
          >
            <button
              onClick={copy}
              className="flex items-center gap-3 rounded-xl border border-input bg-secondary/60 px-3 py-2 transition-colors hover:bg-secondary"
            >
              {copied ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4 text-primary" />
              )}
              <span className="neon-text text-base font-extrabold tracking-[0.3em] text-primary">
                A77N
              </span>
            </button>
          </Step>

          <Step
            n={4}
            delay={270}
            image={imgDeposit}
            title="الإيداع"
            desc="قم بعمل إيداع أولي بقيمة 250 جنيه أو 5 دولار لتفعيل الحساب."
          />

          <Step
            n={5}
            delay={360}
            image={imgId}
            title="الـ ID الخاص بك"
            desc="أدخل الـ ID الخاص بك في المنصة للتأكد من التفعيل."
          >
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              inputMode="numeric"
              placeholder="مثال: 1029384756"
              className="w-full rounded-xl border border-input bg-background/60 px-3 py-2 text-right text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:shadow-[var(--glow-sm)]"
            />
          </Step>

          <button
            onClick={submit}
            disabled={!id.trim()}
            className="gradient-primary mt-2 w-full rounded-2xl py-4 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-lg)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            أكملت الشروط، ابدأ الربح
          </button>
        </section>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background/80 backdrop-blur-md">
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
