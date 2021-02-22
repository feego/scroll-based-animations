import Document, { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => (
  <Html lang="pt">
    <Head>
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#FFFFFF" />
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content="TODO" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-navbutton-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
      <meta property="og:title" content="Title" />
      <meta property="og:site_name" content="Name" />
      <meta property="og:url" content="https://example.com" />
      <meta property="og:description" content="Example description" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="url" />
      {/* FAVICON */}
      <link rel="icon" href="./favicon.ico" />
      <link rel="apple-touch-icon" sizes="57x57" href="./favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="./favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="./favicon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="./favicon/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="./favicon/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="./favicon/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="./favicon/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="./favicon/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="./favicon/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="./favicon/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="./favicon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png" />
      <link rel="manifest" href="./manifest.json" />
      {/* FONTS */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700&display=swap" rel="preload" as="style" />
      {/* <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800&display=swap"
            rel="preload"
            as="style"
            media="print"
            onLoad="this.media='all'"
          /> */}
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700&display=swap" rel="stylesheet" />
      {/* <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
            media="print"
            onLoad="this.media='all'"
          /> */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = Document.getInitialProps;

MyDocument.renderDocument = Document.renderDocument;

export default MyDocument;
