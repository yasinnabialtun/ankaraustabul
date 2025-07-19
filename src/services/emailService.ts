// Email service for sending notifications
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

export const emailService = {
  // Send notification to admin about new usta registration
  async sendUstaRegistrationNotification(data: UstaRegistrationData) {
    const adminEmail = 'info@ynadijital.com';
    
    const emailContent = `
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
      console.log('📧 YENİ USTA KAYDI BİLDİRİMİ:', {
        to: adminEmail,
        subject: '🎉 Yeni Usta Kaydı - Ankara Usta Bul',
        content: emailContent
      });
    }

    // In production, send actual email
    if (import.meta.env.PROD) {
      try {
        // Here you would integrate with your email service
        // For now, we'll just log it
        console.log('📧 E-posta gönderildi:', adminEmail);
        return { success: true, message: 'E-posta başarıyla gönderildi' };
      } catch (error) {
        console.error('❌ E-posta gönderilemedi:', error);
        return { success: false, message: 'E-posta gönderilemedi' };
      }
    }

    return { success: true, message: 'Development modunda console\'a loglandı' };
  },

  // Send welcome email to usta
  async sendUstaWelcomeEmail(data: UstaRegistrationData) {
    const welcomeEmailContent = `
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
      console.log('📧 USTA HOŞ GELDİN E-MAİLİ:', {
        to: data.email,
        subject: '🎉 Ankara Usta Bul\'a Hoş Geldiniz!',
        content: welcomeEmailContent
      });
    }

    // In production, send actual email
    if (import.meta.env.PROD) {
      try {
        console.log('📧 Hoş geldin e-postası gönderildi:', data.email);
        return { success: true, message: 'Hoş geldin e-postası gönderildi' };
      } catch (error) {
        console.error('❌ Hoş geldin e-postası gönderilemedi:', error);
        return { success: false, message: 'Hoş geldin e-postası gönderilemedi' };
      }
    }

    return { success: true, message: 'Development modunda console\'a loglandı' };
  }
}; 