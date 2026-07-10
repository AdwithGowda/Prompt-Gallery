import { useState, useContext, useEffect } from 'react';
import { X, User as UserIcon, Eye, EyeOff, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
      setIsEditingName(false);
      setIsEditingEmail(false);
    }
  }, [isOpen, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    const passwordToUpdate = formData.password ? formData.password : undefined;
    
    const result = await updateProfile(formData.name, formData.email, passwordToUpdate);
    
    if (result.success) {
      toast.success('Profile updated successfully!');
      setIsEditingName(false);
      setIsEditingEmail(false);
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      toast.error(result.message);
    }
    
    setIsLoading(false);
  };

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
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5E2DC] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-[#E5E2DC] flex justify-between items-center bg-[#F7F5F0]">
              <h2 className="text-xl font-bold text-[#5C5450] flex items-center gap-2">
                <UserIcon size={20} className="text-[#5C5450]" /> Edit Profile
              </h2>
              <button 
                onClick={onClose}
                className="p-2 bg-white hover:bg-slate-50 text-[#A09690] hover:text-[#5C5450] rounded-full transition-colors border border-[#E5E2DC] shadow-sm"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-[#5C5450]">Full Name</label>
                    <button 
                      type="button" 
                      onClick={() => {
                        if (isEditingName) {
                          setFormData(prev => ({...prev, name: user.name || ''}));
                        }
                        setIsEditingName(!isEditingName);
                      }}
                      className="text-xs font-bold text-[#F97316] hover:text-[#FB923C] transition-colors flex items-center gap-1 bg-[#F97316]/10 px-2 py-1 rounded-md"
                    >
                      {isEditingName ? 'Cancel' : <><Edit2 size={12} /> Edit</>}
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={!isEditingName}
                    placeholder="Your Name"
                    className={`w-full border rounded-xl px-4 py-2.5 transition-colors focus:outline-none focus:ring-1 ${
                      isEditingName 
                        ? 'bg-[#F0EEEB] border-[#E5E2DC] text-[#5C5450] focus:border-[#F97316] focus:ring-[#F97316]' 
                        : 'bg-[#F7F5F0] border-transparent text-[#A09690] cursor-not-allowed opacity-80'
                    }`}
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-[#5C5450]">Email Address</label>
                    <button 
                      type="button" 
                      onClick={() => {
                        if (isEditingEmail) {
                          setFormData(prev => ({...prev, email: user.email || ''}));
                        }
                        setIsEditingEmail(!isEditingEmail);
                      }}
                      className="text-xs font-bold text-[#F97316] hover:text-[#FB923C] transition-colors flex items-center gap-1 bg-[#F97316]/10 px-2 py-1 rounded-md"
                    >
                      {isEditingEmail ? 'Cancel' : <><Edit2 size={12} /> Edit</>}
                    </button>
                  </div>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditingEmail}
                    placeholder="your@email.com"
                    className={`w-full border rounded-xl px-4 py-2.5 transition-colors focus:outline-none focus:ring-1 ${
                      isEditingEmail 
                        ? 'bg-[#F0EEEB] border-[#E5E2DC] text-[#5C5450] focus:border-[#F97316] focus:ring-[#F97316]' 
                        : 'bg-[#F7F5F0] border-transparent text-[#A09690] cursor-not-allowed opacity-80'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#5C5450] mb-1">
                    New Password <span className="text-xs font-normal text-[#A09690] ml-1">(Leave blank to keep current)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2.5 pr-10 text-[#5C5450] placeholder-[#A09690] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#A09690] hover:text-[#5C5450] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#5C5450] mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                      className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2.5 pr-10 text-[#5C5450] placeholder-[#A09690] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#A09690] hover:text-[#5C5450] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 mt-2">
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
                      'Save Changes'
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

export default EditProfileModal;
