import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreatePromptModal = ({ isOpen, onClose, formData, setFormData, onSubmit, isLoading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5E2DC] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-[#E5E2DC] flex justify-between items-center bg-[#F7F5F0]">
              <h2 className="text-2xl font-bold text-[#5C5450] flex items-center gap-2">
                <Plus size={24} className="text-[#5C5450]" /> Add New Prompt
              </h2>
              <button 
                onClick={onClose}
                className="p-2 bg-white hover:bg-slate-50 text-[#A09690] hover:text-[#5C5450] rounded-full transition-colors border border-[#E5E2DC] shadow-sm"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#5C5450] mb-1">Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="E.g. Cyberpunk Neon Street"
                    className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2.5 text-[#5C5450] placeholder-[#A09690] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#5C5450] mb-1">Reference Image (Optional)</label>
                  <input 
                    id="image-upload"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2 text-[#A09690] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#5C5450]/10 file:text-[#5C5450] hover:file:bg-[#5C5450]/20 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors cursor-pointer"
                  />
                  {formData.image && (
                    <div className="mt-4 relative rounded-xl overflow-hidden border border-[#E5E2DC] inline-block group shadow-sm bg-[#F0EEEB]">
                      <img 
                        src={URL.createObjectURL(formData.image)} 
                        alt="Preview" 
                        className="max-h-40 object-contain"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const fileInput = document.getElementById('image-upload');
                          if (fileInput) fileInput.value = '';
                          setFormData({...formData, image: null});
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-[#5C5450] rounded-full transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm shadow-md"
                        title="Remove Image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#5C5450] mb-1">Platform</label>
                  <select 
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                    className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2.5 text-[#5C5450] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                  >
                    <option value="Midjourney">Midjourney</option>
                    <option value="ChatGPT">ChatGPT</option>
                    <option value="DALL-E 3">DALL-E 3</option>
                    <option value="Stable Diffusion">Stable Diffusion</option>
                    <option value="Claude">Claude</option>
                    <option value="Gemini">Gemini</option>
                    <option value="Runway">Runway</option>
                    <option value="Sora">Sora</option>
                    <option value="Leonardo AI">Leonardo AI</option>
                    <option value="Suno">Suno</option>
                    <option value="ElevenLabs">ElevenLabs</option>
                    <option value="Luma">Luma</option>
                    <option value="Veo 3">Veo 3</option>
                    <option value="Kling">Kling</option>
                    <option value="Flux">Flux</option>
                    <option value="Imagen">Imagen</option>
                    <option value="Pika">Pika</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#5C5450] mb-1">Prompt Details</label>
                  <textarea 
                    value={formData.prompt}
                    onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                    placeholder="Type your full prompt here..."
                    rows="4"
                    className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2.5 text-[#5C5450] placeholder-[#A09690] font-mono text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#5C5450] mb-1">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="e.g. cinematic, 4k, neon"
                    className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2.5 text-[#5C5450] placeholder-[#A09690] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                  />
                </div>

                <div className="pt-6 flex justify-end gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-xl font-medium text-[#5C5450] hover:bg-[#F7F5F0] transition-colors disabled:opacity-50 border border-transparent hover:border-[#E5E2DC]"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-[#F97316] hover:bg-[#FB923C] text-white rounded-xl font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Prompt'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreatePromptModal;
