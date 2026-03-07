import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const EntryPlaceholder = () => {
  return (
    <div className="my-5 max-w-2xl animate-pulse">
      <Card>
        <CardHeader>
          <div className="h-5 w-2/3 rounded bg-muted" />
          <div className="mt-1 h-4 w-1/3 rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded border border-border p-3">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="mt-2 h-4 w-5/6 rounded bg-muted" />
          </div>
          <div className="rounded border border-border p-3">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="mt-2 h-4 w-4/6 rounded bg-muted" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntryPlaceholder;
