import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

const platformsData = [
  {
    id: 1,
    name: "Midjourney",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&auto=format&fit=crop&q=80",
    color: "#0d0f12", 
    strokeColor: "#8b5cf6", // Purple glow
    description: "Discover incredible generative art prompts to create stunning visual masterpieces with Midjourney v6.",
    url: "https://midjourney.com"
  },
  {
    id: 2,
    name: "ChatGPT",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
    color: "#050b14",
    strokeColor: "#10b981", // OpenAI Green
    description: "Unlock the full potential of GPT-4 with expert-crafted prompts for coding, writing, and analysis.",
    url: "https://chatgpt.com"
  },
  {
    id: 3,
    name: "DALL-E 3",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&auto=format&fit=crop&q=80",
    color: "#140303", 
    strokeColor: "#f59e0b", // Warm amber
    description: "Generate highly accurate, stylized illustrations and photography using precise DALL-E 3 prompts.",
    url: "https://openai.com/dall-e-3"
  },
  {
    id: 4,
    name: "Stable Diffusion",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&auto=format&fit=crop&q=80",
    color: "#020f12", 
    strokeColor: "#3b82f6", // Blue glow
    description: "Take absolute control over your AI art generation with advanced negative prompting and controlnet settings.",
    url: "https://stability.ai"
  },
  {
    id: 5,
    name: "Claude",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    color: "#03120a", 
    strokeColor: "#f43f5e", // Rose/Anthropic color
    description: "Leverage Claude's massive context window for complex data extraction, creative writing, and reasoning.",
    url: "https://claude.ai"
  },
  {
    id: 6,
    name: "Gemini",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    color: "#140802", 
    strokeColor: "#0ea5e9", // Google blue
    description: "Master multi-modal prompting by combining text, code, and images with Google's Gemini Advanced.",
    url: "https://gemini.google.com"
  },
  {
    id: 7,
    name: "Runway",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80",
    color: "#05081a", 
    strokeColor: "#d946ef", // Fuchsia
    description: "Direct your own AI films using powerful Gen-2 text-to-video and image-to-video motion prompts.",
    url: "https://runwayml.com"
  },
  {
    id: 8,
    name: "Sora",
    image: "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=1200&auto=format&fit=crop&q=80",
    color: "#010101", 
    strokeColor: "#ff4d4d", // Red
    description: "Create hyper-realistic and imaginative video scenes from text instructions using OpenAI's Sora model.",
    url: "https://openai.com/sora"
  },
  {
    id: 9,
    name: "Leonardo AI",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    color: "#1a0b1c", 
    strokeColor: "#c026d3", // Magenta
    description: "Produce stunning game assets and concept art with customized, fine-tuned image generation models.",
    url: "https://leonardo.ai"
  },
  {
    id: 10,
    name: "Suno",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80",
    color: "#0a1128", 
    strokeColor: "#fbbf24", // Yellow
    description: "Compose full songs with vocals and instrumentation just by writing a descriptive prompt and lyrics.",
    url: "https://suno.com"
  },
  {
    id: 11,
    name: "ElevenLabs",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&auto=format&fit=crop&q=80",
    color: "#0f172a", 
    strokeColor: "#38bdf8", // Light blue
    description: "Generate highly realistic and emotionally nuanced voiceovers and text-to-speech audio.",
    url: "https://elevenlabs.io"
  },
  {
    id: 12,
    name: "Luma",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    color: "#1e1b4b", 
    strokeColor: "#a78bfa", // Violet
    description: "Turn text and images into high-quality 3D models and cinematic drone-style video flythroughs.",
    url: "https://lumalabs.ai"
  }
];

const Category = () => {
  const [activePlatform, setActivePlatform] = useState(platformsData[0]);
  const [itemWidth, setItemWidth] = useState(140);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleViewPlatform = () => {
    if (user) {
      navigate('/dashboard', { state: { selectedPlatform: activePlatform.name } });
    } else {
      navigate('/login');
    }
  };

  // Responsive item width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Show exactly 4 items on mobile for better fit
        setItemWidth(window.innerWidth / 4);
      } else {
        setItemWidth(150); // Default desktop width
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll to center active item
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeIndex = platformsData.findIndex(p => p.id === activePlatform.id);
      
      const itemLeft = activeIndex * itemWidth;
      const containerHalfWidth = container.offsetWidth / 2;
      const itemHalfWidth = itemWidth / 2;
      
      const scrollTarget = itemLeft - containerHalfWidth + itemHalfWidth;
      
      container.scrollTo({
        left: scrollTarget,
        behavior: 'smooth'
      });
    }
  }, [activePlatform, itemWidth]);

  return (
    <div className="w-full bg-[#F7F5F0] flex flex-col pt-12 pb-12 transition-colors duration-700">
      <div className="w-full flex flex-col">
        {/* Category Section (Swiggy-style horizontal scroll) */}
        <div className="w-full relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#5C5450] tracking-tight px-4 md:px-8">
            Explore by Platform
          </h2>

          {/* Outer container for scrolling with padding */}
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide px-4 md:px-8" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Inner relative container for correct absolute positioning */}
            <div className="relative flex pt-4 pb-0 w-max">
              {/* Sliding Tab SVG with spring animation */}
              <div 
                className="absolute bottom-0 h-[100px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
                style={{
                  width: `${itemWidth + 60}px`,
                  transform: `translateX(${platformsData.findIndex(p => p.id === activePlatform.id) * itemWidth - 30}px)`
                }}
              >
                <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  <path 
                    d="M 20 100 L 20 99 C 35 99, 45 89, 45 74 L 45 30 C 45 15, 60 2, 75 2 L 125 2 C 140 2, 155 15, 155 30 L 155 74 C 155 89, 165 99, 180 99 L 180 100 Z"
                    fill="#FFFFFF"
                  />
                  <path 
                    d="M 20 99 C 35 99, 45 89, 45 74 L 45 30 C 45 15, 60 2, 75 2 L 125 2 C 140 2, 155 15, 155 30 L 155 74 C 155 89, 165 99, 180 99"
                    fill="none" 
                    stroke="#F97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Category Items */}
              {platformsData.map((platform) => {
                const isActive = activePlatform.id === platform.id;
                return (
                  <div 
                    key={platform.id} 
                    onClick={() => setActivePlatform(platform)}
                    className="relative z-10 flex flex-col items-center justify-center h-[100px] cursor-pointer shrink-0 group"
                    style={{ width: `${itemWidth}px` }}
                  >
                    <div 
                      className={`
                        font-bold text-[10px] md:text-xs tracking-widest uppercase transition-all duration-500 z-10 flex flex-col items-center text-center leading-none
                        ${isActive ? 'scale-110' : 'text-[#5C5450] opacity-70 group-hover:opacity-100'}
                      `}
                      style={isActive ? { color: activePlatform.strokeColor } : {}}
                    >
                      {platform.name.split(' ').map((word, idx) => (
                        <span key={idx}>{word}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div 
          className="w-full flex-1 pt-8 pb-12 px-6 md:px-12 flex flex-col relative z-0 mt-[-4px] border-4 rounded-b-xl md:rounded-b-2xl bg-white"
          style={{ borderColor: '#F97316' }}
        >
          <div 
            className="w-full flex-1 min-h-[60vh] md:min-h-[70vh] rounded-lg md:rounded-xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${activePlatform.image})` }}
            />
            
            {/* Gradient Overlay for Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full transform transition-all duration-700 translate-y-0">
              <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-4 tracking-tighter">
                {activePlatform.name}
              </h1>
              <p className="text-base md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                {activePlatform.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button 
                  onClick={handleViewPlatform}
                  className="flex items-center gap-2 bg-[#F97316] hover:bg-[#FB923C] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  View {activePlatform.name} Prompts <ArrowRight size={18} />
                </button>
                {activePlatform.url && (
                  <a 
                    href={activePlatform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-white/20"
                  >
                    Visit Platform <ArrowRight size={18} className="-rotate-45" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
