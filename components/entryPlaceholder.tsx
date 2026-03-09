export const EntryPlaceholder = () => (
  <div className="animate-pulse space-y-4 rounded-2xl border border-border/40 bg-card/60 p-6 md:p-8">
    <div className="space-y-3">
      <div className="h-8 w-2/5 rounded-lg bg-muted/60" />
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-full bg-muted/60" />
        <div className="h-5 w-20 rounded-full bg-muted/60" />
      </div>
    </div>
    <div className="space-y-2 rounded-xl border border-border/30 bg-background/40 p-4">
      <div className="h-4 w-full rounded bg-muted/50" />
      <div className="h-4 w-11/12 rounded bg-muted/50" />
    </div>
    <div className="space-y-2 rounded-xl border border-border/30 bg-background/40 p-4">
      <div className="h-4 w-full rounded bg-muted/50" />
      <div className="h-4 w-4/5 rounded bg-muted/50" />
    </div>
  </div>
);

export default EntryPlaceholder;
