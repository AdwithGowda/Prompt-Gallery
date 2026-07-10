import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, Copy, Layers, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Category from '../components/Category';
import StyleDial from '../components/StyleDial';
import secureDataImg from '../assets/Secure data-cuate.svg';
import duplicateImg from '../assets/Duplicate-bro.svg';
import multitaskingImg from '../assets/Multitasking-rafiki.svg';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Never Lose a Prompt",
      content: "Safely store all your highly-tuned prompts along with the exact reference images that produced the best results.",
      icon: <Database size={28} />,
      image: secureDataImg
    },
    {
      title: "Copy in One Click",
      content: "When inspiration strikes, your best prompts are just one click away from being copied straight to your clipboard.",
      icon: <Copy size={28} />,
      image: duplicateImg
    },
    {
      title: "Multi-Platform Ready",
      content: "Organize prompts perfectly by platform. Whether it's Midjourney, ChatGPT, Sora, or Runway, we have a tag for it.",
      icon: <Layers size={28} />,
      image: multitaskingImg
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  const typingContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { 
        delayChildren: 0.2,
        staggerChildren: 0.05 
      }
    }
  };

  const typingChar = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.01 }
    }
  };

  const floatingImages = [
    { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80", targetX: "-40vw", targetY: "-30vh", delay: 0, size: "140px" },
    { src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80", targetX: "-35vw", targetY: "25vh", delay: 2, size: "180px" },
    { src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&q=80", targetX: "35vw", targetY: "-25vh", delay: 1, size: "160px" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", targetX: "40vw", targetY: "20vh", delay: 3, size: "150px" },
    { src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80", targetX: "-10vw", targetY: "-40vh", delay: 1.5, size: "120px" },
    { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80", targetX: "15vw", targetY: "35vh", delay: 0.5, size: "200px" },
    { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80", targetX: "-25vw", targetY: "10vh", delay: 2.5, size: "130px" },
    { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80", targetX: "25vw", targetY: "-5vh", delay: 0.8, size: "170px" },
    { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80", targetX: "10vw", targetY: "-45vh", delay: 1.8, size: "140px" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80", targetX: "-15vw", targetY: "40vh", delay: 1.2, size: "160px" },
  ];

  return (
    <div className="min-h-screen text-[#5C5450] font-sans selection:bg-[#F97316] selection:text-white overflow-x-hidden">


      {/* Floating Images Background */}
      <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden pointer-events-none z-0">
        {floatingImages.map((img, i) => (
          <motion.div
            key={`float-${i}`}
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ 
              opacity: [0, 0.3, 0.3, 0.3, 0.3, 0], 
              scale: [0, 0.4, 0.8, 1, 1.1, 1.1],
              x: ["-50%", `calc(-50% + ${img.targetX})`], 
              y: ["-50%", `calc(-50% + ${img.targetY})`] 
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              delay: img.delay,
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.1)] bg-cover bg-center"
            style={{
              width: img.size,
              height: img.size,
              backgroundImage: `url(${img.src})`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-32 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#EBE8E3] text-[#5C5450] font-bold text-sm tracking-wide">
            THE ULTIMATE PROMPT LIBRARY
          </div>
          <motion.h1 
            variants={typingContainer}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#5C5450] leading-[1.1] mb-6"
          >
            {"Master your AI ".split("").map((char, index) => (
              <motion.span key={`l1-${index}`} variants={typingChar}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C5450] to-[#A09690]">
              {"prompts.".split("").map((char, index) => (
                <motion.span key={`l2-${index}`} variants={typingChar}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-[#A09690] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            A minimalist sanctuary for your best Midjourney, ChatGPT, and Stable Diffusion prompts. Save, organize, and inspire.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {user ? (
              <Link to="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#5C5450] hover:bg-[#FB923C] text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                Go to Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <>
                <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#5C5450] hover:bg-[#FB923C] text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  Start Vaulting for Free <ArrowRight size={20} />
                </Link>
                <Link to="/login" className="w-full sm:w-auto flex items-center justify-center bg-white hover:bg-slate-50 text-[#5C5450] border border-[#E5E2DC] px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-sm">
                  I already have an account
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </main>

      {/* Style Dial Section */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 mb-24">
        <StyleDial />
      </section>

      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-[#EAE6DF] to-transparent blur-3xl opacity-60"></div>
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#EAE6DF] to-transparent blur-3xl opacity-40"></div>
      </div>

      {/* Category Explorer Section */}
      <section className="relative z-10 border-t border-[#E5E2DC]">
        <Category />
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24 relative z-10 border-t border-[#E5E2DC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#5C5450] mb-4">Everything you need to create faster.</h2>
            <p className="text-[#A09690] max-w-xl mx-auto">Stop losing your best prompts in endless chat histories or messy spreadsheets.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start mt-8">
            {/* Left Side: Headings (Hidden on Mobile) */}
            <div className="hidden md:flex w-full md:w-5/12 flex-col gap-4">
              {features.map((feature, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`text-left px-6 py-5 rounded-2xl transition-all duration-300 border ${
                    activeFeature === idx 
                      ? 'bg-white border-[#F97316] shadow-lg transform md:scale-105 relative z-10' 
                      : 'bg-[#F7F5F0] border-transparent hover:border-[#E5E2DC] hover:bg-white text-[#A09690]'
                  }`}
                >
                  <h3 className={`text-xl md:text-2xl font-bold transition-colors ${activeFeature === idx ? 'text-[#F97316]' : 'text-[#5C5450]'}`}>
                    {feature.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Right Side: Content (Slider on Mobile) */}
            <div className="w-full md:w-7/12 relative">
              
              {/* Mobile Arrows */}
              <button 
                onClick={() => setActiveFeature((prev) => (prev - 1 + features.length) % features.length)}
                className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white shadow-lg text-[#5C5450] p-2 rounded-full border border-[#EAE6DF] z-20 hover:bg-[#F97316] hover:text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={() => setActiveFeature((prev) => (prev + 1) % features.length)}
                className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white shadow-lg text-[#5C5450] p-2 rounded-full border border-[#EAE6DF] z-20 hover:bg-[#F97316] hover:text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              <motion.div 
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#F7F5F0] p-10 md:p-14 rounded-3xl border border-[#E5E2DC] h-full min-h-[350px] flex flex-col md:flex-row items-center justify-between relative z-10 overflow-hidden gap-8"
              >
                <div className="flex-1 relative z-10 w-full">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#5C5450] mb-4">{features[activeFeature].title}</h3>
                  <p className="text-lg md:text-xl text-[#A09690] leading-relaxed">
                    {features[activeFeature].content}
                  </p>
                </div>
                
                {features[activeFeature].image && (
                  <div className="w-32 md:w-48 xl:w-56 shrink-0 relative z-10 flex justify-center">
                    <img 
                      src={features[activeFeature].image} 
                      alt="Feature illustration" 
                      className="w-full h-auto object-contain opacity-90 drop-shadow-sm"
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#170E3A] via-[#85165E] to-[#FA6631] rounded-2xl md:rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            {/* Background Stars/Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
              <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/80 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-pulse shadow-[0_0_5px_rgba(255,255,255,0.8)]" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 z-10 w-full">
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">Ready to supercharge your creativity?</h2>
                <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto md:mx-0">
                  Join thousands of creators who trust Prompt Gallery AI to organize, enhance, and scale their ideas.
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full md:w-auto flex justify-center mt-2 md:mt-0 z-10">
                <Link to="/register" className="bg-[#0A0A0A] hover:bg-[#1F1F1F] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg w-full justify-center md:w-auto hover:shadow-xl hover:-translate-y-1">
                  Get Started for Free <ArrowRight size={18} className="text-[#A09690] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-8 border-t border-[#E5E2DC] text-center text-[#A09690]/80 text-sm">
        <p>© {new Date().getFullYear()} Prompt Gallery AI. Designed with minimalism in mind.</p>
      </footer>
    </div>
  );
};

export default Home;
