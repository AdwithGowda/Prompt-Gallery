import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

const stylesData = [
   {
    id: 1,
    name: "Portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop&q=80"
    ],
    color: "#0d0f12",
    strokeColor: "#f43f5e", // Rose
    description: "Capture the essence of human emotion and personality with highly detailed portrait prompts.",
    url: ""
  },
  {
    id: 2,
    name: "Nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop&q=80"
    ],
    color: "#050b14",
    strokeColor: "#10b981", // Green
    description: "Generate breathtaking natural scenery, from serene forests to dramatic mountain vistas.",
    url: ""
  },
  {
    id: 3,
    name: "Automotive",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=800&fit=crop&q=80"
    ],
    color: "#140303",
    strokeColor: "#3b82f6", // Blue
    description: "Design sleek, futuristic, or classic vehicles with dynamic lighting and environments.",
    url: ""
  },
  {
    id: 4,
    name: "Product",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e927eb5?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=800&fit=crop&q=80"
    ],
    color: "#020f12",
    strokeColor: "#f59e0b", // Amber
    description: "Create studio-quality product mockups and commercial photography concepts instantly.",
    url: ""
  },
  {
    id: 5,
    name: "Architecture",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=800&fit=crop&q=80"
    ],
    color: "#03120a",
    strokeColor: "#8b5cf6", // Purple
    description: "Visualize stunning interior designs and cutting-edge architectural structures.",
    url: ""
  },
  {
    id: 6,
    name: "Illustration",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573155993874-fe4569ce5424?w=600&h=800&fit=crop&q=80"
    ],
    color: "#140802",
    strokeColor: "#0ea5e9", // Light blue
    description: "Explore diverse artistic mediums, from oil painting and watercolor to digital illustration.",
    url: ""
  },
  {
    id: 7,
    name: "3D",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1633519985958-f542461cc4eb?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1633398939762-d9e07584100c?w=600&h=800&fit=crop&q=80"
    ],
    color: "#05081a",
    strokeColor: "#d946ef", // Fuchsia
    description: "Render hyper-realistic 3D scenes, characters, and objects with cinematic lighting.",
    url: ""
  },
  {
    id: 8,
    name: "Branding",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=800&fit=crop&q=80"
    ],
    color: "#010101",
    strokeColor: "#ff4d4d", // Red
    description: "Ideate logos, brand identities, and marketing campaign visuals with precision.",
    url: ""
  },
  {
    id: 9,
    name: "UI/UX",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=600&h=800&fit=crop&q=80"
    ],
    color: "#1a0b1c",
    strokeColor: "#c026d3", // Magenta
    description: "Prototype mobile apps, websites, and user interfaces with modern design systems.",
    url: ""
  },
  {
    id: 10,
    name: "Cinematic",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=800&fit=crop&q=80"
    ],
    color: "#0a1128",
    strokeColor: "#fbbf24", // Yellow
    description: "Craft epic movie-like scenes and fantasy worlds limited only by your imagination.",
    url: ""
  }
];

const CoverflowGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
  };

  const onTouchMove = (e) => {
    // Prevent default scrolling on mobile if touching inside gallery
    setTouchEnd(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveIndex((current) => (current + 1) % images.length);
    }
    if (isRightSwipe) {
      setActiveIndex((current) => (current - 1 + images.length) % images.length);
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndEvent}
      onMouseDown={onTouchStart}
      onMouseMove={onTouchMove}
      onMouseUp={onTouchEndEvent}
      onMouseLeave={() => { setTouchStart(null); setTouchEnd(null); }}
    >
      <div className="relative w-full h-[60%] md:h-[70%] flex items-center justify-center" style={{ perspective: '1200px' }}>
        {images.map((image, index) => {
          let distance = index - activeIndex;
          const total = images.length;
          
          if (distance > Math.floor(total / 2)) distance -= total;
          if (distance < -Math.floor(total / 2)) distance += total;

          const isActive = distance === 0;
          const isLeft = distance < 0;
          const isRight = distance > 0;
          
          const zIndex = 50 - Math.abs(distance);
          const scale = isActive ? 1 : 1 - (Math.abs(distance) * 0.15);
          
          let translateX = '0%';
          if (distance !== 0) {
            translateX = `${distance * 85}%`; 
          }
          
          let rotateY = 0;
          if (isLeft) rotateY = 30;
          if (isRight) rotateY = -30;

          const brightness = isActive ? 'brightness-100' : 'brightness-50';

          return (
            <div
              key={index}
              onClick={(e) => {
                if (touchStart && touchEnd && Math.abs(touchStart - touchEnd) > 10) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                setActiveIndex(index);
              }}
              className="absolute w-[60%] md:w-[35%] h-full rounded-xl md:rounded-2xl overflow-hidden cursor-pointer"
              style={{
                zIndex: zIndex,
                transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                transform: `translateX(${translateX}) scale(${scale}) rotateY(${rotateY}deg) translateZ(${isActive ? '50px' : '0px'})`,
                boxShadow: isActive ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : '0 10px 15px -3px rgba(0, 0, 0, 0.6)'
              }}
            >
              <img 
                src={image} 
                alt="Gallery" 
                className={`w-full h-full object-cover transition-all duration-700 pointer-events-none ${brightness}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Category = () => {
  const [activeStyle, setActiveStyle] = useState(stylesData[0]);
  const [itemWidth, setItemWidth] = useState(140);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleViewStyle = () => {
    if (user) {
      navigate('/dashboard', { state: { selectedPlatform: activeStyle.name } });
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
      const activeIndex = stylesData.findIndex(p => p.id === activeStyle.id);
      
      const itemLeft = activeIndex * itemWidth;
      const containerHalfWidth = container.offsetWidth / 2;
      const itemHalfWidth = itemWidth / 2;
      
      const scrollTarget = itemLeft - containerHalfWidth + itemHalfWidth;
      
      container.scrollTo({
        left: scrollTarget,
        behavior: 'smooth'
      });
    }
  }, [activeStyle, itemWidth]);

  return (
    <div className="w-full bg-transparent flex flex-col transition-colors duration-700">
      {/* Wave Decorative Header */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full block h-[60px] md:h-[100px] scale-x-[-1]" preserveAspectRatio="none">
          <path fill="#5C5450" d="M0,120 L1440,120 L1440,40 C1100,140 720,120 480,60 C240,0 120,20 0,40 Z"></path>
        </svg>
      </div>
      
      {/* Dark section matching the wave */}
      <div className="w-full bg-[#5C5450] flex flex-col pb-0 pt-4">
        <div className="w-full relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white tracking-tight px-4 md:px-8">
            Explore by Style
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
                  transform: `translateX(${stylesData.findIndex(p => p.id === activeStyle.id) * itemWidth - 30}px)`
                }}
              >
                <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  <path 
                    d="M 20 100 L 20 99 C 35 99, 45 89, 45 74 L 45 30 C 45 15, 60 2, 75 2 L 125 2 C 140 2, 155 15, 155 30 L 155 74 C 155 89, 165 99, 180 99 L 180 100 Z"
                    fill="#F7F5F0"
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
              {stylesData.map((styleItem) => {
                const isActive = activeStyle.id === styleItem.id;
                return (
                  <div 
                    key={styleItem.id} 
                    onClick={() => setActiveStyle(styleItem)}
                    className="relative z-10 flex flex-col items-center justify-center h-[100px] cursor-pointer shrink-0 group"
                    style={{ width: `${itemWidth}px` }}
                  >
                    <div 
                      className={`
                        font-bold text-[10px] md:text-xs tracking-widest uppercase transition-all duration-500 z-10 flex flex-col items-center text-center leading-none
                        ${isActive ? 'scale-110' : 'text-white/70 group-hover:text-white group-hover:opacity-100'}
                      `}
                      style={isActive ? { color: activeStyle.strokeColor, textShadow: '0 0 10px rgba(255,255,255,0.5)' } : {}}
                    >
                      {styleItem.name.split(' ').map((word, idx) => (
                        <span key={idx}>{word}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

        <div 
          className="w-full flex-1 pt-4 pb-6 md:pt-8 md:pb-12 px-6 md:px-12 flex flex-col relative z-0 mt-[-4px] border-4 rounded-b-xl md:rounded-b-2xl bg-transparent"
          style={{ borderColor: '#F97316' }}
        >
          <div 
            className="w-full flex-1 min-h-[40vh] md:min-h-[70vh] rounded-lg md:rounded-xl overflow-hidden relative group"
          >
            {/* 3D Coverflow Gallery Background */}
            <CoverflowGallery images={activeStyle.images || [activeStyle.image]} />
          </div>
      </div>
    </div>
  );
};

export default Category;
