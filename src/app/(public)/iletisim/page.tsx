import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Server ilanı, reklam paketleri veya diğer sorularınız için bize ulaşın.",
};

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-[640px] px-4 py-6 sm:px-6 sm:py-8">
      <SectionHeading
        level="h1"
        title="İletişim"
        description="Server ilanı, reklam veya aklındaki konu için bize yaz."
      />

      <Card className="mt-4 p-5">
        <ContactForm />
      </Card>
    </div>
  );
}
