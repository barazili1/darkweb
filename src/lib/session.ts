export type PlatformId = "1xbet" | "greenbet";

const KEY_PLATFORM = "dragonvip:platform";
const KEY_ID = "dragonvip:userid";

export const PLATFORMS: Record<
  PlatformId,
  { name: string; tagline: string; accent: string; short: string; promo: string; link: string }
> = {
  "1xbet": {
    name: "1XBET",
    tagline: "المنصة العالمية الأولى",
    accent: "oklch(0.55 0.2 250)",
    short: "1X",
    promo: "A77N",
    link: "https://1xbet.com/",
  },
  greenbet: {
    name: "GREENBET",
    tagline: "أرباح سريعة وسحب فوري",
    accent: "oklch(0.7 0.2 150)",
    short: "GB",
    promo: "A77A",
    link: "https://refpa79184.com/L?tag=d_5936276m_132250c_&site=5936276&ad=132250",
  },
};

export function savePlatform(id: PlatformId) {
  if (typeof window !== "undefined") sessionStorage.setItem(KEY_PLATFORM, id);
}

export function getPlatform(): PlatformId {
  if (typeof window === "undefined") return "1xbet";
  const v = sessionStorage.getItem(KEY_PLATFORM);
  return v === "greenbet" ? "greenbet" : "1xbet";
}

export function saveUserId(id: string) {
  if (typeof window !== "undefined") sessionStorage.setItem(KEY_ID, id);
}

export function getUserId(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(KEY_ID) ?? "";
}
