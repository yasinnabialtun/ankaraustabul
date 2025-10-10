'use client'

interface LocalSEOProps {
  businessName: string
  address: string
  phone: string
  email: string
  services: string[]
  openingHours: string
  priceRange: string
  rating: number
  reviewCount: number
}

export default function LocalSEO({ 
  businessName, 
  address, 
  phone, 
  email, 
  services, 
  openingHours, 
  priceRange, 
  rating, 
  reviewCount 
}: LocalSEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "description": "Ankara'da profesyonel usta arama platformu. Elektrik, su tesisatı, temizlik, mobilya, tadilat hizmetleri için güvenilir ustalar bulun.",
    "url": "https://ankaraustabul.com",
    "telephone": phone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "Ankara",
      "addressRegion": "Ankara",
      "addressCountry": "TR",
      "postalCode": "06000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.9334",
      "longitude": "32.8597"
    },
    "openingHours": openingHours,
    "priceRange": priceRange,
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "TRY",
    "areaServed": {
      "@type": "City",
      "name": "Ankara"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "39.9334",
        "longitude": "32.8597"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Usta Hizmetleri",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "description": `Ankara'da profesyonel ${service} hizmeti`
        }
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/ankaraustabul",
      "https://www.instagram.com/ankaraustabul",
      "https://www.twitter.com/ankaraustabul"
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://ankaraustabul.com/images/logo.png",
      "width": 200,
      "height": 200
    },
    "image": [
      "https://ankaraustabul.com/images/og-image-2025.jpg"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
