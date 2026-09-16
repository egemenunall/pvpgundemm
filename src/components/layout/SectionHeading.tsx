import type { ReactNode } from "react";
import { FrameCorners } from "@/components/ui/frame-corners";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  action,
  featured = false,
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
    <div className="ornate-frame section-plaque relative px-5 py-3 text-center">
      <FrameCorners />
      <div className="mx-auto w-fit">
        <Heading className="text-xl font-bold text-text-primary sm:text-2xl">{title}</Heading>
        {featured && <span className="mx-auto mt-2 block h-0.5 w-16 bg-feature" />}
        {description && <div className="mt-1.5 text-sm text-text-secondary">{description}</div>}
      </div>
      {action && (
        <div className="mt-2 flex justify-center sm:absolute sm:right-5 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
          {action}
        </div>
      )}
    </div>
  );
}

export function CloudDivider({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 20"
      className={cn("mx-auto h-5 w-full max-w-sm text-border-strong/65", className)}
      fill="none"
    >
      <path d="M0 10h125c8 0 8-7 16-7 7 0 8 7 15 7 8 0 8-5 16-5 6 0 8 5 8 5" stroke="currentColor" />
      <path d="M360 10H235c-8 0-8 7-16 7-7 0-8-7-15-7-8 0-8 5-16 5-6 0-8-5-8-5" stroke="currentColor" />
      <path d="M180 4l6 6-6 6-6-6 6-6Z" stroke="currentColor" />
    </svg>
  );
}
