// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import 'semantic-ui-css/semantic.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp