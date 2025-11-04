import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingOverlay = ({ show, text = "Memuat data..." }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-white/70 backdrop-blur-[2px] rounded-lg"
        >
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
            <p className="text-gray-700 text-sm font-medium">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
