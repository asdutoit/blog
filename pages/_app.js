import Layout from "../components/layout";
import "../styles/globals.css";
import "../node_modules/highlight.js/styles/atom-one-dark.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
