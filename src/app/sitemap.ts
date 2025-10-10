import { MetadataRoute } from 'next'
import { districts } from '@/data/districts'
import { sectors } from '@/data/sectors'
import { seoBlogArticles } from '@/data/seoBlogArticles'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ankaraustabul.com'
  const currentDate = new Date().toISOString()

  // Ana sayfalar
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ustalar`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/one-cikan-ustalar`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/haberler`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/usta-ekle`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // İlçe sayfaları
  const districtPages = districts.map((district) => ({
    url: `${baseUrl}/ilceler/${district.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Kategori sayfaları
  const categoryPages = sectors.map((sector) => ({
    url: `${baseUrl}/kategoriler/${sector.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // İlçe + Kategori kombinasyonları
  const districtCategoryPages = districts.flatMap((district) =>
    sectors.map((sector) => ({
      url: `${baseUrl}/kategoriler/${sector.slug}?ilce=${district.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  // Blog yazıları
  const blogPages = seoBlogArticles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Örnek usta sayfaları (gerçek uygulamada veritabanından gelecek)
  const ustaPages = Array.from({ length: 50 }, (_, i) => ({
    url: `${baseUrl}/usta/${i + 1}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...mainPages,
    ...districtPages,
    ...categoryPages,
    ...districtCategoryPages,
    ...blogPages,
    ...ustaPages,
  ]
}
