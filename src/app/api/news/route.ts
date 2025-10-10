import { NextRequest, NextResponse } from 'next/server'
import newsService from '@/services/newsService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const district = searchParams.get('district')
    const limit = parseInt(searchParams.get('limit') || '20')
    const featured = searchParams.get('featured') === 'true'

    let news

    if (featured) {
      news = await newsService.getLatestNews(10)
    } else if (category) {
      news = await newsService.getNewsByCategory(category)
    } else if (district) {
      news = await newsService.getNewsByDistrict(district)
    } else {
      news = await newsService.getLatestNews(limit)
    }

    return NextResponse.json({
      success: true,
      data: news,
      count: news.length
    })
  } catch (error) {
    console.error('News API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Haberler yüklenirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'refresh') {
      const news = await newsService.fetchAllNews()
      return NextResponse.json({
        success: true,
        data: news,
        count: news.length,
        message: 'Haberler başarıyla yenilendi'
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Geçersiz işlem'
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('News API POST Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'İşlem sırasında bir hata oluştu'
      },
      { status: 500 }
    )
  }
}
