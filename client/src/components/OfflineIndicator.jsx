import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OfflineIndicator = () => {
  const [show, setShow] = useState(!navigator.onLine);

  useEffect(() => {
    let timeout;

    const handleOnline = () => {
      setShow(false);
      if (timeout) clearTimeout(timeout);
    };

    const handleOffline = () => {
      setShow(true);
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShow(false);
      }, 3000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      timeout = setTimeout(() => {
        setShow(false);
      }, 3000);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center p-3 bg-red-500 text-white shadow-lg"
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            <WifiOff size={18} />
            <span>You are currently offline. Please check your internet connection.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;
