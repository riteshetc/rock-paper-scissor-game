import { useState } from "react";
import { motion } from "framer-motion";

// Rock Paper Scissors images
const choices = [
  { name: "Rock", img: "https://i.ibb.co/wybpDgR/rock.png" },
  { name: "Paper", img: "https://i.ibb.co/zN4H9mL/paper.png" },
  { name: "Scissors", img: "https://i.ibb.co/CBc1Hmq/scissors.png" },
];

// Sounds
const winSound = new Audio(
  "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
);
const loseSound = new Audio(
  "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"
);
const drawSound = new Audio(
  "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
);

export default function App() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [cpuChoice, setCpuChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [coins, setCoins] = useState(100);

  const playGame = (choice: string) => {
    setPlayerChoice(choice);

    const randomChoice =
      choices[Math.floor(Math.random() * choices.length)].name;
    setCpuChoice(randomChoice);

    if (choice === randomChoice) {
      setResult("Draw");
      drawSound.play();
    } else if (
      (choice === "Rock" && randomChoice === "Scissors") ||
      (choice === "Paper" && randomChoice === "Rock") ||
      (choice === "Scissors" && randomChoice === "Paper")
    ) {
      setResult("You Win!");
      setCoins((c) => c + 10);
      winSound.play();
    } else {
      setResult("You Lose!");
      setCoins((c) => c - 10);
      loseSound.play();
    }
  };

  return (
    <div className="animate-gradient flex flex-col items-center justify-center min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between w-full px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          🎮 Rock Paper Scissors
        </h1>
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg text-sm">
          🪙 Coins: {coins}
        </div>
      </div>

      {/* Choices */}
      <div className="flex gap-10 mt-16">
        {choices.map((choice) => (
          <motion.button
            key={choice.name}
            onClick={() => playGame(choice.name)}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-900 hover:bg-gray-700 p-4 rounded-2xl shadow-xl border border-purple-500"
          >
            <img src={choice.img} alt={choice.name} className="w-20 h-20" />
            <p className="mt-2 text-xs">{choice.name}</p>
          </motion.button>
        ))}
      </div>

      {/* Results */}
      {result && (
        <div className="mt-16 text-center">
          <p className="text-sm md:text-lg mb-2">You chose: {playerChoice}</p>
          <p className="text-sm md:text-lg mb-2">CPU chose: {cpuChoice}</p>
          <p
            className={`text-xl md:text-3xl font-bold ${
              result === "You Win!"
                ? "text-green-400"
                : result === "You Lose!"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {result}
          </p>
        </div>
      )}
    </div>
  );
}
