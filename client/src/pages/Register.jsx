import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F5F0] relative">
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <Link to="/" className="flex items-center gap-2 text-[#A09690] hover:text-[#5C5450] font-bold transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-[#E5E2DC]"
      >
        <h2 className="text-3xl font-bold text-center text-[#5C5450]">Create Account</h2>
        <p className="text-center text-[#A09690]">Join Prompt Gallery AI today</p>
        
        {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#5C5450]">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-[#F0EEEB] border border-[#E5E2DC] rounded-xl focus:ring-1 focus:ring-[#5C5450] focus:border-[#5C5450] focus:outline-none text-[#5C5450] transition-colors"
              required 
            />
          </div>
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
            className="w-full py-2.5 font-bold text-white bg-[#F97316] rounded-xl hover:bg-[#FB923C] transition duration-200 shadow-sm mt-2"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center text-sm text-[#A09690]">
          Already have an account? <Link to="/login" className="text-[#5C5450] font-bold hover:underline">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
