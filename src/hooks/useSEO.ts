import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UseSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  structured?: object;
}

/**
 * Enhanced hook to set SEO metadata for better search engine optimization
 */
const useSEO = ({ 
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonicalUrl,
  noindex = false,
  structured,
}: UseSEOProps) => {
  const location = useLocation();
  const siteUrl = 'https://ankaraustabul.com';
  const siteName = 'Ankara Usta Bul';
  
  // Default values
  const defaultTitle = 'Ankara Usta Bul - Güvenilir Usta Arama Platformu';
  const defaultDescription = "Ankara'da güvenilir usta arama platformu. Elektrik, su tesisatı, temizlik ve diğer hizmetler için profesyonel ustalar bulun.";
  const defaultKeywords = 'ankara usta, elektrik ustası, su tesisatı ustası, temizlik hizmeti, mobilya tamiri, tadilat, ankara hizmet, usta ara, güvenilir usta';
  const defaultOgImage = `${siteUrl}/images/og-image.jpg`;
  
  // Use provided values or defaults
  const finalTitle = title ? `${title} | Ankara Usta Bul` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  const finalOgImage = ogImage || defaultOgImage;
  const finalTwitterTitle = twitterTitle || finalOgTitle;
  const finalTwitterDescription = twitterDescription || finalOgDescription;
  const finalTwitterImage = twitterImage || finalOgImage;
  const finalCanonicalUrl = canonicalUrl || `${siteUrl}${location.pathname}`;
  
  // Generate schema.org structured data if not provided
  const finalStructured = structured || {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': siteName,
    'url': siteUrl,
    'logo': `${siteUrl}/images/logo.webp`,
    'sameAs': [
      'https://facebook.com/ankaraustabul',
      'https://twitter.com/ankaraustabul',
      'https://instagram.com/ankaraustabul',
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+90-312-XXX-XXXX',
      'contactType': 'customer service',
    },
  };
  
  useEffect(() => {
    // Set document title
    document.title = finalTitle;
    
    // Update basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    
    // Open Graph meta tags
    updateMetaTag('og:title', finalOgTitle, 'property');
    updateMetaTag('og:description', finalOgDescription, 'property');
    updateMetaTag('og:image', finalOgImage, 'property');
    updateMetaTag('og:url', finalCanonicalUrl, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    updateMetaTag('og:locale', 'tr_TR', 'property');
    
    // Twitter Card meta tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', finalTwitterTitle);
    updateMetaTag('twitter:description', finalTwitterDescription);
    updateMetaTag('twitter:image', finalTwitterImage);
    
    // Robots meta tag
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', finalCanonicalUrl);
    
    // Schema.org structured data
    updateStructuredData(finalStructured);
    
    return () => {
      // No need to cleanup as the next page will set its own values
    };
  }, [
    finalTitle,
    finalDescription,
    finalKeywords,
    finalOgTitle,
    finalOgDescription,
    finalOgImage,
    finalTwitterTitle,
    finalTwitterDescription,
    finalTwitterImage,
    finalCanonicalUrl,
    twitterCard,
    noindex,
    finalStructured,
  ]);
};

// Helper function to update meta tags
const updateMetaTag = (name: string, content: string, attributeName: 'name' | 'property' = 'name') => {
  let metaElement = document.querySelector(`meta[${attributeName}="${name}"]`);
  
  if (!metaElement) {
    metaElement = document.createElement('meta');
    metaElement.setAttribute(attributeName, name);
    document.head.appendChild(metaElement);
  }
  
  metaElement.setAttribute('content', content);
};

// Helper function to update structured data
const updateStructuredData = (data: object) => {
  let scriptElement = document.querySelector('script[type="application/ld+json"]');
  
  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'application/ld+json');
    document.head.appendChild(scriptElement);
  }
  
  scriptElement.textContent = JSON.stringify(data);
};

export default useSEO;