import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  image?: string
  type?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export default function SEO({
  title = 'Ankara Usta Bul - Güvenilir Hizmet Rehberi',
  description = 'Ankara\'da güvenilir ustalar ve hizmet sağlayıcıları bulun. Elektrik, su tesisatı, boya, temizlik ve daha fazlası için hemen arama yapın.',
  keywords = 'ankara usta, ankara hizmet, elektrik ustası, su tesisatı, boya ustası, temizlik, tadilat',
  canonical = 'https://ankaraustabul.com',
  image = '/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Ankara Usta Bul',
  section,
  tags = []
}: SEOProps) {
  const siteUrl = 'https://ankaraustabul.com'
  const fullCanonical = canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Ankara Usta Bul" />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language and region */}
      <meta name="language" content="Turkish" />
      <meta name="geo.region" content="TR-06" />
      <meta name="geo.placename" content="Ankara" />
      <meta name="geo.position" content="39.9334;32.8597" />
      <meta name="ICBM" content="39.9334, 32.8597" />
      
      {/* Business/Organization schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Ankara Usta Bul",
            "description": "Ankara'da güvenilir ustalar ve hizmet sağlayıcıları bulun",
            "url": "https://ankaraustabul.com",
            "telephone": "+90-312-XXX-XXXX",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ankara",
              "addressRegion": "Ankara",
              "addressCountry": "TR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 39.9334,
              "longitude": 32.8597
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "$$",
            "sameAs": [
              "https://facebook.com/ankaraustabul",
              "https://twitter.com/ankaraustabul",
              "https://instagram.com/ankaraustabul"
            ]
          })
        }}
      />
      
      {/* Website schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Ankara Usta Bul",
            "url": "https://ankaraustabul.com",
            "description": "Ankara'da güvenilir ustalar ve hizmet sağlayıcıları bulun",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://ankaraustabul.com/kategoriler?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Head>
  )
} 