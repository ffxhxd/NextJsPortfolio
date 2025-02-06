// components/Sidebar/Links.tsx
import { motion } from "framer-motion";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const Links = () => {
  const items = ["Homepage", "About", "Portfolio", "Contact"];

  return (
    <motion.div
      variants={variants}
      className="bg-[#292929] flex flex-col items-center justify-center w-[300px] h-full gap-5"
    >
      {items.map((item) => (
        <motion.a
          href={`#${item.toLowerCase()}`}
          key={item}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-4xl md:text-2xl text-white hover:text-gray-200 transition-colors"
        >
          {item}
        </motion.a>
      ))}
      <h1 className="text-xs md:text-sm mt-4 text-white">Last Build 🚀: 02-06-2025</h1>
    </motion.div>
  );
};

export default Links;
