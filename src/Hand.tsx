import { motion } from "framer-motion";

interface HandProps {
  choice: "Rock" | "Paper" | "Scissors";
  side: "left" | "right";
}

export default function Hand({ choice, side }: HandProps) {
  const images = {
    Rock: "/src/assets/rock.png",
    Paper: "/src/assets/paper.png",
    Scissors: "/src/assets/scissors.png",
  };

  return (
    <motion.img
      src={images[choice]}
      alt={choice}
      className={`w-32 h-32 ${side === "right" ? "rotate-90" : "-rotate-90"}`}
      initial={{ x: side === "left" ? -200 : 200 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    />
  );
}
