"use server";

import { incrementServerView } from "@/lib/data/servers";

/**
 * Server detay sayfası statik/ISR olarak render edildiği için (hız + SEO),
 * görüntülenme sayısı sayfa render'ında değil, sayfa client'ta mount
 * olduğunda tetiklenen bu Server Action üzerinden artırılır — böylece her
 * gerçek ziyaret sayılır, ISR yeniden üretimi değil.
 */
export async function trackServerView(slug: string) {
  await incrementServerView(slug);
}
