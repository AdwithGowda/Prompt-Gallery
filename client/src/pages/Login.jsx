import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import MasonryBackground from '../components/MasonryBackground';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <MasonryBackground />
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white font-bold transition-colors drop-shadow-md">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 relative z-10"
      >
        <h2 className="text-3xl font-bold text-center text-[#5C5450]">Prompt Gallery AI</h2>
        <p className="text-center text-[#A09690]">Sign in to manage your prompts</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#5C5450]">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl focus:ring-1 focus:ring-[#5C5450] focus:border-[#5C5450] focus:outline-none text-[#5C5450] transition-colors"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#5C5450]">Password</label>
            <div className="relative mt-1">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl focus:ring-1 focus:ring-[#5C5450] focus:border-[#5C5450] focus:outline-none text-[#5C5450] transition-colors"
                required 
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
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 font-bold text-white bg-[#F97316] rounded-xl hover:bg-[#FB923C] transition duration-200 shadow-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <div className="text-center text-sm text-[#A09690]">
          Don't have an account? <Link to="/register" className="text-[#5C5450] font-bold hover:underline">Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
