import { X, Copy, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewPromptModal = ({ prompt, onClose, onCopy }) => {
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
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-[#F7F5F0] text-[#A09690] hover:text-[#5C5450] rounded-full backdrop-blur-md transition-colors shadow-sm"
            >
              <X size={20} />
            </button>

            <div className="md:w-1/2 bg-[#F0EEEB] min-h-[300px] flex items-center justify-center relative overflow-hidden">
              {prompt.thumbnail ? (
                <img src={prompt.thumbnail} alt={prompt.title} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={96} className="text-slate-300" />
              )}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#5C5450] text-sm font-bold px-3 py-1.5 rounded-full shadow-sm">
                {prompt.platform || prompt.aiModel}
              </div>
            </div>

            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <h2 className="text-2xl font-bold text-[#5C5450] mb-4 leading-tight">{prompt.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {prompt.tags.map(tag => (
                  <span key={tag} className="text-sm px-3 py-1 bg-[#FED7AA]/60 text-[#F97316] rounded-lg font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex-1 mb-6">
                <h3 className="text-sm font-bold text-[#5C5450] uppercase tracking-wider mb-3">Prompt Details</h3>
                <div className="bg-[#F7F5F0] border border-[#E5E2DC] rounded-xl p-4 h-[200px] overflow-y-auto">
                  <p className="text-[#5C5450] font-mono text-sm leading-relaxed whitespace-pre-wrap">
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
    </AnimatePresence>
  );
};

export default ViewPromptModal;
