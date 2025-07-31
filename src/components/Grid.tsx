import React from "react";

interface GridProps {
  onCellClick?: (index: number) => void;
  selectedCells?: number[];
  flashingCells?: number[];
  isFlashing?: boolean;
  feedback?: { correct: number[]; incorrect: number[] } | null;
}

const Grid: React.FC<GridProps> = ({
  onCellClick,
  selectedCells = [],
  flashingCells = [],
  isFlashing = false,
  feedback = null,
}) => {
  return (
    <div className="grid grid-cols-5 gap-2 w-max mx-auto">
      {Array.from({ length: 25 }).map((_, index) => {
        const isSelected = selectedCells.includes(index);
        const shouldFlash = isFlashing && flashingCells.includes(index);

        // Feedback coloring
        const isCorrect = feedback?.correct.includes(index);
        const isIncorrect = feedback?.incorrect.includes(index);

        return (
          <div
            key={index}
            onClick={() => onCellClick?.(index)}
            className={`border rounded cursor-pointer transition-all duration-300
              w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
              ${isSelected ? "bg-blue-500 scale-105" : "bg-gray-200 dark:bg-gray-700"}
              ${shouldFlash ? "animate-pulse bg-yellow-400" : ""}
              ${isCorrect ? "bg-green-500 animate-pop" : ""}
              ${isIncorrect ? "bg-red-500 animate-shake" : ""}`}
          />
        );
      })}
    </div>
  );
};

export default Grid;
