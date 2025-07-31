// Utility: check prime
const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Returns an array of indices that should flash for each level
export const getFlashingIndices = (level: number): number[] => {
  const indices: number[] = [];

  switch (level) {
    case 1: // Even indices
      for (let i = 0; i < 25; i++) {
        if (i % 2 === 0) indices.push(i);
      }
      break;

    case 2: // Diagonals
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          const index = row * 5 + col;
          if (row === col || row + col === 4) indices.push(index);
        }
      }
      break;

    case 3: // Prime indices
      for (let i = 0; i < 25; i++) {
        if (isPrime(i)) indices.push(i);
      }
      break;

    case 4: // Center cluster (index 12 + its 4 neighbors)
      indices.push(12); // center
      indices.push(7, 11, 13, 17); // top, left, right, bottom neighbors
      break;

    case 5: // (row + col) % 3 === 0
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          const index = row * 5 + col;
          if ((row + col) % 3 === 0) indices.push(index);
        }
      }
      break;

    default:
      // Optional: loop back to level 1 after level 5
      return getFlashingIndices(((level - 1) % 5) + 1);
  }

  return indices;
};
