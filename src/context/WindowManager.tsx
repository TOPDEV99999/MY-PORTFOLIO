import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AppId =
  | 'home'
  | 'nova'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'blog'
  | 'meeting'
  | 'contact';

interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface WindowManagerContextType {
  windows: Record<AppId, WindowState>;
  activeApp: AppId;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  isOpen: (id: AppId) => boolean;
  isActive: (id: AppId) => boolean;
}

const DEFAULT_WINDOWS: Record<AppId, WindowState> = {
  home:       { id: 'home',       isOpen: true,  isMinimized: false, zIndex: 10 },
  nova:       { id: 'nova',       isOpen: false, isMinimized: false, zIndex: 10 },
  projects:   { id: 'projects',   isOpen: false, isMinimized: false, zIndex: 10 },
  skills:     { id: 'skills',     isOpen: false, isMinimized: false, zIndex: 10 },
  experience: { id: 'experience', isOpen: false, isMinimized: false, zIndex: 10 },
  blog:       { id: 'blog',       isOpen: false, isMinimized: false, zIndex: 10 },
  meeting:    { id: 'meeting',    isOpen: false, isMinimized: false, zIndex: 10 },
  contact:    { id: 'contact',    isOpen: false, isMinimized: false, zIndex: 10 },
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

let zCounter = 20;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(DEFAULT_WINDOWS);
  const [activeApp, setActiveApp] = useState<AppId>('home');

  const focusApp = useCallback((id: AppId) => {
    zCounter++;
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: zCounter, isMinimized: false },
    }));
    setActiveApp(id);
  }, []);

  const openApp = useCallback((id: AppId) => {
    zCounter++;
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: zCounter },
    }));
    setActiveApp(id);
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false },
    }));
    if (activeApp === id) setActiveApp('home');
  }, [activeApp]);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeApp === id) setActiveApp('home');
  }, [activeApp]);

  const isOpen   = useCallback((id: AppId) => windows[id].isOpen && !windows[id].isMinimized, [windows]);
  const isActive = useCallback((id: AppId) => activeApp === id, [activeApp]);

  return (
    <WindowManagerContext.Provider value={{
      windows, activeApp,
      openApp, closeApp, minimizeApp, focusApp,
      isOpen, isActive,
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used inside WindowManagerProvider');
  return ctx;
}
