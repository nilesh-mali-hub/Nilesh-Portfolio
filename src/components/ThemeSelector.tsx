import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Palette, Check, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeSelector({ className = '' }: { className?: string }) {
  const { mode, toggleTheme, accentId, setAccentId, availableAccents, syncWithBackend } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectAccent = (id: string) => {
    setAccentId(id);
    // Persist to backend
    syncWithBackend();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Quick Trigger Buttons */}
      <div className="flex items-center gap-1.5 bg-neutral-900/60 p-1 rounded-full border border-neutral-800 backdrop-blur-md">
        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Light / Dark Mode"
          title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-[var(--accent-color)] hover:bg-neutral-800/80 transition-all active:scale-95 cursor-pointer relative"
        >
          <Sun className={`w-4 h-4 transition-all duration-300 absolute ${mode === 'light' ? 'rotate-0 scale-100 opacity-100 text-amber-500' : 'rotate-90 scale-0 opacity-0'}`} />
          <Moon className={`w-4 h-4 transition-all duration-300 absolute ${mode === 'dark' ? 'rotate-0 scale-100 opacity-100 text-neutral-200' : '-rotate-90 scale-0 opacity-0'}`} />
        </button>

        {/* Theme Palette Popover Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Customize Theme Palette"
          title="Customize Theme Colors & Accent"
          className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-[var(--accent-color)] hover:bg-neutral-800/80 transition-all active:scale-95 cursor-pointer relative group"
        >
          <div 
            className="w-3.5 h-3.5 rounded-full border-2 border-white/20 transition-transform group-hover:scale-110 shadow-sm"
            style={{ backgroundColor: 'var(--accent-color)' }}
          />
        </button>
      </div>

      {/* Palette Selector Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-72 p-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-[150] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[var(--accent-color)]" />
                <span className="font-display font-bold text-xs uppercase tracking-wider text-white">Theme & Colors</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                {mode}
              </span>
            </div>

            {/* Mode Switch Pills */}
            <div className="grid grid-cols-2 gap-2 mb-4 bg-neutral-950 p-1 rounded-xl border border-neutral-800/80">
              <button
                onClick={() => {
                  if (mode !== 'dark') toggleTheme();
                }}
                className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'dark'
                    ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                Dark
              </button>
              <button
                onClick={() => {
                  if (mode !== 'light') toggleTheme();
                }}
                className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'light'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Light
              </button>
            </div>

            {/* Color Accent Title */}
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[var(--accent-color)]" />
              Accent Palette
            </p>

            {/* Color Palette Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {availableAccents.map((acc) => {
                const isSelected = acc.id === accentId;
                return (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectAccent(acc.id)}
                    title={acc.name}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'border-white/40 bg-neutral-800/80 shadow-md scale-105'
                        : 'border-transparent hover:border-neutral-700 hover:bg-neutral-800/40'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shadow-inner relative transition-transform group-hover:scale-110"
                      style={{ backgroundColor: acc.color }}
                    >
                      {isSelected && (
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: acc.fgColor }}
                        />
                      )}
                    </div>
                    <span className="text-[9px] font-medium text-neutral-400 truncate w-full text-center group-hover:text-white">
                      {acc.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer indicator */}
            <div className="mt-3 pt-2.5 border-t border-neutral-800 text-center">
              <p className="text-[10px] text-neutral-500 font-sans">
                Dynamic Theme & Colors sync automatically.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
