// components/Sidebar/ToggleButton.tsx
import { motion } from "framer-motion";

interface ToggleButtonProps {
  toggle: () => void;
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
);

const ToggleButton: React.FC<ToggleButtonProps> = ({ toggle }) => {
  return (
    <button
      onClick={toggle}
      className="fixed top-7 left-10 w-12 h-12 rounded-full bg-transparent border-none cursor-pointer z-[1000]"
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
};

export default ToggleButton;