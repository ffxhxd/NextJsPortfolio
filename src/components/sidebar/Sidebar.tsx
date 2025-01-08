// components/Sidebar/Sidebar.tsx
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import Links from "./Links";
import ToggleButton from "./ToggleButton";
import GridPattern from "../ui/grid-pattern";

const sidebarVariants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    }
  },
  closed: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const Sidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      className="fixed top-0 left-0 bottom-0 w-[400px] md:w-[300px] z-[999]"
    >
      <motion.div 
        className="absolute top-0 left-0 bottom-0 w-full"
        variants={sidebarVariants}
      >
        <Links />
      </motion.div>
      <ToggleButton toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default Sidebar;
