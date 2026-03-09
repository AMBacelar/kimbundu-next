import type { ReactNode } from "react";
import { Search } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

export const EmptyState = ({
  title,
  description,
  icon,
  children,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-muted/30 px-6 py-16 text-center">
    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted/80 text-muted-foreground">
      {icon ?? <Search className="size-5" />}
    </div>
    <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
    {description && (
      <p className="mb-6 max-w-md text-sm text-muted-foreground">{description}</p>
    )}
    {children}
  </div>
);
