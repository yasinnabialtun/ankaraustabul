'use client'

import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  noIndex?: boolean
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Ankara Usta Bul - Güvenilir Usta Arama Platformu",
  description = "Ankara'da güvenilir usta arama platformu. Elektrik, su tesisatı, temizlik ve diğer hizmetler için profesyonel ustalar bulun.",
  keywords = "ankara usta, elektrik ustası, su tesisatı, temizlik, mobilya, tadilat, ankara hizmet, usta ara, güvenilir usta",
  image = "/images/og-image.jpg",
  url = "https://ankaraustabul.com",
  type = "website",
  noIndex = false
}) => {
  const fullTitle = title.includes('Ankara Usta Bul') ? title : `${title} | Ankara Usta Bul`
  const fullUrl = url.startsWith('http') ? url : `https://ankaraustabul.com${url}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ankara Usta Bul" />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@ankaraustabul" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Ankara Usta Bul",
            "description": description,
            "url": fullUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${fullUrl}/ustalar?search={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Head>
  )
}

export default SEOHead

