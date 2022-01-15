import React from "react";
import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
};

const Meta: React.FC<Props> = ({
  title = "Christmas Memory Game",
  description = "Christmas Memory Game. Match the pairs to win!",
}) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="christmas game, match pairs, memory game"
      />
      <meta name="author" content="Ailie McCorkindale" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="favicons/site.webmanifest"></link>

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://christmas-memory-game.vercel.app/"
      />
      <meta name="image" property="og:image" content="imgs/screenshot.jpg" />
      <meta property="og:description" content={description} />
    </Head>
  );
};

export default Meta;
