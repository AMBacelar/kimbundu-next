import { useRouter } from "next/router";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { buildClass } from "../../helpers/build-class";

type Props = {
  classIndex: string;
};

const i18n = {
  prefix: {
    en: "Prefix",
    fr: "Préfixe",
    pt: "Prefixo",
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
};

export const ClassCard = ({ classIndex }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];
  const desinationUrl = `/classes/${classIndex}`;
  const classObject = buildClass(classIndex);

  return (
    <div className="my-5 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>
            <Link href={desinationUrl} className="hover:underline">
              {classObject.display}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {classObject.description[locale]}
          </p>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-sm font-medium">{t("prefix")}</p>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{t("singular")}</TableCell>
                <TableCell className="font-medium">{t("plural")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{classObject.prefix.singular}</TableCell>
                <TableCell>{classObject.prefix.plural}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{classObject.singularExample[locale]}</TableCell>
                <TableCell>{classObject.pluralExample[locale]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
