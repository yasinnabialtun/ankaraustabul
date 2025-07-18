# Ankara Usta Bul

Ankara'da hizmet veren ustaları bulabileceğiniz Türkçe hizmet pazarı uygulaması.

## 🚀 Özellikler

- **Kategori Bazlı Arama**: Elektrikçi, su tesisatçısı, boyacı vb. kategoriler
- **Usta Profilleri**: Detaylı usta bilgileri ve değerlendirmeler
- **Blog Sistemi**: SEO dostu blog yazıları
- **Ödeme Entegrasyonu**: Shopier ile güvenli ödeme sistemi
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Dark Mode**: Karanlık tema desteği

## 🛠️ Teknolojiler

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Backend**: Node.js + Express
- **Ödeme**: Shopier API
- **Deploy**: Vercel (Frontend) + Railway (Backend)

## 📦 Kurulum

### Gereksinimler
- Node.js 16+
- npm veya yarn

### Frontend Kurulumu
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

### Backend Kurulumu
```bash
cd backend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production başlat
npm start
```

## 🌐 Deployment

### Frontend (Vercel)
1. GitHub repository'sini Vercel'e bağlayın
2. Environment variables ekleyin:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Backend (Railway)
1. Railway'de yeni proje oluşturun
2. GitHub repository'sini bağlayın
3. Environment variables ekleyin:
   ```
   SHOPIER_API_KEY=your_api_key
   SHOPIER_SECRET_KEY=your_secret_key
   SHOPIER_MERCHANT_ID=your_merchant_id
   SHOPIER_ENVIRONMENT=sandbox
   ```

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
SHOPIER_API_KEY=your_shopier_api_key
SHOPIER_SECRET_KEY=your_shopier_secret_key
SHOPIER_MERCHANT_ID=your_shopier_merchant_id
SHOPIER_ENVIRONMENT=sandbox
FRONTEND_URL=http://localhost:5177
```

## 📁 Proje Yapısı

```
ankaraustabul/
├── src/
│   ├── components/     # React bileşenleri
│   ├── pages/         # Sayfa bileşenleri
│   ├── data/          # Statik veriler
│   ├── services/      # API servisleri
│   ├── types/         # TypeScript tipleri
│   └── utils/         # Yardımcı fonksiyonlar
├── backend/           # Node.js backend
│   ├── server.js      # Express server
│   └── package.json   # Backend bağımlılıkları
└── public/            # Statik dosyalar
```

## 🔌 API Endpoints

### Backend API
- `POST /api/payment/initiate` - Ödeme başlatma
- `GET /api/payment/status/:id` - Ödeme durumu
- `POST /api/payment/webhook` - Shopier webhook
- `GET /api/health` - Sağlık kontrolü

## 🎨 Özellikler

### Usta Sistemi
- Usta kayıt formu
- Premium/VIP paket seçenekleri
- WhatsApp entegrasyonu
- Acil durum rozeti

### Blog Sistemi
- SEO optimizasyonu
- Kategori filtreleme
- Arama fonksiyonu
- Detaylı blog sayfaları

### Ödeme Sistemi
- Shopier entegrasyonu
- Güvenli ödeme işlemi
- Webhook desteği
- Ödeme durumu takibi

## 📱 Responsive Tasarım

- Mobil öncelikli tasarım
- Tablet ve masaüstü uyumlu
- Touch-friendly arayüz
- Hızlı yükleme

## 🔒 Güvenlik

- HTTPS zorunlu
- API key koruması
- Webhook imza doğrulama
- CORS yapılandırması

## 📈 SEO

- Meta tag'ler
- Open Graph
- Structured data
- Sitemap hazırlığı

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- Website: [ankaraustabul.com](https://ankaraustabul.com)
- Email: info@ankaraustabul.com
- GitHub: [@ankaraustabul](https://github.com/ankaraustabul)
