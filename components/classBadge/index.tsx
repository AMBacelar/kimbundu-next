import React from "react";
import { useRouter } from "next/router";
import { buildClass } from "../../helpers/build-class";
import styles from "./styles.module.scss";
import Link from "next/link";

type Props = {
  classNumber: string;
};

export const ClassBadge = ({ classNumber }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const classObject = buildClass(classNumber);
  return (
    <div className={styles["wrapper"]}>
      <Link passHref href={`/classes/${classNumber}`}>
        {`${classObject.display} - ${classObject.description[locale]}`}
      </Link>
    </div>
  );
};
