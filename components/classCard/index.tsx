import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Table } from "semantic-ui-react";
import styles from "./styles.module.scss";
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
    <div className={styles["wrapper"]}>
      <Card fluid>
        <Card.Content>
          <Link passHref href={desinationUrl}>
            <Card.Header>
              <a>{classObject.display}</a>
            </Card.Header>
          </Link>
          <Card.Meta>{classObject.description[locale]}</Card.Meta>
          <Card.Description>
            {t("prefix")}
            <Table basic="very" columns={2}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{t("singular")}</Table.Cell>
                  <Table.Cell>{t("plural")}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{classObject.prefix.singular}</Table.Cell>
                  <Table.Cell>{classObject.prefix.plural}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{classObject.singularExample[locale]}</Table.Cell>
                  <Table.Cell>{classObject.pluralExample[locale]}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};
