// WhatsApp Notification Service for Usta Registration
interface WhatsAppNotificationData {
  name: string;
  category: string;
  experience: string;
  location: string;
  hourlyRate: string;
  phone: string;
  transactionId: string;
  packageType: string;
}

class WhatsAppService {
  private adminPhone = import.meta.env.VITE_ADMIN_WHATSAPP || '+905551234567';
  private apiUrl = import.meta.env.VITE_WHATSAPP_API_URL || 'https://api.whatsapp.com';

  async sendUstaRegistrationNotification(ustaData: WhatsAppNotificationData): Promise<boolean> {
    try {
      // Development mode - console log
      if (import.meta.env.DEV) {
        console.log('📱 WHATSAPP BİLDİRİMİ:', {
          timestamp: new Date().toISOString(),
          message: this.generateWhatsAppMessage(ustaData)
        });
        return true;
      }

      // Production mode - WhatsApp Business API
      const message = this.generateWhatsAppMessage(ustaData);
      
      const response = await fetch(`${this.apiUrl}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_WHATSAPP_API_KEY}`
        },
        body: JSON.stringify({
          phone: this.adminPhone,
          message: message,
          type: 'text'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('WhatsApp notification error:', error);
      return false;
    }
  }

  private generateWhatsAppMessage(ustaData: WhatsAppNotificationData): string {
    return `🎉 *YENİ USTA KAYDI*

👤 *Kişisel Bilgiler:*
• Ad Soyad: ${ustaData.name}
• Telefon: ${ustaData.phone}
• Kategori: ${ustaData.category}
• Deneyim: ${ustaData.experience} yıl
• Lokasyon: ${ustaData.location}
• Saatlik Ücret: ${ustaData.hourlyRate} ₺

💳 *Ödeme Bilgileri:*
• Paket: ${ustaData.packageType}
• İşlem ID: ${ustaData.transactionId}
• Tarih: ${new Date().toLocaleString('tr-TR')}

📊 *İstatistikler:*
• Toplam Usta: +1
• Bu Ay: +1
• Bu Hafta: +1

🔗 Admin Panel: https://ankaraustabul.com/admin/ustalar

---
Ankara Usta Bul - Otomatik Bildirim`;
  }

  async sendUstaWelcomeMessage(ustaData: WhatsAppNotificationData): Promise<boolean> {
    try {
      const message = `🎉 *Hoş Geldiniz!*

Merhaba ${ustaData.name}! Ankara Usta Bul platformuna hoş geldiniz.

📋 *Kayıt Bilgileriniz:*
• Kategori: ${ustaData.category}
• Deneyim: ${ustaData.experience} yıl
• Saatlik Ücret: ${ustaData.hourlyRate} ₺
• Paket: ${ustaData.packageType}

🚀 *Sonraki Adımlar:*
1. Profilinizi tamamlayın
2. Müşteri taleplerini takip edin
3. Değerlendirmelerinizi yönetin

📞 *Destek:* +905551234567
🌐 *Web:* https://ankaraustabul.com

Başarılar dileriz! 🎯

---
Ankara Usta Bul`;

      if (import.meta.env.DEV) {
        console.log('📱 USTA HOŞ GELDİN MESAJI:', {
          to: ustaData.phone,
          message: message
        });
        return true;
      }

      const response = await fetch(`${this.apiUrl}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_WHATSAPP_API_KEY}`
        },
        body: JSON.stringify({
          phone: ustaData.phone,
          message: message,
          type: 'text'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Welcome WhatsApp error:', error);
      return false;
    }
  }
}

const whatsappService = new WhatsAppService();
export default whatsappService; 