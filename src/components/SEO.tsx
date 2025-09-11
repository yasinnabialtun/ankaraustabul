import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
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
 * SEO Component to dynamically update meta tags for better search engine optimization
 */
const SEO = ({
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
}: SEOProps) => {
  const location = useLocation();
  const siteUrl = 'https://ankaraustabul.com';
  const siteName = 'Ankara Usta Bul';
  
  // Default values
  const defaultTitle = 'Ankara Usta Bul - Güvenilir Usta Arama Platformu';
  const defaultDescription = "Ankara'da güvenilir usta arama platformu. Elektrik, su tesisatı, temizlik ve diğer hizmetler için profesyonel ustalar bulun.";
  const defaultKeywords = 'ankara usta, elektrik ustası, su tesisatı, temizlik, mobilya, tadilat, ankara hizmet';
  const defaultOgImage = `${siteUrl}/images/og-image.jpg`;
  
  // Use provided values or defaults
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  const finalOgImage = ogImage || defaultOgImage;
  const finalTwitterTitle = twitterTitle || finalOgTitle;
  const finalTwitterDescription = twitterDescription || finalOgDescription;
  const finalTwitterImage = twitterImage || finalOgImage;
  const finalCanonicalUrl = canonicalUrl || `${siteUrl}${location.pathname}`;
  
  useEffect(() => {
    // Title
    document.title = finalTitle;
    
    // Meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    
    // Open Graph
    updateMetaTag('og:title', finalOgTitle, 'property');
    updateMetaTag('og:description', finalOgDescription, 'property');
    updateMetaTag('og:image', finalOgImage, 'property');
    updateMetaTag('og:url', finalCanonicalUrl, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    
    // Twitter Card
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', finalTwitterTitle);
    updateMetaTag('twitter:description', finalTwitterDescription);
    updateMetaTag('twitter:image', finalTwitterImage);
    
    // Robots
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', finalCanonicalUrl);
    
    // Structured data
    if (structured) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(structured);
    } else {
      // Remove existing structured data if not provided
      const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
      if (existingStructuredData) {
        existingStructuredData.remove();
      }
    }
    
    // Cleanup when component unmounts
    return () => {
      // Restore default title
      document.title = defaultTitle;
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
    noindex,
    structured,
    twitterCard,
    location.pathname,
    siteName,
  ]);
  
  // Helper function to create or update meta tags
  const updateMetaTag = (name: string, content: string, attributeName: 'name' | 'property' = 'name') => {
    let metaElement = document.querySelector(`meta[${attributeName}="${name}"]`);
    
    if (!metaElement) {
      metaElement = document.createElement('meta');
      metaElement.setAttribute(attributeName, name);
      document.head.appendChild(metaElement);
    }
    
    metaElement.setAttribute('content', content);
  };
  
  // This component doesn't render anything visually
  return null;
};

export default SEO;
