import { useRouter } from "next/router";
import { buildClass } from "../../helpers/build-class";
import Link from "next/link";

export const ClassBadge = ({ classNumber }: { classNumber: string }) => {
  const { locale } = useRouter();
  const classObject = buildClass(classNumber);
  return (
    <div className="px-2 py-1 text-end text-sm text-muted-foreground">
      <Link
        href={`/classes/${classNumber}`}
        className="hover:underline"
      >
        {`${classObject.display} - ${classObject.description[locale]}`}
      </Link>
    </div>
  );
};
