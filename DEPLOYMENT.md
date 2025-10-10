# Ankara Usta Bul - Deployment Guide

Bu doküman, Ankara Usta Bul projesinin www.ankaraustabul.com adresine deploy edilmesi için gerekli adımları açıklar.

## 🚀 Hızlı Deploy

### Vercel ile Deploy (Önerilen)

1. **Vercel CLI'yi yükleyin:**
   ```bash
   npm install -g vercel
   ```

2. **Projeyi deploy edin:**
   ```bash
   # Preview için
   vercel
   
   # Production için
   vercel --prod
   ```

3. **Domain'i bağlayın:**
   - Vercel dashboard'da projenizi açın
   - Settings > Domains bölümüne gidin
   - `ankaraustabul.com` domain'ini ekleyin
   - DNS ayarlarını yapın

### Manuel Deploy

1. **Dependencies'leri yükleyin:**
   ```bash
   npm install
   ```

2. **Build yapın:**
   ```bash
   npm run build
   ```

3. **Test edin:**
   ```bash
   npm run test
   npm run lint
   ```

4. **Deploy edin:**
   ```bash
   # Production için
   ./scripts/deploy.sh --production --check
   ```

## 🔧 Environment Variables

Deploy etmeden önce aşağıdaki environment variables'ları ayarlayın:

### Gerekli Variables

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Payment
NEXT_PUBLIC_PAYMENT_API_KEY=your-payment-api-key
NEXT_PUBLIC_PAYMENT_MERCHANT_ID=your-merchant-id
NEXT_PUBLIC_PAYMENT_ENVIRONMENT=production

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Vercel'de Environment Variables Ayarlama

1. Vercel dashboard'da projenizi açın
2. Settings > Environment Variables bölümüne gidin
3. Her bir variable'ı ekleyin
4. Production, Preview ve Development için ayrı ayrı ayarlayın

## 🌐 Domain ve DNS Ayarları

### Domain Ayarları

1. **Vercel'de domain ekleyin:**
   - Settings > Domains
   - `ankaraustabul.com` ekleyin
   - `www.ankaraustabul.com` ekleyin

2. **DNS ayarlarını yapın:**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### SSL Sertifikası

Vercel otomatik olarak SSL sertifikası sağlar. Manuel ayar gerekmez.

## 📊 Monitoring ve Analytics

### Google Analytics

1. Google Analytics hesabı oluşturun
2. Tracking ID'yi environment variables'a ekleyin
3. `src/services/analyticsService.ts` dosyasında yapılandırın

### Performance Monitoring

1. Vercel Analytics'i etkinleştirin
2. Core Web Vitals'ı izleyin
3. `src/components/ui/PerformanceMonitor.tsx` bileşenini kullanın

## 🔒 Güvenlik

### Security Headers

`vercel.json` dosyasında güvenlik başlıkları yapılandırılmıştır:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000

### Firebase Security Rules

Firebase'de güvenlik kurallarını ayarlayın:

```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ustalar/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Performance Optimization

### Image Optimization

- Next.js Image component kullanın
- WebP formatını tercih edin
- Lazy loading uygulayın

### Code Splitting

- Dynamic imports kullanın
- Route-based code splitting
- Component-based code splitting

### Caching

- Static assets için long-term caching
- API responses için appropriate caching
- CDN kullanımı (Vercel otomatik sağlar)

## 📱 PWA Configuration

### Manifest

`public/manifest.json` dosyası yapılandırılmıştır.

### Service Worker

PWA özellikleri için service worker yapılandırın.

## 🔄 CI/CD Pipeline

### GitHub Actions (Opsiyonel)

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures:**
   - Environment variables'ları kontrol edin
   - Dependencies'leri güncelleyin
   - TypeScript errors'ları düzeltin

2. **Domain Issues:**
   - DNS propagation'ı bekleyin (24-48 saat)
   - SSL sertifikası otomatik oluşur

3. **Performance Issues:**
   - Bundle size'ı kontrol edin
   - Image optimization'ı kontrol edin
   - Core Web Vitals'ı izleyin

### Debug Mode

Development'ta debug mode'u etkinleştirin:

```env
NEXT_PUBLIC_DEBUG=true
```

## 📞 Support

Deploy ile ilgili sorunlar için:

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Firebase Documentation: https://firebase.google.com/docs

## 🎉 Post-Deployment Checklist

- [ ] Site erişilebilir
- [ ] SSL sertifikası aktif
- [ ] Analytics çalışıyor
- [ ] Performance monitoring aktif
- [ ] Error tracking çalışıyor
- [ ] SEO meta tags doğru
- [ ] Sitemap erişilebilir
- [ ] Robots.txt doğru
- [ ] PWA özellikleri çalışıyor
- [ ] Payment system test edildi
- [ ] Contact forms çalışıyor
- [ ] Mobile responsive
- [ ] Cross-browser compatibility
- [ ] Performance scores (Lighthouse)
- [ ] Security headers aktif
