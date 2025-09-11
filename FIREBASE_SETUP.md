# Firebase Kurulum ve Güvenlik Kuralları

## 🔥 Firebase Console'a Erişim

1. **Firebase Console'a gidin:** https://console.firebase.google.com/
2. **Projenizi seçin:** `ankaraustabul`
3. **Sol menüden "Firestore Database" seçin**

## 📝 Güvenlik Kurallarını Güncelleme

### Adım 1: Rules Sekmesine Gidin
- Firestore Database sayfasında **"Rules"** sekmesine tıklayın

### Adım 2: Mevcut Kuralları Değiştirin
Aşağıdaki kuralları **tamamen değiştirin** (mevcut kuralları silin ve bunları yapıştırın):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Ustalar koleksiyonu için kurallar
    match /ustalar/{ustaId} {
      // Herkes okuyabilir (onaylanmış ustalar)
      allow read: if true;
      
      // Herkes yeni usta ekleyebilir (kayıt için)
      allow create: if true;
      
      // Sadece admin güncelleyebilir (durum değişiklikleri için)
      allow update: if request.auth != null && 
        (request.auth.token.admin == true || 
         request.auth.token.email == 'admin@ankaraustabul.com');
      
      // Sadece admin silebilir
      allow delete: if request.auth != null && 
        (request.auth.token.admin == true || 
         request.auth.token.email == 'admin@ankaraustabul.com');
    }
    
    // Kategoriler koleksiyonu için kurallar
    match /kategoriler/{kategoriId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (request.auth.token.admin == true || 
         request.auth.token.email == 'admin@ankaraustabul.com');
    }
    
    // İlçeler koleksiyonu için kurallar
    match /ilceler/{ilceId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (request.auth.token.admin == true || 
         request.auth.token.email == 'admin@ankaraustabul.com');
    }
    
    // Blog koleksiyonu için kurallar
    match /blog/{blogId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (request.auth.token.admin == true || 
         request.auth.token.email == 'admin@ankaraustabul.com');
    }
    
    // Diğer tüm koleksiyonlar için varsayılan kural
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Adım 3: Kuralları Yayınlayın
- **"Publish"** butonuna tıklayın
- Onay mesajında **"Publish"** seçin

## ✅ Kuralların Açıklaması

### 🔓 Ustalar Koleksiyonu
- **Okuma:** Herkes okuyabilir (müşteriler usta listesini görebilir)
- **Yazma:** Herkes yeni usta ekleyebilir (kayıt formu çalışır)
- **Güncelleme:** Sadece admin (durum değişiklikleri için)
- **Silme:** Sadece admin

### 🔒 Diğer Koleksiyonlar
- **Okuma:** Herkes okuyabilir
- **Yazma:** Sadece admin

## 🚨 Önemli Notlar

1. **Kurallar yayınlandıktan sonra** usta kaydı çalışacak
2. **Test etmek için** uygulamayı yeniden yükleyin
3. **Console'da hata mesajları** artık görünmeyecek

## 🔧 Alternatif Çözüm (Test Modu)

Eğer hala sorun yaşıyorsanız, **test modu** için geçici olarak şu kuralı kullanabilirsiniz:

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

⚠️ **Dikkat:** Bu kural güvenlik sağlamaz, sadece test için kullanın!

## 📞 Destek

Sorun devam ederse:
1. Firebase Console'da **"Usage"** sekmesini kontrol edin
2. **"Authentication"** bölümünde kullanıcıların doğru ayarlandığından emin olun
3. **"Project Settings"** > **"Service accounts"** bölümünü kontrol edin
