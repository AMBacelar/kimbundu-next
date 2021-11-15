import React, { ReactNode } from "react";
import { Menu } from 'semantic-ui-react'
import Link from "next/link";
import Head from "next/head";
import { useRouter } from 'next/router';
import styles from './Layout.module.scss';

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

const i18n = {
  about: {
    en: 'About',
    fr: 'À propos',
    pt: 'Sobre Nós'
  },
  home: {
    en: 'Home',
    fr: 'Accueil',
    pt: 'Pagina inicial'
  },
  defaultDescription: {
    en: '(Soon to be) The first place you should look to learn Kimbundu',
    fr: '(Bientôt) Le premier endroit où vous devriez chercher pour apprendre le Kimbundu',
    pt: '(Em breve) O primeiro lugar que você deve procurar para aprender Kimbundu'
  }
}

const Layout = ({ children, title = "This is the default title", description, }: Props) => {
  const router = useRouter();
  const hostname = 'https://www.kimbundu.org/';
  const { pathname, asPath, query, locale } = router
  const handleChangeLocale = (_, { name }) => router.push({ pathname, query }, asPath, { locale: name.toLowerCase() });
  const t = (path: string) => i18n[path][locale];

  const trueDescription = description || t('defaultDescription')
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={trueDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${hostname}${router.asPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={image} /> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${hostname}${router.asPath}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={trueDescription} />
        {/* <meta property="twitter:image" content={image} /> */}
        <link rel="alternate" hrefLang="en" href={`${hostname}en${asPath}`} />
        <link rel="alternate" hrefLang="fr" href={`${hostname}fr${asPath}`} />
        <link rel="alternate" hrefLang="pt" href={`${hostname}pt${asPath}`} />
      </Head>
      <header>
        <Menu>
          <Link href="/">
            <Menu.Item
              active={pathname === '/'}
              name={t('home')}
            />
          </Link>
          <Link href="/about">
            <Menu.Item
              active={pathname === '/about'}
              name={t('about')}
            />
          </Link>
          <Menu.Menu position='right'>
            <Menu.Item
              name="PT"
              active={locale === 'pt'}
              onClick={handleChangeLocale}
            />
            <Menu.Item
              name="FR"
              active={locale === 'fr'}
              onClick={handleChangeLocale}
            />
            <Menu.Item
              name="EN"
              active={locale === 'en'}
              onClick={handleChangeLocale}
            />
          </Menu.Menu>
        </Menu>
      </header>
      <div className={styles["wrapper"]}>{children}</div>
      <footer className={styles["wrapper"]}>
        <hr />
        <span>© Adilson Bacelar 2021</span>
      </footer>
    </div>
  )
};

export default Layout;
