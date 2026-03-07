import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const EntryPlaceholder = () => {
  return (
    <Card className="my-4 animate-pulse border-border/80 bg-card/90">
      <CardHeader className="space-y-3">
        <div className="h-7 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-3">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-11/12 rounded bg-muted" />
        </div>
        <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-3">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
};

export default EntryPlaceholder;
