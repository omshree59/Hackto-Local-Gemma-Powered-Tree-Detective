'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#4ade80',
  glowColor = 'rgba(74, 222, 128, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
  wordClassName = '',
  style
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const isSmall = wordClassName?.includes('text-xs') || wordClassName?.includes('text-sm') || wordClassName?.includes('text-base');

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    const updateRect = () => {
      if (currentIndex === null || currentIndex === -1) return;
      if (!wordRefs.current[currentIndex] || !containerRef.current) return;

      const parentRect = containerRef.current.getBoundingClientRect();
      const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height
      });
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [currentIndex, words.length]);

  const handleMouseEnter = index => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  const gapClass = className.includes('gap-') ? '' : isSmall ? 'gap-1.5' : 'gap-4';

  return (
    <div
      className={`relative inline-flex justify-center items-center flex-wrap ${gapClass} ${className}`.trim()}
      ref={containerRef}
      style={{ outline: 'none', userSelect: 'none', ...style }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => {
              wordRefs.current[index] = el;
            }}
            className={`relative inline-block cursor-pointer select-none ${
              wordClassName || 'text-[3rem] font-black'
            }`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              '--border-color': borderColor,
              '--glow-color': glowColor,
              transition: `filter ${animationDuration}s ease`,
              outline: 'none'
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 && focusRect.width > 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration
        }}
        style={{
          '--border-color': borderColor,
          '--glow-color': glowColor
        }}
      >
        {isSmall ? (
          <>
            <span
              className="absolute w-2 h-2 border-[2px] rounded-[1px] -top-1 -left-1 border-r-0 border-b-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 3px var(--border-color))'
              }}
            />
            <span
              className="absolute w-2 h-2 border-[2px] rounded-[1px] -top-1 -right-1 border-l-0 border-b-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 3px var(--border-color))'
              }}
            />
            <span
              className="absolute w-2 h-2 border-[2px] rounded-[1px] -bottom-1 -left-1 border-r-0 border-t-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 3px var(--border-color))'
              }}
            />
            <span
              className="absolute w-2 h-2 border-[2px] rounded-[1px] -bottom-1 -right-1 border-l-0 border-t-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 3px var(--border-color))'
              }}
            />
          </>
        ) : (
          <>
            <span
              className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 4px var(--border-color))'
              }}
            />
            <span
              className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 4px var(--border-color))'
              }}
            />
            <span
              className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 4px var(--border-color))'
              }}
            />
            <span
              className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
              style={{
                borderColor: 'var(--border-color)',
                filter: 'drop-shadow(0 0 4px var(--border-color))'
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TrueFocus;
