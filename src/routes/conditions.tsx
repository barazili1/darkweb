import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, Copy, Check, Download, Gift, IdCard, Send, Coins } from "lucide-react";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { PLATFORMS, getPlatform, saveUserId, type PlatformId } from "@/lib/session";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "شروط التفعيل VIP — DRAGON VIP" },
      { name: "description", content: "أكمل شروط التفعيل: التحميل، التلجرام، البروموكود، الإيداع والـ ID." },
      { property: "og:title", content: "شروط التفعيل VIP — DRAGON VIP" },
      { property: "og:description", content: "خطوات تفعيل حساب VIP خطوة بخطوة." },
    ],
  }),
  component: ConditionsPage,
});

function Card({
  icon,
  children,
  delay,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <article
      className="animate-fade-up glass flex gap-3 rounded-2xl p-4 transition-shadow duration-300 hover:neon-border"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/50 text-primary-glow shadow-[var(--glow-sm)]">
        {icon}
      </div>
      <div className="flex-1 space-y-2 text-right">{children}</div>
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
    <main className="page-bg screen-frame relative min-h-screen pb-10">
      <Particles />
      <div className="relative z-10">
        <TopBar title="شروط التفعيل VIP" right={<BadgeCheck className="mr-auto h-5 w-5 text-primary-glow" />} />

        <div className="space-y-3 px-4 pt-5">
          <Card delay={0} icon={<Download className="h-6 w-6" />}>
            <h2 className="text-sm font-bold">تحميل المنصة</h2>
            <p className="text-xs text-muted-foreground">
              قم بتحميل وتثبيت التطبيق الرسمي لمنصة {p.name}.
            </p>
            <div className="flex items-center justify-end gap-2 pt-1">
              <span className="text-[10px] text-muted-foreground">Dragon VIP × {p.name}</span>
              <DragonMark size={22} />
            </div>
          </Card>

          <Card delay={90} icon={<Send className="h-6 w-6" />}>
            <h2 className="text-sm font-bold">قناة التلجرام</h2>
            <p className="text-xs text-muted-foreground">
              انضم لقناتنا الحصرية للحصول على التحديثات.
            </p>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="gradient-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-105"
            >
              انضمام الآن
            </a>
          </Card>

          <Card delay={180} icon={<Gift className="h-6 w-6" />}>
            <h2 className="text-sm font-bold">البروموكود</h2>
            <p className="text-xs text-muted-foreground">
              سجل باستخدام البروموكود الخاص بنا للحصول على البونص:
            </p>
            <button
              onClick={copy}
              className="flex items-center gap-3 rounded-xl border border-input bg-secondary/60 px-3 py-2 transition-colors hover:bg-secondary"
            >
              {copied ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4 text-primary-glow" />
              )}
              <span className="neon-text text-base font-extrabold tracking-[0.3em]">A77N</span>
            </button>
          </Card>

          <Card delay={270} icon={<Coins className="h-6 w-6 text-gold" />}>
            <h2 className="text-sm font-bold">الإيداع</h2>
            <p className="text-xs text-muted-foreground">
              قم بعمل إيداع أولي بقيمة 250 جنيه أو 5 دولار لتفعيل الحساب.
            </p>
          </Card>

          <Card delay={360} icon={<IdCard className="h-6 w-6" />}>
            <h2 className="text-sm font-bold">الـ ID الخاص بك</h2>
            <p className="text-xs text-muted-foreground">
              أدخل الـ ID الخاص بك في المنصة للتأكد.
            </p>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              inputMode="numeric"
              placeholder="مثال: 1029384756"
              className="w-full rounded-xl border border-input bg-background/60 px-3 py-2 text-right text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:shadow-[var(--glow-sm)] focus:border-primary"
            />
          </Card>

          <button
            onClick={submit}
            disabled={!id.trim()}
            className="gradient-primary mt-2 w-full rounded-2xl py-4 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-lg)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            أكملت الشروط، ابدأ الربح
          </button>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background/80 backdrop-blur-md">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-l-primary-glow shadow-[var(--glow-md)]" />
            <DragonMark size={72} className="animate-glow-pulse" />
          </div>
          <p className="text-xs tracking-widest text-muted-foreground">جارٍ تفعيل الحساب VIP...</p>
        </div>
      )}
    </main>
  );
}
