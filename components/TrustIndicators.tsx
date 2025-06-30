import { Shield, Clock, Star, Users, Award, CheckCircle, ThumbsUp } from 'lucide-react'

const trustIndicators = [
  {
    icon: Shield,
    text: 'Güvenli Hizmet',
    description: 'Doğrulanmış ustalar'
  },
  {
    icon: Clock,
    text: 'Hızlı Yanıt',
    description: '30 dakika içinde'
  },
  {
    icon: Star,
    text: 'Kaliteli Hizmet',
    description: '4.8/5 ortalama puan'
  },
  {
    icon: Users,
    text: '15,000+ Müşteri',
    description: 'Memnun müşteri'
  },
  {
    icon: Award,
    text: 'Ödüllü Platform',
    description: '2023 En İyi Hizmet'
  },
  {
    icon: CheckCircle,
    text: 'Müşteri Memnuniyeti',
    description: '%98 memnuniyet oranı'
  },
  {
    icon: ThumbsUp,
    text: 'Tavsiye Ediliyor',
    description: 'Gerçek müşteri yorumları'
  }
]

export function TrustIndicators() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {trustIndicators.slice(0, 4).map((indicator, index) => {
        const IconComponent = indicator.icon
        return (
          <div key={index} className="flex flex-col items-center text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
            <IconComponent className="w-8 h-8 text-white mb-2" />
            <div className="text-white text-sm font-semibold mb-1">
              {indicator.text}
            </div>
            <div className="text-white text-xs opacity-90">
              {indicator.description}
            </div>
          </div>
        )
      })}
      {/* Responsive: fazlası alt satırda */}
      <div className="hidden md:grid grid-cols-3 gap-4 col-span-4 mt-4">
        {trustIndicators.slice(4).map((indicator, index) => {
          const IconComponent = indicator.icon
          return (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <IconComponent className="w-8 h-8 text-white mb-2" />
              <div className="text-white text-sm font-semibold mb-1">
                {indicator.text}
              </div>
              <div className="text-white text-xs opacity-90">
                {indicator.description}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 