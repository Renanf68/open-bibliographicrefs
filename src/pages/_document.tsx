import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="alternate" hrefLang="pt-BR" href="https://referenciasbibliograficas.com.br" />
          <link rel="alternate" hrefLang="en" href="https://referenciasbibliograficas.com.br/en" />
          <link rel="alternate" hrefLang="es" href="https://referenciasbibliograficas.com.br/es" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap" 
            rel="stylesheet" 
          />
          <meta name="theme-color" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
