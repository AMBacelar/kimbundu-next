import Link from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { getTotalPublishableCount } from "../fetch-data/dictionary-server";
import { ArrowRight } from "lucide-react";

type Props = {
  totalCount: number;
};

const i18n = {
  title: {
    en: "About the Project | Kimbundu Language Archive",
    fr: "À propos du projet | Archive de la langue Kimbundu",
    pt: "Sobre o projeto | Arquivo da língua Kimbundu",
  },
  heading: {
    en: "About this project",
    fr: "À propos de ce projet",
    pt: "Sobre este projeto",
  },
  heroBody: {
    en: "kimbundu.org is a public language preservation initiative. Its mandate is to document and publish Kimbundu resources in a form that supports long-term memory, serious study, and practical community use.",
    fr: "kimbundu.org est une initiative publique de préservation linguistique. Son mandat est de documenter et publier des ressources en kimbundu pour la mémoire à long terme, l'étude sérieuse et l'usage communautaire.",
    pt: "kimbundu.org é uma iniciativa pública de preservação linguística. O seu mandato é documentar e publicar recursos em kimbundu para memória de longo prazo, estudo sério e uso comunitário.",
  },
  whyTitle: {
    en: "Why this work matters",
    fr: "Pourquoi ce travail est important",
    pt: "Porque este trabalho importa",
  },
  whyBody1: {
    en: "Kimbundu carries historical memory, social knowledge, and identity across generations. It is one of Angola's most significant indigenous languages, spoken by millions and woven into the cultural fabric of the country.",
    fr: "Le kimbundu porte mémoire historique, savoir social et identité entre générations. C'est l'une des langues indigènes les plus importantes d'Angola, parlée par des millions de personnes.",
    pt: "O kimbundu transporta memória histórica, conhecimento social e identidade entre gerações. É uma das línguas indígenas mais significativas de Angola, falada por milhões de pessoas.",
  },
  whyBody2: {
    en: "Building accessible and well-structured materials helps prevent fragmentation and supports future teaching, research, and cultural transmission.",
    fr: "Construire des ressources accessibles et bien structurées limite la fragmentation et soutient enseignement, recherche et transmission culturelle.",
    pt: "Construir materiais acessíveis e bem estruturados reduz fragmentação e apoia ensino, investigação e transmissão cultural.",
  },
  whatTitle: {
    en: "What you can do here",
    fr: "Ce que vous pouvez faire ici",
    pt: "O que pode fazer aqui",
  },
  whatItems: {
    en: [
      "Search dictionary entries by Kimbundu word or Portuguese definition",
      "Browse the dictionary alphabetically and discover new words",
      "Study noun classes and understand prefix patterns",
      "Explore cross-references and related vocabulary",
      "Review source metadata and editorial status for each entry",
    ],
    fr: [
      "Rechercher des entrées par mot kimbundu ou définition portugaise",
      "Parcourir le dictionnaire alphabétiquement et découvrir de nouveaux mots",
      "Étudier les classes nominales et les préfixes",
      "Explorer les références croisées et le vocabulaire associé",
      "Consulter les métadonnées de source et l'état éditorial de chaque entrée",
    ],
    pt: [
      "Pesquisar entradas por palavra kimbundu ou definição em português",
      "Explorar o dicionário alfabeticamente e descobrir novas palavras",
      "Estudar as classes nominais e entender padrões de prefixo",
      "Explorar referências cruzadas e vocabulário relacionado",
      "Consultar metadados de fonte e estado editorial de cada entrada",
    ],
  },
  standardsTitle: {
    en: "Editorial approach",
    fr: "Approche éditoriale",
    pt: "Abordagem editorial",
  },
  standardsBody1: {
    en: "Entries are published as soon as they become structurally usable. They are then refined through review, correction, and normalization in successive editorial passes.",
    fr: "Les entrées sont publiées dès qu'elles deviennent structurellement utilisables. Elles sont ensuite améliorées par révision, correction et normalisation.",
    pt: "As entradas são publicadas assim que se tornam estruturalmente utilizáveis. Depois são melhoradas por revisão, correção e normalização.",
  },
  standardsBody2: {
    en: "This approach keeps the archive useful in the present while maintaining a clear path to higher linguistic quality over time.",
    fr: "Cette approche maintient l'utilité immédiate tout en gardant un chemin clair vers une meilleure qualité linguistique.",
    pt: "Esta abordagem mantém utilidade imediata enquanto preserva um caminho claro para maior qualidade linguística ao longo do tempo.",
  },
  futureTitle: {
    en: "What comes next",
    fr: "Ce qui vient ensuite",
    pt: "O que vem a seguir",
  },
  futureItems: {
    en: [
      "Audio pronunciations recorded with native speakers",
      "Example sentences and usage contexts",
      "Structured lesson content for language learners",
      "Community contributions and feedback systems",
      "Extended coverage from additional historical sources",
    ],
    fr: [
      "Prononciations audio enregistrées avec des locuteurs natifs",
      "Phrases d'exemple et contextes d'usage",
      "Contenu de leçons structuré pour les apprenants",
      "Contributions communautaires et systèmes de retour",
      "Couverture élargie à partir de sources historiques supplémentaires",
    ],
    pt: [
      "Pronúncias em áudio gravadas com falantes nativos",
      "Frases de exemplo e contextos de uso",
      "Conteúdo de lições estruturado para aprendentes",
      "Contribuições comunitárias e sistemas de feedback",
      "Cobertura alargada a partir de fontes históricas adicionais",
    ],
  },
  sourceTitle: {
    en: "Source material",
    fr: "Matériel source",
    pt: "Material de fonte",
  },
  sourceBody: {
    en: "This dictionary corpus is extracted from historical Kimbundu-Portuguese dictionary material and is being refined continuously. Some entries remain under editorial review while staying publicly accessible.",
    fr: "Ce corpus provient de matériaux historiques de dictionnaire kimbundu-portugais et continue d'être affiné. Certaines entrées restent en révision éditoriale tout en étant accessibles.",
    pt: "Este corpus vem de materiais históricos de dicionário kimbundu-português e continua a ser refinado. Algumas entradas permanecem em revisão editorial, mas seguem acessíveis.",
  },
  ctaTitle: {
    en: "Start exploring",
    fr: "Commencez à explorer",
    pt: "Comece a explorar",
  },
  ctaDictionary: {
    en: "Search the dictionary",
    fr: "Rechercher dans le dictionnaire",
    pt: "Pesquisar no dicionário",
  },
  ctaBrowse: {
    en: "Browse by letter",
    fr: "Parcourir par lettre",
    pt: "Explorar por letra",
  },
  ctaClasses: {
    en: "Noun classes",
    fr: "Classes nominales",
    pt: "Classes nominais",
  },
  ctaKimbundu: {
    en: "About Kimbundu",
    fr: "À propos du kimbundu",
    pt: "Sobre o kimbundu",
  },
};

const AboutPage = ({ totalCount }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => {
    const val = i18n[stringPath][currentLocale];
    return val;
  };

  const whatItems = i18n.whatItems[currentLocale];
  const futureItems = i18n.futureItems[currentLocale];

  return (
    <Layout title={t("title") as string} description={t("heroBody") as string}>
      <div className="space-y-12">
        {/* Hero */}
        <section className="space-y-4 pt-4 md:pt-6">
          <p className="kimbundu-kicker">kimbundu.org</p>
          <h1 className="max-w-2xl">{t("heading") as string}</h1>
          <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
            {t("heroBody") as string}
          </p>
          <p className="text-sm text-muted-foreground">
            Currently publishing{" "}
            <span className="font-semibold text-foreground">
              {totalCount.toLocaleString()}
            </span>{" "}
            dictionary entries across 10 noun classes.
          </p>
        </section>

        {/* Why */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="kimbundu-surface space-y-4">
            <h2>{t("whyTitle") as string}</h2>
            <p className="text-[0.95rem] text-foreground/85">{t("whyBody1") as string}</p>
            <p className="text-[0.95rem] text-foreground/85">{t("whyBody2") as string}</p>
          </div>

          <div className="kimbundu-surface space-y-4">
            <h2>{t("whatTitle") as string}</h2>
            <ul className="space-y-3">
              {(whatItems as string[]).map((item, i) => (
                <li key={i} className="flex gap-3 text-[0.95rem] text-foreground/85">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Editorial approach */}
        <section className="kimbundu-surface-elevated space-y-4">
          <h2>{t("standardsTitle") as string}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-[0.95rem] text-foreground/85">{t("standardsBody1") as string}</p>
              <p className="text-[0.95rem] text-foreground/85">{t("standardsBody2") as string}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg">{t("sourceTitle") as string}</h3>
              <p className="text-[0.95rem] text-foreground/85">{t("sourceBody") as string}</p>
            </div>
          </div>
        </section>

        {/* Future */}
        <section className="space-y-4">
          <h2>{t("futureTitle") as string}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(futureItems as string[]).map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/30 bg-card/50 p-4"
              >
                <p className="text-sm text-foreground/85">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-primary/15 bg-primary/5 p-6 md:p-8">
          <h2 className="mb-4">{t("ctaTitle") as string}</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/", label: t("ctaDictionary") as string },
              { href: "/browse", label: t("ctaBrowse") as string },
              { href: "/classes", label: t("ctaClasses") as string },
              { href: "/kimbundu", label: t("ctaKimbundu") as string },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/8"
              >
                {label}
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const getServerSideProps = async () => {
  const totalCount = getTotalPublishableCount();
  return { props: { totalCount } };
};
