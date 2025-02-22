import { useRef } from 'react';

export const useHome = () => {
  const refCarousel = useRef(null);
  return {
    refCarousel,
  };
};
