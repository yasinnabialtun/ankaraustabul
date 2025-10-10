import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="container-fluid p-6 lg:p-8">
            {/* Outlet content will be rendered here in Next.js */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
