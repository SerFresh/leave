import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Menu, X, Home, LogOut, Calendar, ClipboardList, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      nameKey: 'menu.home',
      icon: <Home size={20} />,
      path: '/dashboard',
    },
    {
      nameKey: 'menu.leaveNotification',
      icon: <Calendar size={20} />,
      path: '/leave-notification',
    },
    {
      nameKey: 'menu.leaveHistory',
      icon: <ClipboardList size={20} />,
      path: '/leave-history',
    },
    {
      nameKey: 'menu.editProfile',
      icon: <User size={20} />,
      path: '/profile',
    },
  ];


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-primary-600 text-white">
          <h2 className="text-xl font-bold">Leave System</h2>
          <button
            className="lg:hidden rounded-md p-1 hover:bg-primary-700 focus:outline-none"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6">
          {user && (
            <div className="mb-6 pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600">Welcome,</p>
              <p className="font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          )}

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.nameKey}
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-primary-50 hover:text-primary-700 transition-colors"
                onClick={() => {
                  navigate(item.path);
                  closeSidebar();
                }}
              >
                <span className="mr-3 text-gray-500">{item.icon}</span>
                <span>{t(item.nameKey)}</span>

              </button>
            ))}

            <button
              className="flex items-center w-full px-4 py-2 mt-4 text-gray-700 rounded-md hover:bg-error-50 hover:text-error-700 transition-colors"
              onClick={handleLogout}
            >
              <span className="mr-3 text-gray-500">
                <LogOut size={20} />
              </span>
              <span>{t('menu.logout')}</span>

            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              className="lg:hidden rounded-md p-2 hover:bg-gray-100 focus:outline-none"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center">
              {user && (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-semibold">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline-block">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              )}
            </div>

            <div className="space-x-2">
              <button
                onClick={() => i18n.changeLanguage('th')}
                className={`${i18n.language === 'th' ? 'font-bold underline' : ''}`}
              >
                TH
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`${i18n.language === 'en' ? 'font-bold underline' : ''}`}
              >
                EN
              </button>
            </div>

          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;