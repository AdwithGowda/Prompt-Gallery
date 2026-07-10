import React from 'react';

// Using Unsplash placeholder images with grayscale filter applied via URL
const images = [
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
  "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80"
];

// Shuffle array to make it look a bit different on reloads (optional but nice)
const shuffledImages = [...images].sort(() => 0.5 - Math.random());
const displayImages = [...shuffledImages, ...images].slice(0, 20); // Get enough images to fill screen

const MasonryBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0f0f11]">
      {/* Overlay to ensure text readability on top */}
      <div className="absolute inset-0 z-10 bg-[#0f0f11]/60"></div>
      
      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 p-4 opacity-40">
        {displayImages.map((src, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <img 
              src={src} 
              alt={`background ${i}`} 
              className="w-full rounded-2xl object-cover transition-all duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryBackground;
