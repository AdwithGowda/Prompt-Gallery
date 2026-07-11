import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const platformsData = [
  {
    id: 1,
    name: "Midjourney",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&auto=format&fit=crop&q=80",
    website: "https://www.midjourney.com/",
    description: "Create highly detailed, artistic, and photorealistic AI images from text prompts."
  },
  {
    id: 2,
    name: "ChatGPT",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
    website: "https://chatgpt.com/",
    description: "Interact with an advanced conversational AI for coding, writing, and brainstorming."
  },
  {
    id: 3,
    name: "DALL-E 3",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&auto=format&fit=crop&q=80",
    website: "https://openai.com/dall-e-3",
    description: "Generate incredibly accurate and imaginative images directly from text descriptions."
  },
  {
    id: 4,
    name: "Stable Diffusion",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&auto=format&fit=crop&q=80",
    website: "https://stability.ai/",
    description: "Harness open-source AI to create stunning visuals with fine-tuned precision and control."
  },
  {
    id: 5,
    name: "Claude",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    website: "https://claude.ai/",
    description: "Experience next-generation AI with superior nuance, reasoning, and long-context understanding."
  },
  {
    id: 6,
    name: "Gemini",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    website: "https://gemini.google.com/",
    description: "Explore Google's powerful multimodal AI capable of understanding text, images, and video."
  },
  {
    id: 7,
    name: "Runway",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80",
    website: "https://runwayml.com/",
    description: "Bring your imagination to life with cutting-edge AI video generation and editing tools."
  },
  {
    id: 8,
    name: "Sora",
    image: "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=1200&auto=format&fit=crop&q=80",
    website: "https://openai.com/sora",
    description: "Create incredibly realistic and highly detailed video scenes from simple text prompts."
  },
  {
    id: 9,
    name: "Leonardo AI",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    website: "https://leonardo.ai/",
    description: "Generate production-quality game assets, conceptual art, and more with unparalleled control."
  },
  {
    id: 10,
    name: "Suno",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80",
    website: "https://suno.com/",
    description: "Compose original, full-length songs with AI-generated vocals and instrumentation."
  },
  {
    id: 11,
    name: "ElevenLabs",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&auto=format&fit=crop&q=80",
    website: "https://elevenlabs.io/",
    description: "Generate lifelike speech in any voice, style, and language with advanced audio AI."
  },
  {
    id: 12,
    name: "Luma",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    website: "https://lumalabs.ai/",
    description: "Instantly create high-quality 3D models and dynamic videos from text and images."
  }
];

const angleStep = 360 / platformsData.length;
const promptStyles = platformsData.map((style, index) => ({
  ...style,
  angle: -150 + (index * angleStep)
}));

// Helper to generate tick marks between main dots
const generateTicks = (startAngle, endAngle, steps) => {
  const ticks = [];
  const step = (endAngle - startAngle) / steps;
  for (let i = 1; i < steps; i++) {
    ticks.push(startAngle + i * step);
  }
  return ticks;
};

const StyleDial = () => {
  const [activeStyle, setActiveStyle] = useState(promptStyles[0]); 

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [activeStyle]);

  const handlePrev = () => {
    setActiveStyle(current => {
      const currentIndex = promptStyles.findIndex(style => style.id === current.id);
      const prevIndex = (currentIndex - 1 + promptStyles.length) % promptStyles.length;
      return promptStyles[prevIndex];
    });
  };

  const handleNext = () => {
    setActiveStyle(current => {
      const currentIndex = promptStyles.findIndex(style => style.id === current.id);
      const nextIndex = (currentIndex + 1) % promptStyles.length;
      return promptStyles[nextIndex];
    });
  };

  // Radius of the main dotted arc
  const arcRadius = 250;
  // Radius of the items
  const baseItemRadius = 310;

  // Generate ticks between the items
  const allTicks = [];
  for (let i = 0; i < promptStyles.length; i++) {
    const startAngle = promptStyles[i].angle;
    const endAngle = startAngle + angleStep; // dynamic spacing completes the 360 circle seamlessly
    allTicks.push(...generateTicks(startAngle, endAngle, 6));
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl md:overflow-hidden border border-white/20 text-white font-sans transition-colors duration-1000 selection:bg-orange-500/30">
      
      {/* Background layer with overflow hidden for the scaled image */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl z-0">
        {/* Dynamic Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-60 scale-105"
          style={{ backgroundImage: `url(${activeStyle.image})` }}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-[#FA6631]/30" />
      </div>

      {/* Main Content Area */}
      <div className="absolute bottom-8 left-8 md:top-auto md:left-auto md:right-16 md:bottom-16 z-20 max-w-lg text-left md:text-right drop-shadow-lg pr-8">
        <h1 className="text-3xl md:text-5xl font-black mb-2 md:mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-300">
          {activeStyle.name}
        </h1>
        <p className="text-sm md:text-lg text-slate-200 leading-relaxed mb-4">
          {activeStyle.description}
        </p>
        <a 
          href={activeStyle.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-[#FA6631] text-white font-bold rounded-full shadow-[0_4px_14px_0_rgba(250,102,49,0.39)] hover:bg-[#e05625] transition-all hover:scale-105"
        >
          Visit Website <ExternalLink size={18} />
        </a>
      </div>

      {/* Desktop Radial Menu Container */}
      <div className="hidden md:block absolute left-[-50px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] z-10 scale-90 transform origin-left">
        
        {/* The Arc anchor point - Rotates based on the active style's angle */}
        <div 
          className="absolute left-[-250px] top-0 w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `rotate(${-activeStyle.angle}deg)` }}
        >
          
          {/* Tick marks */}
          {allTicks.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * arcRadius;
            const y = Math.sin(rad) * arcRadius;
            
            return (
              <div 
                key={`tick-${i}`}
                className="absolute w-4 h-[2px] bg-white/40"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  transformOrigin: 'left center'
                }}
              />
            );
          })}

          {/* Categories and Main Dots */}
          {promptStyles.map((styleItem) => {
            const rad = (styleItem.angle * Math.PI) / 180;
            
            // Dot Position
            const dotX = Math.cos(rad) * arcRadius;
            const dotY = Math.sin(rad) * arcRadius;

            // Content Position - active item pops out along its radius
            const isActive = activeStyle.id === styleItem.id;
            const currentItemRadius = baseItemRadius + (isActive ? 20 : 0);
            const x = Math.cos(rad) * currentItemRadius;
            const y = Math.sin(rad) * currentItemRadius;

            return (
              <React.Fragment key={styleItem.id}>
                {/* Main Dot on the arc */}
                <div 
                  className="absolute bg-white rounded-full shadow-[0_0_15px_white] transition-all duration-300"
                  style={{
                    left: `calc(50% + ${dotX}px)`,
                    top: `calc(50% + ${dotY}px)`,
                    transform: 'translate(-50%, -50%)',
                    width: isActive ? '18px' : '12px',
                    height: isActive ? '18px' : '12px',
                  }}
                />

                {/* Optional central line from dot to content */}
                <div 
                  className="absolute h-[2px] transition-all duration-300"
                  style={{
                    left: `calc(50% + ${dotX}px)`,
                    top: `calc(50% + ${dotY}px)`,
                    width: isActive ? '40px' : '20px',
                    background: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                    transform: `translate(0, -50%) rotate(${styleItem.angle}deg)`,
                    transformOrigin: 'left center'
                  }}
                />

                {/* The Content (Pill shape containing image + Name) */}
                <div 
                  className="absolute cursor-pointer transition-all duration-500 z-20 group outline-none"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(0, -50%) rotate(${styleItem.angle}deg)`,
                    transformOrigin: 'left center'
                  }}
                  onClick={() => setActiveStyle(styleItem)}
                >
                  <div 
                    className={`
                      flex items-center gap-4 py-2 px-3 rounded-full
                      transition-all duration-300 outline-none transform-gpu whitespace-nowrap
                      ${isActive 
                        ? 'scale-110 hover:scale-[1.15]' 
                        : 'opacity-60 hover:opacity-100 hover:scale-105'}
                    `}
                  >
                    <img 
                      src={styleItem.image} 
                      alt={styleItem.name}
                      className={`
                        object-cover rounded-full transition-all duration-300 shadow-md border-2
                        ${isActive ? 'w-16 h-16 border-white' : 'w-12 h-12 grayscale group-hover:grayscale-0 border-transparent'}
                      `}
                    />
                    <span 
                      className={`
                        font-black tracking-widest uppercase transition-all duration-300 drop-shadow-md
                        ${isActive ? 'text-2xl text-white' : 'text-xl text-slate-300'}
                      `}
                    >
                      {styleItem.name}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}

        </div>
      </div>

      {/* Mobile Navigation Arrows */}
      <div className="md:hidden absolute top-1/2 -translate-y-1/2 left-0 w-full z-20 flex justify-between">
        <button 
          onClick={handlePrev}
          className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all active:scale-95 shadow-lg -translate-x-1/4"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={handleNext}
          className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all active:scale-95 shadow-lg translate-x-1/4"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default StyleDial;
