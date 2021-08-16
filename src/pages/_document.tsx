import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

import { Seo } from '../components/Seo'
export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="pt-BR">
        <Head>
          <Seo
            metaDescription="Projeto Open Source para busca e formatação de referências bibliográficas a partir do DOI. O material suportado até o momento é constituído por artigos, teses, dissertações, livros e capítulos de livros. Somos abertos e cresceremos juntos!"
            title="Referências bibliográficas"
            author="@renan_costa_m"
            canonical_url="https://referenciasbibliograficas.com.br/"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
