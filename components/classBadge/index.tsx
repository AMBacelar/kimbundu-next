import React from "react";
import { useRouter } from "next/router";
import { buildClass } from "../../helpers/build-class";
import styles from "./styles.module.scss";
import Link from "next/link";

export const ClassBadge = ({ classNumber }: { classNumber: string }) => {
  const { locale } = useRouter();
  const classObject = buildClass(classNumber);
  return (
    <div className={styles["wrapper"]}>
      <Link passHref href={`/classes/${classNumber}`}>
        {`${classObject.display} - ${classObject.description[locale]}`}
      </Link>
    </div>
  );
};
