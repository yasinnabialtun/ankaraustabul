// Email Service for Ankara Usta Bul
export interface RegistrationNotificationData {
  ustaName: string;
  ustaEmail: string;
  ustaPhone: string;
  ustaCategory: string;
  packageType: string;
  transactionId: string;
  amount: number;
}

export interface WelcomeEmailData {
  ustaName: string;
  ustaEmail: string;
  packageType: string;
}

export const emailService = {
  // Send registration notification to admin
  async sendRegistrationNotification(data: RegistrationNotificationData) {
    try {
      console.log('📧 Admin bildirimi gönderiliyor:', data);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ Admin bildirimi gönderildi');
      console.log('📋 Bildirim Detayları:');
      console.log(`   👤 Usta: ${data.ustaName}`);
      console.log(`   📧 E-posta: ${data.ustaEmail}`);
      console.log(`   📞 Telefon: ${data.ustaPhone}`);
      console.log(`   🏷️ Kategori: ${data.ustaCategory}`);
      console.log(`   📦 Paket: ${data.packageType}`);
      console.log(`   💰 Tutar: ${data.amount} TL`);
      console.log(`   🆔 İşlem ID: ${data.transactionId}`);
      
      return {
        success: true,
        message: 'Admin bildirimi başarıyla gönderildi'
      };
    } catch (error) {
      console.error('❌ Admin bildirimi hatası:', error);
      return {
        success: false,
        error: 'Admin bildirimi gönderilemedi'
      };
    }
  },

  // Send welcome email to usta
  async sendWelcomeEmail(data: WelcomeEmailData) {
    try {
      console.log('📧 Hoş geldin e-postası gönderiliyor:', data);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ Hoş geldin e-postası gönderildi');
      console.log('📋 E-posta Detayları:');
      console.log(`   👤 Usta: ${data.ustaName}`);
      console.log(`   📧 E-posta: ${data.ustaEmail}`);
      console.log(`   📦 Paket: ${data.packageType}`);
      
      return {
        success: true,
        message: 'Hoş geldin e-postası başarıyla gönderildi'
      };
    } catch (error) {
      console.error('❌ Hoş geldin e-postası hatası:', error);
      return {
        success: false,
        error: 'Hoş geldin e-postası gönderilemedi'
      };
    }
  },

  // Send payment confirmation email
  async sendPaymentConfirmation(data: {
    ustaName: string;
    ustaEmail: string;
    transactionId: string;
    amount: number;
    packageType: string;
  }) {
    try {
      console.log('📧 Ödeme onay e-postası gönderiliyor:', data);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ Ödeme onay e-postası gönderildi');
      
      return {
        success: true,
        message: 'Ödeme onay e-postası başarıyla gönderildi'
      };
    } catch (error) {
      console.error('❌ Ödeme onay e-postası hatası:', error);
      return {
        success: false,
        error: 'Ödeme onay e-postası gönderilemedi'
      };
    }
  },

  // Send account activation email
  async sendAccountActivation(data: {
    ustaName: string;
    ustaEmail: string;
    activationCode: string;
  }) {
    try {
      console.log('📧 Hesap aktivasyon e-postası gönderiliyor:', data);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ Hesap aktivasyon e-postası gönderildi');
      
      return {
        success: true,
        message: 'Hesap aktivasyon e-postası başarıyla gönderildi'
      };
    } catch (error) {
      console.error('❌ Hesap aktivasyon e-postası hatası:', error);
      return {
        success: false,
        error: 'Hesap aktivasyon e-postası gönderilemedi'
      };
    }
  }
}; 