import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Font Awesome Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* font-family: 'Roboto Mono', monospace; */}
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,600;1,400&display=swap" rel="stylesheet" />
        {/* font-family: 'Mark Pro', sans-serif; */}
        <link href="http://fonts.cdnfonts.com/css/mark-pro" rel="stylesheet" />
        {/* font-family: 'Nunito', sans-serif; */}
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
