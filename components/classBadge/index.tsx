import { useRouter } from "next/router";
import { buildClass } from "../../helpers/build-class";
import Link from "next/link";

export const ClassBadge = ({ classNumber }: { classNumber: string }) => {
  const { locale } = useRouter();
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const classObject = buildClass(classNumber);

  return (
    <Link
      href={`/classes/${classNumber}`}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-semibold tracking-wide text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
    >
      <span>{`Class ${classObject.display}`}</span>
      <span className="text-muted-foreground">{classObject.description[currentLocale]}</span>
    </Link>
  );
};
