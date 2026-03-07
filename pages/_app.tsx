import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import firebase from "../utils/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

import { Analytics } from "@vercel/analytics/react";
import LoadingEntries from "./loadingEntries";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const analytics = getAnalytics(firebase);

    const doLogEvent = (url: string) => {
      logEvent(analytics, "page_view", { url });
    };

    const handleRouteChangeStart = (url: string, _options?: { shallow?: boolean }) => {
      if (
        url.includes("/word/") ||
        url.includes("/search") ||
        url.includes("/classes/")
      ) {
        setLoading(true);
      }
    };

    const handleRouteChangeComplete = (url: string) => {
      doLogEvent(url);
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    doLogEvent(window.location.pathname);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  if (loading) return <LoadingEntries />;

  return (
    <>
      <Component {...pageProps} loading={loading} />
      <Analytics />
    </>
  );
};

export default MyApp;
