# 🔥 Firebase Setup Rehberi

## 1. Firebase Console'a Git
https://console.firebase.google.com/

## 2. Yeni Proje Oluştur
- Proje adı: `ankaraustabul`
- Google Analytics: Aktif et
- Bölge: `europe-west1` (Avrupa)

## 3. Web App Ekle
- Firebase Console > Project Settings > General
- "Add app" > Web (</>) ikonu
- App nickname: `ankaraustabul-web`
- Firebase Hosting: Şimdilik hayır

## 4. Firebase Config Bilgilerini Al
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "ankaraustabul.firebaseapp.com",
  projectId: "ankaraustabul",
  storageBucket: "ankaraustabul.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};
```

## 5. Environment Variables Oluştur
`.env.local` dosyası oluştur:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ankaraustabul.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ankaraustabul
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ankaraustabul.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# App Configuration
NEXT_PUBLIC_APP_NAME=Ankara Usta Bul
NEXT_PUBLIC_APP_URL=https://ankaraustabul.com
```

## 6. Firestore Database Oluştur
- Firebase Console > Firestore Database
- "Create database" > Test mode (geliştirme için)
- Bölge: `europe-west1`

## 7. Firestore Collections Oluştur
Aşağıdaki koleksiyonları oluştur:

### `ustalar` Collection
```json
{
  "id": "usta-1",
  "name": "Ahmet Yılmaz",
  "category": "elektrik",
  "district": "Çankaya",
  "rating": 4.8,
  "phone": "+90 532 123 45 67",
  "email": "ahmet@example.com",
  "services": ["Elektrik tesisatı", "Aydınlatma"],
  "experience": "10+ yıl",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### `blogs` Collection
```json
{
  "id": "blog-1",
  "title": "Ankara'da Elektrik Arızaları",
  "content": "Blog içeriği...",
  "author": "Admin",
  "category": "elektrik",
  "tags": ["elektrik", "ankara"],
  "publishedAt": "2024-01-01T00:00:00Z",
  "isPublished": true
}
```

### `payments` Collection
```json
{
  "id": "payment-1",
  "ustaId": "usta-1",
  "customerName": "Müşteri Adı",
  "amount": 299,
  "status": "completed",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 8. Firebase Security Rules
`firestore.rules` dosyası zaten mevcut, Firebase Console'da aktif et.

## 9. Firebase Storage Rules
`storage.rules` dosyası zaten mevcut, Firebase Console'da aktif et.

## 10. Test Et
```bash
npm run dev
```

Firebase bağlantısını test et:
- http://localhost:3000/test-firebase (eğer varsa)
- Console'da hata olmamalı
- Firestore'da veri görünmeli

## 11. Production Deploy
```bash
npm run build
npx vercel --prod
```

## 🔧 Troubleshooting

### Firebase bağlantı hatası
- Environment variables doğru mu?
- Firebase projesi aktif mi?
- Firestore rules doğru mu?

### Build hatası
- `npm run validate-env` çalıştır
- Tüm environment variables set edilmiş mi?

### Deploy hatası
- Vercel'de environment variables ekle
- Firebase domain'i Vercel'de whitelist'e ekle
