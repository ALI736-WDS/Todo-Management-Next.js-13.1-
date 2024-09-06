//Components
import { SessionProvider } from "next-auth/react";

//tost
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/layout/Layout";

//Styles
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    /* moshakhas mikone ke karbar login hast ya na */
    <SessionProvider session={pageProps.provider}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
