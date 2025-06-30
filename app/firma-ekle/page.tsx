"use client"

import { useState } from "react";
import {
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Info,
} from "lucide-react";

const categories = [
  { id: "elektrikci", name: "Elektrikçi" },
  { id: "su-tesisatcisi", name: "Su Tesisatçısı" },
  { id: "boyaci", name: "Boyacı" },
  { id: "marangoz", name: "Marangoz" },
  { id: "temizlik", name: "Temizlik" },
  { id: "bahcivan", name: "Bahçıvan" },
  { id: "cilingir", name: "Çilingir" },
  { id: "beyaz-esya", name: "Beyaz Eşya" },
  { id: "isitma-sistemi", name: "Isıtma Sistemi" },
  { id: "cati-ustasi", name: "Çatı Ustası" },
  { id: "doseme-ustasi", name: "Döşeme Ustası" },
  { id: "cam-ustasi", name: "Cam Ustası" },
];

const districts = [
  "Çankaya",
  "Keçiören",
  "Mamak",
  "Yenimahalle",
  "Etimesgut",
  "Sincan",
  "Altındağ",
  "Pursaklar",
  "Gölbaşı",
  "Polatlı",
  "Akyurt",
  "Kazan",
  "Ayaş",
  "Bala",
  "Beypazarı",
  "Çamlıdere",
  "Çubuk",
  "Elmadağ",
  "Evren",
  "Güdül",
  "Haymana",
  "Kalecik",
  "Kızılcahamam",
  "Nallıhan",
  "Şereflikoçhisar",
];

const packages = [
  {
    id: "standart",
    name: "Standart Paket",
    price: "Ücretsiz",
    description:
      "İlanınız 7 gün yayında kalır. Standart aramalarda görünür. Reklamsız.",
  },
  {
    id: "premium",
    name: "Premium Paket",
    price: "299 TL",
    description:
      "İlanınız 30 gün yayında kalır. Kategori üstü ve ana sayfa öne çıkar. Reklamlarımızda döner.",
  },
  {
    id: "reklamli",
    name: "Reklamlı Paket",
    price: "499 TL",
    description:
      "İlanınız 30 gün yayında kalır. Ana sayfa ve kategori üstü reklam alanlarında gösterilir. Maksimum görünürlük.",
  },
];

export default function FirmaUstaEklePage() {
  const [type, setType] = useState<"bireysel" | "firma">("bireysel");
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    categories: [] as string[],
    experience: "",
    description: "",
    services: [] as string[],
    workingHours: "",
    emergencyService: false,
    package: "standart",
  });
  const [serviceInput, setServiceInput] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form input handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement;
    
    if (target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleServiceAdd = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()],
      }));
      setServiceInput("");
    }
  };

  const handleServiceRemove = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  const handlePackageSelect = (pkg: string) => {
    setFormData((prev) => ({ ...prev, package: pkg }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setMessage({
      type: "success",
      text:
        "Başvurunuz başarıyla alındı! İlanınız onaylandığında yayınlanacak. Yayınlama ve reklam ücretleriyle ilgili bilgilendirme e-posta adresinize gönderilecek.",
    });
    setCurrentStep(1);
    setFormData({
      companyName: "",
      ownerName: "",
      phone: "",
      email: "",
      address: "",
      district: "",
      categories: [],
      experience: "",
      description: "",
      services: [],
      workingHours: "",
      emergencyService: false,
      package: "standart",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Firma/Usta Ekle
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ankara'da hizmet veriyorsanız, ister bireysel usta ister firma olun, ilanınızı kolayca ekleyin. Yayınlama ve reklam paketleriyle daha fazla müşteriye ulaşın.
          </p>
        </div>

        {/* Info & Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Neden İlan Vermelisiniz?</h2>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li>✔️ Ankara'nın en çok ziyaret edilen usta platformunda yer alın</li>
              <li>✔️ Doğrulanmış ve güvenilir profil ile öne çıkın</li>
              <li>✔️ Hedef kitlenize kolayca ulaşın</li>
              <li>✔️ Reklam ve öne çıkarma avantajları</li>
              <li>✔️ 7/24 müşteri desteği ve hızlı başvuru onayı</li>
              <li>✔️ Müşteri yorumları ve puan sistemiyle güven kazanın</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Başvuru Süreci</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-lg">
              <li>Formu eksiksiz doldurun ve ilan paketini seçin</li>
              <li>Başvurunuz 24 saat içinde incelenir</li>
              <li>Onay sonrası ilanınız yayına alınır</li>
              <li>Premium/Reklamlı paketlerde reklam desteği başlar</li>
              <li>Her aşamada e-posta ile bilgilendirilirsiniz</li>
            </ol>
          </div>
        </div>

        {/* Paket Avantajları */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Paket Avantajları</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">{pkg.price}</div>
                <p className="text-gray-700 mb-4">{pkg.description}</p>
                <ul className="text-left space-y-2 text-gray-600 text-base">
                  {pkg.id === 'standart' && (
                    <>
                      <li>• 7 gün yayında</li>
                      <li>• Standart aramalarda görünür</li>
                      <li>• Temel profil</li>
                    </>
                  )}
                  {pkg.id === 'premium' && (
                    <>
                      <li>• 30 gün yayında</li>
                      <li>• Kategori üstü ve ana sayfa öne çıkar</li>
                      <li>• Reklamlarımızda döner</li>
                      <li>• Öncelikli destek</li>
                    </>
                  )}
                  {pkg.id === 'reklamli' && (
                    <>
                      <li>• 30 gün yayında</li>
                      <li>• Ana sayfa ve kategori üstü reklam</li>
                      <li>• Maksimum görünürlük</li>
                      <li>• Tüm avantajlar</li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sıkça Sorulanlar */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Sıkça Sorulan Sorular</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold text-gray-900 mb-2">Başvuru ücretli mi?</h3>
              <p className="text-gray-700">Standart paket tamamen ücretsizdir. Premium ve Reklamlı paketler için başvuru sonrası ödeme alınır.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold text-gray-900 mb-2">Başvurum ne zaman yayına alınır?</h3>
              <p className="text-gray-700">Başvurunuz 24 saat içinde incelenir ve onaylanırsa yayına alınır.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold text-gray-900 mb-2">Tüm ilçelerde ilan verebilir miyim?</h3>
              <p className="text-gray-700">Evet, Ankara'nın tüm ilçelerinde ilan verebilirsiniz.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold text-gray-900 mb-2">Müşteri bana nasıl ulaşacak?</h3>
              <p className="text-gray-700">Profilinizdeki telefon ve e-posta bilgileriniz üzerinden doğrudan ulaşabilirler.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold text-gray-900 mb-2">İlanımı nasıl öne çıkarabilirim?</h3>
              <p className="text-gray-700">Premium veya Reklamlı paket seçerek ilanınızı öne çıkarabilir, daha fazla müşteriye ulaşabilirsiniz.</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center space-x-3">
          <Info className="w-6 h-6 text-blue-500" />
          <span className="text-blue-900 text-sm">
            Yayınlanan ilanlar reklamlarımızda döner, daha fazla müşteri kazanırsınız. Yayınlama ve reklam ücretleri için lütfen paket seçiniz. İlanınız onaylandığında e-posta ile bilgilendirileceksiniz.
          </span>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? "bg-sky-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8 text-sm">
            <span className={currentStep >= 1 ? "text-sky-500 font-medium" : "text-gray-500"}>
              Bilgiler
            </span>
            <span className={currentStep >= 2 ? "text-sky-500 font-medium" : "text-gray-500"}>
              Paket Seçimi
            </span>
            <span className={currentStep >= 3 ? "text-sky-500 font-medium" : "text-gray-500"}>
              Onay
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            {message && (
              <div
                className={`p-4 rounded-lg mb-6 flex items-center space-x-2 ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Step 1: Bilgiler */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Temel Bilgiler
                </h2>
                <div className="flex space-x-4 mb-6">
                  <button
                    type="button"
                    className={`flex-1 py-3 rounded-lg border text-lg font-semibold transition-colors ${
                      type === "bireysel"
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => setType("bireysel")}
                  >
                    <User className="inline w-5 h-5 mr-2" /> Bireysel Usta
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-3 rounded-lg border text-lg font-semibold transition-colors ${
                      type === "firma"
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => setType("firma")}
                  >
                    <Building className="inline w-5 h-5 mr-2" /> Firma
                  </button>
                </div>
                {type === "firma" && (
                  <div>
                    <label className="form-label">Firma Adı *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="input-field"
                      required={type === "firma"}
                    />
                  </div>
                )}
                <div>
                  <label className="form-label">
                    {type === "firma" ? "Yetkili Adı Soyadı *" : "Ad Soyad *"}
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Telefon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">E-posta *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Adres</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">İlçe *</label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Seçiniz</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Kategori(ler) *</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={formData.categories.includes(cat.id)}
                            onChange={() => handleCategoryChange(cat.id)}
                            className="form-checkbox"
                          />
                          <span>{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="form-label">Deneyim (yıl)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="input-field"
                    min={0}
                  />
                </div>
                <div>
                  <label className="form-label">Açıklama</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={3}
                  ></textarea>
                </div>
                <div>
                  <label className="form-label">Hizmetler</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                      className="input-field"
                      placeholder="Hizmet ekle..."
                    />
                    <button
                      type="button"
                      className="btn-primary px-3"
                      onClick={handleServiceAdd}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service) => (
                      <span
                        key={service}
                        className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full flex items-center text-sm"
                      >
                        {service}
                        <button
                          type="button"
                          className="ml-1 text-sky-500 hover:text-red-500"
                          onClick={() => handleServiceRemove(service)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Çalışma Saatleri</label>
                    <input
                      type="text"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Örn: 09:00 - 18:00"
                    />
                  </div>
                  <div className="flex items-center mt-6 md:mt-0">
                    <input
                      type="checkbox"
                      name="emergencyService"
                      checked={formData.emergencyService}
                      onChange={handleInputChange}
                      className="form-checkbox mr-2"
                    />
                    <span>Acil durum hizmeti veriyorum</span>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Geri
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={nextStep}
                  >
                    Devam
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Paket Seçimi */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Yayınlama ve Reklam Paketi Seçimi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`rounded-lg border p-6 cursor-pointer transition-all duration-200 ${
                        formData.package === pkg.id
                          ? "border-sky-600 bg-sky-50 shadow-md"
                          : "border-gray-200 bg-white hover:shadow"
                      }`}
                      onClick={() => handlePackageSelect(pkg.id)}
                    >
                      <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-bold text-sky-600 mb-2">{pkg.price}</div>
                      <p className="text-gray-700 mb-4">{pkg.description}</p>
                      {formData.package === pkg.id && (
                        <div className="flex items-center text-sky-700 font-semibold">
                          <CheckCircle className="w-4 h-4 mr-1" /> Seçili
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={prevStep}
                  >
                    Geri
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={nextStep}
                  >
                    Devam
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Onay ve Bilgilendirme */}
            {currentStep === 3 && (
              <div className="space-y-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Başvurunuzu Onaylayın
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Bilgileriniz ve seçtiğiniz paket aşağıda özetlenmiştir. Başvurunuzu gönderdikten sonra ilanınız onaylandığında yayınlanacak ve seçtiğiniz pakete göre reklamlarımızda dönecektir. Yayınlama ve reklam ücretleriyle ilgili bilgilendirme e-posta adresinize gönderilecektir.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left max-w-xl mx-auto">
                  <div className="mb-2">
                    <span className="font-semibold">Tip:</span> {type === "firma" ? "Firma" : "Bireysel Usta"}
                  </div>
                  {type === "firma" && (
                    <div className="mb-2">
                      <span className="font-semibold">Firma Adı:</span> {formData.companyName}
                    </div>
                  )}
                  <div className="mb-2">
                    <span className="font-semibold">Ad Soyad:</span> {formData.ownerName}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Telefon:</span> {formData.phone}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">E-posta:</span> {formData.email}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">İlçe:</span> {formData.district}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Kategori(ler):</span> {formData.categories.map((id) => categories.find((c) => c.id === id)?.name).join(", ")}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Paket:</span> {packages.find((p) => p.id === formData.package)?.name}
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={prevStep}
                  >
                    Geri
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 