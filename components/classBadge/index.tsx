import React from "react";
import { useRouter } from "next/router";
import { buildClass } from "../../helpers/build-class";
import styles from "./styles.module.scss";

type Props = {
  classNumber: string;
};

export const ClassBadge = ({ classNumber }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const classObject = buildClass(classNumber);
  return (
    <div
      className={styles["wrapper"]}
    >{`${classObject.display} - ${classObject.description[locale]}`}</div>
  );
};
