import { AnimatePresence } from "framer-motion";

import "../styles/bootstrap.min.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;
