// import App from "next/app";
import { useEffect } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css'
import firebase from '../utils/firebase'
import { getAnalytics, logEvent } from 'firebase/analytics'

function MyApp({ Component, pageProps }: AppProps) {
  const routers = useRouter();
  useEffect(() => {
    const analytics = getAnalytics(firebase)

    const doLogEvent = (url) => {
      logEvent(analytics, 'page_view', { url });
    };

    routers.events.on('routeChangeComplete', doLogEvent);
    //For First Page
    doLogEvent(window.location.pathname);

    //Remvove Event Listener after un-mount
    return () => {
      routers.events.off('routeChangeComplete', doLogEvent);
    };
  }, [])
  return <Component {...pageProps} />
}

export default MyApp