import { useState } from 'react';
import { X, Copy, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewPromptModal = ({ prompt, onClose, onCopy }) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  if (!prompt) return null;

  return (
    <AnimatePresence>
      {prompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E5E2DC] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-[#F7F6F3] text-[#A09690] hover:text-[#262626] rounded-full backdrop-blur-md transition-colors shadow-sm"
            >
              <X size={20} />
            </button>

            <div className="md:w-1/2 bg-[#F0EEEB] min-h-[300px] flex items-center justify-center relative overflow-hidden group">
              {prompt.thumbnail ? (
                <>
                  <img 
                    src={prompt.thumbnail} 
                    alt={prompt.title} 
                    className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105" 
                    onClick={() => setIsImageViewerOpen(true)}
                  />
                  {/* Hover indicator for desktop */}
                  <div className="hidden md:flex absolute inset-0 pointer-events-none bg-black/0 group-hover:bg-black/10 transition-colors duration-300 items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform scale-90 group-hover:scale-100">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                  
                  {/* Persistent indicator for mobile */}
                  <div className="md:hidden absolute bottom-4 right-4 pointer-events-none bg-black/60 text-white px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2 text-xs font-medium shadow-lg border border-white/20">
                    <ZoomIn size={14} />
                    <span>Tap to view</span>
                  </div>
                </>
              ) : (
                <ImageIcon size={96} className="text-slate-300" />
              )}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#262626] text-sm font-bold px-3 py-1.5 rounded-full shadow-sm">
                {prompt.platform || prompt.aiModel}
              </div>
            </div>

            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <h2 className="text-2xl font-bold text-[#262626] mb-4 leading-tight">{prompt.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {prompt.tags.map(tag => (
                  <span key={tag} className="text-sm px-3 py-1 bg-[#FED7AA]/60 text-[#F97316] rounded-lg font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex-1 mb-6 flex flex-col min-h-0">
                <h3 className="text-sm font-bold text-[#262626] uppercase tracking-wider mb-3 shrink-0">Prompt Details</h3>
                <div className="bg-[#F7F6F3] border border-[#E5E2DC] rounded-xl p-4 flex-1 overflow-y-auto">
                  <p className="text-[#262626] font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {prompt.prompt}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={(e) => onCopy(prompt.prompt, e)}
                className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#FB923C] text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-sm"
              >
                <Copy size={18} /> Copy to Clipboard
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Full Screen Image Viewer */}
      <AnimatePresence>
        {isImageViewerOpen && prompt?.thumbnail && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img 
                src={prompt.thumbnail} 
                alt={prompt.title} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl pointer-events-auto rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                onClick={() => setIsImageViewerOpen(false)}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors pointer-events-auto"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default ViewPromptModal;
