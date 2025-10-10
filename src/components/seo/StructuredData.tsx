'use client'

import { Usta, BlogPost } from '@/types'

interface StructuredDataProps {
  type: 'website' | 'organization' | 'service' | 'person' | 'article' | 'breadcrumb' | 'faq'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://ankaraustabul.com'
    
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Ankara Usta Bul - En İyi Ustalar Platformu",
          "alternateName": "Ankara Usta Bul",
          "url": baseUrl,
          "description": "Ankara'da en iyi ustaları bulun! Elektrik, su tesisatı, temizlik, mobilya, tadilat hizmetleri. 7/24 hizmet, güvenilir ustalar, uygun fiyatlar.",
          "keywords": "ankara usta, ankara elektrik ustası, ankara su tesisatı, ankara temizlik, ankara mobilya, ankara tadilat, usta ara ankara, güvenilir usta ankara",
          "inLanguage": "tr-TR",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/ustalar?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Ankara Usta Bul",
            "url": baseUrl,
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/images/logo.png`,
              "width": 200,
              "height": 200
            }
          },
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Ankara Usta Bul",
            "description": "Ankara'da profesyonel usta arama platformu",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ankara",
              "addressRegion": "Ankara",
              "addressCountry": "TR"
            },
            "telephone": "+90-312-123-45-67",
            "url": baseUrl,
            "priceRange": "$$",
            "openingHours": "Mo-Su 00:00-23:59",
            "serviceArea": {
              "@type": "City",
              "name": "Ankara"
            }
          }
        }

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ankara Usta Bul",
          "url": baseUrl,
          "logo": `${baseUrl}/images/logo.png`,
          "description": "Ankara'da güvenilir usta arama platformu. Elektrik, su tesisatı, temizlik ve diğer hizmetler için profesyonel ustalar bulun.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ankara",
            "addressCountry": "TR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-312-123-45-67",
            "contactType": "customer service",
            "availableLanguage": "Turkish"
          },
          "sameAs": [
            "https://www.facebook.com/ankaraustabul",
            "https://www.instagram.com/ankaraustabul",
            "https://www.twitter.com/ankaraustabul"
          ]
        }

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name || "Usta Arama Hizmeti",
          "description": data.description || "Ankara'da güvenilir usta arama hizmeti",
          "provider": {
            "@type": "Organization",
            "name": "Ankara Usta Bul",
            "url": baseUrl
          },
          "areaServed": {
            "@type": "City",
            "name": "Ankara"
          },
          "serviceType": data.serviceType || "Home Services",
          "offers": {
            "@type": "Offer",
            "price": data.price || "0",
            "priceCurrency": "TRY"
          }
        }

      case 'person':
        const usta = data as Usta
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": usta.name,
          "description": usta.description,
          "image": `${baseUrl}/images/default-avatar.jpg`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": usta.district,
            "addressRegion": "Ankara",
            "addressCountry": "TR"
          },
          "telephone": usta.phone,
          "email": usta.email,
          "jobTitle": usta.category || "Usta",
          "worksFor": {
            "@type": "Organization",
            "name": "Ankara Usta Bul"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": usta.rating,
            "reviewCount": usta.reviewCount || 0
          }
        }

      case 'article':
        const article = data as BlogPost
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.excerpt,
          "image": article.image || `${baseUrl}/images/blog-default.jpg`,
          "author": {
            "@type": "Organization",
            "name": "Ankara Usta Bul"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Ankara Usta Bul",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/images/logo.png`
            }
          },
          "datePublished": article.publishedAt,
          "dateModified": article.updatedAt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/blog/${article.slug}`
          }
        }

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
