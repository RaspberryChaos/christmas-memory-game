import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [music, setMusic] = useState(false);

  return (
    <Layout music={music}>
      <Component
        {...pageProps}
        toggleMusic={() => {
          setMusic(!music);
        }}
        music={music}
      />
    </Layout>
  );
}

export default MyApp;
