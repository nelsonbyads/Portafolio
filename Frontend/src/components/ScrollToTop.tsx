import React from 'react';
import { useScroll } from '../hooks/useScroll';
import Button from './ui/Button';
import { IconZap } from './icons';

export const ScrollToTop: React.FC = () => {
  const { scrollY, isAtTop, scrollToTop } = useScroll();
  const showButton = scrollY > 300 && !isAtTop;

  if (!showButton) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 z-30 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      size="sm"
      variant="solid"
      aria-label="Volver arriba"
    >
      <IconZap className="w-5 h-5" />
    </Button>
  );
};

export default ScrollToTop;

