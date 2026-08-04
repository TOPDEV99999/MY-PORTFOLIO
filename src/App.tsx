import { useState, useCallback } from 'react';
import { FolderOpen, Brain, ScrollText, BookOpen, CalendarDays, Mail } from 'lucide-react';
import { ThemeProvider }        from './context/ThemeContext';
import { WindowManagerProvider }  from './context/WindowManager';
import { DesktopProvider }        from './context/DesktopContext';
import DesktopBackground  from './components/Desktop/DesktopBackground';
import ContextMenu        from './components/Desktop/ContextMenu';
import HomeDesktop        from './components/Apps/HomeDesktop';
import Taskbar            from './components/OS/Taskbar';
import StatusBar          from './components/OS/StatusBar';
import Window             from './components/OS/Window';
import BootScreen         from './components/OS/BootScreen';
import NovaAI             from './components/Apps/NovaAI';import ProjectExplorer    from './components/Apps/ProjectExplorer';
import SkillsDashboard    from './components/Apps/SkillsDashboard';
import ExperienceTimeline from './components/Apps/ExperienceTimeline';
import BlogCenter         from './components/Apps/BlogCenter';
import MeetingRoom        from './components/Apps/MeetingRoom';
import MessageCenter      from './components/Apps/MessageCenter';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; open: boolean }>({
    x: 0, y: 0, open: false,
  });

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    // Only trigger on the raw desktop (not on windows or taskbar)
    const target = e.target as HTMLElement;
    if (
      target.closest('[data-window]') ||
      target.closest('[data-taskbar]') ||
      target.closest('[data-statusbar]') ||
      target.closest('button') ||
      target.closest('a')
    ) return;
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY, open: true });
  }, []);

  const closeCtxMenu = useCallback(() => {
    setCtxMenu(m => ({ ...m, open: false }));
  }, []);

  return (
    <ThemeProvider>
      <DesktopProvider>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}

        <WindowManagerProvider>
          <div
            onContextMenu={handleContextMenu}
            style={{
              position: 'relative',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              userSelect: 'none',
              opacity: booted ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            {/* Layer 0 — Background */}
            <DesktopBackground />

            {/* Layer 1 — Home desktop hero */}
            <div style={{
              position: 'absolute', inset: 0,
              paddingTop: 30, paddingBottom: 56,
              zIndex: 5, pointerEvents: 'none',
            }}>
              <HomeDesktop />
            </div>

            {/* Layer 2 — App windows */}
            <Window id="projects" title="Project Explorer"
              icon={<FolderOpen size={13} />} accent="#f59e0b"
              defaultWidth={900} defaultHeight={580} defaultX={100} defaultY={45}>
              <ProjectExplorer />
            </Window>

            <Window id="skills" title="Skills Dashboard"
              icon={<Brain size={13} />} accent="#7c3aed"
              defaultWidth={800} defaultHeight={560} defaultX={120} defaultY={55}>
              <SkillsDashboard />
            </Window>

            <Window id="experience" title="Experience — System Upgrade History"
              icon={<ScrollText size={13} />} accent="#10b981"
              defaultWidth={700} defaultHeight={580} defaultX={110} defaultY={45}>
              <ExperienceTimeline />
            </Window>

            <Window id="blog" title="Knowledge Center"
              icon={<BookOpen size={13} />} accent="#f43f5e"
              defaultWidth={840} defaultHeight={560} defaultX={90} defaultY={55}>
              <BlogCenter />
            </Window>

            <Window id="meeting" title="Collaboration Center"
              icon={<CalendarDays size={13} />} accent="#8b5cf6"
              defaultWidth={640} defaultHeight={620} defaultX={150} defaultY={35}>
              <MeetingRoom />
            </Window>

            <Window id="contact" title="Message Center"
              icon={<Mail size={13} />} accent="#ec4899"
              defaultWidth={560} defaultHeight={610} defaultX={170} defaultY={40}>
              <MessageCenter />
            </Window>

            {/* Layer 3 — OS chrome */}
            <div data-statusbar><StatusBar /></div>
            <div data-taskbar><Taskbar /></div>

            {/* Layer 4 — Context menu */}
            <ContextMenu
              x={ctxMenu.x}
              y={ctxMenu.y}
              open={ctxMenu.open}
              onClose={closeCtxMenu}
            />
          </div>
        </WindowManagerProvider>
      </DesktopProvider>
    </ThemeProvider>
  );
}
