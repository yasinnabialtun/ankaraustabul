// WhatsApp service for sending notifications
export interface UstaRegistrationData {
  name: string;
  email: string;
  phone: string;
  category: string;
  experience: string;
  location: string;
  hourlyRate: string;
  specialties: string[];
  serviceAreas: string[];
  packageType: string;
  transactionId: string;
}

export const whatsappService = {
  // Send notification to admin about new usta registration
  async sendUstaRegistrationNotification(data: UstaRegistrationData) {
    const adminEmail = 'info@ynadijital.com';
    
    const messageContent = `
🎉 YENİ USTA KAYDI BİLDİRİMİ 🎉

📋 Usta Bilgileri:
👤 Ad Soyad: ${data.name}
📧 E-posta: ${data.email}
📱 Telefon: ${data.phone}
🏷️ Kategori: ${data.category}
⏰ Deneyim: ${data.experience} yıl
📍 Lokasyon: ${data.location}
💰 Saatlik Ücret: ${data.hourlyRate} ₺

🔧 Uzmanlık Alanları:
${data.specialties.map(s => `• ${s}`).join('\n')}

🌍 Hizmet Bölgeleri:
${data.serviceAreas.map(area => `• ${area}`).join('\n')}

📦 Paket: ${data.packageType}
🆔 İşlem ID: ${data.transactionId}

📅 Kayıt Tarihi: ${new Date().toLocaleString('tr-TR')}

---
Bu bildirim Ankara Usta Bul platformundan otomatik olarak gönderilmiştir.
    `;

    // In development, log to console
    if (import.meta.env.DEV) {
      console.log('📱 WHATSAPP BİLDİRİMİ:', {
        to: adminEmail,
        subject: '🎉 Yeni Usta Kaydı - Ankara Usta Bul',
        content: messageContent
      });
    }

    // WhatsApp is disabled for now
    if (import.meta.env.PROD) {
      try {
        console.log('📱 WhatsApp bildirimi devre dışı - E-posta kullanılıyor');
        return { success: true, message: 'WhatsApp devre dışı - E-posta kullanılıyor' };
      } catch (error) {
        console.error('❌ WhatsApp bildirimi gönderilemedi:', error);
        return { success: false, message: 'WhatsApp bildirimi gönderilemedi' };
      }
    }

    return { success: true, message: 'Development modunda console\'a loglandı' };
  },

  // Send welcome message to usta
  async sendUstaWelcomeMessage(data: UstaRegistrationData) {
    const welcomeMessageContent = `
🎉 HOŞ GELDİNİZ! 🎉

Merhaba ${data.name},

Ankara Usta Bul platformuna başarıyla kayıt oldunuz! 🎊

📋 Kayıt Bilgileriniz:
🏷️ Kategori: ${data.category}
📍 Lokasyon: ${data.location}
💰 Saatlik Ücret: ${data.hourlyRate} ₺
📦 Paket: ${data.packageType}

🔧 Uzmanlık Alanlarınız:
${data.specialties.map(s => `• ${s}`).join('\n')}

🌍 Hizmet Bölgeleriniz:
${data.serviceAreas.map(area => `• ${area}`).join('\n')}

📱 İletişim Bilgileriniz:
📧 E-posta: ${data.email}
📞 Telefon: ${data.phone}

🎯 Sonraki Adımlar:
1. Profilinizi tamamlayın
2. Müşteri değerlendirmelerinizi ekleyin
3. Hizmet alanlarınızı genişletin
4. Müşterilerle iletişime geçin

📞 Destek için: info@ynadijital.com
🌐 Web: https://ankaraustabul.com

Başarılar dileriz! 🚀
Ankara Usta Bul Ekibi
    `;

    // In development, log to console
    if (import.meta.env.DEV) {
      console.log('📱 USTA HOŞ GELDİN MESAJI:', {
        to: data.phone,
        subject: '🎉 Ankara Usta Bul\'a Hoş Geldiniz!',
        content: welcomeMessageContent
      });
    }

    // WhatsApp is disabled for now
    if (import.meta.env.PROD) {
      try {
        console.log('📱 WhatsApp hoş geldin mesajı devre dışı - E-posta kullanılıyor');
        return { success: true, message: 'WhatsApp devre dışı - E-posta kullanılıyor' };
      } catch (error) {
        console.error('❌ WhatsApp hoş geldin mesajı gönderilemedi:', error);
        return { success: false, message: 'WhatsApp hoş geldin mesajı gönderilemedi' };
      }
    }

    return { success: true, message: 'Development modunda console\'a loglandı' };
  }
}; 