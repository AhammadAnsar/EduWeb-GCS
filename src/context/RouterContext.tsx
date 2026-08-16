import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
  params: {}
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getNormalizedPath = () => {
    // Check hash first for standalone SPA iframe compatibility, fallback to pathname
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) {
      return hash;
    }
    const path = window.location.pathname || '/';
    return path === '' ? '/' : path;
  };

  const [currentPath, setCurrentPath] = useState<string>(getNormalizedPath());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('http') || path.startsWith('tel:') || path.startsWith('mailto:')) {
      window.open(path, '_blank');
      return;
    }

    try {
      window.history.pushState({}, '', path);
    } catch {
      // In restricted iframe environments, fallback to hash
      window.location.hash = path;
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simple path parameter extraction
  const params: Record<string, string> = {};
  if (currentPath.startsWith('/notice/')) {
    params.id = currentPath.replace('/notice/', '');
  } else if (currentPath.startsWith('/teachers/profile/')) {
    params.pdsId = currentPath.replace('/teachers/profile/', '');
  } else if (currentPath.startsWith('/page/')) {
    params.slug = currentPath.replace('/page/', '');
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};
