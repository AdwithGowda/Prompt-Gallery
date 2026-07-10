import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Plus, Filter, Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import api from '../api';

import PromptCard from '../components/PromptCard';
import ViewPromptModal from '../components/ViewPromptModal';
import CreatePromptModal from '../components/CreatePromptModal';

// Hardcoded platforms for the filter (you could also derive these dynamically)
const filterPlatforms = ["All", "Midjourney", "ChatGPT", "DALL-E 3", "Stable Diffusion", "Claude", "Gemini", "Runway", "Sora", "Leonardo AI", "Suno", "ElevenLabs", "Luma"];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState(location.state?.selectedPlatform || 'All');

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
    alert('Prompt copied to clipboard!');
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
      alert('Failed to create prompt: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePrompt = async (id, e) => {
    if (e) e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const token = userInfo.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        await api.delete(`/prompts/${id}`, config);
        
        // Remove from local state
        setPrompts(prompts.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error deleting prompt:', error);
        alert('Failed to delete prompt: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // Update locally immediately for snappy UI
      setPrompts(prompts.map(p => p._id === id ? { ...p, isFavorite } : p));
      
      // Update on backend
      await api.put(`/prompts/${id}`, { isFavorite }, config);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert if failed
      setPrompts(prompts.map(p => p._id === id ? { ...p, isFavorite: !isFavorite } : p));
    }
  };

  const filteredPrompts = activeFilter === 'All' 
    ? prompts 
    : activeFilter === 'Favorites'
      ? prompts.filter(p => p.isFavorite)
      : prompts.filter(p => p.platform === activeFilter || p.aiModel === activeFilter);

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-8 text-[#5C5450] font-sans relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 max-w-7xl mx-auto gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#5C5450] tracking-tight">Welcome back, {user?.name || 'Creator'}</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-6 w-full md:w-auto">
          {/* App Navigation Group */}
          <div className="flex flex-wrap items-center gap-2">
            
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#FB923C] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md"
            >
              <Plus size={18} /> New Prompt
            </button>
            
            <button 
              onClick={() => setActiveFilter(activeFilter === 'Favorites' ? 'All' : 'Favorites')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                activeFilter === 'Favorites'
                  ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/30'
                  : 'bg-white border border-[#E5E2DC] text-[#A09690] hover:text-[#5C5450] hover:border-[#D0CCC5]'
              }`}
              title="Show Favorites"
            >
              <Heart size={18} fill={activeFilter === 'Favorites' ? 'currentColor' : 'none'} className={activeFilter === 'Favorites' ? 'text-[#F97316]' : ''} /> 
              Favorites
            </button>

            {/* Filter Dropdown */}
            <div className="relative group ml-1">
              <select 
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="appearance-none bg-white border border-[#E5E2DC] group-hover:border-[#D0CCC5] text-[#5C5450] pl-10 pr-8 py-2.5 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-1 focus:ring-[#5C5450] cursor-pointer shadow-sm min-w-[140px]"
              >
                {filterPlatforms.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A09690] group-hover:text-[#5C5450] transition-colors pointer-events-none" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A09690] group-hover:text-[#5C5450] transition-colors"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPrompts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[#A09690]">
            No prompts found. Click "New Prompt" to create one!
          </div>
        ) : (
          filteredPrompts.map(prompt => (
            <PromptCard 
              key={prompt._id} 
              item={prompt}
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
    </div>
  );
};

export default Dashboard;
