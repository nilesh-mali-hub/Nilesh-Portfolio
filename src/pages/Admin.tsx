import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Briefcase, Settings, Users, MessageSquare, FileText, Image as ImageIcon, BookOpen, UserCircle, Menu, X, Plus, Edit2, Trash2, ExternalLink, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'services', label: 'Services', icon: FileText },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'resume', label: 'Resume', icon: UserCircle },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'knowledge', label: 'AI Knowledge', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Auto-close sidebar on mobile initially
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 h-screen bg-neutral-900 border-r border-neutral-800 transition-all duration-300 z-50 overflow-hidden flex flex-col ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'}`}
      >
        <div className="p-4 h-20 border-b border-neutral-800 flex items-center justify-between flex-shrink-0">
          <Link to="/" className={`font-display font-black text-xl tracking-tighter text-[#D1FF52] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
            Nilesh<span className="text-white">Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="md:hidden p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 w-full group ${activeTab === tab.id ? 'bg-[#D1FF52] text-black font-bold shadow-lg shadow-[#D1FF52]/20' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
                title={!isSidebarOpen ? tab.label : undefined}
              >
                <tab.icon className={`w-5 h-5 flex-shrink-0 transition-transform ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-neutral-800 flex-shrink-0">
          <Link to="/" className={`flex items-center gap-3 p-3 rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors w-full ${!isSidebarOpen ? 'justify-center' : ''}`}>
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
              View Live Site
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md flex items-center px-6 gap-4 sticky top-0 z-30 flex-shrink-0">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)} 
            className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-[#D1FF52]/50"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl md:text-2xl tracking-tight capitalize text-white">
              {tabs.find(t => t.id === activeTab)?.label || activeTab}
            </h1>
            <p className="text-xs text-neutral-500 font-medium hidden sm:block">Manage your website content and leads</p>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-white">Nilesh Mali</span>
              <span className="text-xs text-[#D1FF52]">Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D1FF52] to-green-500 flex items-center justify-center text-black font-display font-bold shadow-lg shadow-[#D1FF52]/20">
              NM
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl min-h-[600px] relative">
                {activeTab === 'dashboard' && <DashboardTab />}
                {['projects', 'services', 'testimonials', 'leads', 'blog', 'gallery', 'knowledge'].includes(activeTab) && (
                  <GenericTab collection={activeTab} />
                )}
                {['settings', 'resume'].includes(activeTab) && <SettingsTab name={activeTab} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function DashboardTab() {
  const [stats, setStats] = useState({ projects: 0, services: 0, leads: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/services').then(res => res.json()),
      fetch('/api/leads').then(res => res.json())
    ]).then(([projectsData, servicesData, leadsData]) => {
      setStats({
        projects: Array.isArray(projectsData) ? projectsData.length : 0,
        services: Array.isArray(servicesData) ? servicesData.length : 0,
        leads: Array.isArray(leadsData) ? leadsData.length : 0
      });
    }).catch(err => console.error("Error fetching stats", err));
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Projects" value={stats.projects.toString()} icon={Briefcase} trend="+2 this week" color="bg-blue-500/10 text-blue-400" />
        <StatCard title="Total Services" value={stats.services.toString()} icon={FileText} trend="Stable" color="bg-purple-500/10 text-purple-400" />
        <StatCard title="New Leads" value={stats.leads.toString()} icon={Users} trend="+5 this month" color="bg-[#D1FF52]/10 text-[#D1FF52]" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-neutral-400" /> Recent Activity
          </h3>
          <div className="space-y-4 text-neutral-400 text-sm">
            <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#D1FF52]"></span> Local backend API initialized</p>
            <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Admin layout styled</p>
            <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Custom data models ready</p>
          </div>
        </div>
        
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-neutral-400" /> System Status
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center p-3 bg-neutral-900 rounded-lg">
              <span className="text-neutral-400">Database</span>
              <span className="text-[#D1FF52] bg-[#D1FF52]/10 px-2 py-1 rounded text-xs font-bold">Local JSON Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-900 rounded-lg">
              <span className="text-neutral-400">Gemini AI</span>
              <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: { title: string, value: string, icon: any, trend: string, color: string }) {
  return (
    <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-xl flex flex-col relative overflow-hidden group hover:border-neutral-700 transition-colors">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.02] -mr-4 -mt-4 rounded-full group-hover:opacity-[0.05] transition-opacity ${color.split(' ')[1]}`}></div>
      
      <div className="flex justify-between items-start mb-4">
        <span className="text-neutral-400 font-medium text-sm">{title}</span>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-end gap-3 mt-auto">
        <span className="font-display font-bold text-4xl text-white">{value}</span>
        <span className="text-xs font-medium text-neutral-500 mb-1">{trend}</span>
      </div>
    </div>
  );
}

function GenericTab({ collection }: { collection: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });

  const fetchItems = () => {
    setLoading(true);
    fetch(`/api/${collection}`)
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
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
    setFormData({ title: '', description: '', image: '' });
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
      description: item.description || item.content || '',
      image: item.image || ''
    });
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold capitalize text-white">{collection}</h2>
          <p className="text-neutral-400 text-sm mt-1">Manage your {collection} data.</p>
        </div>
        <button 
          onClick={openNew}
          className="bg-[#D1FF52] text-black px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#c5f542] transition-transform hover:scale-105 active:scale-95 text-sm w-full sm:w-auto justify-center shadow-lg shadow-[#D1FF52]/20"
        >
          <Plus className="w-4 h-4" /> Add New {collection.slice(0, -1)}
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center min-h-[300px]">
          <div className="w-8 h-8 border-4 border-neutral-800 border-t-[#D1FF52] rounded-full animate-spin"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-neutral-950/50 border-2 border-dashed border-neutral-800 rounded-xl min-h-[300px]">
          <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mb-4 text-neutral-600">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No items found</h3>
          <p className="text-neutral-500 text-sm max-w-sm">You haven't created any {collection} yet. Click the "Add New" button to get started.</p>
        </div>
      ) : collection === 'projects' || collection === 'leads' ? (
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-xl">
          <div className="hidden md:grid grid-cols-[1fr_2fr_100px] gap-4 px-6 py-4 bg-black/20 border-b border-white/10 text-sm font-medium text-neutral-400">
            <div>Name</div>
            <div>Description</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto no-scrollbar">
            {items.map(item => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_100px] gap-4 px-6 py-4 items-start md:items-center hover:bg-white/5 transition-colors group relative">
                <div className="font-bold text-white truncate pr-16 md:pr-0">
                  {item.title || item.name || 'Untitled'}
                </div>
                <div className="text-neutral-400 text-sm line-clamp-2 md:truncate">
                  {item.description || item.content || 'No description available for this item.'}
                </div>
                <div className="flex justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-6 md:relative md:top-0 md:right-0">
                  <button 
                    onClick={() => openEdit(item)}
                    className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex flex-col group hover:border-neutral-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-white line-clamp-1">{item.title || item.name || 'Untitled'}</h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEdit(item)}
                    className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-neutral-500 text-sm line-clamp-2 mt-auto">
                {item.description || item.content || 'No description available for this item.'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} {collection.slice(0, -1)}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Title / Name</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Description / Content</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52] min-h-[100px] resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Image URL (Optional)</label>
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D1FF52]"
                  placeholder="https://..."
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#D1FF52] hover:bg-[#c5f542] text-black rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> Save
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
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold capitalize text-white">{name} Configuration</h2>
        <p className="text-neutral-400 text-sm mt-1">Manage global {name} preferences.</p>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-neutral-950/50 border-2 border-dashed border-neutral-800 rounded-xl min-h-[300px]">
        <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mb-4 text-neutral-600">
          <Settings className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Configuration Panel</h3>
        <p className="text-neutral-500 text-sm max-w-sm">The {name} configuration panel will be available in the next update.</p>
      </div>
    </div>
  );
}
