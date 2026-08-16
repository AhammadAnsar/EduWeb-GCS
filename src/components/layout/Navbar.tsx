import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useSchoolData } from '../../hooks/useSchoolData';
import {
  Home,
  Info,
  Users,
  GraduationCap,
  Award,
  Bell,
  Image,
  PhoneCall,
  Menu,
  X,
  ChevronDown,
  FileText,
  Calendar
} from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: { title: string; path: string; badge?: string }[];
}

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { customPages } = useSchoolData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      title: 'প্রচ্ছদ',
      icon: <Home className="w-4 h-4" />,
      path: '/'
    },
    {
      title: 'আমাদের সম্পর্কে',
      icon: <Info className="w-4 h-4" />,
      submenu: [
        { title: 'প্রতিষ্ঠান পরিচিতি ও সারসংক্ষেপ', path: '/about' },
        { title: 'ইতিহাস ও ঐতিহ্য', path: '/about#history' },
        { title: 'লক্ষ্য ও উদ্দেশ্য', path: '/about#mission' },
        { title: 'স্বীকৃতি ও এমপিও সংক্রান্ত তথ্য', path: '/about#mpo' },
        { title: 'সিটিজেন চার্টার (নাগরিক সেবা সনদ)', path: '/page/citizen-charter' },
        { title: 'শিক্ষার্থীদের আচরণবিধি', path: '/page/code-of-conduct' },
        ...(customPages || []).filter(p => p.slug !== 'citizen-charter' && p.slug !== 'code-of-conduct').map(p => ({
          title: p.title,
          path: `/page/${p.slug}`
        }))
      ]
    },
    {
      title: 'পরিচালনা পরিষদ',
      icon: <Users className="w-4 h-4" />,
      submenu: [
        { title: 'কমিটি সংক্রান্ত ওভারভিউ', path: '/committee' },
        { title: 'বর্তমান পরিচালনা পর্ষদ তালিকা', path: '/committee' },
        { title: 'সাবেক সভাপতি মহোদয়গণের তালিকা', path: '/committee/former?role=president' },
        { title: 'সাবেক প্রতিষ্ঠাতা সদস্যগণের তালিকা', path: '/committee/former?role=founder' },
        { title: 'সাবেক সকল সদস্য মহোদয়গণের তালিকা', path: '/committee/former?role=all' }
      ]
    },
    {
      title: 'শিক্ষক ও কর্মচারী',
      icon: <Users className="w-4 h-4" />,
      submenu: [
        { title: 'পদের বিবরণ ও প্যাটার্ন ওভারভিউ', path: '/teachers' },
        { title: 'কর্মরত শিক্ষক ও কর্মচারীবৃন্দ', path: '/teachers#active' },
        { title: 'প্রশাসনিক কর্মকর্তা ও শিক্ষকবৃন্দ', path: '/teachers?cat=teacher' },
        { title: 'কর্মচারী ও সহায়ক স্টাফ', path: '/teachers?cat=staff' },
        { title: 'সাবেক শিক্ষক ও কর্মচারীবৃন্দ', path: '/teachers/former' }
      ]
    },
    {
      title: 'শিক্ষার্থী কর্নার',
      icon: <GraduationCap className="w-4 h-4" />,
      submenu: [
        { title: 'শ্রেণিভিত্তিক শিক্ষার্থী পরিসংখ্যান', path: '/students/overview' },
        { title: 'শ্রেণিভিত্তিক শিক্ষার্থী তালিকা', path: '/students/list' },
        { title: 'ক্লাস ও পরীক্ষার রুটিন', path: '/routine' },
        { title: 'একাডেমিক ক্যালেন্ডার ও ছুটি', path: '/routine#calendar' }
      ]
    },
    {
      title: 'ফলাফল',
      icon: <Award className="w-4 h-4" />,
      submenu: [
        { title: 'পাবলিক পরীক্ষা (SSC) ফলাফল ওভারভিউ', path: '/results' },
        { title: 'সালভিত্তিক পাবলিক পরীক্ষার পরিসংখ্যান', path: '/results#public-history' },
        { title: 'অভ্যন্তরীণ পরীক্ষার ফলাফল', path: '/results#internal' }
      ]
    },
    {
      title: 'নোটিশ ও বিজ্ঞপ্তি',
      icon: <Bell className="w-4 h-4" />,
      path: '/notices'
    },
    {
      title: 'গ্যালারি',
      icon: <Image className="w-4 h-4" />,
      path: '/gallery'
    },
    {
      title: 'যোগাযোগ',
      icon: <PhoneCall className="w-4 h-4" />,
      path: '/contact'
    }
  ];

  const handleNavClick = (path?: string) => {
    if (path) {
      navigate(path);
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <nav className="bg-emerald-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {menuItems.map((item, idx) => {
              const isActive = item.path === currentPath || (item.submenu && item.submenu.some(sub => sub.path === currentPath));
              const hasDropdown = !!item.submenu;

              return (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.title)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-950 text-amber-300 shadow-inner'
                        : 'hover:bg-emerald-700 text-emerald-50 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {hasDropdown && <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-70 group-hover:rotate-180 transition-transform" />}
                  </button>

                  {/* Dropdown Menu */}
                  {hasDropdown && activeDropdown === item.title && (
                    <div className="absolute left-0 top-full mt-0 w-64 bg-white text-slate-800 rounded-b-lg shadow-xl border-t-2 border-amber-400 py-1 z-50 animate-in fade-in duration-150">
                      {item.submenu?.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleNavClick(sub.path)}
                          className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between border-b border-slate-100 last:border-none cursor-pointer"
                        >
                          <span>{sub.title}</span>
                          {sub.badge && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                              {sub.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Action Button on Desktop */}
          <div className="hidden xl:flex items-center gap-2">
            <button
              onClick={() => navigate('/students/list')}
              className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold px-3 py-1.5 rounded text-white flex items-center gap-1 transition shadow-xs cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>শিক্ষার্থী খুঁজুন</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center justify-between w-full">
            <span className="text-sm font-bold text-emerald-100 flex items-center gap-1.5">
              <Home className="w-4 h-4 text-amber-300" />
              মেনুবার
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md hover:bg-emerald-700 text-white focus:outline-hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-emerald-900 border-t border-emerald-700 px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
          {menuItems.map((item, idx) => (
            <div key={idx} className="border-b border-emerald-800/60 pb-1">
              <div
                className="flex items-center justify-between py-2 text-sm font-semibold text-emerald-100 hover:text-white cursor-pointer"
                onClick={() => {
                  if (item.path && !item.submenu) {
                    handleNavClick(item.path);
                  } else {
                    setActiveDropdown(activeDropdown === item.title ? null : item.title);
                  }
                }}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </span>
                {item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === item.title ? 'rotate-180 text-amber-300' : ''
                    }`}
                  />
                )}
              </div>

              {item.submenu && activeDropdown === item.title && (
                <div className="pl-6 space-y-1 py-1 bg-emerald-950/40 rounded-md">
                  {item.submenu.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleNavClick(sub.path)}
                      className="block w-full text-left py-1.5 text-xs text-emerald-200 hover:text-amber-300 cursor-pointer"
                    >
                      • {sub.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('/teacher/portal')}
              className="w-full bg-emerald-700 text-center text-xs py-2 rounded font-semibold text-white cursor-pointer"
            >
              শিক্ষক লগইন পোর্টাল
            </button>
            <button
              onClick={() => handleNavClick('/admin/dashboard')}
              className="w-full bg-amber-500 text-slate-950 text-center text-xs py-2 rounded font-semibold cursor-pointer"
            >
              অ্যাডমিন সিএমএস প্যানেল
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
