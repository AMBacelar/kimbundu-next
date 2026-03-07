import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { buildClass } from "../../helpers/build-class";

type Props = {
  classIndex: string;
};

const i18n = {
  prefix: {
    en: "Prefix patterns",
    fr: "Modeles de prefixes",
    pt: "Padroes de prefixo",
  },
  singular: {
    en: "Singular",
    fr: "Singulier",
    pt: "Singular",
  },
  plural: {
    en: "Plural",
    fr: "Pluriel",
    pt: "Plural",
  },
  open: {
    en: "Open class",
    fr: "Voir la classe",
    pt: "Abrir classe",
  },
};

export const ClassCard = ({ classIndex }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];
  const destinationUrl = `/classes/${classIndex}`;
  const classObject = buildClass(classIndex);

  return (
    <Card className="my-4 border-border/80 bg-card/90 shadow-[0_10px_28px_-22px_rgba(51,33,15,0.55)]">
      <CardHeader className="gap-3">
        <CardTitle className="flex flex-wrap items-center gap-2 text-xl">
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground">
            {`Class ${classObject.display}`}
          </span>
          <Link href={destinationUrl} className="text-foreground hover:text-primary hover:underline">
            {classObject.description[currentLocale]}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t("prefix")}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-1/2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {t("singular")}
              </TableCell>
              <TableCell className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {t("plural")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{classObject.prefix.singular || "-"}</TableCell>
              <TableCell className="font-medium">{classObject.prefix.plural || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{classObject.singularExample[currentLocale] || "-"}</TableCell>
              <TableCell>{classObject.pluralExample[currentLocale] || "-"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div>
          <Link
            href={destinationUrl}
            className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
          >
            {t("open")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
