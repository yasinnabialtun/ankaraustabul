// Email Service for Usta Registration Notifications
interface UstaRegistrationData {
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

class EmailService {
  private adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@ankaraustabul.com';
  private notificationEmail = import.meta.env.VITE_NOTIFICATION_EMAIL || 'bildirim@ankaraustabul.com';

  async sendUstaRegistrationNotification(ustaData: UstaRegistrationData): Promise<boolean> {
    try {
      // Development mode - console log
      if (import.meta.env.DEV) {
        console.log('📧 YENİ USTA KAYDI BİLDİRİMİ:', {
          timestamp: new Date().toISOString(),
          ustaData: ustaData
        });
        return true;
      }

      // Production mode - real email service
      const emailData = {
        to: this.adminEmail,
        subject: `🎉 Yeni Usta Kaydı: ${ustaData.name}`,
        html: this.generateUstaNotificationEmail(ustaData)
      };

      // Email service integration (SendGrid, Mailgun, etc.)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      return response.ok;
    } catch (error) {
      console.error('Email notification error:', error);
      return false;
    }
  }

  private generateUstaNotificationEmail(ustaData: UstaRegistrationData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🎉 Yeni Usta Kaydı</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Ankara Usta Bul - Usta Kayıt Bildirimi</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">📋 Usta Bilgileri</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; margin-top: 0;">👤 Kişisel Bilgiler</h3>
            <p><strong>Ad Soyad:</strong> ${ustaData.name}</p>
            <p><strong>E-posta:</strong> ${ustaData.email}</p>
            <p><strong>Telefon:</strong> ${ustaData.phone}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; margin-top: 0;">🔧 Meslek Bilgileri</h3>
            <p><strong>Kategori:</strong> ${ustaData.category}</p>
            <p><strong>Deneyim:</strong> ${ustaData.experience} yıl</p>
            <p><strong>Saatlik Ücret:</strong> ${ustaData.hourlyRate} ₺</p>
            <p><strong>Lokasyon:</strong> ${ustaData.location}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; margin-top: 0;">🎯 Uzmanlık Alanları</h3>
            <p><strong>Özel Alanlar:</strong> ${ustaData.specialties.join(', ')}</p>
            <p><strong>Hizmet Bölgeleri:</strong> ${ustaData.serviceAreas.join(', ')}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; margin-top: 0;">💳 Ödeme Bilgileri</h3>
            <p><strong>Seçilen Paket:</strong> ${ustaData.packageType}</p>
            <p><strong>İşlem ID:</strong> ${ustaData.transactionId}</p>
            <p><strong>Kayıt Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://ankaraustabul.com/admin/ustalar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              👨‍💼 Admin Paneline Git
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>Bu e-posta Ankara Usta Bul sistemi tarafından otomatik olarak gönderilmiştir.</p>
        </div>
      </div>
    `;
  }

  async sendUstaWelcomeEmail(ustaData: UstaRegistrationData): Promise<boolean> {
    try {
      const emailData = {
        to: ustaData.email,
        subject: `🎉 Hoş Geldiniz! ${ustaData.name} - Ankara Usta Bul`,
        html: this.generateWelcomeEmail(ustaData)
      };

      if (import.meta.env.DEV) {
        console.log('📧 USTA HOŞ GELDİN E-MAİLİ:', {
          to: ustaData.email,
          subject: emailData.subject
        });
        return true;
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      return response.ok;
    } catch (error) {
      console.error('Welcome email error:', error);
      return false;
    }
  }

  private generateWelcomeEmail(ustaData: UstaRegistrationData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🎉 Hoş Geldiniz!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Ankara Usta Bul Ailesine Katıldınız</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Merhaba ${ustaData.name}!</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Ankara Usta Bul platformuna hoş geldiniz! Kaydınız başarıyla tamamlandı ve 
            artık müşterilerinizle buluşmaya hazırsınız.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; margin-top: 0;">📋 Kayıt Bilgileriniz</h3>
            <p><strong>Kategori:</strong> ${ustaData.category}</p>
            <p><strong>Deneyim:</strong> ${ustaData.experience} yıl</p>
            <p><strong>Saatlik Ücret:</strong> ${ustaData.hourlyRate} ₺</p>
            <p><strong>Seçilen Paket:</strong> ${ustaData.packageType}</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">🚀 Sonraki Adımlar</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Profilinizi tamamlayın ve fotoğraf ekleyin</li>
              <li>Müşteri taleplerini takip edin</li>
              <li>Değerlendirmelerinizi yönetin</li>
              <li>Özel kampanyalardan faydalanın</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://ankaraustabul.com/profil" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              👨‍💼 Profilimi Görüntüle
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>Bu e-posta Ankara Usta Bul sistemi tarafından otomatik olarak gönderilmiştir.</p>
        </div>
      </div>
    `;
  }
}

const emailService = new EmailService();
export default emailService; 