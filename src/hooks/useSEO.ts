import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export const useSEO = ({
  title = 'Ankara Usta Bul - Güvenilir Usta Arama Platformu',
  description = 'Ankara\'da evinizdeki her iş için güvenilir, kaliteli ve profesyonel ustalar bulun. Elektrik, su tesisatı, boya, temizlik ve daha fazlası için uzman ustalar.',
  keywords = 'ankara usta, elektrik ustası, su tesisatı, boya ustası, temizlik, ev tamiratı, güvenilir usta, ankara hizmet',
  image = 'https://ankaraustabul.com/og-image.jpg',
  url = window.location.href,
  type = 'website',
  author = 'Ankara Usta Bul',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: SEOProps = {}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateOGTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Update Open Graph tags
    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:image', image);
    updateOGTag('og:url', url);
    updateOGTag('og:type', type);
    updateOGTag('og:site_name', 'Ankara Usta Bul');
    updateOGTag('og:locale', 'tr_TR');

    // Update Twitter Card tags
    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
    updateTwitterTag('twitter:image', image);
    updateTwitterTag('twitter:url', url);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Update article-specific meta tags if type is article
    if (type === 'article') {
      if (publishedTime) updateOGTag('article:published_time', publishedTime);
      if (modifiedTime) updateOGTag('article:modified_time', modifiedTime);
      if (author) updateOGTag('article:author', author);
      if (section) updateOGTag('article:section', section);
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.content = tag;
        document.head.appendChild(meta);
      });
    }

    // Update structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebPage',
      name: title,
      description: description,
      url: url,
      ...(type === 'article' && {
        author: {
          '@type': 'Person',
          name: author
        },
        publisher: {
          '@type': 'Organization',
          name: 'Ankara Usta Bul',
          url: 'https://ankaraustabul.com'
        },
        ...(publishedTime && { datePublished: publishedTime }),
        ...(modifiedTime && { dateModified: modifiedTime })
      })
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[data-seo-structured]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-structured', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);
}; 