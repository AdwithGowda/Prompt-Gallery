import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Plus, Filter, Heart, FolderOpen, Search, LayoutGrid, List, Sparkles, MessageSquare, Image as ImageIcon, Wand2, BrainCircuit, Video, Clapperboard, PenTool, Music, Mic, Box, Globe, User as UserIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api';

import PromptCard from '../components/PromptCard';
import ViewPromptModal from '../components/ViewPromptModal';
import CreatePromptModal from '../components/CreatePromptModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

// Hardcoded platforms for the filter (you could also derive these dynamically)
const filterPlatforms = [
  { name: "All", icon: Globe },
  { name: "Gemini", icon: Sparkles },
  { name: "ChatGPT", icon: MessageSquare },
  { name: "Midjourney", icon: ImageIcon },
  { name: "DALL-E 3", icon: ImageIcon },
  { name: "Stable Diffusion", icon: Wand2 },
  { name: "Claude", icon: BrainCircuit },
  { name: "Runway", icon: Video },
  { name: "Sora", icon: Clapperboard },
  { name: "Leonardo AI", icon: PenTool },
  { name: "Suno", icon: Music },
  { name: "ElevenLabs", icon: Mic },
  { name: "Luma", icon: Box }
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState(null);
  const [activeFilter, setActiveFilter] = useState(location.state?.selectedPlatform || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState(localStorage.getItem('promptViewMode') || 'grid');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('promptViewMode', mode);
  };

  // Form State
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    platform: 'Midjourney',
    prompt: '',
    tags: '',
    category: 'Image', // Backend requires a category
    image: null
  });

  const copyToClipboard = (text, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success('Prompt copied to clipboard!');
  };

  // Fetch prompts on mount
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const token = userInfo.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await api.get('/prompts', config);
        // Sort newest first
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPrompts(sorted);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };
    fetchPrompts();
  }, []);

  // Update filter if navigating directly from home page with a specific platform
  useEffect(() => {
    if (location.state?.selectedPlatform) {
      setActiveFilter(location.state.selectedPlatform);
    }
  }, [location.state]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPrompt(null);
        setIsCreateModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      let thumbnailUrl = '';
      
      // 1. Upload image to Cloudinary if selected
      if (newPrompt.image) {
        const uploadData = new FormData();
        uploadData.append('image', newPrompt.image);
        const uploadRes = await api.post('/upload', uploadData, config);
        thumbnailUrl = uploadRes.data.url;
      }

      // 2. Prepare prompt data
      const promptData = {
        title: newPrompt.title,
        platform: newPrompt.platform,
        prompt: newPrompt.prompt,
        tags: newPrompt.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        category: newPrompt.category,
        thumbnail: thumbnailUrl,
        aiModel: newPrompt.platform // Assuming aiModel is same as platform for backend schema
      };

      // 3. Save prompt to MongoDB
      const res = await api.post('/prompts', promptData, config);
      
      // 4. Update local state
      setPrompts([res.data, ...prompts]);
      setIsCreateModalOpen(false);
      setNewPrompt({ title: '', platform: 'Midjourney', prompt: '', tags: '', category: 'Image', image: null });
      
    } catch (error) {
      console.error('Error creating prompt:', error);
      toast.error('Failed to create prompt: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePrompt = (id, e) => {
    if (e) e.stopPropagation();
    setPromptToDelete(id);
  };

  const confirmDelete = async () => {
    if (!promptToDelete) return;
    
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await api.delete(`/prompts/${promptToDelete}`, config);
      
      setPrompts(prev => prev.filter(p => p._id !== promptToDelete));
      toast.success('Prompt deleted successfully');
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast.error('Failed to delete prompt: ' + (error.response?.data?.message || error.message));
    } finally {
      setPromptToDelete(null);
    }
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // Update locally immediately for snappy UI
      setPrompts(prompts.map(p => p._id === id ? { ...p, isFavorite } : p));
      
      if (isFavorite) {
        toast.success('Added to favorites');
      } else {
        toast.success('Removed from favorites');
      }
      
      // Update on backend
      await api.put(`/prompts/${id}`, { isFavorite }, config);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert if failed
      setPrompts(prompts.map(p => p._id === id ? { ...p, isFavorite: !isFavorite } : p));
      toast.error('Failed to update favorites');
    }
  };

  const filteredPrompts = prompts.filter(p => {
    // 1. Platform / Favorite filter
    const matchesFilter = activeFilter === 'All' 
      ? true 
      : activeFilter === 'Favorites' 
        ? p.isFavorite 
        : (p.platform === activeFilter || p.aiModel === activeFilter);
        
    // 2. Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (p.title && p.title.toLowerCase().includes(searchLower)) || 
      (p.platform && p.platform.toLowerCase().includes(searchLower)) || 
      (p.aiModel && p.aiModel.toLowerCase().includes(searchLower));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F6F3] px-8 pt-24 pb-8 text-[#262626] font-sans relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 max-w-7xl mx-auto gap-6">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white shadow-sm bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={24} className="text-[#A09690]" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-[#262626] tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-[#F97316] via-[#f59e0b] to-[#F97316] bg-clip-text text-transparent">{user?.name || 'Creator'}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6 w-full md:w-auto">
          {/* App Navigation Group */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-auto mr-0 sm:mr-2 mb-2 sm:mb-0">
              <input 
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2DC] bg-white text-sm text-[#262626] placeholder-[#A09690] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all w-full sm:w-64 shadow-sm"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A09690]" />
            </div>
            
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="fixed bottom-8 right-8 md:static md:bottom-auto md:right-auto w-16 h-16 md:w-auto md:h-auto md:px-6 md:py-3 bg-gradient-to-r from-[#F97316] via-[#f59e0b] to-[#F97316] animate-bg-gradient text-white rounded-2xl md:rounded-xl flex items-center justify-center text-sm md:text-base font-bold transition-all shadow-xl md:shadow-sm hover:shadow-2xl md:hover:shadow-md hover:scale-105 active:scale-95 z-40"
            >
              <Plus className="w-8 h-8 md:w-5 md:h-5" /> 
              <span className="hidden md:inline ml-2">New Prompt</span>
            </button>
            
            <button 
              onClick={() => setActiveFilter(activeFilter === 'Favorites' ? 'All' : 'Favorites')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                activeFilter === 'Favorites'
                  ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/30'
                  : 'bg-white border border-[#E5E2DC] text-[#A09690] hover:text-[#262626] hover:border-[#D0CCC5]'
              }`}
              title="Show Favorites"
            >
              <Heart size={18} fill={activeFilter === 'Favorites' ? 'currentColor' : 'none'} className={activeFilter === 'Favorites' ? 'text-[#F97316]' : ''} /> 
              Favorites
            </button>


            {/* View Mode Toggle */}
            <div className="flex bg-[#F0EEEB] p-1 rounded-xl shadow-inner border border-[#E5E2DC] ml-1">
              <button
                onClick={() => handleViewModeChange('list')}
                className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'list' ? 'bg-white shadow-sm text-[#262626]' : 'text-[#A09690] hover:text-[#262626]'}`}
                title="List View"
              >
                <List size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#262626]' : 'text-[#A09690] hover:text-[#262626]'}`}
                title="Grid View"
              >
                <LayoutGrid size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hide Scrollbar Style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Scrollable Filter Row */}
      <div className="max-w-7xl mx-auto w-full overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <div className="flex items-center gap-3 w-max px-2">
          {filterPlatforms.map(platform => {
            const p = platform.name;
            const Icon = platform.icon;
            const isActive = activeFilter === p;
            const count = p === 'All' 
              ? prompts.length 
              : prompts.filter(pr => pr.platform === p || pr.aiModel === p).length;
              
            return (
              <button
                key={p}
                onClick={(e) => {
                  setActiveFilter(p);
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                  isActive
                    ? 'bg-[#F97316] border-[#F97316] text-white shadow-md shadow-[#F97316]/30' 
                    : 'bg-[#262626] border-[#262626] text-white/90 hover:bg-[#404040] hover:text-white'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-white/70'} />
                <span>{p}</span>
                {p !== 'All' && (
                  <span className={`text-xs font-medium ${isActive ? 'text-white/90' : 'text-white/60'}`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className={`max-w-7xl mx-auto ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}`}>
        {filteredPrompts.length === 0 ? (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white border border-[#E5E2DC] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <FolderOpen size={40} className="text-[#A09690]" />
            </div>
            <h3 className="text-xl font-bold text-[#262626] mb-2">It's empty in here</h3>
            <p className="text-[#A09690]">No prompts found. Click "New Prompt" to create one!</p>
          </div>
        ) : (
          filteredPrompts.map(prompt => (
            <PromptCard 
              key={prompt._id} 
              item={prompt}
              viewMode={viewMode}
              onClick={setSelectedPrompt}
              onCopy={copyToClipboard}
              onDelete={handleDeletePrompt}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </div>

      {/* Modals */}
      <ViewPromptModal 
        prompt={selectedPrompt} 
        onClose={() => setSelectedPrompt(null)} 
        onCopy={copyToClipboard} 
      />

      <CreatePromptModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        formData={newPrompt} 
        setFormData={setNewPrompt} 
        onSubmit={handleCreatePrompt} 
        isLoading={isSubmitting}
      />

      <DeleteConfirmationModal
        isOpen={!!promptToDelete}
        onClose={() => setPromptToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Dashboard;
