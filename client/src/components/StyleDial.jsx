import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const stylesData = [
  {
    id: 1,
    name: "Portrait & People",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Nature & Landscape",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Automotive",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Product Photography",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Architecture & Interior",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Art & Illustration",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "3D & CGI",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Branding & Marketing",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    name: "UI / UX & Web Design",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    name: "Cinematic & Fantasy",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80",
  },
];

const angleStep = 360 / stylesData.length;
const promptStyles = stylesData.map((style, index) => ({
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
        <p className="text-sm md:text-lg text-slate-200 leading-relaxed hidden md:block">
          Discover a diverse range of prompt styles. Select a category on the dial to explore the aesthetic possibilities.
        </p>
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
