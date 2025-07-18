function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '2rem'
        }}>
          Ankara Usta Bul
        </h1>
        <p style={{ 
          fontSize: '1.125rem', 
          textAlign: 'center',
          color: '#4b5563',
          marginBottom: '1.5rem'
        }}>
          Hoş geldiniz! Bu site Vercel'de çalışıyor.
        </p>
        <div style={{ textAlign: 'center' }}>
          <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Test Butonu
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
