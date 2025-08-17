import React, { useState } from "react";

const choices = ["rock", "paper", "scissors"];

function App() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [coins, setCoins] = useState<number>(10);

  const getImagePath = (choice: string | null): string => {
    if (!choice) return "";
    return `/${choice}.png`; // ← Load from public folder
  };

  const play = (player: string) => {
    const computer = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(player);
    setComputerChoice(computer);

    if (player === computer) {
      setResult("It's a Draw!");
    } else if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      setResult("You Win! 🎉");
      setCoins(coins + 1);
    } else {
      setResult("You Lose 😞");
      setCoins(coins - 1);
    }
  };

  return (
    <div className="text-center p-10 bg-gradient-to-r from-purple-400 to-pink-500 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">🎮 Rock Paper Scissors game🎮</h1>
      <p className="text-xl mb-6">Coins: {coins}</p>

      <div className="flex justify-center gap-6 mb-8">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => play(choice)}
            className="bg-white text-purple-600 px-6 py-2 rounded-full shadow-md hover:scale-105 transition"
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center gap-10 mb-6">
        {playerChoice && (
          <div>
            <p className="font-semibold mb-2">You</p>
            <img
              src={getImagePath(playerChoice)}
              alt={playerChoice}
              width={100}
            />
          </div>
        )}

        {computerChoice && (
          <div>
            <p className="font-semibold mb-2">Computer</p>
            <img
              src={getImagePath(computerChoice)}
              alt={computerChoice}
              width={100}
            />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold">{result}</h2>
    </div>
  );
}

export default App;
