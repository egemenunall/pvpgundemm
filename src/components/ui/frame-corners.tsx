import { cn } from "@/lib/utils";

export function FrameCorners({ className }: { className?: string }) {
  const base = "pointer-events-none absolute z-20 h-[7px] w-[7px] border-border-strong";

  return (
    <span className={cn("contents", className)} aria-hidden="true">
      <i className={cn(base, "left-1.5 top-1.5 border-l border-t")} />
      <i className={cn(base, "right-1.5 top-1.5 border-r border-t")} />
      <i className={cn(base, "bottom-1.5 left-1.5 border-b border-l")} />
      <i className={cn(base, "bottom-1.5 right-1.5 border-b border-r")} />
    </span>
  );
}
