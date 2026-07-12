import { useState, useContext, useEffect } from 'react';
import { X, User as UserIcon, Eye, EyeOff, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../api';

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
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

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
      setAvatarFile(null);
      setAvatarPreview(null);
      setRemoveAvatar(false);
    }
  }, [isOpen, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    let uploadedAvatarUrl = removeAvatar ? '' : user.avatar;
    if (avatarFile) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const token = userInfo.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const uploadData = new FormData();
        uploadData.append('image', avatarFile);
        const uploadRes = await api.post('/upload', uploadData, config);
        uploadedAvatarUrl = uploadRes.data.url;
      } catch (error) {
        toast.error('Failed to upload avatar');
        setIsLoading(false);
        return;
      }
    }
    
    const passwordToUpdate = formData.password ? formData.password : undefined;
    
    const result = await updateProfile(formData.name, formData.email, passwordToUpdate, uploadedAvatarUrl);
    
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
            <div className="p-6 border-b border-[#E5E2DC] flex justify-between items-center bg-[#F7F6F3]">
              <h2 className="text-xl font-bold text-[#262626] flex items-center gap-2">
                <UserIcon size={20} className="text-[#262626]" /> Edit Profile
              </h2>
              <button 
                onClick={onClose}
                className="p-2 bg-white hover:bg-slate-50 text-[#A09690] hover:text-[#262626] rounded-full transition-colors border border-[#E5E2DC] shadow-sm"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center justify-center mb-2 mt-2">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-[#F7F6F3] shadow-sm bg-white flex items-center justify-center overflow-hidden">
                      {avatarPreview || (user?.avatar && !removeAvatar) ? (
                        <img 
                          src={avatarPreview || user?.avatar} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserIcon size={40} className="text-[#A09690]" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-[#F97316] text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-[#FB923C] transition-colors border-2 border-white" title="Change Avatar">
                      <Edit2 size={12} />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setAvatarFile(e.target.files[0]);
                            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                            setRemoveAvatar(false);
                          }
                        }}
                      />
                    </label>
                    { (avatarPreview || (user?.avatar && !removeAvatar)) && (
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarFile(null);
                          setAvatarPreview(null);
                          setRemoveAvatar(true);
                        }}
                        className="absolute bottom-0 left-0 bg-white text-red-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-red-50 transition-colors border-2 border-white"
                        title="Remove Avatar"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-[#262626]">Full Name</label>
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
                        ? 'bg-[#F0EEEB] border-[#E5E2DC] text-[#262626] focus:border-[#F97316] focus:ring-[#F97316]' 
                        : 'bg-[#F7F6F3] border-transparent text-[#A09690] cursor-not-allowed opacity-80'
                    }`}
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-[#262626]">Email Address</label>
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
                        ? 'bg-[#F0EEEB] border-[#E5E2DC] text-[#262626] focus:border-[#F97316] focus:ring-[#F97316]' 
                        : 'bg-[#F7F6F3] border-transparent text-[#A09690] cursor-not-allowed opacity-80'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#262626] mb-1">
                    New Password <span className="text-xs font-normal text-[#A09690] ml-1">(Leave blank to keep current)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2.5 pr-10 text-[#262626] placeholder-[#A09690] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#A09690] hover:text-[#262626] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#262626] mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                      className="w-full bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl px-4 py-2.5 pr-10 text-[#262626] placeholder-[#A09690] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#A09690] hover:text-[#262626] transition-colors"
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
                    className="px-5 py-2.5 rounded-xl font-medium text-[#262626] hover:bg-[#F7F6F3] transition-colors disabled:opacity-50 border border-transparent hover:border-[#E5E2DC]"
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
