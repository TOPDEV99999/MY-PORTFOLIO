import { createContext, useContext, useState, ReactNode } from 'react';

export type BackgroundId = 'animation' | 'back1' | 'back2' | 'back3';

export interface BackgroundOption {
  id: BackgroundId;
  label: string;
  preview: string; // CSS gradient or image URL
  isImage: boolean;
}

export const BACKGROUNDS: BackgroundOption[] = [
  {
    id: 'animation',
    label: 'Animation',
    preview: 'linear-gradient(135deg, #040810, #07111f, #2878ff22)',
    isImage: false,
  },
  {
    id: 'back1',
    label: 'Back 1',
    preview: '/back1.jpg',
    isImage: true,
  },
  {
    id: 'back2',
    label: 'Back 2',
    preview: '/back2.jpg',
    isImage: true,
  },
  {
    id: 'back3',
    label: 'Back 3',
    preview: '/back3.jpg',
    isImage: true,
  },
];

interface DesktopContextType {
  background: BackgroundId;
  setBackground: (id: BackgroundId) => void;
}

const DesktopContext = createContext<DesktopContextType>({
  background: 'animation',
  setBackground: () => {},
});

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [background, setBackgroundState] = useState<BackgroundId>(() => {
    return (localStorage.getItem('daniel-os-bg') as BackgroundId) || 'animation';
  });

  const setBackground = (id: BackgroundId) => {
    setBackgroundState(id);
    localStorage.setItem('daniel-os-bg', id);
  };

  return (
    <DesktopContext.Provider value={{ background, setBackground }}>
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  return useContext(DesktopContext);
}
