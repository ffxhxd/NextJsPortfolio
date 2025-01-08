import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  { text: "Hello!", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "السَّلامُ عَلَيْكُمْ", lang: "Arabic" },
  { text: "خوش آمدید", lang: "Urdu" },
  { text: "Hola!", lang: "Spanish" }
];


const Greeting = () => {
    const [currentGreeting, setCurrentGreeting] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      // Disable scrolling by adding overflow-hidden to the body
      if (isVisible) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
  
      // Cleanup function to ensure no scroll-lock remains
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [isVisible]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentGreeting < greetings.length - 1) {
          setCurrentGreeting(prev => prev + 1);
        }
      }, 1000);
  
      // Hide the component after all greetings
      setTimeout(() => {
        setIsVisible(false);
      }, (greetings.length * 1000) + 500);
  
      return () => clearInterval(interval);
    }, [currentGreeting]);
  
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0, borderRadius: "100%" }}
              animate={{ 
                scale: [0, 1, 1, 0.1, 0],
                borderRadius: ["100%", "0%", "0%", "100%", "100%"]
              }}
              transition={{ 
                duration: 4,
                times: [0, 0.2, 0.8, 0.9, 1],
                ease: "easeInOut"
              }}
              className="bg-black absolute inset-0"
            />
            
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGreeting}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h1 className="text-6xl font-bold text-white mb-2">
                    {greetings[currentGreeting].text}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  export default Greeting;