import { useCallback } from "react";

export const useSound = (src: string, volume: number = 1.0) => {
  const play = useCallback(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play();
  }, [src, volume]);

  return play;
};
