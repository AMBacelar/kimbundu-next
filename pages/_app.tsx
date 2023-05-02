// import App from "next/app";
import { useEffect, useState } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { useRouter } from "next/router";
import "semantic-ui-css/semantic.min.css";
import firebase from "../utils/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

import { Analytics } from "@vercel/analytics/react";
import LoadingEntries from "./loadingEntries";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const analytics = getAnalytics(firebase);

    const doLogEvent = (url) => {
      logEvent(analytics, "page_view", { url });
    };

    const handleRouteChangeStart = (url, { shallow }) => {
      if (
        url.includes("/entry/") ||
        url.includes("/search?") ||
        url.includes("/class/")
      ) {
        setLoading(true);
      }
    };
    const handleRouteChangeComplete = (url, { shallow }) => {
      doLogEvent(url);
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    //For First Page
    doLogEvent(window.location.pathname);

    //Remvove Event Listener after un-mount
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
}

export default MyApp;
