import React from 'react';

const Test: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Stil Test Sayfası</h1>
        
        {/* Tailwind CSS Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tailwind CSS Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <h3 className="font-bold">Mavi Kutu</h3>
              <p>Tailwind CSS çalışıyor!</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg">
              <h3 className="font-bold">Yeşil Kutu</h3>
              <p>Renkler görünüyor!</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg">
              <h3 className="font-bold">Kırmızı Kutu</h3>
              <p>Stiller aktif!</p>
            </div>
          </div>
        </div>

        {/* Custom CSS Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Custom CSS Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-outline">Outline Button</button>
            <button className="btn btn-ghost">Ghost Button</button>
          </div>
        </div>

        {/* Badge Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Badge Test</h2>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-error">Error</span>
            <span className="badge badge-outline">Outline</span>
          </div>
        </div>

        {/* Card Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Card Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Card Başlık</h3>
              <p className="text-gray-600">Bu bir test kartıdır. Stiller çalışıyor mu?</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">İkinci Kart</h3>
              <p className="text-gray-600">Eğer bu kartlar güzel görünüyorsa, CSS çalışıyor demektir.</p>
            </div>
          </div>
        </div>

        {/* Input Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Input Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" className="input" placeholder="Adınız" />
            <input type="email" className="input" placeholder="E-posta" />
          </div>
        </div>

        {/* Animation Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Animation Test</h2>
          <div className="flex flex-wrap gap-4">
            <div className="animate-float bg-blue-500 text-white p-4 rounded-lg">
              Float Animation
            </div>
            <div className="animate-pulse-slow bg-green-500 text-white p-4 rounded-lg">
              Pulse Animation
            </div>
            <div className="loading-spinner w-8 h-8"></div>
          </div>
        </div>

        {/* Gradient Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gradient Test</h2>
          <h3 className="gradient-text text-3xl font-bold">Gradient Text</h3>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg mt-4">
            <h3 className="text-2xl font-bold">Gradient Background</h3>
            <p>Bu gradient arka plan çalışıyor mu?</p>
          </div>
        </div>

        {/* Responsive Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Responsive Test</h2>
          <div className="text-responsive bg-yellow-100 p-4 rounded-lg">
            <p>Bu metin responsive boyutta olmalı</p>
          </div>
        </div>

        {/* Shadow Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shadow Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-soft">
              <p>Soft Shadow</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-medium">
              <p>Medium Shadow</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-large">
              <p>Large Shadow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
