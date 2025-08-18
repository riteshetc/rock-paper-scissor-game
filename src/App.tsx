import { useState } from "react";
import "./App.css";
import winSound from "./assets/win.mp3";
import loseSound from "./assets/lose.mp3";
import drawSound from "./assets/draw.mp3";
import Confetti from "react-confetti";

const choices = [
  { name: "rock", emoji: "✊" },
  { name: "paper", emoji: "✋" },
  { name: "scissors", emoji: "✌️" },
];

function App() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [coins, setCoins] = useState(100);
  const [showConfetti, setShowConfetti] = useState(false);

  const play = (choice: string) => {
    const randomChoice =
      choices[Math.floor(Math.random() * choices.length)].name;

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);

    if (choice === randomChoice) {
      setResult("draw");
      new Audio(drawSound).play();
      setShowConfetti(false);
    } else if (
      (choice === "rock" && randomChoice === "scissors") ||
      (choice === "paper" && randomChoice === "rock") ||
      (choice === "scissors" && randomChoice === "paper")
    ) {
      setResult("win");
      setCoins(coins + 10);
      new Audio(winSound).play();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setResult("lose");
      setCoins(coins - 10);
      new Audio(loseSound).play();
      setShowConfetti(false);
    }
  };

  return (
    <div className="app">
      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={300} gravity={0.2} />
      )}
      <div className="card">
        <h1>🎮 Rock Paper Scissors 🎮</h1>
        <p className="coins">Coins: {coins}</p>

        {/* Rock Paper Scissors main buttons */}
        <div className="buttons">
          {choices.map((c) => (
            <button
              key={c.name}
              onClick={() => play(c.name)}
              className="emoji-btn"
            >
              {c.emoji}
            </button>
          ))}
        </div>

        {/* Choices (slightly smaller emojis) */}
        <div className="choices">
          <div className="choice-box">
            <p className="choice-label">You</p>
            {playerChoice && (
              <span className="choice-emoji">
                {choices.find((c) => c.name === playerChoice)?.emoji}
              </span>
            )}
          </div>
          <div className="choice-box">
            <p className="choice-label">Computer</p>
            {computerChoice && (
              <span className="choice-emoji">
                {choices.find((c) => c.name === computerChoice)?.emoji}
              </span>
            )}
          </div>
        </div>

        {/* Result */}
        {result && (
          <h2
            className={
              result === "win"
                ? "result-box win"
                : result === "lose"
                ? "result-box lose"
                : "result-box draw"
            }
          >
            {result === "win" && "🎉 You Win! 🎉"}
            {result === "lose" && "😢 You Lose!"}
            {result === "draw" && "🤝 It's a Draw!"}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
