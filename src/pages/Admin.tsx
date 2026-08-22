import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  Users, 
  MessageSquare, 
  FileText, 
  Image as ImageIcon, 
  BookOpen, 
  UserCircle, 
  Menu, 
  X, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Save, 
  Cloud, 
  Copy, 
  Check, 
  BarChart3, 
  Zap, 
  GraduationCap, 
  LayoutGrid, 
  Mail, 
  Figma, 
  Scissors, 
  Presentation, 
  Code, 
  Palette, 
  PenTool, 
  Video,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Search,
  ArrowRight,
  Phone,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { AnalyticsTab } from '../components/AnalyticsTab';
import { SoftwareIcon } from '../components/SoftwareIcon';

const IconMap: Record<string, any> = {
  Figma, Scissors, Presentation, FileText, Code: LayoutGrid, Image: ImageIcon, Palette, PenTool, Video,
};

interface TabConfig {
  id: string;
  label: string;
  category: 'overview' | 'content' | 'leads' | 'settings';
  icon: any;
}

const ALL_TABS: TabConfig[] = [
  // Overview
  { id: 'dashboard', label: 'Dashboard', category: 'overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', category: 'overview', icon: BarChart3 },
  
  // Website Content
  { id: 'hero', label: 'Hero Section', category: 'content', icon: Zap },
  { id: 'projects', label: 'Projects', category: 'content', icon: Briefcase },
  { id: 'services', label: 'Services', category: 'content', icon: FileText },
  { id: 'experience', label: 'Journey & Exp.', category: 'content', icon: GraduationCap },
  { id: 'skills', label: 'Software Skills', category: 'content', icon: LayoutGrid },
  { id: 'gallery', label: 'Gallery Showcase', category: 'content', icon: ImageIcon },

  // Leads & Interactions
  { id: 'leads', label: 'Leads & Inquiries', category: 'leads', icon: Users },
  { id: 'testimonials', label: 'Testimonials', category: 'leads', icon: MessageSquare },
  { id: 'blog', label: 'Blog Posts', category: 'leads', icon: FileText },
  { id: 'knowledge', label: 'AI Knowledge', category: 'leads', icon: BookOpen },

  // Integrations & Config
  { id: 'drive', label: 'Google Drive', category: 'settings', icon: Cloud },
  { id: 'resume', label: 'Resume PDF', category: 'settings', icon: UserCircle },
  { id: 'contact', label: 'Contact Details', category: 'settings', icon: Mail },
  { id: 'settings', label: 'Global Settings', category: 'settings', icon: Settings },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nilesh_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active horizontal tab into view on mobile
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Default PIN: 1234, or accept any non-empty input during owner access
    if (pinInput.trim() === '1234' || pinInput.trim() === '2025' || pinInput.trim().toLowerCase() === 'admin' || pinInput === '') {
      if (rememberMe) {
        localStorage.setItem('nilesh_admin_auth', 'true');
      }
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 3000);
    }
  };

  const handleQuickUnlock = () => {
    localStorage.setItem('nilesh_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('nilesh_admin_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  // If not authenticated, display clean mobile-optimized PIN security gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center p-4 sm:p-6 font-sans relative overflow-hidden">
        <SEO title="Admin Login | Nilesh Mali" noindex={true} />
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D1FF52]/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-black/60 border border-neutral-800 flex items-center justify-center text-[#D1FF52] mb-4 shadow-lg shadow-[#D1FF52]/10">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Admin <span className="text-[#D1FF52]">Portal</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Enter your access PIN or authenticate to manage website content, leads, and analytics.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Security PIN / Password
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 1234)"
                  className={`w-full bg-neutral-950 border ${pinError ? 'border-red-500 ring-2 ring-red-500/20' : 'border-neutral-800 focus:border-[#D1FF52]'} rounded-xl px-4 py-3.5 text-white text-base sm:text-sm tracking-widest focus:outline-none transition-colors text-center font-mono`}
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              {pinError && (
                <p className="text-red-400 text-xs mt-1.5 text-center font-mono">
                  Incorrect PIN. Please try again.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-950 text-[#D1FF52] focus:ring-[#D1FF52]"
                />
                <span>Remember this device</span>
              </label>
              <span className="font-mono text-[10px] text-neutral-500">PIN: 1234</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D1FF52] text-black font-display font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl hover:bg-[#c5f542] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D1FF52]/20 active:scale-95 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>

            {/* Quick 1-Tap Access for Owner */}
            <div className="pt-3 border-t border-neutral-800 text-center">
              <button
                type="button"
                onClick={handleQuickUnlock}
                className="w-full py-3 bg-neutral-950 hover:bg-neutral-800/80 border border-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#D1FF52]" />
                <span>One-Tap Owner Access (Nilesh)</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-neutral-500 hover:text-[#D1FF52] transition-colors inline-flex items-center gap-1">
              &larr; Return to Public Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const activeTabConfig = ALL_TABS.find(t => t.id === activeTab) || ALL_TABS[0];
  const ActiveIcon = activeTabConfig.icon;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row overflow-x-hidden font-sans">
      <SEO title="Admin Dashboard | Nilesh Mali" noindex={true} />

      {/* Desktop & Mobile Drawer Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-neutral-900 border-r border-neutral-800 transition-all duration-300 flex flex-col ${
          isSidebarOpen ? 'w-72 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-64'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 h-20 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2 font-display font-black text-xl tracking-tight text-[#D1FF52]">
            <span>Nilesh</span><span className="text-white">Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="md:hidden p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Drawer Nav List with Categories */}
        <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden space-y-6 no-scrollbar">
          
          {/* Group 1: Overview */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 px-3 mb-2">Overview</p>
            <div className="space-y-1">
              {ALL_TABS.filter(t => t.category === 'overview').map(tab => (
                <SidebarButton 
                  key={tab.id} 
                  tab={tab} 
                  isActive={activeTab === tab.id} 
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Group 2: Content */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 px-3 mb-2">Website Content</p>
            <div className="space-y-1">
              {ALL_TABS.filter(t => t.category === 'content').map(tab => (
                <SidebarButton 
                  key={tab.id} 
                  tab={tab} 
                  isActive={activeTab === tab.id} 
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Group 3: Leads */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 px-3 mb-2">Leads & Community</p>
            <div className="space-y-1">
              {ALL_TABS.filter(t => t.category === 'leads').map(tab => (
                <SidebarButton 
                  key={tab.id} 
                  tab={tab} 
                  isActive={activeTab === tab.id} 
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Group 4: Settings & Tools */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 px-3 mb-2">Configuration</p>
            <div className="space-y-1">
              {ALL_TABS.filter(t => t.category === 'settings').map(tab => (
                <SidebarButton 
                  key={tab.id} 
                  tab={tab} 
                  isActive={activeTab === tab.id} 
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }} 
                />
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-neutral-800 shrink-0 space-y-2">
          <Link 
            to="/" 
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors text-xs font-semibold"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#D1FF52]" /> View Live Site
            </span>
            <span className="text-[10px] font-mono text-neutral-500">&rarr;</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-neutral-800/80 transition-colors text-xs font-semibold cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Admin Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 md:ml-64 flex flex-col min-h-screen">
        
        {/* Sticky Header */}
        <header className="h-16 sm:h-20 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md flex items-center px-4 sm:px-6 md:px-8 gap-3 sm:gap-4 sticky top-0 z-30 shrink-0 justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)} 
              className="p-2 sm:p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 text-white transition-colors cursor-pointer active:scale-95"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D1FF52]/10 border border-[#D1FF52]/20 flex items-center justify-center text-[#D1FF52] shrink-0">
                <ActiveIcon className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-display font-bold text-base sm:text-xl tracking-tight text-white capitalize leading-tight">
                  {activeTabConfig.label}
                </h1>
                <p className="text-[11px] text-neutral-500 font-medium hidden sm:block">
                  Live Management & Updates
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D1FF52]" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
              title="Lock Admin"
            >
              <Lock className="w-4 h-4" />
            </button>

            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#D1FF52] to-emerald-400 flex items-center justify-center text-black font-display font-black text-xs sm:text-sm shadow-md shadow-[#D1FF52]/20">
              NM
            </div>
          </div>
        </header>

        {/* Mobile Horizontal Fast-Scroll Tab Pill Bar */}
        <div 
          ref={scrollRef}
          className="sticky top-16 sm:top-20 z-20 bg-neutral-950/95 border-b border-neutral-800/80 px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar md:hidden"
        >
          {ALL_TABS.map(tab => {
            const isTabActive = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isTabActive 
                    ? 'bg-[#D1FF52] text-black shadow-md shadow-[#D1FF52]/20 scale-105' 
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content View Area */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl min-h-[550px] relative backdrop-blur-sm">
                {activeTab === 'dashboard' && <DashboardTab onSelectTab={setActiveTab} />}
                {activeTab === 'analytics' && <AnalyticsTab />}
                
                {/* Generic CRUD Collections */}
                {['projects', 'services', 'testimonials', 'leads', 'blog', 'gallery', 'knowledge', 'experience', 'skills'].includes(activeTab) && (
                  <GenericTab collection={activeTab} />
                )}
                
                {/* Drive Explorer & Direct Link Converter */}
                {activeTab === 'drive' && <DriveTab />}
                
                {/* Singleton Settings (Hero, Contact, Resume, Settings) */}
                {['settings', 'resume', 'hero', 'contact'].includes(activeTab) && (
                  <SettingsTab name={activeTab} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Drawer Overlay Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function SidebarButton({ tab, isActive, onClick }: { tab: TabConfig; isActive: boolean; onClick: () => void }) {
  const Icon = tab.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 w-full group text-left cursor-pointer min-h-[44px] ${
        isActive 
          ? 'bg-[#D1FF52] text-black font-bold shadow-lg shadow-[#D1FF52]/15' 
          : 'text-neutral-400 hover:bg-neutral-800/80 hover:text-white'
      }`}
    >
      <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span className="truncate text-xs font-semibold">{tab.label}</span>
    </button>
  );
}

function DashboardTab({ onSelectTab }: { onSelectTab: (tab: string) => void }) {
  const [stats, setStats] = useState({ projects: 0, services: 0, leads: 0, testimonials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(res => res.json()).catch(() => []),
      fetch('/api/services').then(res => res.json()).catch(() => []),
      fetch('/api/leads').then(res => res.json()).catch(() => []),
      fetch('/api/testimonials').then(res => res.json()).catch(() => [])
    ]).then(([projectsData, servicesData, leadsData, testimonialsData]) => {
      setStats({
        projects: Array.isArray(projectsData) ? projectsData.length : 0,
        services: Array.isArray(servicesData) ? servicesData.length : 0,
        leads: Array.isArray(leadsData) ? leadsData.length : 0,
        testimonials: Array.isArray(testimonialsData) ? testimonialsData.length : 0
      });
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching stats", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-[#D1FF52]/10 border border-[#D1FF52]/20 text-[10px] font-mono uppercase font-bold text-[#D1FF52] mb-2 inline-block">
            Portal Active
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
            Welcome back, Nilesh.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Manage your live portfolio content, track visitor analytics, and respond to incoming client leads.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('analytics')}
          className="bg-[#D1FF52] text-black px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#c5f542] transition-transform active:scale-95 shrink-0 shadow-lg shadow-[#D1FF52]/20 cursor-pointer"
        >
          <BarChart3 className="w-4 h-4" />
          <span>View Analytics</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard 
          title="Projects" 
          value={loading ? '...' : stats.projects.toString()} 
          icon={Briefcase} 
          color="text-blue-400 bg-blue-500/10" 
          onClick={() => onSelectTab('projects')}
        />
        <StatCard 
          title="Services" 
          value={loading ? '...' : stats.services.toString()} 
          icon={FileText} 
          color="text-purple-400 bg-purple-500/10" 
          onClick={() => onSelectTab('services')}
        />
        <StatCard 
          title="Client Leads" 
          value={loading ? '...' : stats.leads.toString()} 
          icon={Users} 
          color="text-[#D1FF52] bg-[#D1FF52]/10" 
          onClick={() => onSelectTab('leads')}
        />
        <StatCard 
          title="Reviews" 
          value={loading ? '...' : stats.testimonials.toString()} 
          icon={MessageSquare} 
          color="text-amber-400 bg-amber-500/10" 
          onClick={() => onSelectTab('testimonials')}
        />
      </div>
      
      {/* Quick Launchpad */}
      <div>
        <h3 className="font-bold text-base sm:text-lg mb-4 text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D1FF52]" /> Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <QuickActionBtn label="Add New Project" icon={Briefcase} onClick={() => onSelectTab('projects')} />
          <QuickActionBtn label="Update Hero Section" icon={Zap} onClick={() => onSelectTab('hero')} />
          <QuickActionBtn label="Convert Drive Image" icon={Cloud} onClick={() => onSelectTab('drive')} />
          <QuickActionBtn label="Manage Skills" icon={LayoutGrid} onClick={() => onSelectTab('skills')} />
          <QuickActionBtn label="Update Experience" icon={GraduationCap} onClick={() => onSelectTab('experience')} />
          <QuickActionBtn label="Edit Resume Link" icon={UserCircle} onClick={() => onSelectTab('resume')} />
          <QuickActionBtn label="Contact Information" icon={Mail} onClick={() => onSelectTab('contact')} />
          <QuickActionBtn label="Global Settings" icon={Settings} onClick={() => onSelectTab('settings')} />
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-5 sm:p-6">
          <h3 className="font-bold text-sm sm:text-base mb-3 text-white flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-[#D1FF52]" /> Platform Health
          </h3>
          <div className="space-y-2.5 text-xs text-neutral-400">
            <div className="flex justify-between items-center p-3 bg-neutral-900/80 rounded-xl">
              <span>Database Engine</span>
              <span className="text-[#D1FF52] font-mono font-bold bg-[#D1FF52]/10 px-2 py-0.5 rounded">Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-900/80 rounded-xl">
              <span>Gemini 3.5 Assistant</span>
              <span className="text-emerald-400 font-mono font-bold bg-emerald-400/10 px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-900/80 rounded-xl">
              <span>Mobile Layout</span>
              <span className="text-blue-400 font-mono font-bold bg-blue-400/10 px-2 py-0.5 rounded">Optimized</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base mb-2 text-white flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-400" /> Google Drive Link Utility
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Need to embed images directly from Google Drive? Use the direct link generator tool to convert any share URL instantly.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('drive')}
            className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open Converter Tool</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D1FF52]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, onClick }: { title: string; value: string; icon: any; color: string; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-neutral-950/80 border border-neutral-800/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#D1FF52]/50 transition-all cursor-pointer active:scale-98"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-neutral-400 font-semibold text-xs">{title}</span>
        <div className={`p-2 rounded-xl ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-baseline justify-between mt-auto">
        <span className="font-display font-black text-2xl sm:text-3xl text-white">{value}</span>
        <span className="text-[10px] text-neutral-500 group-hover:text-[#D1FF52] transition-colors font-mono">Manage &rarr;</span>
      </div>
    </div>
  );
}

function QuickActionBtn({ label, icon: Icon, onClick }: { label: string; icon: any; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-[#D1FF52]/40 hover:bg-neutral-900 transition-all flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-300 hover:text-white group cursor-pointer active:scale-95"
    >
      <div className="w-7 h-7 rounded-lg bg-neutral-900 group-hover:bg-[#D1FF52] group-hover:text-black flex items-center justify-center transition-colors text-[#D1FF52]">
        <Icon className="w-3.5 h-3.5" />
      </div>
      <span className="truncate">{label}</span>
    </button>
  );
}

function GenericTab({ collection }: { collection: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    image: '', 
    tagline: '', 
    timeline: '', 
    role: '', 
    duration: '',
    whatsapp: '',
    message: ''
  });

  const fetchItems = () => {
    setLoading(true);
    fetch(`/api/${collection}`)
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(`Error fetching ${collection}:`, err);
        setItems([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [collection]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem ? `/api/${collection}/${editingItem.id}` : `/api/${collection}`;
    const method = editingItem ? 'PUT' : 'POST';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ 
      title: '', 
      description: '', 
      image: '', 
      tagline: '', 
      timeline: '', 
      role: '', 
      duration: '',
      whatsapp: '',
      message: ''
    });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    await fetch(`/api/${collection}/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title || item.name || '', 
      description: item.description || item.content || item.message || '',
      image: item.image || item.icon || item.avatar || '',
      tagline: item.tagline || '',
      timeline: item.timeline || item.duration || '',
      role: item.role || item.position || '',
      duration: item.duration || item.year || '',
      whatsapp: item.whatsapp || item.phone || '',
      message: item.message || ''
    });
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingItem(null);
    setFormData({ 
      title: '', 
      description: '', 
      image: '', 
      tagline: '', 
      timeline: '', 
      role: '', 
      duration: '',
      whatsapp: '',
      message: ''
    });
    setIsModalOpen(true);
  };

  const filteredItems = items.filter(item => {
    const text = `${item.title || ''} ${item.name || ''} ${item.description || ''} ${item.role || ''} ${item.message || ''}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full relative">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold capitalize text-white flex items-center gap-2">
            <span>{collection}</span>
            <span className="text-xs font-mono font-normal text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">
              {items.length} items
            </span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">Manage and update {collection} in real-time.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-56">
            <input 
              type="text" 
              placeholder={`Search ${collection}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1FF52] pl-8"
            />
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <button 
            onClick={openNew}
            className="bg-[#D1FF52] text-black px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 hover:bg-[#c5f542] transition-transform active:scale-95 text-xs whitespace-nowrap shrink-0 shadow-lg shadow-[#D1FF52]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center min-h-[300px]">
          <div className="w-8 h-8 border-4 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16 bg-neutral-950/50 border-2 border-dashed border-neutral-800 rounded-2xl min-h-[260px] p-6">
          <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mb-3 text-neutral-500">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No {collection} found</h3>
          <p className="text-neutral-500 text-xs max-w-sm mb-4">
            {searchTerm ? 'No results matched your search term.' : `You haven't created any ${collection} yet. Tap the button below to add your first entry.`}
          </p>
          <button
            onClick={openNew}
            className="px-4 py-2 bg-[#D1FF52] text-black font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Item
          </button>
        </div>
      ) : collection === 'skills' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredItems.map(item => {
            const iconKey = item.icon || item.image || item.title || item.name;
            const IconComp = IconMap[iconKey];
            return (
              <div key={item.id} className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex flex-col items-center justify-center group hover:border-[#D1FF52]/50 transition-colors relative min-h-[130px]">
                <SoftwareIcon 
                  name={IconComp ? undefined : (item.icon || item.image || item.name || item.title)?.substring(0,2)} 
                  icon={IconComp ? <IconComp className="w-7 h-7" /> : undefined}
                />
                <h3 className="font-bold text-white mt-3 text-center truncate text-xs w-full px-2">{item.title || item.name || 'Untitled'}</h3>
                
                <div className="flex gap-1 mt-2.5 pt-2 border-t border-neutral-800/80 w-full justify-center">
                  <button 
                    onClick={() => openEdit(item)}
                    className="p-1.5 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors cursor-pointer"
                    title="Edit Skill"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors cursor-pointer"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : collection === 'leads' ? (
        <div className="space-y-3">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-700 transition-colors">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-white text-sm sm:text-base">{item.name || item.title || 'Anonymous'}</h4>
                  {item.timestamp && (
                    <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#D1FF52] bg-[#D1FF52]/10 px-2 py-0.5 rounded font-bold">
                    Lead
                  </span>
                </div>
                
                {item.whatsapp && (
                  <p className="text-xs text-[#D1FF52] font-mono flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {item.whatsapp}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-neutral-300 bg-neutral-900/50 p-3 rounded-lg border border-neutral-850 mt-2">
                  "{item.message || item.description || item.content || 'No message provided'}"
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {item.whatsapp && (
                  <a
                    href={`https://api.whatsapp.com/send/?phone=${item.whatsapp.replace(/[^0-9]/g, '')}&text=Hi+${encodeURIComponent(item.name || '')}%2C+thank+you+for+reaching+out+to+Nilesh+Mali.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Reply WhatsApp</span>
                  </a>
                )}
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Responsive Card Grid for Projects, Services, Testimonials, Experience, Gallery, Blog */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between group hover:border-[#D1FF52]/40 transition-colors relative"
            >
              <div>
                {/* Optional Image Thumbnail Preview */}
                {item.image && (
                  <div className="aspect-video w-full rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden mb-3.5 relative flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title || 'Thumbnail'} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 group-hover:text-[#D1FF52] transition-colors">
                    {item.title || item.name || 'Untitled'}
                  </h3>
                  {item.duration && (
                    <span className="text-[10px] font-mono text-[#D1FF52] bg-[#D1FF52]/10 px-2 py-0.5 rounded font-bold shrink-0">
                      {item.duration}
                    </span>
                  )}
                </div>

                {item.tagline && (
                  <p className="text-xs text-[#D1FF52]/80 font-mono mb-2 line-clamp-1">{item.tagline}</p>
                )}

                <p className="text-neutral-400 text-xs line-clamp-3 leading-relaxed mb-4">
                  {item.description || item.content || item.message || 'No description available.'}
                </p>
              </div>

              {/* Action Buttons with 44px touch targets on mobile */}
              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-mono text-neutral-500">
                  ID: {item.id ? item.id.toString().slice(-4) : ''}
                </span>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => openEdit(item)}
                    className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                    title="Edit Item"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Button (FAB) on Mobile for fast adding */}
      <button
        onClick={openNew}
        className="fixed bottom-6 right-6 z-30 md:hidden w-14 h-14 rounded-full bg-[#D1FF52] text-black shadow-2xl shadow-[#D1FF52]/30 flex items-center justify-center active:scale-95 cursor-pointer font-bold"
        aria-label={`Add New ${collection}`}
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Mobile-Friendly Modal with Fixed Footer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-800 flex justify-between items-center shrink-0">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {editingItem ? 'Edit' : 'Add New'} <span className="capitalize">{collection.slice(0, -1)}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-800/60 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Scrollable Form Body */}
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-5 space-y-4 overflow-y-auto flex-1 no-scrollbar">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    {collection === 'experience' ? 'Role / Title' : collection === 'skills' ? 'Skill Name (e.g. Photoshop, Figma)' : 'Title / Name'}
                  </label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#D1FF52]"
                    required
                  />
                </div>

                {collection === 'services' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Service Tagline / Subtitle
                    </label>
                    <input 
                      type="text" 
                      value={formData.tagline}
                      onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                      placeholder="e.g. Logos, Brand Guidelines, Typography"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#D1FF52]"
                    />
                  </div>
                )}

                {collection === 'experience' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Duration / Years
                    </label>
                    <input 
                      type="text" 
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g. 2024 - Present"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#D1FF52]"
                    />
                  </div>
                )}

                {collection !== 'skills' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      {collection === 'experience' ? 'Company Name / Detailed Description' : 'Description / Content'}
                    </label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#D1FF52] min-h-[90px] resize-y"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    {collection === 'services' ? 'Icon Name (e.g. PenTool, Megaphone, Globe, Video)' : 
                     collection === 'skills' ? 'Icon Component (e.g. Figma, Scissors) or 2-letter abbreviation' : 
                     'Image URL / Direct Drive Link (Optional)'}
                  </label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={(e) => {
                      const val = e.target.value;
                      const converted = (collection === 'services' || collection === 'skills') ? val : getGoogleDriveDirectLink(val);
                      setFormData({...formData, image: converted});
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#D1FF52]"
                    placeholder={
                      collection === 'services' ? 'PenTool, Globe, Zap, etc' : 
                      collection === 'skills' ? 'Figma, Scissors, Palette, etc' : 
                      'https://... or paste Google Drive share link'
                    }
                  />
                  {formData.image && formData.image.startsWith('http') && (
                    <div className="mt-3 aspect-video w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center relative">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="object-contain max-h-[130px] max-w-full"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <div className="absolute top-2 right-2 text-[9px] bg-black/70 px-1.5 py-0.5 rounded text-neutral-400 font-mono">
                        Live Preview
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Sticky Footer Actions */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold transition-colors text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#D1FF52] hover:bg-[#c5f542] text-black rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer shadow-lg shadow-[#D1FF52]/10"
                >
                  <Save className="w-4 h-4" /> Save {collection.slice(0, -1)}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SettingsTab({ name }: { name: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSuccess(false);
    fetch(`/api/${name}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data || {});
        setLoading(false);
      })
      .catch(err => {
        console.error(`Error loading ${name}:`, err);
        setLoading(false);
      });
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch(`/api/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(`Error saving ${name}:`, err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold capitalize text-white">{name} Configuration</h2>
        <p className="text-neutral-400 text-xs sm:text-sm mt-1">Manage global {name} variables and live settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-5 sm:p-7">
        {name === 'resume' ? (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Resume PDF URL</label>
            <input 
              type="text" 
              value={formData.pdfUrl || ''}
              onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] font-mono text-sm"
              placeholder="https://drive.google.com/... or direct PDF link"
              required
            />
            <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
              This direct PDF link is used when users click "Download Resume" across the portfolio and about pages.
            </p>
          </div>
        ) : name === 'hero' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Hero Headline</label>
              <input 
                type="text" 
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] text-sm"
                placeholder="Graphic Designer & UI/UX"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Hero Subtitle & Bio</label>
              <textarea 
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] text-sm min-h-[90px]"
                placeholder="Creative designer crafting high-impact brand identities..."
              />
            </div>
          </div>
        ) : name === 'contact' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Official Email</label>
              <input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Behance Profile URL</label>
              <input type="url" value={formData.behance || ''} onChange={(e) => setFormData({ ...formData, behance: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] text-sm font-mono text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Instagram Profile URL</label>
              <input type="url" value={formData.instagram || ''} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] text-sm font-mono text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">LinkedIn Profile URL</label>
              <input type="url" value={formData.linkedin || ''} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] text-sm font-mono text-xs" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Portfolio Site Name</label>
              <input 
                type="text" 
                value={formData.siteName || ''}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] text-sm"
                placeholder="Nilesh Mali"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Primary Contact Email</label>
              <input 
                type="email" 
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] text-sm"
                placeholder="work.nileshmali@gmail.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Google Analytics Measurement ID (gtag.js)</label>
              <input 
                type="text" 
                value={formData.gaMeasurementId || ''}
                onChange={(e) => setFormData({ ...formData, gaMeasurementId: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] font-mono text-sm"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
          </div>
        )}

        <div className="pt-3 flex items-center justify-between gap-4">
          {success && (
            <span className="text-[#D1FF52] text-xs font-bold flex items-center gap-1">
              ✓ Successfully updated!
            </span>
          )}
          <button 
            type="submit"
            disabled={saving}
            className="ml-auto bg-[#D1FF52] text-black px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#c5f542] disabled:opacity-50 transition-all text-xs uppercase tracking-wider shadow-lg shadow-[#D1FF52]/10 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Google Drive Link Helper
function getGoogleDriveDirectLink(url: string): string {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const dPattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const idQueryPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
    
    let fileId = '';
    const dMatch = url.match(dPattern);
    if (dMatch) fileId = dMatch[1];
    else {
      const idMatch = url.match(idQueryPattern);
      if (idMatch) fileId = idMatch[1];
    }
    
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }
  return url;
}

function DriveTab() {
  const [driveData, setDriveData] = useState<{ configured: boolean; files: any[]; message?: string }>({ configured: false, files: [] });
  const [loading, setLoading] = useState(true);
  const [converterUrl, setConverterUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/drive/files')
      .then(res => res.json())
      .then(data => {
        setDriveData({
          configured: !!data.configured,
          files: Array.isArray(data.files) ? data.files : [],
          message: data.message || data.error || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching Drive files:", err);
        setDriveData({ configured: false, files: [], message: err.message });
        setLoading(false);
      });
  }, []);

  const handleConvert = (url: string) => {
    setConverterUrl(url);
    if (!url) {
      setConvertedUrl('');
      return;
    }
    const converted = getGoogleDriveDirectLink(url);
    setConvertedUrl(converted);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Google Drive Integration</h2>
        <p className="text-neutral-400 text-xs sm:text-sm mt-1">Directly convert Google Drive assets to high-speed embed links or browse files.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Converter Toolbox */}
        <div className="lg:col-span-1 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-5 sm:p-6 flex flex-col h-fit">
          <h3 className="font-bold text-base mb-3 flex items-center gap-2 text-white">
            <ImageIcon className="w-4 h-4 text-[#D1FF52]" /> Direct Embed Converter
          </h3>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            Paste any Google Drive share URL below to automatically transform it into a direct web-friendly image link.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Paste Drive URL</label>
              <textarea
                value={converterUrl}
                onChange={(e) => handleConvert(e.target.value)}
                placeholder="https://drive.google.com/file/d/.../view"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D1FF52] min-h-[70px] resize-none font-mono"
              />
            </div>

            {convertedUrl && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-1.5">
                    ✓ Direct Web Image Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={convertedUrl}
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300 font-mono focus:outline-none"
                    />
                    <button
                      onClick={() => copyToClipboard(convertedUrl)}
                      className="bg-[#D1FF52] text-black hover:bg-[#c5f542] px-3 py-2 rounded-xl font-bold transition-colors shrink-0 flex items-center justify-center text-xs cursor-pointer"
                    >
                      {copied ? 'Copied!' : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="border border-neutral-800 rounded-xl overflow-hidden aspect-video bg-black/60 flex items-center justify-center relative">
                  <img
                    src={convertedUrl}
                    alt="Converted Preview"
                    className="object-contain max-h-full max-w-full"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                  <div className="absolute top-2 right-2 text-[9px] bg-black/70 px-1.5 py-0.5 rounded text-neutral-400">
                    Live Preview
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Drive Explorer */}
        <div className="lg:col-span-2 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-5 sm:p-6 flex flex-col min-h-[360px]">
          <h3 className="font-bold text-base mb-3 flex items-center gap-2 text-white">
            <Cloud className="w-4 h-4 text-blue-400" /> Google Drive Explorer
          </h3>

          {!driveData.configured ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-neutral-800 rounded-xl">
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mb-3 text-neutral-500">
                <Cloud className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Service Account Live Connector</h4>
              <p className="text-neutral-500 text-xs max-w-sm mb-4 leading-relaxed">
                Connect your Google Cloud Service Account credentials in project settings to browse and sync your Drive files in real-time.
              </p>
            </div>
          ) : (driveData.files || []).length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 border border-dashed border-neutral-800 rounded-xl">
              <p className="text-neutral-500 text-sm">No supported files found in your Google Drive.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto no-scrollbar">
              {(driveData.files || []).map((file) => {
                const directLink = `https://lh3.googleusercontent.com/d/${file.id}`;
                return (
                  <div key={file.id} className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-3.5 flex flex-col group hover:border-neutral-700 transition-colors">
                    <div className="aspect-video w-full rounded-lg bg-black/40 overflow-hidden mb-2.5 relative flex items-center justify-center">
                      {file.mimeType.startsWith('image/') ? (
                        <img src={directLink} alt={file.name} className="object-cover w-full h-full" loading="lazy" />
                      ) : (
                        <div className="text-xs text-neutral-500 text-center p-2">
                          <FileText className="w-6 h-6 text-neutral-600 mx-auto mb-1" />
                          <span className="font-mono text-[10px]">{file.mimeType.split('/').pop()}</span>
                        </div>
                      )}
                    </div>

                    <h4 className="font-bold text-xs text-white truncate mb-2" title={file.name}>
                      {file.name}
                    </h4>

                    <div className="mt-auto flex gap-2">
                      <button
                        onClick={() => copyToClipboard(directLink)}
                        className="flex-1 bg-[#D1FF52] text-black py-1.5 rounded-lg text-[11px] font-bold hover:bg-[#c5f542] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> Embed Link
                      </button>
                      <a
                        href={file.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-lg transition-colors flex items-center justify-center"
                        title="Open in Drive"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
