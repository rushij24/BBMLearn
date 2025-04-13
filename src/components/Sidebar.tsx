import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Terminal, Shield, Code2, Flag, LayoutDashboard, User, 
  BookOpen, Settings, LogOut, ChevronRight, Menu, X,
  BarChart3, Award, HelpCircle, Bookmark
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  isCollapsed,
  setIsCollapsed
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // If the parent provides collapse state controls, use those instead
  const isControlled = isCollapsed !== undefined && setIsCollapsed !== undefined;
  const isCollapsedState = isControlled ? isCollapsed : collapsed;
  
  const toggleCollapsed = () => {
    if (isControlled) {
      setIsCollapsed!(!isCollapsed);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleNavigation = (tabId: string, path: string) => {
    setActiveTab(tabId);
    navigate(path);
  };

  // Group the navigation items with color themes
  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/', color: 'from-violet-500 to-indigo-500' },
    { icon: Terminal, label: 'Labs', id: 'labs', path: '/labs', color: 'from-emerald-500 to-teal-500' },
    { icon: Code2, label: 'Playground', id: 'playground', path: '/playground', color: 'from-amber-500 to-orange-500' },
    { icon: Flag, label: 'CTF', id: 'ctf', path: '/ctf', color: 'from-red-500 to-rose-500' },
  ];

  const resourcesNavItems = [
    { icon: BookOpen, label: 'Learning', id: 'learning', path: '/learning', color: 'from-blue-500 to-sky-500' },
    { icon: Award, label: 'Achievements', id: 'achievements', path: '/achievements', color: 'from-yellow-500 to-amber-500' },
    { icon: Bookmark, label: 'Saved', id: 'saved', path: '/saved', color: 'from-purple-500 to-fuchsia-500' },
  ];

  const NavButton = ({ icon: Icon, label, id, path, color, hasBadge = false }: { 
    icon: any; 
    label: string; 
    id: string; 
    path: string;
    color: string;
    hasBadge?: boolean;
  }) => {
    const isActive = activeTab === id || location.pathname === path;
    
    return (
      <button
        onClick={() => handleNavigation(id, path)}
        className={cn(
          "flex items-center w-full rounded-lg transition-all relative overflow-hidden",
          isCollapsedState ? "justify-center py-3 px-0" : "py-2.5 px-3",
          isActive
            ? 'text-white'
            : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
        )}
      >
        {isActive && (
          <div className={cn(
            "absolute inset-0 opacity-90 bg-gradient-to-r",
            color
          )}></div>
        )}
        
        <div className={cn(
          "flex items-center relative z-10",
          isCollapsedState ? "justify-center" : "gap-3"
        )}>
          <div className={cn("relative")}>
            <Icon size={isCollapsedState ? 20 : 18} className={isActive ? "text-white" : ""} />
            {hasBadge && (
              <span className={cn(
                "absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
              )} />
            )}
          </div>
          {!isCollapsedState && (
            <span className={cn(
              "font-medium text-sm",
              isActive && "text-white"
            )}>
              {label}
            </span>
          )}
        </div>
      </button>
    );
  };

  const NavGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className={cn("space-y-1", isCollapsedState && "items-center")}>
      {!isCollapsedState && (
        <h3 className="text-xs uppercase text-gray-400 font-medium px-3 py-2">{title}</h3>
      )}
      {children}
    </div>
  );

  return (
    <div className={cn(
      "bg-gray-900 border-r border-gray-800/60 h-screen transition-all duration-300 flex flex-col",
      "bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950",
      isCollapsedState ? "w-16" : "w-64"
    )}>
      {/* Header with Logo */}
      <div className={cn(
        "h-16 flex items-center border-b border-gray-800/60 px-3",
        isCollapsedState ? "justify-center" : "px-5"
      )}>
        {!isCollapsedState ? (
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-1.5">
              <Shield className="text-white" size={20} />
            </div>
            <h1 className="font-bold text-lg ml-2 text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              BBMLearn
            </h1>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-1.5">
            <Shield className="text-white" size={20} />
          </div>
        )}
        <button 
          onClick={toggleCollapsed}
          className={cn(
            "p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/70",
            isCollapsedState ? "mx-auto mt-4" : "ml-auto"
          )}
        >
          {isCollapsedState ? <Menu size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className={cn("flex-1 py-4 px-2 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800")}>
        <NavGroup title="Main">
          {mainNavItems.map((item) => (
            <NavButton 
              key={item.id} 
              icon={item.icon} 
              label={item.label} 
              id={item.id} 
              path={item.path}
              color={item.color}
              hasBadge={item.id === 'labs'} // Example badge on Labs
            />
          ))}
        </NavGroup>

        <NavGroup title="Resources">
          {resourcesNavItems.map((item) => (
            <NavButton 
              key={item.id} 
              icon={item.icon} 
              label={item.label} 
              id={item.id} 
              path={item.path} 
              color={item.color}
            />
          ))}
        </NavGroup>
      </div>

      {/* User Section */}
      <div className={cn(
        "mt-auto border-t border-gray-800/60",
        "bg-gradient-to-t from-gray-950 to-transparent pt-6",
        isCollapsedState ? "py-4 px-2" : "p-4"
      )}>
        {!isCollapsedState && (
          <div className="flex items-center mb-4 px-2">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-indigo-500/20">
              <User size={16} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">john.doe@example.com</p>
            </div>
          </div>
        )}
        
        <div className={cn("space-y-1")}>
          <NavButton 
            icon={Settings} 
            label="Settings" 
            id="settings" 
            path="/profile" 
            color="from-gray-600 to-gray-700" 
          />
          {isCollapsedState ? (
            <NavButton 
              icon={HelpCircle} 
              label="Help" 
              id="help" 
              path="/help" 
              color="from-gray-600 to-gray-700" 
            />
          ) : (
            <button className="flex items-center gap-3 w-full py-2.5 px-3 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white">
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 