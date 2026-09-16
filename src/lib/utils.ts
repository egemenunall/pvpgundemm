import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TIMEZONE = "Europe/Istanbul";

/**
 * Tek istekte gönderilebilecek toplam görsel boyutu.
 *
 * `next.config.ts` içindeki `serverActions.bodySizeLimit` 4.5MB'a ayarlı;
 * bu da Vercel'in serverless istek gövdesi tavanı. Limit ham HTTP gövdesine
 * uygulandığı için multipart boundary/başlıkları ve metin alanları da sayılır —
 * o yüzden dosya bütçesi 4.3MB'da tutulup ~200KB pay bırakıldı.
 */
export const MAX_UPLOAD_MB = 4.3;
export const MAX_UPLOAD_BYTES = Math.floor(MAX_UPLOAD_MB * 1024 * 1024);

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Tek dosyalık formlar (server logosu, blog kapağı) için boyut doğrulaması. */
export function validateUploadSize(file: File): string | null {
  if (file.size <= MAX_UPLOAD_BYTES) return null;
  return `Dosya çok büyük (${formatFileSize(file.size)}). En fazla ${MAX_UPLOAD_MB} MB yükleyebilirsiniz.`;
}

/**
 * Aynı istekte birden fazla dosya gönderen formlar (reklam: desktop + mobil)
 * için TOPLAM boyut doğrulaması. Sınırı aşan tek tek dosyalar değil,
 * isteğin bütünü olduğu için toplam üzerinden kontrol edilir.
 */
export function validateUploadTotal(files: (File | null | undefined)[]): string | null {
  const total = files.reduce((sum, file) => sum + (file?.size ?? 0), 0);
  if (total <= MAX_UPLOAD_BYTES) return null;
  return `Görsellerin toplam boyutu çok büyük (${formatFileSize(total)}). Tek seferde en fazla ${MAX_UPLOAD_MB} MB gönderebilirsiniz.`;
}

/**
 * Türkçe karakterleri de destekleyen basit slugify.
 */
export function slugify(input: string): string {
  const trMap: Record<string, string> = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    I: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
  };
  const replaced = input
    .split("")
    .map((ch) => trMap[ch] ?? ch)
    .join("");
  return replaced
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

/**
 * Verilen tarihi Europe/Istanbul saatine göre "18 Eylül 2026" formatında döner.
 */
export function formatDateTR(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIMEZONE,
  }).format(d);
}

export function formatDateShortTR(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    timeZone: TIMEZONE,
  }).format(d);
}

/**
 * "opening_date" (YYYY-MM-DD) ve "opening_time" (HH:MM:SS) alanlarını
 * Europe/Istanbul'da tek bir Date'e çevirir. Sütunlar zaten TR yerel
 * saatini temsil ettiği için offset hesabı yapılır.
 */
export function combineOpeningDateTime(date: string, time: string): Date {
  // Europe/Istanbul = UTC+3 sabit (DST kullanmıyor, 2016'dan beri).
  const iso = `${date}T${time.length === 5 ? time + ":00" : time}+03:00`;
  return new Date(iso);
}

export function formatOpeningTime(time: string): string {
  return time.slice(0, 5);
}

/**
 * Şu anki Europe/Istanbul tarih/saatini Date olarak döner.
 */
export function nowInIstanbul(): Date {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return new Date(
    `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}+03:00`
  );
}

/**
 * Metin2 PVP sektöründe serverlar çoğunlukla Cuma günü açılıyor.
 * "Bu hafta" = en yakın geçmiş (veya bugünkü) Cuma 00:00 -> Perşembe 23:59:59 (Europe/Istanbul).
 */
export function getCurrentWeekRange(reference: Date = nowInIstanbul()): {
  start: Date;
  end: Date;
} {
  // JS: 0=Pazar, 1=Pazartesi ... 5=Cuma, 6=Cumartesi
  const day = reference.getDay();
  // Cuma'ya kaç gün geriye gitmek gerekiyor
  const diffToFriday = (day - 5 + 7) % 7;
  const start = new Date(reference);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - diffToFriday);

  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function formatDateInputTR(date: Date): string {
  // YYYY-MM-DD (Europe/Istanbul referanslı, yerel gün/ay/yıl bileşenleriyle)
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const SERVER_TYPES = [
  { value: "emek", label: "Emek" },
  { value: "farm", label: "Farm" },
  { value: "pvp", label: "PvP" },
  { value: "ws", label: "WS" },
  { value: "oldschool", label: "Oldschool" },
  { value: "diger", label: "Diğer" },
] as const;

export type ServerType = (typeof SERVER_TYPES)[number]["value"];

export function serverTypeLabel(value: string): string {
  return SERVER_TYPES.find((t) => t.value === value)?.label ?? value;
}

/**
 * "2 gün sonra", "bugün", "3 gün önce açıldı" gibi kısa, aciliyet hissi
 * veren bir metin döner (server kartlarında kullanılır).
 */
export function relativeOpeningLabel(openingDate: string): string {
  const today = nowInIstanbul();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${openingDate}T00:00:00+03:00`);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) return "Bugün açılıyor";
  if (diffDays === 1) return "Yarın açılıyor";
  if (diffDays > 1) return `${diffDays} gün sonra`;
  if (diffDays === -1) return "Dün açıldı";
  return `${Math.abs(diffDays)} gün önce açıldı`;
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}
