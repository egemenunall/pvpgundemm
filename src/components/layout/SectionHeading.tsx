import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  action,
  level = "h2",
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  featured?: boolean;
  level?: "h1" | "h2";
}) {
  const Heading = level;

  return (
    <div className="relative text-center">
      <Heading className="text-2xl font-bold tracking-wide text-white">{title}</Heading>
      <span className="mx-auto mt-2 block h-px w-24 bg-[#d49a36]" />
      {description && <div className="mt-2 text-sm text-[#d4b4b8]">{description}</div>}
      {action && (
        <div className="mt-2 flex justify-center sm:absolute sm:right-0 sm:top-0 sm:mt-0">
          {action}
        </div>
      )}
    </div>
  );
}

export function CloudDivider({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto h-px w-full max-w-sm bg-[#4a121a]", className)} aria-hidden="true" />
  );
}
