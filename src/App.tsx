import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { TopHeader } from './components/layout/TopHeader';
import { Navbar } from './components/layout/Navbar';
import { MarqueeNotice } from './components/layout/MarqueeNotice';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CommitteePage } from './pages/CommitteePage';
import { FormerCommitteePage } from './pages/FormerCommitteePage';
import { TeachersPage } from './pages/TeachersPage';
import { FormerTeachersPage } from './pages/FormerTeachersPage';
import { StudentOverviewPage } from './pages/StudentOverviewPage';
import { StudentListPage } from './pages/StudentListPage';
import { ResultsPage } from './pages/ResultsPage';
import { NoticesPage } from './pages/NoticesPage';
import { GalleryPage } from './pages/GalleryPage';
import { RoutinePage } from './pages/RoutinePage';
import { ContactPage } from './pages/ContactPage';
import { TeacherPortalPage } from './pages/TeacherPortalPage';
import { CustomDynamicPage } from './pages/CustomDynamicPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const renderCurrentPage = () => {
    // Dynamic page matching
    if (currentPath.startsWith('/page/')) {
      const slug = currentPath.replace('/page/', '');
      return <CustomDynamicPage slug={slug} />;
    }

    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/committee':
        return <CommitteePage />;
      case '/committee/former':
        return <FormerCommitteePage />;
      case '/teachers':
        return <TeachersPage />;
      case '/teachers/former':
        return <FormerTeachersPage />;
      case '/students/overview':
        return <StudentOverviewPage />;
      case '/students/list':
        return <StudentListPage />;
      case '/results':
        return <ResultsPage />;
      case '/notices':
        return <NoticesPage />;
      case '/gallery':
        return <GalleryPage />;
      case '/routine':
        return <RoutinePage />;
      case '/contact':
        return <ContactPage />;
      case '/teacher/portal':
        return <TeacherPortalPage />;
      case '/admin':
      case '/admin/dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  const isAdminView = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* 1. Official Top Branding & Bangladesh Govt. Pattern Header */}
      <TopHeader />

      {/* 2. Responsive Multi-tier Navigation Bar */}
      <Navbar />

      {/* 3. Urgent Notices Marquee Bar */}
      {!isAdminView && <MarqueeNotice />}

      {/* 4. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-300">
        {renderCurrentPage()}
      </main>

      {/* 5. Comprehensive Institutional Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
