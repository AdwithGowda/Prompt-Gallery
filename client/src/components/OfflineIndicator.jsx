import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OfflineIndicator = () => {
  const [status, setStatus] = useState(!navigator.onLine ? 'offline' : 'none');

  useEffect(() => {
    let timeout;

    const handleOnline = () => {
      setStatus('online');
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setStatus('none');
      }, 3000);
    };

    const handleOffline = () => {
      setStatus('offline');
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setStatus('none');
      }, 3000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      timeout = setTimeout(() => {
        setStatus('none');
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
      {status !== 'none' && (
        <motion.div
          key={status}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-center p-3 text-white shadow-lg ${status === 'offline' ? 'bg-red-500' : 'bg-green-500'}`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {status === 'offline' ? <WifiOff size={18} /> : <Wifi size={18} />}
            <span>
              {status === 'offline' 
                ? 'You are currently offline. Please check your internet connection.'
                : 'You are back online! Connection restored.'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;
