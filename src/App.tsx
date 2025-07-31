import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import { getFlashingIndices } from "./utils/rules";
import { useSound } from "./hooks/useSound";

// Import sound files
import beepSound from "./assets/sounds/beep.mp3";
import clickSound from "./assets/sounds/click.mp3";
import dingSound from "./assets/sounds/ding.mp3";
import winSound from "./assets/sounds/win.mp3";

function App() {
  const [selected, setSelected] = useState<number[]>([]);
  const [flashingCells, setFlashingCells] = useState<number[]>([]);
  const [isFlashing, setIsFlashing] = useState(true);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [feedback, setFeedback] = useState<{ correct: number[]; incorrect: number[] } | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // --- Sounds ---
  const playBeep = useSound(beepSound, 0.3);
  const playClick = useSound(clickSound, 0.5);
  const playDing = useSound(dingSound, 0.7);
  const playWin = useSound(winSound, 0.8);

  // --- Theme: system preference + localStorage persistence ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // --- Level + Flashing Logic ---
  useEffect(() => {
    if (level > 5) {
      setGameWon(true);
      playWin();
      return;
    }

    const indices = getFlashingIndices(level);
    setFlashingCells(indices);
    setIsFlashing(true);
    setSelected([]);
    setFeedback(null);
    setTimer(10);

    const interval = setInterval(() => {
      playBeep();
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsFlashing(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [level]);

  const handleCellClick = (index: number) => {
    if (!isFlashing && !feedback && !gameWon) {
      playClick();
      setSelected((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    }
  };

  const handleSubmit = () => {
    const correct = selected.filter((i) => flashingCells.includes(i));
    const incorrect = selected.filter((i) => !flashingCells.includes(i));
    setScore((prev) => prev + correct.length - incorrect.length);
    setFeedback({ correct, incorrect });
    playDing();
  };

  const handleNextLevel = () => {
    setLevel((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-white text-black transition-colors duration-500 card">

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-xl mb-6 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold animate-pop">
          Signal Decoder Game
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm md:text-base rounded bg-gray-200 text-gray-800 hover:opacity-80 transition active:scale-95 btn"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Winner Screen */}
      {gameWon ? (
        <div className="flex flex-col items-center animate-fadeIn text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-4 animate-pop">
            🎉 You are the Winner!
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 animate-fadeIn">
            Final Score: <span className="font-semibold">{score}</span>
          </p>
          <button
            onClick={() => {
              setLevel(1);
              setScore(0);
              setGameWon(false);
            }}
            className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition active:scale-95 btn"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          {/* Level + Score */}
          <p className="mb-4 text-sm sm:text-base md:text-lg animate-fadeIn">
            Level: <span className="font-semibold">{level}</span> | Score:{" "}
            <span className="font-semibold">{score}</span>
          </p>

          {/* Timer */}
          {isFlashing && (
            <p className="mb-4 text-sm sm:text-base md:text-lg text-red-600 font-semibold animate-pop">
              Observe the pattern! Time left: {timer}s
            </p>
          )}

          {/* Grid */}
          <Grid
            onCellClick={handleCellClick}
            selectedCells={selected}
            flashingCells={flashingCells}
            isFlashing={isFlashing}
            feedback={feedback}
          />

          {/* Controls */}
          {!isFlashing && !feedback && (
            <div className="mt-4 flex flex-col items-center animate-fadeIn">
              <p className="text-xs sm:text-sm md:text-base mb-2">
                Now, select the squares you saw flashing!
              </p>
              <button
                onClick={handleSubmit}
                disabled={selected.length === 0}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base rounded transition active:scale-95 btn
                ${selected.length === 0 
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Submit
              </button>
            </div>
          )}

          {feedback && (
            <div className="mt-4 flex flex-col items-center animate-fadeIn">
              <p
                className={`mb-2 text-sm sm:text-base md:text-lg font-medium 
                ${feedback.incorrect.length > 0 ? "animate-shake" : "animate-pop"}`}
              >
                ✅ Correct: {feedback.correct.length} | ❌ Incorrect: {feedback.incorrect.length}
              </p>
              <button
                onClick={handleNextLevel}
                className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base bg-green-600 text-white rounded hover:bg-green-700 transition active:scale-95 btn"
              >
                Next Level
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
