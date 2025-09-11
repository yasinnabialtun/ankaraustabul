# 🚀 Hızlı Firebase Çözümü

## ⚡ Acil Çözüm (Test Modu)

Firebase Console'da **Rules** bölümüne şu kuralları yapıştırın:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Sonra "Publish" butonuna basın.**

## 🔧 Adım Adım

1. **Firebase Console'a gidin:** https://console.firebase.google.com/
2. **ankaraustabul** projesini seçin
3. **Sol menüden "Firestore Database"** tıklayın
4. **"Rules" sekmesine** tıklayın
5. **Mevcut kuralları silin** ve yukarıdaki kodu yapıştırın
6. **"Publish"** butonuna tıklayın

## ✅ Sonuç

Bu kurallar:
- ✅ Usta kaydını çalıştırır
- ✅ Tüm okuma/yazma işlemlerine izin verir
- ✅ Hızlı test için idealdir

## ⚠️ Güvenlik Notu

Bu kurallar **sadece test için** kullanılmalıdır. Production'da daha güvenli kurallar kullanın.

## 🎯 Test

Kuralları yayınladıktan sonra:
1. Uygulamayı yeniden yükleyin
2. Usta kaydı formunu doldurun
3. "Ücretsiz Kayıt Ol" butonuna basın

Artık çalışması gerekiyor! 🎉
