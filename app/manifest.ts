import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ankara Usta Bul - Güvenilir Hizmet Rehberi',
    short_name: 'Ankara Usta Bul',
    description: 'Ankara\'da güvenilir ustalar ve hizmet sağlayıcıları bulun. Elektrik, su tesisatı, boya, temizlik ve daha fazlası.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
} 