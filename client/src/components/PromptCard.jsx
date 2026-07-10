import { Copy, Image as ImageIcon, Trash2, Heart } from 'lucide-react';

const PromptCard = ({ item, onClick, onCopy, onDelete, onToggleFavorite }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E2DC] flex flex-col group transition-all hover:border-[#D0CCC5] hover:shadow-md hover:-translate-y-1 cursor-pointer"
    >
      <div className="h-48 bg-[#F0EEEB] relative flex items-center justify-center overflow-hidden">
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <ImageIcon size={56} className="text-slate-300 group-hover:scale-110 transition-transform duration-500" />
        )}
        <div className="absolute top-3 left-3 bg-[#FED7AA]/90 backdrop-blur-sm text-[#F97316] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          {item.platform || item.aiModel || 'All'}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold text-[#5C5450] leading-tight">{item.title}</h3>
          <div className="flex gap-2 shrink-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleFavorite) onToggleFavorite(item._id, !item.isFavorite);
                }}
                className={`transition-colors p-1.5 rounded-lg flex items-center justify-center ${
                  item.isFavorite 
                    ? 'text-[#F97316] bg-[#F97316]/10 hover:bg-[#F97316]/20' 
                    : 'text-[#A09690]/80 hover:text-[#F97316] bg-[#F7F5F0] hover:bg-[#F97316]/10'
                }`}
                title={item.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart size={14} fill={item.isFavorite ? "currentColor" : "none"} />
              </button>
              
              {onDelete && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item._id, e);
                  }}
                  className="text-[#A09690]/80 hover:text-red-500 transition-colors p-1.5 bg-[#F7F5F0] hover:bg-red-50 rounded-lg flex items-center justify-center"
                  title="Delete Prompt"
                >
                  <Trash2 size={14} />
                </button>
              )}
            <button 
              onClick={(e) => onCopy(item.prompt, e)}
              className="text-[#A09690]/80 hover:text-[#5C5450] transition-colors p-1.5 bg-[#F7F5F0] hover:bg-[#EBE8E3] rounded-lg flex items-center gap-1"
              title="Copy Prompt"
            >
              <Copy size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden group-hover:block">Copy</span>
            </button>
          </div>
        </div>
        
        <p className="text-[#A09690] text-sm mb-4 leading-relaxed line-clamp-2">
          {item.prompt}
        </p>
        
        <div className="mt-auto flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 bg-[#FED7AA]/60 text-[#F97316] rounded-lg font-bold">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
