import { 
  getUstalarFromFirestore, 
  addUstaToFirestore, 
  updateUstaInFirestore, 
  deleteUstaFromFirestore,
  getUstalarByCategory,
  getUstalarByDistrict,
  getPremiumUstalar,
} from './firebase';
import type { Usta } from '../types';

class UstaService {
  private ustalar: Usta[] = [];

  // Firestore'dan ustaları yükle
  async loadUstalarFromFirestore() {
    try {
      const firestoreUstalar = await getUstalarFromFirestore();
      this.ustalar = firestoreUstalar.data as Usta[];
      return this.ustalar;
    } catch (error) {
      console.error('Ustalar Firestore\'dan yüklenemedi:', error);
      // Fallback olarak mock data kullan
      return this.getMockUstalar();
    }
  }

  // Mock data (fallback için)
  private getMockUstalar(): Usta[] {
    const mockData = [
      // Elektrik Kategorisi - 5 Usta
      {
        id: 'elektrik-1',
        name: 'Ahmet Yılmaz',
        category: 'Elektrik',
        categoryId: 'elektrik',
        location: 'Çankaya, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 8,
        hourlyRate: '150 TL',
        specialties: ['Elektrik Tesisatı', 'Aydınlatma', 'Priz Montajı', 'Güvenlik Sistemleri'],
        completedJobs: 156,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 123 45 67',
        email: 'ahmet.yilmaz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-15',
        description: '8 yıllık deneyimimle elektrik tesisatı, aydınlatma ve güvenlik sistemleri konularında profesyonel hizmet veriyorum.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        reviewCount: 156,
        contactCount: 89,
        viewCount: 1240,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '08:00', end: '18:00', isWorking: true },
          tuesday: { start: '08:00', end: '18:00', isWorking: true },
          wednesday: { start: '08:00', end: '18:00', isWorking: true },
          thursday: { start: '08:00', end: '18:00', isWorking: true },
          friday: { start: '08:00', end: '18:00', isWorking: true },
          saturday: { start: '09:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Çankaya', 'Keçiören', 'Yenimahalle'],
        emergencyService: true,
        languages: ['Türkçe', 'İngilizce'],
        certifications: ['Elektrik Tesisatı Sertifikası', 'Güvenlik Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'Anadolu Sigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-15'),
      },
      {
        id: 'elektrik-2',
        name: 'Mehmet Kaya',
        category: 'Elektrik',
        categoryId: 'elektrik',
        location: 'Keçiören, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 12,
        hourlyRate: '180 TL',
        specialties: ['Elektrik Arıza', 'Priz Tamiri', 'Sigorta Değişimi', 'Elektrik Panosu'],
        completedJobs: 234,
        responseTime: '1 saat',
        verified: true,
        available: true,
        phone: '+90 555 234 56 78',
        email: 'mehmet.kaya@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-10',
        description: '12 yıllık deneyimimle acil elektrik arızaları ve elektrik panosu işlerinde uzmanım.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
        reviewCount: 234,
        contactCount: 145,
        viewCount: 1980,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '07:00', end: '19:00', isWorking: true },
          tuesday: { start: '07:00', end: '19:00', isWorking: true },
          wednesday: { start: '07:00', end: '19:00', isWorking: true },
          thursday: { start: '07:00', end: '19:00', isWorking: true },
          friday: { start: '07:00', end: '19:00', isWorking: true },
          saturday: { start: '08:00', end: '18:00', isWorking: true },
          sunday: { start: '09:00', end: '17:00', isWorking: true }
        },
        serviceArea: ['Keçiören', 'Mamak', 'Altındağ'],
        emergencyService: true,
        languages: ['Türkçe'],
        certifications: ['Elektrik Tesisatı Sertifikası', 'Acil Servis Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'Aksigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-02-10'),
      },
      {
        id: 'elektrik-3',
        name: 'Ali Demir',
        category: 'Elektrik',
        categoryId: 'elektrik',
        location: 'Mamak, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 6,
        hourlyRate: '130 TL',
        specialties: ['Aydınlatma Sistemleri', 'LED Montajı', 'Elektrik Tesisatı', 'Priz Montajı'],
        completedJobs: 98,
        responseTime: '3 saat',
        verified: true,
        available: false,
        phone: '+90 555 345 67 89',
        email: 'ali.demir@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-01',
        description: 'Modern aydınlatma sistemleri ve LED montajı konularında uzmanım.',
        rating: 4.5,
        reviewCount: 98,
        contactCount: 67,
        viewCount: 890,
        isVerified: true,
        packageType: 'BASIC',
        workingHours: {
          monday: { start: '09:00', end: '17:00', isWorking: true },
          tuesday: { start: '09:00', end: '17:00', isWorking: true },
          wednesday: { start: '09:00', end: '17:00', isWorking: true },
          thursday: { start: '09:00', end: '17:00', isWorking: true },
          friday: { start: '09:00', end: '17:00', isWorking: true },
          saturday: { start: '10:00', end: '16:00', isWorking: false },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Mamak', 'Çankaya'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['LED Montaj Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
      },
      {
        id: 'elektrik-4',
        name: 'Hasan Özkan',
        category: 'Elektrik',
        categoryId: 'elektrik',
        location: 'Yenimahalle, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 10,
        hourlyRate: '160 TL',
        specialties: ['Güvenlik Sistemleri', 'Kamera Montajı', 'Elektrik Tesisatı', 'Alarm Sistemleri'],
        completedJobs: 187,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 456 78 90',
        email: 'hasan.ozkan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-20',
        description: 'Güvenlik sistemleri ve kamera montajı konularında 10 yıllık deneyimim var.',
        rating: 4.5,
        reviewCount: 187,
        contactCount: 112,
        viewCount: 1560,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '08:00', end: '20:00', isWorking: true },
          tuesday: { start: '08:00', end: '20:00', isWorking: true },
          wednesday: { start: '08:00', end: '20:00', isWorking: true },
          thursday: { start: '08:00', end: '20:00', isWorking: true },
          friday: { start: '08:00', end: '20:00', isWorking: true },
          saturday: { start: '09:00', end: '18:00', isWorking: true },
          sunday: { start: '10:00', end: '17:00', isWorking: false }
        },
        serviceArea: ['Yenimahalle', 'Etimesgut', 'Sincan'],
        emergencyService: true,
        languages: ['Türkçe', 'İngilizce'],
        certifications: ['Güvenlik Sistemleri Sertifikası', 'Kamera Montaj Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'Mapfre Sigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-02-20'),
      },
      {
        id: 'elektrik-5',
        name: 'Mustafa Çelik',
        category: 'Elektrik',
        categoryId: 'elektrik',
        location: 'Etimesgut, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 5,
        hourlyRate: '120 TL',
        specialties: ['Elektrik Arıza', 'Priz Tamiri', 'Elektrik Tesisatı', 'Sigorta Değişimi'],
        completedJobs: 76,
        responseTime: '4 saat',
        verified: true,
        available: true,
        phone: '+90 555 567 89 01',
        email: 'mustafa.celik@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-15',
        description: 'Elektrik arızaları ve priz tamiri konularında hızlı ve güvenilir hizmet veriyorum.',
        rating: 4.5,
        reviewCount: 76,
        contactCount: 54,
        viewCount: 680,
        isVerified: true,
        packageType: 'FREE',
        workingHours: {
          monday: { start: '09:00', end: '18:00', isWorking: true },
          tuesday: { start: '09:00', end: '18:00', isWorking: true },
          wednesday: { start: '09:00', end: '18:00', isWorking: true },
          thursday: { start: '09:00', end: '18:00', isWorking: true },
          friday: { start: '09:00', end: '18:00', isWorking: true },
          saturday: { start: '10:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Etimesgut'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Elektrik Tesisatı Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
      },

      // Su Tesisatı Kategorisi - 5 Usta
      {
        id: 'su-tesisati-1',
        name: 'Osman Yıldız',
        category: 'Su Tesisatı',
        categoryId: 'su-tesisati',
        location: 'Sincan, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 15,
        hourlyRate: '200 TL',
        specialties: ['Su Tesisatı', 'Kanal Açma', 'Tesisat Tamiri', 'Su Arıtma'],
        completedJobs: 312,
        responseTime: '1 saat',
        verified: true,
        available: true,
        phone: '+90 555 678 90 12',
        email: 'osman.yildiz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-05',
        description: '15 yıllık deneyimimle su tesisatı ve kanal açma işlerinde uzmanım.',
        rating: 4.5,
        reviewCount: 312,
        contactCount: 201,
        viewCount: 2450,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '07:00', end: '19:00', isWorking: true },
          tuesday: { start: '07:00', end: '19:00', isWorking: true },
          wednesday: { start: '07:00', end: '19:00', isWorking: true },
          thursday: { start: '07:00', end: '19:00', isWorking: true },
          friday: { start: '07:00', end: '19:00', isWorking: true },
          saturday: { start: '08:00', end: '18:00', isWorking: true },
          sunday: { start: '09:00', end: '17:00', isWorking: true }
        },
        serviceArea: ['Sincan', 'Etimesgut', 'Polatlı'],
        emergencyService: true,
        languages: ['Türkçe'],
        certifications: ['Su Tesisatı Ustası Sertifikası', 'Kanal Açma Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'Zurich Sigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        id: 'su-tesisati-2',
        name: 'İbrahim Korkmaz',
        category: 'Su Tesisatı',
        categoryId: 'su-tesisati',
        location: 'Altındağ, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 9,
        hourlyRate: '170 TL',
        specialties: ['Tesisat Tamiri', 'Su Kaçağı', 'Kanal Açma', 'Su Tesisatı'],
        completedJobs: 145,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 789 01 23',
        email: 'ibrahim.korkmaz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-12',
        description: 'Su kaçağı tespiti ve tesisat tamiri konularında uzmanım.',
        rating: 4.5,
        reviewCount: 145,
        contactCount: 98,
        viewCount: 1320,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '08:00', end: '18:00', isWorking: true },
          tuesday: { start: '08:00', end: '18:00', isWorking: true },
          wednesday: { start: '08:00', end: '18:00', isWorking: true },
          thursday: { start: '08:00', end: '18:00', isWorking: true },
          friday: { start: '08:00', end: '18:00', isWorking: true },
          saturday: { start: '09:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Altındağ', 'Mamak', 'Keçiören'],
        emergencyService: true,
        languages: ['Türkçe'],
        certifications: ['Su Kaçağı Tespit Sertifikası', 'Tesisat Tamiri Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'Allianz Sigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-02-12'),
      },
      {
        id: 'su-tesisati-3',
        name: 'Yusuf Arslan',
        category: 'Su Tesisatı',
        categoryId: 'su-tesisati',
        location: 'Pursaklar, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 7,
        hourlyRate: '150 TL',
        specialties: ['Su Tesisatı', 'Kanal Açma', 'Tesisat Montajı', 'Su Arıtma'],
        completedJobs: 98,
        responseTime: '3 saat',
        verified: true,
        available: false,
        phone: '+90 555 890 12 34',
        email: 'yusuf.arslan@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-05',
        description: 'Yeni tesisat montajı ve su arıtma sistemleri konularında hizmet veriyorum.',
        rating: 4.5,
        reviewCount: 98,
        contactCount: 65,
        viewCount: 890,
        isVerified: true,
        packageType: 'BASIC',
        workingHours: {
          monday: { start: '09:00', end: '17:00', isWorking: true },
          tuesday: { start: '09:00', end: '17:00', isWorking: true },
          wednesday: { start: '09:00', end: '17:00', isWorking: true },
          thursday: { start: '09:00', end: '17:00', isWorking: true },
          friday: { start: '09:00', end: '17:00', isWorking: true },
          saturday: { start: '10:00', end: '16:00', isWorking: false },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Pursaklar'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Su Arıtma Sistemleri Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        id: 'su-tesisati-4',
        name: 'Fatih Özkan',
        category: 'Su Tesisatı',
        categoryId: 'su-tesisati',
        location: 'Gölbaşı, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 11,
        hourlyRate: '180 TL',
        specialties: ['Su Kaçağı', 'Tesisat Tamiri', 'Kanal Açma', 'Su Tesisatı'],
        completedJobs: 167,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 901 23 45',
        email: 'fatih.ozkan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-18',
        description: 'Su kaçağı tespiti ve tesisat tamiri konularında 11 yıllık deneyimim var.',
        rating: 4.5,
        reviewCount: 167,
        contactCount: 123,
        viewCount: 1890,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '08:00', end: '19:00', isWorking: true },
          tuesday: { start: '08:00', end: '19:00', isWorking: true },
          wednesday: { start: '08:00', end: '19:00', isWorking: true },
          thursday: { start: '08:00', end: '19:00', isWorking: true },
          friday: { start: '08:00', end: '19:00', isWorking: true },
          saturday: { start: '09:00', end: '18:00', isWorking: true },
          sunday: { start: '10:00', end: '17:00', isWorking: false }
        },
        serviceArea: ['Gölbaşı', 'Çankaya', 'Keçiören'],
        emergencyService: true,
        languages: ['Türkçe'],
        certifications: ['Su Kaçağı Tespit Sertifikası', 'Profesyonel Tesisat Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'HDI Sigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-02-18'),
      },
      {
        id: 'su-tesisati-5',
        name: 'Emre Demir',
        category: 'Su Tesisatı',
        categoryId: 'su-tesisati',
        location: 'Polatlı, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 6,
        hourlyRate: '140 TL',
        specialties: ['Su Tesisatı', 'Tesisat Montajı', 'Kanal Açma', 'Su Arıtma'],
        completedJobs: 89,
        responseTime: '4 saat',
        verified: true,
        available: true,
        phone: '+90 555 012 34 56',
        email: 'emre.demir@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-10',
        description: 'Su tesisatı montajı ve su arıtma sistemleri konularında hizmet veriyorum.',
        rating: 4.5,
        reviewCount: 89,
        contactCount: 56,
        viewCount: 745,
        isVerified: true,
        packageType: 'FREE',
        workingHours: {
          monday: { start: '09:00', end: '18:00', isWorking: true },
          tuesday: { start: '09:00', end: '18:00', isWorking: true },
          wednesday: { start: '09:00', end: '18:00', isWorking: true },
          thursday: { start: '09:00', end: '18:00', isWorking: true },
          friday: { start: '09:00', end: '18:00', isWorking: true },
          saturday: { start: '10:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Polatlı'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Su Tesisatı Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10'),
      },

      // Temizlik Kategorisi - 5 Usta
      {
        id: 'temizlik-1',
        name: 'Ayşe Yılmaz',
        category: 'Temizlik',
        categoryId: 'temizlik',
        location: 'Çankaya, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 8,
        hourlyRate: '120 TL',
        specialties: ['Ev Temizliği', 'Ofis Temizliği', 'Derinlemesine Temizlik', 'Halı Yıkama'],
        completedJobs: 234,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 123 45 68',
        email: 'ayse.yilmaz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-15',
        description: '8 yıllık deneyimimle ev ve ofis temizliği konularında profesyonel hizmet veriyorum.',
        rating: 4.5,
        reviewCount: 234,
        contactCount: 178,
        viewCount: 2100,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '08:00', end: '18:00', isWorking: true },
          tuesday: { start: '08:00', end: '18:00', isWorking: true },
          wednesday: { start: '08:00', end: '18:00', isWorking: true },
          thursday: { start: '08:00', end: '18:00', isWorking: true },
          friday: { start: '08:00', end: '18:00', isWorking: true },
          saturday: { start: '09:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Çankaya', 'Keçiören', 'Yenimahalle'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Profesyonel Temizlik Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'Axa Sigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-15'),
      },
      {
        id: 'temizlik-2',
        name: 'Fatma Demir',
        category: 'Temizlik',
        categoryId: 'temizlik',
        location: 'Keçiören, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 5,
        hourlyRate: '100 TL',
        specialties: ['Ev Temizliği', 'Halı Yıkama', 'Cam Temizliği', 'Banyo Temizliği'],
        completedJobs: 156,
        responseTime: '3 saat',
        verified: true,
        available: true,
        phone: '+90 555 234 56 79',
        email: 'fatma.demir@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-01',
        description: 'Ev temizliği ve halı yıkama konularında titiz ve güvenilir hizmet veriyorum.',
        rating: 4.5,
        reviewCount: 156,
        contactCount: 98,
        viewCount: 1320,
        isVerified: true,
        packageType: 'BASIC',
        workingHours: {
          monday: { start: '09:00', end: '17:00', isWorking: true },
          tuesday: { start: '09:00', end: '17:00', isWorking: true },
          wednesday: { start: '09:00', end: '17:00', isWorking: true },
          thursday: { start: '09:00', end: '17:00', isWorking: true },
          friday: { start: '09:00', end: '17:00', isWorking: true },
          saturday: { start: '10:00', end: '16:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Keçiören', 'Mamak'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Halı Yıkama Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
      },
      {
        id: 'temizlik-3',
        name: 'Zeynep Kaya',
        category: 'Temizlik',
        categoryId: 'temizlik',
        location: 'Mamak, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 10,
        hourlyRate: '130 TL',
        specialties: ['Ofis Temizliği', 'İş Yeri Temizliği', 'Derinlemesine Temizlik', 'Cam Temizliği'],
        completedJobs: 198,
        responseTime: '2 saat',
        verified: true,
        available: false,
        phone: '+90 555 345 67 90',
        email: 'zeynep.kaya@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-20',
        description: 'Ofis ve iş yeri temizliği konularında 10 yıllık deneyimim var.',
        rating: 4.5,
        reviewCount: 198,
        contactCount: 145,
        viewCount: 1890,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '07:00', end: '19:00', isWorking: true },
          tuesday: { start: '07:00', end: '19:00', isWorking: true },
          wednesday: { start: '07:00', end: '19:00', isWorking: true },
          thursday: { start: '07:00', end: '19:00', isWorking: true },
          friday: { start: '07:00', end: '19:00', isWorking: true },
          saturday: { start: '08:00', end: '18:00', isWorking: true },
          sunday: { start: '09:00', end: '17:00', isWorking: false }
        },
        serviceArea: ['Mamak', 'Altındağ', 'Çankaya'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Ofis Temizliği Sertifikası', 'İş Yeri Temizliği Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'Generali Sigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-02-20'),
      },
      {
        id: 'temizlik-4',
        name: 'Elif Özkan',
        category: 'Temizlik',
        categoryId: 'temizlik',
        location: 'Yenimahalle, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 7,
        hourlyRate: '110 TL',
        specialties: ['Ev Temizliği', 'Banyo Temizliği', 'Mutfak Temizliği', 'Halı Yıkama'],
        completedJobs: 134,
        responseTime: '3 saat',
        verified: true,
        available: true,
        phone: '+90 555 456 78 91',
        email: 'elif.ozkan@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-05',
        description: 'Ev temizliği ve özellikle banyo, mutfak temizliği konularında uzmanım.',
        rating: 4.5,
        reviewCount: 134,
        contactCount: 89,
        viewCount: 1120,
        isVerified: true,
        packageType: 'BASIC',
        workingHours: {
          monday: { start: '09:00', end: '17:00', isWorking: true },
          tuesday: { start: '09:00', end: '17:00', isWorking: true },
          wednesday: { start: '09:00', end: '17:00', isWorking: true },
          thursday: { start: '09:00', end: '17:00', isWorking: true },
          friday: { start: '09:00', end: '17:00', isWorking: true },
          saturday: { start: '10:00', end: '16:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Yenimahalle', 'Etimesgut'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Ev Temizliği Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        id: 'temizlik-5',
        name: 'Hatice Çelik',
        category: 'Temizlik',
        categoryId: 'temizlik',
        location: 'Etimesgut, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 6,
        hourlyRate: '105 TL',
        specialties: ['Derinlemesine Temizlik', 'Halı Yıkama', 'Cam Temizliği', 'Ev Temizliği'],
        completedJobs: 98,
        responseTime: '4 saat',
        verified: true,
        available: true,
        phone: '+90 555 567 89 02',
        email: 'hatice.celik@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-15',
        description: 'Derinlemesine temizlik ve halı yıkama konularında hizmet veriyorum.',
        rating: 4.5,
        reviewCount: 98,
        contactCount: 67,
        viewCount: 890,
        isVerified: true,
        packageType: 'FREE',
        workingHours: {
          monday: { start: '09:00', end: '18:00', isWorking: true },
          tuesday: { start: '09:00', end: '18:00', isWorking: true },
          wednesday: { start: '09:00', end: '18:00', isWorking: true },
          thursday: { start: '09:00', end: '18:00', isWorking: true },
          friday: { start: '09:00', end: '18:00', isWorking: true },
          saturday: { start: '10:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Etimesgut'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Derinlemesine Temizlik Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
      },

      // Mobilya Kategorisi - 5 Usta
      {
        id: 'mobilya-1',
        name: 'Hasan Yıldız',
        category: 'Mobilya',
        categoryId: 'mobilya',
        location: 'Çankaya, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 12,
        hourlyRate: '160 TL',
        specialties: ['Mobilya Montajı', 'Mobilya Tamiri', 'Özel Mobilya', 'Dolap Montajı'],
        completedJobs: 187,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 123 45 69',
        email: 'hasan.yildiz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-10',
        description: '12 yıllık deneyimimle mobilya montajı ve özel mobilya yapımı konularında uzmanım.',
        rating: 4.5,
        reviewCount: 187,
        contactCount: 134,
        viewCount: 1670,
        isVerified: true,
        packageType: 'PREMIUM',
        workingHours: {
          monday: { start: '08:00', end: '18:00', isWorking: true },
          tuesday: { start: '08:00', end: '18:00', isWorking: true },
          wednesday: { start: '08:00', end: '18:00', isWorking: true },
          thursday: { start: '08:00', end: '18:00', isWorking: true },
          friday: { start: '08:00', end: '18:00', isWorking: true },
          saturday: { start: '09:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Çankaya', 'Yenimahalle', 'Keçiören'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Mobilya Montaj Sertifikası', 'Özel Mobilya Yapım Sertifikası'],
        insurance: {
          hasInsurance: true,
          provider: 'HDI Sigorta',
          expiryDate: new Date('2024-12-31')
        },
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-02-10'),
      },
      {
        id: 'mobilya-2',
        name: 'Mehmet Arslan',
        category: 'Mobilya',
        categoryId: 'mobilya',
        location: 'Keçiören, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 8,
        hourlyRate: '140 TL',
        specialties: ['Mobilya Tamiri', 'Dolap Montajı', 'Mobilya Montajı', 'Ahşap İşleri'],
        completedJobs: 145,
        responseTime: '3 saat',
        verified: true,
        available: true,
        phone: '+90 555 234 56 80',
        email: 'mehmet.arslan@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-01',
        description: 'Mobilya tamiri ve dolap montajı konularında 8 yıllık deneyimim var.',
        rating: 4.5,
        reviewCount: 145,
        contactCount: 98,
        viewCount: 1320,
        isVerified: true,
        packageType: 'BASIC',
        workingHours: {
          monday: { start: '09:00', end: '17:00', isWorking: true },
          tuesday: { start: '09:00', end: '17:00', isWorking: true },
          wednesday: { start: '09:00', end: '17:00', isWorking: true },
          thursday: { start: '09:00', end: '17:00', isWorking: true },
          friday: { start: '09:00', end: '17:00', isWorking: true },
          saturday: { start: '10:00', end: '16:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Keçiören', 'Mamak'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Mobilya Tamiri Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
      },
      {
        id: 'mobilya-3',
        name: 'Ali Korkmaz',
        category: 'Mobilya',
        categoryId: 'mobilya',
        location: 'Mamak, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 6,
        hourlyRate: '130 TL',
        specialties: ['Mobilya Montajı', 'Ahşap İşleri', 'Dolap Montajı', 'Mobilya Tamiri'],
        completedJobs: 98,
        responseTime: '4 saat',
        verified: true,
        available: false,
        phone: '+90 555 345 67 91',
        email: 'ali.korkmaz@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-05',
        description: 'Mobilya montajı ve ahşap işleri konularında hizmet veriyorum.',
        rating: 4.5,
        reviewCount: 98,
        contactCount: 67,
        viewCount: 890,
        isVerified: true,
        packageType: 'FREE',
        workingHours: {
          monday: { start: '09:00', end: '18:00', isWorking: true },
          tuesday: { start: '09:00', end: '18:00', isWorking: true },
          wednesday: { start: '09:00', end: '18:00', isWorking: true },
          thursday: { start: '09:00', end: '18:00', isWorking: true },
          friday: { start: '09:00', end: '18:00', isWorking: true },
          saturday: { start: '10:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Mamak'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Ahşap İşleri Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        id: 'mobilya-4',
        name: 'Osman Özkan',
        category: 'Mobilya',
        categoryId: 'mobilya',
        location: 'Yenimahalle, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 10,
        hourlyRate: '150 TL',
        specialties: ['Özel Mobilya', 'Mobilya Montajı', 'Dolap Montajı', 'Ahşap İşleri'],
        completedJobs: 167,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 456 78 92',
        email: 'osman.ozkan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-15',
        description: 'Özel mobilya yapımı ve montajı konularında 10 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'mobilya-5',
        name: 'İbrahim Demir',
        category: 'Mobilya',
        categoryId: 'mobilya',
        location: 'Etimesgut, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 7,
        hourlyRate: '135 TL',
        specialties: ['Mobilya Tamiri', 'Dolap Montajı', 'Mobilya Montajı', 'Ahşap İşleri'],
        completedJobs: 112,
        responseTime: '3 saat',
        verified: true,
        available: true,
        phone: '+90 555 567 89 03',
        email: 'ibrahim.demir@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-10',
        description: 'Mobilya tamiri ve dolap montajı konularında hizmet veriyorum.',
      rating: 4.5,
},

      // Boya & Badana Kategorisi - 5 Usta
      {
        id: 'boya-badana-1',
        name: 'Yusuf Çelik',
        category: 'Boya & Badana',
        categoryId: 'boya-badana',
        location: 'Sincan, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: '15 yıl',
        hourlyRate: '180 TL',
        specialties: ['İç Cephe Boya', 'Dış Cephe Boya', 'Dekoratif Boya', 'Sıva İşleri'],
        completedJobs: 245,
        responseTime: '1 saat',
        verified: true,
        available: true,
        phone: '+90 555 123 45 70',
        email: 'yusuf.celik@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-05',
        description: '15 yıllık deneyimimle iç ve dış cephe boya işlerinde uzmanım.',
      rating: 4.5,
},
      {
        id: 'boya-badana-2',
        name: 'Fatih Yılmaz',
        category: 'Boya & Badana',
        categoryId: 'boya-badana',
        location: 'Altındağ, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 9,
        hourlyRate: '160 TL',
        specialties: ['Dekoratif Boya', 'İç Cephe Boya', 'Sıva İşleri', 'Boya Tamiri'],
        completedJobs: 156,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 234 56 81',
        email: 'fatih.yilmaz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-12',
        description: 'Dekoratif boya ve sıva işleri konularında 9 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'boya-badana-3',
        name: 'Emre Kaya',
        category: 'Boya & Badana',
        categoryId: 'boya-badana',
        location: 'Pursaklar, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 7,
        hourlyRate: '140 TL',
        specialties: ['İç Cephe Boya', 'Boya Tamiri', 'Sıva İşleri', 'Dekoratif Boya'],
        completedJobs: 98,
        responseTime: '3 saat',
        verified: true,
        available: false,
        phone: '+90 555 345 67 92',
        email: 'emre.kaya@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-01',
        description: 'İç cephe boya ve boya tamiri konularında hizmet veriyorum.',
      rating: 4.5,
},
      {
        id: 'boya-badana-4',
        name: 'Ahmet Özkan',
        category: 'Boya & Badana',
        categoryId: 'boya-badana',
        location: 'Gölbaşı, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 11,
        hourlyRate: '170 TL',
        specialties: ['Dış Cephe Boya', 'İç Cephe Boya', 'Sıva İşleri', 'Dekoratif Boya'],
        completedJobs: 178,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 456 78 93',
        email: 'ahmet.ozkan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-18',
        description: 'Dış cephe boya ve sıva işleri konularında 11 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'boya-badana-5',
        name: 'Mustafa Demir',
        category: 'Boya & Badana',
        categoryId: 'boya-badana',
        location: 'Polatlı, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 6,
        hourlyRate: '130 TL',
        specialties: ['İç Cephe Boya', 'Boya Tamiri', 'Sıva İşleri', 'Dekoratif Boya'],
        completedJobs: 87,
        responseTime: '4 saat',
        verified: true,
        available: true,
        phone: '+90 555 567 89 04',
        email: 'mustafa.demir@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-15',
        description: 'İç cephe boya ve boya tamiri konularında hizmet veriyorum.',
      rating: 4.5,
},

      // İnşaat & Tadilat Kategorisi - 5 Usta
      {
        id: 'insaat-tadilat-1',
        name: 'Hüseyin Yıldız',
        category: 'İnşaat & Tadilat',
        categoryId: 'insaat-tadilat',
        location: 'Çankaya, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: '18 yıl',
        hourlyRate: '250 TL',
        specialties: ['Tadilat', 'İnşaat', 'Yıkım', 'Çatı Tamiri'],
        completedJobs: 312,
        responseTime: '1 saat',
        verified: true,
        available: true,
        phone: '+90 555 123 45 71',
        email: 'huseyin.yildiz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-05',
        description: '18 yıllık deneyimimle tadilat ve inşaat işlerinde uzmanım.',
      rating: 4.5,
},
      {
        id: 'insaat-tadilat-2',
        name: 'Murat Arslan',
        category: 'İnşaat & Tadilat',
        categoryId: 'insaat-tadilat',
        location: 'Keçiören, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 12,
        hourlyRate: '220 TL',
        specialties: ['Tadilat', 'Yıkım', 'Çatı Tamiri', 'İnşaat'],
        completedJobs: 198,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 234 56 82',
        email: 'murat.arslan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-10',
        description: 'Tadilat ve yıkım işleri konularında 12 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'insaat-tadilat-3',
        name: 'Kemal Korkmaz',
        category: 'İnşaat & Tadilat',
        categoryId: 'insaat-tadilat',
        location: 'Mamak, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 8,
        hourlyRate: '200 TL',
        specialties: ['Tadilat', 'Çatı Tamiri', 'İnşaat', 'Yıkım'],
        completedJobs: 134,
        responseTime: '3 saat',
        verified: true,
        available: false,
        phone: '+90 555 345 67 93',
        email: 'kemal.korkmaz@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-01',
        description: 'Tadilat ve çatı tamiri konularında hizmet veriyorum.',
      rating: 4.5,
},
      {
        id: 'insaat-tadilat-4',
        name: 'Serkan Özkan',
        category: 'İnşaat & Tadilat',
        categoryId: 'insaat-tadilat',
        location: 'Yenimahalle, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 14,
        hourlyRate: '230 TL',
        specialties: ['İnşaat', 'Tadilat', 'Yıkım', 'Çatı Tamiri'],
        completedJobs: 245,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 456 78 94',
        email: 'serkan.ozkan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-15',
        description: 'İnşaat ve tadilat işleri konularında 14 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'insaat-tadilat-5',
        name: 'Burak Demir',
        category: 'İnşaat & Tadilat',
        categoryId: 'insaat-tadilat',
        location: 'Etimesgut, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 9,
        hourlyRate: '210 TL',
        specialties: ['Tadilat', 'Çatı Tamiri', 'Yıkım', 'İnşaat'],
        completedJobs: 156,
        responseTime: '3 saat',
        verified: true,
        available: true,
        phone: '+90 555 567 89 05',
        email: 'burak.demir@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-05',
        description: 'Tadilat ve çatı tamiri konularında hizmet veriyorum.',
      rating: 4.5,
},

      // Bahçe & Peyzaj Kategorisi - 5 Usta
      {
        id: 'bahce-peyzaj-1',
        name: 'Cem Yılmaz',
        category: 'Bahçe & Peyzaj',
        categoryId: 'bahce-peyzaj',
        location: 'Sincan, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 10,
        hourlyRate: '150 TL',
        specialties: ['Bahçe Düzenleme', 'Peyzaj Tasarımı', 'Çim Ekimi', 'Ağaç Bakımı'],
        completedJobs: 167,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 123 45 72',
        email: 'cem.yilmaz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-10',
        description: '10 yıllık deneyimimle bahçe düzenleme ve peyzaj tasarımı konularında uzmanım.',
      rating: 4.5,
},
      {
        id: 'bahce-peyzaj-2',
        name: 'Deniz Arslan',
        category: 'Bahçe & Peyzaj',
        categoryId: 'bahce-peyzaj',
        location: 'Altındağ, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 7,
        hourlyRate: '130 TL',
        specialties: ['Peyzaj Tasarımı', 'Çim Ekimi', 'Ağaç Bakımı', 'Bahçe Düzenleme'],
        completedJobs: 98,
        responseTime: '3 saat',
        verified: true,
        available: true,
        phone: '+90 555 234 56 83',
        email: 'deniz.arslan@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-01',
        description: 'Peyzaj tasarımı ve çim ekimi konularında 7 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'bahce-peyzaj-3',
        name: 'Eren Korkmaz',
        category: 'Bahçe & Peyzaj',
        categoryId: 'bahce-peyzaj',
        location: 'Pursaklar, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 5,
        hourlyRate: '120 TL',
        specialties: ['Ağaç Bakımı', 'Bahçe Düzenleme', 'Çim Ekimi', 'Peyzaj Tasarımı'],
        completedJobs: 76,
        responseTime: '4 saat',
        verified: true,
        available: false,
        phone: '+90 555 345 67 94',
        email: 'eren.korkmaz@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-05',
        description: 'Ağaç bakımı ve bahçe düzenleme konularında hizmet veriyorum.',
      rating: 4.5,
},
      {
        id: 'bahce-peyzaj-4',
        name: 'Gökhan Özkan',
        category: 'Bahçe & Peyzaj',
        categoryId: 'bahce-peyzaj',
        location: 'Gölbaşı, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 12,
        hourlyRate: '160 TL',
        specialties: ['Bahçe Düzenleme', 'Peyzaj Tasarımı', 'Ağaç Bakımı', 'Çim Ekimi'],
        completedJobs: 198,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 456 78 95',
        email: 'gokhan.ozkan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-15',
        description: 'Bahçe düzenleme ve peyzaj tasarımı konularında 12 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'bahce-peyzaj-5',
        name: 'Hakan Demir',
        category: 'Bahçe & Peyzaj',
        categoryId: 'bahce-peyzaj',
        location: 'Polatlı, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 8,
        hourlyRate: '140 TL',
        specialties: ['Çim Ekimi', 'Ağaç Bakımı', 'Bahçe Düzenleme', 'Peyzaj Tasarımı'],
        completedJobs: 134,
        responseTime: '3 saat',
        verified: true,
        available: true,
        phone: '+90 555 567 89 06',
        email: 'hakan.demir@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-10',
        description: 'Çim ekimi ve ağaç bakımı konularında hizmet veriyorum.',
      rating: 4.5,
},

      // Klima & Havalandırma Kategorisi - 5 Usta
      {
        id: 'klima-havalandirma-1',
        name: 'Volkan Yıldız',
        category: 'Klima & Havalandırma',
        categoryId: 'klima-havalandirma',
        location: 'Çankaya, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 13,
        hourlyRate: '200 TL',
        specialties: ['Klima Montajı', 'Klima Bakımı', 'Havalandırma', 'Filtre Değişimi'],
        completedJobs: 234,
        responseTime: '1 saat',
        verified: true,
        available: true,
        phone: '+90 555 123 45 73',
        email: 'volkan.yildiz@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-05',
        description: '13 yıllık deneyimimle klima montajı ve bakımı konularında uzmanım.',
      rating: 4.5,
},
      {
        id: 'klima-havalandirma-2',
        name: 'Tolga Arslan',
        category: 'Klima & Havalandırma',
        categoryId: 'klima-havalandirma',
        location: 'Keçiören, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 9,
        hourlyRate: '180 TL',
        specialties: ['Klima Bakımı', 'Filtre Değişimi', 'Klima Montajı', 'Havalandırma'],
        completedJobs: 156,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 234 56 84',
        email: 'tolga.arslan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-12',
        description: 'Klima bakımı ve filtre değişimi konularında 9 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'klima-havalandirma-3',
        name: 'Uğur Korkmaz',
        category: 'Klima & Havalandırma',
        categoryId: 'klima-havalandirma',
        location: 'Mamak, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 6,
        hourlyRate: '160 TL',
        specialties: ['Klima Montajı', 'Havalandırma', 'Klima Bakımı', 'Filtre Değişimi'],
        completedJobs: 98,
        responseTime: '3 saat',
        verified: true,
        available: false,
        phone: '+90 555 345 67 95',
        email: 'ugur.korkmaz@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-01',
        description: 'Klima montajı ve havalandırma konularında hizmet veriyorum.',
      rating: 4.5,
},
      {
        id: 'klima-havalandirma-4',
        name: 'Yasin Özkan',
        category: 'Klima & Havalandırma',
        categoryId: 'klima-havalandirma',
        location: 'Yenimahalle, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 11,
        hourlyRate: '190 TL',
        specialties: ['Havalandırma', 'Klima Montajı', 'Klima Bakımı', 'Filtre Değişimi'],
        completedJobs: 187,
        responseTime: '2 saat',
        verified: true,
        available: true,
        phone: '+90 555 456 78 96',
        email: 'yasin.ozkan@email.com',
        isPremium: true,
        premiumFeatures: ['Öncelikli Liste', 'WhatsApp Yönlendirme', 'Özel Rozet', '7/24 Destek'],
        premiumBadge: '⭐ Premium Usta',
        status: 'approved',
        registrationDate: '2024-01-18',
        description: 'Havalandırma ve klima montajı konularında 11 yıllık deneyimim var.',
      rating: 4.5,
},
      {
        id: 'klima-havalandirma-5',
        name: 'Zafer Demir',
        category: 'Klima & Havalandırma',
        categoryId: 'klima-havalandirma',
        location: 'Etimesgut, Ankara',
        districtId: '', district: '', price: 150, availability: 'M�sait',
        experience: 7,
        hourlyRate: '170 TL',
        specialties: ['Filtre Değişimi', 'Klima Bakımı', 'Klima Montajı', 'Havalandırma'],
        completedJobs: 112,
        responseTime: '3 saat',
        verified: true,
        available: true,
        phone: '+90 555 567 89 07',
        email: 'zafer.demir@email.com',
        isPremium: false,
        status: 'approved',
        registrationDate: '2024-02-10',
        description: 'Filtre değişimi ve klima bakımı konularında hizmet veriyorum.',
        rating: 4.5,
        reviewCount: 89,
        contactCount: 56,
        viewCount: 745,
        isVerified: true,
        packageType: 'FREE',
        workingHours: {
          monday: { start: '09:00', end: '18:00', isWorking: true },
          tuesday: { start: '09:00', end: '18:00', isWorking: true },
          wednesday: { start: '09:00', end: '18:00', isWorking: true },
          thursday: { start: '09:00', end: '18:00', isWorking: true },
          friday: { start: '09:00', end: '18:00', isWorking: true },
          saturday: { start: '10:00', end: '17:00', isWorking: true },
          sunday: { start: '10:00', end: '16:00', isWorking: false }
        },
        serviceArea: ['Etimesgut'],
        emergencyService: false,
        languages: ['Türkçe'],
        certifications: ['Klima Bakım Sertifikası'],
        insurance: {
          hasInsurance: false
        },
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10'),
      },
    ];
    
    return mockData as Usta[];
  }

  // Tüm ustaları getir
  async getAllUstalar(): Promise<Usta[]> {
    if (this.ustalar.length === 0) {
      await this.loadUstalarFromFirestore();
    }
    return this.ustalar;
  }

  // ID'ye göre usta getir
  async getUstaById(id: string): Promise<Usta | null> {
    const ustalar = await this.getAllUstalar();
    return ustalar.find(usta => usta.id === id) || null;
  }

  // Yeni usta ekle
  async addUsta(ustaData: Omit<Usta, 'id'>): Promise<string> {
    try {
      console.log('UstaService: Usta ekleniyor...', ustaData);
      
      // Firebase'e eklemeye çalış
      const ustaId = await addUstaToFirestore(ustaData);
      
      console.log('UstaService: Firebase\'den dönen ID:', ustaId);
      
      // Local state'i güncelle
      this.ustalar.push({ ...ustaData, id: ustaId });
      
      return ustaId;
    } catch (error: any) {
      console.error('UstaService: Usta eklenemedi:', error);
      
      // Hata türüne göre farklı mesajlar
      if (error?.code === 'permission-denied') {
        throw new Error('Firebase yazma izni yok. Lütfen admin ile iletişime geçin.');
      } else if (error?.code === 'network-request-failed') {
        throw new Error('İnternet bağlantısı sorunu. Lütfen bağlantınızı kontrol edin.');
      } else {
        throw new Error(error?.message || 'Bilinmeyen bir hata oluştu.');
      }
    }
  }

  // Usta durumunu güncelle
  async updateUstaStatus(ustaId: string, status: 'pending' | 'approved' | 'rejected'): Promise<Usta | null> {
    try {
      await updateUstaInFirestore(ustaId, { status });
      // Local state'i güncelle
      const ustaIndex = this.ustalar.findIndex(usta => usta.id === ustaId);
      if (ustaIndex !== -1) {
        this.ustalar[ustaIndex].status = status;
        return this.ustalar[ustaIndex];
      }
      return null;
    } catch (error) {
      console.error('Usta durumu güncellenemedi:', error);
      throw error;
    }
  }

  // Usta sil
  async deleteUsta(ustaId: string): Promise<boolean> {
    try {
      await deleteUstaFromFirestore(ustaId);
      // Local state'i güncelle
      this.ustalar = this.ustalar.filter(usta => usta.id !== ustaId);
      return true;
    } catch (error) {
      console.error('Usta silinemedi:', error);
      throw error;
    }
  }

  // Arama ve filtreleme
  async searchUstalar(searchTerm: string, category?: string, district?: string, availability?: string): Promise<Usta[]> {
    const ustalar = await this.getAllUstalar();
    
    return ustalar.filter(usta => {
      const matchesSearch = searchTerm === '' || 
        usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      
      const matchesCategory = !category || usta.categoryId === category;
      const matchesDistrict = !district || usta.districtId === district;
      const matchesAvailability = !availability || 
        (availability === 'available' && usta.available) ||
        (availability === 'busy' && !usta.available);
      
      return matchesSearch && matchesCategory && matchesDistrict && matchesAvailability;
    });
  }

  // Kategoriye göre ustaları getir
  async getUstalarByCategory(categoryId: string): Promise<Usta[]> {
    try {
      const firestoreUstalar = await getUstalarByCategory(categoryId);
      return firestoreUstalar as Usta[];
    } catch (error) {
      console.error('Kategori ustaları getirilemedi:', error);
      const ustalar = await this.getAllUstalar();
      return ustalar.filter(usta => usta.categoryId === categoryId && usta.status === 'approved');
    }
  }

  // İlçeye göre ustaları getir
  async getUstalarByDistrict(districtId: string): Promise<Usta[]> {
    try {
      const firestoreUstalar = await getUstalarByDistrict(districtId);
      return firestoreUstalar as Usta[];
    } catch (error) {
      console.error('İlçe ustaları getirilemedi:', error);
      const ustalar = await this.getAllUstalar();
      return ustalar.filter(usta => usta.districtId === districtId && usta.status === 'approved');
    }
  }

  // Premium ustaları getir
  async getPremiumUstalar(limit: number = 10): Promise<Usta[]> {
    try {
      const firestoreUstalar = await getPremiumUstalar(limit);
      return firestoreUstalar as Usta[];
    } catch (error) {
      console.error('Premium ustalar getirilemedi:', error);
      const ustalar = await this.getAllUstalar();
      return ustalar
        .filter(usta => usta.isPremium && usta.status === 'approved')
        .slice(0, limit);
    }
  }

  // İstatistikler
  async getStats() {
    const ustalar = await this.getAllUstalar();
    const totalUstalar = ustalar.length;
    const approvedUstalar = ustalar.filter(usta => usta.status === 'approved').length;
    const pendingUstalar = ustalar.filter(usta => usta.status === 'pending').length;
    const activeUstalar = ustalar.filter(usta => usta.available).length;
    const totalJobs = ustalar.reduce((sum, usta) => sum + usta.completedJobs, 0);

    return {
      totalUstalar,
      approvedUstalar,
      pendingUstalar,
      activeUstalar,
      totalJobs,
    };
  }

  // Gelir hesaplama
  async getRevenueStats() {
    const ustalar = await this.getAllUstalar();
    const premiumUstalar = ustalar.filter(usta => usta.isPremium && usta.status === 'approved').length;
    const basicUstalar = ustalar.filter(usta => !usta.isPremium && usta.status === 'approved').length;
    
    const monthlyRevenue = premiumUstalar * 299 + basicUstalar * 99;
    const totalRevenue = monthlyRevenue * 12;

    return {
      monthlyRevenue,
      totalRevenue,
      premiumUstalar,
      basicUstalar,
    };
  }

  // Kategori istatistikleri
  async getCategoryStats() {
    const ustalar = await this.getAllUstalar();
    const categoryStats: { [key: string]: number } = {};
    
    ustalar.forEach(usta => {
      if (usta.status === 'approved') {
        categoryStats[usta.category] = (categoryStats[usta.category] || 0) + 1;
      }
    });

    return Object.entries(categoryStats).map(([category, count]) => ({
      category,
      count,
    })).sort((a, b) => b.count - a.count);
  }

  // İlçe istatistikleri
  async getDistrictStats() {
    const ustalar = await this.getAllUstalar();
    const districtStats: { [key: string]: number } = {};
    
    ustalar.forEach(usta => {
      if (usta.status === 'approved') {
        districtStats[usta.districtId] = (districtStats[usta.districtId] || 0) + 1;
      }
    });

    return Object.entries(districtStats).map(([district, count]) => ({
      district,
      count,
    })).sort((a, b) => b.count - a.count);
  }

  // Aylık kayıt istatistikleri
  async getMonthlyRegistrations() {
    const ustalar = await this.getAllUstalar();
    const monthlyStats: { [key: string]: number } = {};
    
    ustalar.forEach(usta => {
      if (usta.registrationDate) {
        const month = usta.registrationDate.substring(0, 7);
        monthlyStats[month] = (monthlyStats[month] || 0) + 1;
      }
    });

    return Object.entries(monthlyStats)
      .map(([month, count]) => ({
        month,
        count,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);
  }

  // Son kayıt olan ustalar
  async getRecentUstalar(limit: number = 10): Promise<Usta[]> {
    const ustalar = await this.getAllUstalar();
    return ustalar
      .filter(usta => usta.status === 'pending')
      .sort((a, b) => {
        const dateA = new Date(a.registrationDate || '');
        const dateB = new Date(b.registrationDate || '');
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, limit);
  }

  // En aktif ustalar
  async getTopUstalar(limit: number = 10): Promise<Usta[]> {
    const ustalar = await this.getAllUstalar();
    return ustalar
      .filter(usta => usta.status === 'approved')
      .sort((a, b) => b.completedJobs - a.completedJobs)
      .slice(0, limit);
  }

  // Premium ustalar
  async getPremiumUstalarList(): Promise<Usta[]> {
    const ustalar = await this.getAllUstalar();
    return ustalar.filter(usta => usta.isPremium && usta.status === 'approved');
  }

  // Arama geçmişi (mock data)
  getSearchHistory() {
    return [
      { term: 'elektrik', count: 45 },
      { term: 'su tesisatı', count: 32 },
      { term: 'temizlik', count: 28 },
      { term: 'mobilya', count: 22 },
      { term: 'boya', count: 18 },
    ];
  }
}

export const ustaService = new UstaService();

// Export function for direct use
export const getAllUstalar = () => ustaService.getAllUstalar(); 
