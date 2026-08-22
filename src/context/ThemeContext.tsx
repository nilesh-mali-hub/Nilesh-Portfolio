import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export type ThemeMode = 'dark' | 'light';

export interface ThemeAccent {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  fgColor: string;
  glow: string;
  border: string;
  badgeBg: string;
  description: string;
}

export const THEME_ACCENTS: ThemeAccent[] = [
  {
    id: 'cyber-lime',
    name: 'Cyber Lime',
    color: '#D1FF52',
    hoverColor: '#c2f241',
    fgColor: '#000000',
    glow: 'rgba(209, 255, 82, 0.35)',
    border: 'rgba(209, 255, 82, 0.45)',
    badgeBg: 'rgba(209, 255, 82, 0.12)',
    description: 'Signature vibrant neon lime palette'
  },
  {
    id: 'electric-cyan',
    name: 'Electric Cyan',
    color: '#00F0FF',
    hoverColor: '#00dbe8',
    fgColor: '#000000',
    glow: 'rgba(0, 240, 255, 0.35)',
    border: 'rgba(0, 240, 255, 0.45)',
    badgeBg: 'rgba(0, 240, 255, 0.12)',
    description: 'Futuristic hyper-digital cyan glow'
  },
  {
    id: 'neon-violet',
    name: 'Neon Violet',
    color: '#A855F7',
    hoverColor: '#9333ea',
    fgColor: '#ffffff',
    glow: 'rgba(168, 85, 247, 0.35)',
    border: 'rgba(168, 85, 247, 0.45)',
    badgeBg: 'rgba(168, 85, 247, 0.14)',
    description: 'Creative synthwave ultraviolet'
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    color: '#FF6B35',
    hoverColor: '#ea5924',
    fgColor: '#ffffff',
    glow: 'rgba(255, 107, 53, 0.35)',
    border: 'rgba(255, 107, 53, 0.45)',
    badgeBg: 'rgba(255, 107, 53, 0.14)',
    description: 'Energetic warm flare & sunset orange'
  },
  {
    id: 'crimson-rose',
    name: 'Crimson Rose',
    color: '#F43F5E',
    hoverColor: '#e11d48',
    fgColor: '#ffffff',
    glow: 'rgba(244, 63, 94, 0.35)',
    border: 'rgba(244, 63, 94, 0.45)',
    badgeBg: 'rgba(244, 63, 94, 0.14)',
    description: 'High-impact magenta rose & ruby'
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Tech',
    color: '#10B981',
    hoverColor: '#059669',
    fgColor: '#ffffff',
    glow: 'rgba(16, 185, 129, 0.35)',
    border: 'rgba(16, 185, 129, 0.45)',
    badgeBg: 'rgba(16, 185, 129, 0.14)',
    description: 'Crisp organic emerald matrix'
  },
  {
    id: 'sapphire-blue',
    name: 'Sapphire Blue',
    color: '#3B82F6',
    hoverColor: '#2563eb',
    fgColor: '#ffffff',
    glow: 'rgba(59, 130, 246, 0.35)',
    border: 'rgba(59, 130, 246, 0.45)',
    badgeBg: 'rgba(59, 130, 246, 0.14)',
    description: 'Modern cobalt sapphire aesthetic'
  },
  {
    id: 'amber-gold',
    name: 'Luxury Amber',
    color: '#F59E0B',
    hoverColor: '#d97706',
    fgColor: '#000000',
    glow: 'rgba(245, 158, 11, 0.35)',
    border: 'rgba(245, 158, 11, 0.45)',
    badgeBg: 'rgba(245, 158, 11, 0.14)',
    description: 'Warm champagne luxury gold'
  }
];

interface ThemeContextType {
  theme: ThemeMode;
  mode: ThemeMode;
  accent: ThemeAccent;
  accentId: string;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  setAccentId: (accentId: string) => void;
  syncWithBackend: () => Promise<void>;
  availableAccents: ThemeAccent[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize mode
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nilesh_theme_mode') || localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  // Initialize accent
  const [accentId, setAccentIdState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedAccent = localStorage.getItem('nilesh_theme_accent');
      if (savedAccent && THEME_ACCENTS.some(a => a.id === savedAccent)) {
        return savedAccent;
      }
    }
    return 'cyber-lime';
  });

  const activeAccent = THEME_ACCENTS.find(a => a.id === accentId) || THEME_ACCENTS[0];

  // Apply CSS variables & classes to DOM root
  const applyThemeToDOM = useCallback((currentMode: ThemeMode, currentAccent: ThemeAccent) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;

    // 1. Mode Classes
    if (currentMode === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      body.classList.add('light');
      body.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
    }

    // 2. CSS Accent Variables on :root
    root.style.setProperty('--accent-color', currentAccent.color);
    root.style.setProperty('--accent-hover', currentAccent.hoverColor);
    root.style.setProperty('--accent-fg', currentAccent.fgColor);
    root.style.setProperty('--accent-glow', currentAccent.glow);
    root.style.setProperty('--accent-border', currentAccent.border);
    root.style.setProperty('--accent-badge-bg', currentAccent.badgeBg);
    root.style.setProperty('--accent-id', currentAccent.id);

    // Also set meta theme-color for mobile browser address bars
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', currentMode === 'light' ? '#f8fafc' : '#0a0a0a');
    }
  }, []);

  // Fetch backend theme configuration on startup
  useEffect(() => {
    let isMounted = true;
    fetch('/api/theme')
      .then(res => res.json())
      .then(data => {
        if (!isMounted || !data) return;
        if (data.mode && (data.mode === 'light' || data.mode === 'dark')) {
          // If not overridden locally in this session, match backend default
          const localSavedMode = localStorage.getItem('nilesh_theme_mode');
          if (!localSavedMode) {
            setModeState(data.mode);
          }
        }
        if (data.accentId && THEME_ACCENTS.some(a => a.id === data.accentId)) {
          const localSavedAccent = localStorage.getItem('nilesh_theme_accent');
          if (!localSavedAccent) {
            setAccentIdState(data.accentId);
          }
        }
      })
      .catch(err => {
        console.warn('Backend theme sync note:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Whenever mode or accentId changes, apply to DOM and persist to localStorage
  useEffect(() => {
    applyThemeToDOM(mode, activeAccent);
    localStorage.setItem('nilesh_theme_mode', mode);
    localStorage.setItem('theme', mode);
    localStorage.setItem('nilesh_theme_accent', accentId);
  }, [mode, accentId, activeAccent, applyThemeToDOM]);

  // Handler to toggle light / dark mode
  const toggleTheme = () => {
    setModeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const setAccentId = (newAccentId: string) => {
    if (THEME_ACCENTS.some(a => a.id === newAccentId)) {
      setAccentIdState(newAccentId);
    }
  };

  // Sync current theme state to backend database so it persists across sessions & visitors
  const syncWithBackend = async () => {
    try {
      await fetch('/api/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          accentId,
          accentColor: activeAccent.color,
          accentFg: activeAccent.fgColor
        })
      });
    } catch (err) {
      console.error('Error saving theme to backend:', err);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: mode,
        mode,
        accent: activeAccent,
        accentId,
        toggleTheme,
        setMode,
        setAccentId,
        syncWithBackend,
        availableAccents: THEME_ACCENTS
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
