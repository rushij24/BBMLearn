import React, { useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { cn } from '../lib/utils';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Set active tab based on current path
  useEffect(() => {
    const path = location.pathname.split('/')[1] || '';
    if (path === '') {
      setActiveTab('dashboard');
    } else if (['dashboard', 'labs', 'playground', 'ctf', 'profile', 'learning'].includes(path)) {
      setActiveTab(path);
    }
  }, [location]);

  // Handle tab change through setActiveTab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab === 'dashboard' ? '' : tab}`);
  };

  return (
    <div className={cn("h-screen bg-gray-900 text-gray-100 flex overflow-hidden")}>
      {/* Sidebar - Fixed position */}
      <div className="h-full flex-shrink-0">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Main Content - Scrollable */}
      <div className={cn(
        "flex-1 overflow-hidden transition-all duration-300",
        sidebarCollapsed ? "pl-1" : "pl-0",
        "pr-4 py-4"
      )}>
        <div className={cn(
          "h-full rounded-tl-xl rounded-bl-xl bg-gray-900/95 backdrop-blur-sm overflow-auto",
          "border-l border-t border-b border-gray-800/40",
          "px-6 py-5"
        )}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 