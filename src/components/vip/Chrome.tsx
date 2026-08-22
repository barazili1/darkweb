import logo from "@/assets/dragon-logo.png";
import { cn } from "@/lib/utils";

export function DragonMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src={logo}
      alt="Dragon VIP"
      width={size}
      height={size}
      className={cn("drop-shadow-[0_0_14px_oklch(0.68_0.26_275/85%)]", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function TopBar({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="glass sticky top-0 z-40 flex items-center justify-between gap-2 px-3 py-2.5">
      <div className="flex items-center gap-2">
        <DragonMark size={26} />
        <span className="neon-text text-[11px] font-bold tracking-widest">DRAGON VIP</span>
      </div>
      <h1 className="neon-text text-sm font-semibold">{title}</h1>
      <div className="min-w-[74px] text-left">{right}</div>
    </header>
  );
}

export function OnlineUsers() {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2 py-1">
      <span className="animate-glow-pulse inline-block h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_var(--success)]" />
      <span className="text-[10px] text-muted-foreground">14,520</span>
    </div>
  );
}

export function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dots.map((i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-primary-glow/60"
          style={{
            left: `${(i * 37) % 100}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            filter: "blur(0.5px)",
            boxShadow: "0 0 10px var(--primary-glow)",
            animation: `float-up ${16 + (i % 7) * 3}s linear ${i * 1.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
