import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import firebase from "../utils/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Analytics } from "@vercel/analytics/react";

const RouteProgress = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  if (!loading) return null;
  return <div className="route-progress" aria-hidden="true" />;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!firebase) return;
    const analytics = getAnalytics(firebase);
    const logPageView = (url: string) =>
      logEvent(analytics, "page_view", { url });

    router.events.on("routeChangeComplete", logPageView);
    logPageView(window.location.pathname);

    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, []);

  return (
    <>
      <RouteProgress />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default MyApp;
