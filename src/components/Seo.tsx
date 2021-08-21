interface SeoProps {
  canonical_url: string
  metaDescription: string;
  title: string;
  author: string;
  imageAlt?: string;
  keywords?: string[];
}

export const Seo = ({
  canonical_url, metaDescription, title, author, imageAlt, keywords
}: SeoProps) => {
  const keywordsArray = []
  const siteKeywords = [...keywordsArray, keywords].join(", ")
  const metaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      name: `image`,
      content: `${canonical_url}/share-social.png`,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:image`,
      content: `${canonical_url}/share-social.png`,
    },
    {
      property: `og:image:secure_url`,
      content: `${canonical_url}/share-social.png`,
    },
    {
      property: `og:image:type`,
      content: `image/png`,
    },
    {
      property: `og:image:width`,
      content: `1200`,
    },
    {
      property: `og:image:height`,
      content: `600`,
    },
    {
      property: `og:image:alt`,
      content: `${imageAlt}.`,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      property: `twitter:image`,
      content: `${canonical_url}/share-social.png`,
    },
    {
      property: `twitter:image:src`,
      content: `${canonical_url}/share-social.png`,
    },
    {
      property: `twitter:image:width`,
      content: `1200`,
    },
    {
      property: `twitter:image:height`,
      content: `600`,
    },
    {
      property: `twitter:image:alt`,
      content: `${imageAlt}.`,
    },
    {
      name: "keywords",
      content: siteKeywords,
    },
  ]
  return (
    <>
      <link rel="canonical" href={canonical_url} />
      <link rel="manifest" href="/manifest.webmanifest" />
      {
        metaTags.map(meta => {
          if(meta.name === "keywords" && siteKeywords.length < 1) {
            return
          }
          if(meta.name) {
            return <meta key={meta.name} name={meta.name} content={meta.content} />
          } else {
            return <meta key={meta.property} property={meta.property} content={meta.content} />
          }
        })
      }
      <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
    </>
  )
};