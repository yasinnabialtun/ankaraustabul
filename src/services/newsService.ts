// News types
export interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  source: string
  sourceUrl: string
  publishedAt: string
  imageUrl?: string
  category: string
  tags: string[]
  district: string
  isAnkaraRelated: boolean
  priority: number
}

export interface NewsSource {
  name: string
  url: string
  rssUrl: string
  category: string
  priority: number
  isActive: boolean
}

class NewsService {
  private sources: NewsSource[] = [
    {
      name: 'Anadolu Ajansı Ankara',
      url: 'https://www.aa.com.tr',
      rssUrl: 'https://www.aa.com.tr/tr/rss/default?cat=ankara',
      category: 'genel',
      priority: 1,
      isActive: true // Ankara haberleri için aktif
    },
    {
      name: 'Hürriyet Ankara',
      url: 'https://www.hurriyet.com.tr',
      rssUrl: 'https://www.hurriyet.com.tr/rss/ankara',
      category: 'genel',
      priority: 2,
      isActive: true // Ankara haberleri için aktif
    },
    {
      name: 'Sabah Ankara',
      url: 'https://www.sabah.com.tr',
      rssUrl: 'https://www.sabah.com.tr/rss/ankara.xml',
      category: 'genel',
      priority: 3,
      isActive: true // Ankara haberleri için aktif
    },
    {
      name: 'Milliyet Ankara',
      url: 'https://www.milliyet.com.tr',
      rssUrl: 'https://www.milliyet.com.tr/rss/rssNew/ankara.xml',
      category: 'genel',
      priority: 4,
      isActive: true // Ankara haberleri için aktif
    },
    {
      name: 'Habertürk Ankara',
      url: 'https://www.haberturk.com',
      rssUrl: 'https://www.haberturk.com/rss/kategori/ankara.xml',
      category: 'genel',
      priority: 5,
      isActive: true // Ankara haberleri için aktif
    },
    {
      name: 'Sözcü Ankara',
      url: 'https://www.sozcu.com.tr',
      rssUrl: 'https://www.sozcu.com.tr/kategori/ankara/rss/',
      category: 'genel',
      priority: 6,
      isActive: true // Ankara haberleri için aktif
    },
    {
      name: 'Cumhuriyet Ankara',
      url: 'https://www.cumhuriyet.com.tr',
      rssUrl: 'https://www.cumhuriyet.com.tr/rss/ankara.xml',
      category: 'genel',
      priority: 7,
      isActive: true // Ankara haberleri için aktif
    },
    {
      name: 'Yeni Şafak Ankara',
      url: 'https://www.yenisafak.com',
      rssUrl: 'https://www.yenisafak.com/rss/ankara',
      category: 'genel',
      priority: 8,
      isActive: true // Ankara haberleri için aktif
    }
  ]

  // RSS feed'den haber çekme
  async fetchRSSNews(source: NewsSource): Promise<NewsArticle[]> {
    try {
      if (!source.rssUrl) return []

      // Basit fetch ile RSS feed'leri çek
      const response = await fetch(source.rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      })

      if (!response.ok) {
        throw new Error(`RSS fetch failed: ${response.status}`)
      }

      const xmlText = await response.text()
      
      // Server-side XML parsing için regex kullan
      return this.parseRSSWithRegex(xmlText, source)
    } catch (error) {
      console.error(`Error fetching RSS from ${source.name}:`, error)
      return []
    }
  }

  // Server-side RSS parsing with regex
  private parseRSSWithRegex(xmlText: string, source: NewsSource): NewsArticle[] {
    const articles: NewsArticle[] = []
    
    try {
      // RSS item'larını bul
      const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi
      const items = xmlText.match(itemRegex) || []
      
      items.slice(0, 10).forEach((item, index) => {
        try {
          // Title çıkar
          const titleMatch = item.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/i)
          const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').trim() : ''
          
          // Description çıkar
          const descMatch = item.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/i)
          const description = descMatch ? (descMatch[1] || descMatch[2] || '').trim() : ''
          
          // Link çıkar
          const linkMatch = item.match(/<link[^>]*>(.*?)<\/link>/i)
          const link = linkMatch ? linkMatch[1].trim() : ''
          
          // PubDate çıkar
          const dateMatch = item.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i)
          const pubDate = dateMatch ? dateMatch[1].trim() : new Date().toISOString()
          
          // Image çıkar
          const imageMatch = item.match(/<enclosure[^>]*url="([^"]*)"[^>]*>/i) || 
                           item.match(/<media:content[^>]*url="([^"]*)"[^>]*>/i) ||
                           item.match(/<image[^>]*>(.*?)<\/image>/i)
          const image = imageMatch ? imageMatch[1].trim() : ''
          
          // Ankara ile ilgili haberleri filtrele
          const isAnkaraRelated = this.isAnkaraRelated(title, description)
          
          if (title && isAnkaraRelated) {
            articles.push({
              id: `rss-${source.name.toLowerCase()}-${index}`,
              title: this.cleanText(title),
              content: this.cleanText(description),
              excerpt: this.cleanText(description).substring(0, 200) + '...',
              source: source.name,
              sourceUrl: link,
              publishedAt: this.parseDate(pubDate),
              imageUrl: image,
              category: source.category,
              tags: this.extractTags(title, description),
              district: this.extractDistrict(title, description),
              isAnkaraRelated: true,
              priority: source.priority
            })
          }
        } catch (itemError) {
          console.error(`Error parsing RSS item ${index}:`, itemError)
        }
      })
      
      return articles
    } catch (error) {
      console.error('RSS regex parsing error:', error)
      return []
    }
  }

  // Ankara ile ilgili kontrol
  private isAnkaraRelated(title: string, description: string): boolean {
    const ankaraKeywords = [
      'ankara', 'çankaya', 'keçiören', 'mamak', 'yenimahalle', 'sincan', 
      'etimesgut', 'altındağ', 'pursaklar', 'gölbaşı', 'beypazarı',
      'kızılay', 'bahçelievler', 'çayyolu', 'batıkent', 'etlik'
    ]
    
    const text = (title + ' ' + description).toLowerCase()
    return ankaraKeywords.some(keyword => text.includes(keyword))
  }

  // Metin temizleme
  private cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // HTML tag'lerini kaldır
      .replace(/&[^;]+;/g, ' ') // HTML entity'lerini kaldır
      .replace(/\s+/g, ' ') // Çoklu boşlukları tek boşluğa çevir
      .trim()
  }

  // Tarih parsing
  private parseDate(dateString: string): string {
    try {
      const date = new Date(dateString)
      return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
    } catch {
      return new Date().toISOString()
    }
  }

  // Tag çıkarma
  private extractTags(title: string, description: string): string[] {
    const text = (title + ' ' + description).toLowerCase()
    const tags: string[] = []
    
    if (text.includes('elektrik')) tags.push('elektrik')
    if (text.includes('tesisat')) tags.push('tesisat')
    if (text.includes('temizlik')) tags.push('temizlik')
    if (text.includes('mobilya')) tags.push('mobilya')
    if (text.includes('klima')) tags.push('klima')
    if (text.includes('boya')) tags.push('boya')
    if (text.includes('tadilat')) tags.push('tadilat')
    if (text.includes('inşaat')) tags.push('inşaat')
    
    return tags
  }

  // İlçe çıkarma
  private extractDistrict(title: string, description: string): string {
    const text = (title + ' ' + description).toLowerCase()
    
    if (text.includes('çankaya')) return 'Çankaya'
    if (text.includes('keçiören')) return 'Keçiören'
    if (text.includes('mamak')) return 'Mamak'
    if (text.includes('yenimahalle')) return 'Yenimahalle'
    if (text.includes('sincan')) return 'Sincan'
    if (text.includes('etimesgut')) return 'Etimesgut'
    if (text.includes('altındağ')) return 'Altındağ'
    if (text.includes('pursaklar')) return 'Pursaklar'
    if (text.includes('gölbaşı')) return 'Gölbaşı'
    if (text.includes('beypazarı')) return 'Beypazarı'
    
    return 'Ankara'
  }

  // Tüm kaynaklardan haber çekme - Ankara odaklı
  async fetchAllNews(): Promise<NewsArticle[]> {
    try {
      console.log('Ankara haberleri RSS feed\'lerden çekiliyor...')
      
      // Aktif RSS kaynaklarından haber çek
      const activeSources = this.sources.filter(source => source.isActive)
      console.log(`${activeSources.length} aktif RSS kaynağı bulundu`)
      
      const allArticles: NewsArticle[] = []
      
      for (const source of activeSources) {
        try {
          console.log(`${source.name} RSS feed'i çekiliyor...`)
          const articles = await this.fetchRSSNews(source)
          console.log(`${source.name}'den ${articles.length} haber çekildi`)
          allArticles.push(...articles)
          
          // Rate limiting - her kaynak arasında 1 saniye bekle
          await new Promise(resolve => setTimeout(resolve, 1000))
        } catch (error) {
          console.error(`${source.name} RSS hatası:`, error)
        }
      }
      
      // Ankara ile ilgili haberleri filtrele
      const ankaraArticles = allArticles.filter(article => 
        article.isAnkaraRelated || 
        this.isAnkaraRelated(article.title, article.content)
      )
      
      console.log(`Toplam ${allArticles.length} haber, ${ankaraArticles.length} Ankara ile ilgili`)
      
      if (ankaraArticles.length > 0) {
        return this.deduplicateAndSort(ankaraArticles)
      }
      
      // Ankara haberleri bulunamazsa mock haberleri kullan
      console.log('Ankara haberleri bulunamadı, mock haberler kullanılıyor')
      return this.getMockNews()
      
    } catch (error) {
      console.error('fetchAllNews hatası:', error)
      return this.getMockNews()
    }
  }

  // Mock haberler (fallback)
  private getMockNews(): NewsArticle[] {
    const now = new Date()
    return [
      {
        id: 'mock-1',
        title: 'Çankaya Elektrik Arızaları İçin Profesyonel Çözümler',
        content: 'Çankaya bölgesinde elektrik arızaları için 7/24 hizmet veren profesyonel elektrikçiler. Acil durumlar için anında müdahale.',
        excerpt: 'Çankaya bölgesinde elektrik arızaları için 7/24 hizmet veren profesyonel elektrikçiler. Acil durumlar için anında müdahale.',
        source: 'Ankara Usta Bul',
        sourceUrl: '#',
        publishedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        imageUrl: '/images/workers/electrician.svg',
        category: 'elektrik',
        tags: ['elektrik', 'çankaya'],
        district: 'Çankaya',
        isAnkaraRelated: true,
        priority: 1
      },
      {
        id: 'mock-2',
        title: 'Keçiören Su Tesisatı Hizmetleri',
        content: 'Keçiören bölgesinde su tesisatı sorunları için güvenilir çözümler. Profesyonel tesisatçılar ile kaliteli hizmet.',
        excerpt: 'Keçiören bölgesinde su tesisatı sorunları için güvenilir çözümler. Profesyonel tesisatçılar ile kaliteli hizmet.',
        source: 'Ankara Usta Bul',
        sourceUrl: '#',
        publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        imageUrl: '/images/workers/plumber.svg',
        category: 'tesisat',
        tags: ['tesisat', 'keçiören'],
        district: 'Keçiören',
        isAnkaraRelated: true,
        priority: 2
      },
      {
        id: 'mock-3',
        title: 'Mamak Temizlik Hizmetleri',
        content: 'Mamak bölgesinde profesyonel temizlik hizmetleri. Ev ve ofis temizliği için uzman ekipler.',
        excerpt: 'Mamak bölgesinde profesyonel temizlik hizmetleri. Ev ve ofis temizliği için uzman ekipler.',
        source: 'Ankara Usta Bul',
        sourceUrl: '#',
        publishedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        imageUrl: '/images/temizlik.svg',
        category: 'temizlik',
        tags: ['temizlik', 'mamak'],
        district: 'Mamak',
        isAnkaraRelated: true,
        priority: 3
      },
      {
        id: 'mock-4',
        title: 'Yenimahalle Mobilya Montaj Hizmetleri',
        content: 'Yenimahalle bölgesinde mobilya montaj ve taşıma hizmetleri. Güvenli ve profesyonel montaj.',
        excerpt: 'Yenimahalle bölgesinde mobilya montaj ve taşıma hizmetleri. Güvenli ve profesyonel montaj.',
        source: 'Ankara Usta Bul',
        sourceUrl: '#',
        publishedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        imageUrl: '/images/mobilya.svg',
        category: 'mobilya',
        tags: ['mobilya', 'yenimahalle'],
        district: 'Yenimahalle',
        isAnkaraRelated: true,
        priority: 4
      },
      {
        id: 'mock-5',
        title: 'Etimesgut Klima Servis Hizmetleri',
        content: 'Etimesgut bölgesinde klima montaj ve bakım hizmetleri. Yaz aylarında serinlik garantisi.',
        excerpt: 'Etimesgut bölgesinde klima montaj ve bakım hizmetleri. Yaz aylarında serinlik garantisi.',
        source: 'Ankara Usta Bul',
        sourceUrl: '#',
        publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        imageUrl: '/images/klima-havalandirma.svg',
        category: 'klima',
        tags: ['klima', 'etimesgut'],
        district: 'Etimesgut',
        isAnkaraRelated: true,
        priority: 5
      },
      {
        id: 'mock-6',
        title: 'Sincan İnşaat ve Tadilat Hizmetleri',
        content: 'Sincan bölgesinde inşaat ve tadilat hizmetleri. Ev ve işyeri tadilatları için profesyonel çözümler.',
        excerpt: 'Sincan bölgesinde inşaat ve tadilat hizmetleri. Ev ve işyeri tadilatları için profesyonel çözümler.',
        source: 'Ankara Usta Bul',
        sourceUrl: '#',
        publishedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        imageUrl: '/images/insaat-tadilat.svg',
        category: 'tadilat',
        tags: ['tadilat', 'sincan'],
        district: 'Sincan',
        isAnkaraRelated: true,
        priority: 6
      },
      {
        id: 'mock-7',
        title: 'Altındağ Boya Badana Hizmetleri',
        content: 'Altındağ bölgesinde boya badana hizmetleri. İç ve dış cephe boyama işleri.',
        excerpt: 'Altındağ bölgesinde boya badana hizmetleri. İç ve dış cephe boyama işleri.',
        source: 'Ankara Usta Bul',
        sourceUrl: '#',
        publishedAt: new Date(now.getTime() - 7 * 60 * 60 * 1000).toISOString(),
        imageUrl: '/images/boya-badana.svg',
        category: 'boya',
        tags: ['boya', 'altındağ'],
        district: 'Altındağ',
        isAnkaraRelated: true,
        priority: 7
      },
      {
        id: 'mock-8',
        title: 'Pursaklar Bahçe Peyzaj Hizmetleri',
        content: 'Pursaklar bölgesinde bahçe peyzaj hizmetleri. Yeşil alanlar için profesyonel tasarım.',
        excerpt: 'Pursaklar bölgesinde bahçe peyzaj hizmetleri. Yeşil alanlar için profesyonel tasarım.',
        source: 'Ankara Usta Bul',
        sourceUrl: '#',
        publishedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
        imageUrl: '/images/bahce-peyzaj.svg',
        category: 'peyzaj',
        tags: ['peyzaj', 'pursaklar'],
        district: 'Pursaklar',
        isAnkaraRelated: true,
        priority: 8
      }
    ]
  }

  // Duplicate haberleri kaldır ve sırala
  private deduplicateAndSort(articles: NewsArticle[]): NewsArticle[] {
    const uniqueArticles = articles.filter((article, index, self) => 
      index === self.findIndex(a => a.title === article.title)
    )
    
    return uniqueArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 20) // Maksimum 20 haber
  }

  // Son haberleri getir - Ankara haberleri odaklı
  async getLatestNews(limit: number = 6): Promise<NewsArticle[]> {
    try {
      console.log('Ankara haberleri çekiliyor...')
      
      // Aktif RSS kaynaklarından haber çek
      const activeSources = this.sources.filter(source => source.isActive)
      console.log(`${activeSources.length} aktif RSS kaynağı bulundu`)
      
      const allNews: NewsArticle[] = []
      
      // Her aktif kaynaktan haber çek
      for (const source of activeSources) {
        try {
          console.log(`${source.name} RSS feed'i çekiliyor...`)
          const sourceNews = await this.fetchRSSNews(source)
          console.log(`${source.name}'den ${sourceNews.length} haber çekildi`)
          allNews.push(...sourceNews)
        } catch (error) {
          console.error(`${source.name} RSS hatası:`, error)
        }
      }
      
      // Ankara ile ilgili haberleri filtrele
      const ankaraNews = allNews.filter(article => 
        article.isAnkaraRelated || 
        this.isAnkaraRelated(article.title, article.content)
      )
      
      console.log(`Toplam ${allNews.length} haber, ${ankaraNews.length} Ankara ile ilgili`)
      
      if (ankaraNews.length > 0) {
        // Tarihe göre sırala (en yeni önce)
        ankaraNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        return ankaraNews.slice(0, limit)
      }
      
      // Ankara haberleri bulunamazsa mock haberleri kullan
      console.log('Ankara haberleri bulunamadı, mock haberler kullanılıyor')
      return this.getMockNews().slice(0, limit)
      
    } catch (error) {
      console.error('Haber çekme hatası:', error)
      return this.getMockNews().slice(0, limit)
    }
  }

  // Kategoriye göre haberler
  async getNewsByCategory(category: string, limit: number = 10): Promise<NewsArticle[]> {
    try {
      const allNews = await this.fetchAllNews()
      return allNews
        .filter(article => article.category === category)
        .slice(0, limit)
    } catch (error) {
      console.error('Error getting news by category:', error)
      return []
    }
  }

  // İlçeye göre haberler
  async getNewsByDistrict(district: string, limit: number = 10): Promise<NewsArticle[]> {
    try {
      const allNews = await this.fetchAllNews()
      return allNews
        .filter(article => article.district === district)
        .slice(0, limit)
    } catch (error) {
      console.error('Error getting news by district:', error)
      return []
    }
  }

  // Haber ara
  async searchNews(query: string, limit: number = 10): Promise<NewsArticle[]> {
    try {
      const allNews = await this.fetchAllNews()
      const searchQuery = query.toLowerCase()
      
      return allNews
        .filter(article => 
          article.title.toLowerCase().includes(searchQuery) ||
          article.content.toLowerCase().includes(searchQuery) ||
          article.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        )
        .slice(0, limit)
    } catch (error) {
      console.error('Error searching news:', error)
      return []
    }
  }
}

export default new NewsService()