import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Server ilanı, reklam paketleri veya diğer sorularınız için bize ulaşın.",
};

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-[640px] px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">İletişim</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Server ilanı eklemek, reklam paketleri hakkında bilgi almak veya bir konuyu
        bildirmek için bize yazın.
      </p>

      <div className="mt-6 rounded-md border border-border bg-surface p-5">
        <ContactForm />
      </div>
    </div>
  );
}
