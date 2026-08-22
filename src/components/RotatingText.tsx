import React, { useState, useEffect, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence, Transition } from 'motion/react';

export interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  staggerDuration?: number;
  transition?: Transition;
  rotationInterval?: number;
  splitBy?: 'characters' | 'words' | 'lines';
  auto?: boolean;
  loop?: boolean;
  onNext?: (index: number) => void;
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(({
  texts,
  mainClassName = 'inline-flex items-center',
  splitLevelClassName = 'inline-block overflow-hidden',
  elementLevelClassName = 'inline-block',
  staggerFrom = 'first',
  initial = { y: '100%', opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: '-120%', opacity: 0 },
  staggerDuration = 0.025,
  transition = { type: 'spring', damping: 30, stiffness: 400 },
  rotationInterval = 2000,
  splitBy = 'characters',
  auto = true,
  loop = true,
  onNext,
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= texts.length - 1) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [texts.length, loop]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return loop ? texts.length - 1 : 0;
      }
      return prev - 1;
    });
  }, [texts.length, loop]);

  const handleJumpTo = useCallback((index: number) => {
    if (index >= 0 && index < texts.length) {
      setCurrentIndex(index);
    }
  }, [texts.length]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  useImperativeHandle(ref, () => ({
    next: handleNext,
    previous: handlePrevious,
    jumpTo: handleJumpTo,
    reset: handleReset,
  }), [handleNext, handlePrevious, handleJumpTo, handleReset]);

  useEffect(() => {
    if (onNext) {
      onNext(currentIndex);
    }
  }, [currentIndex, onNext]);

  useEffect(() => {
    if (!auto || texts.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [auto, texts.length, rotationInterval, handleNext]);

  const currentText = texts[currentIndex] || '';

  const elements = useMemo(() => {
    if (splitBy === 'words') {
      return currentText.split(' ').map((w, idx, arr) => ({
        text: w + (idx < arr.length - 1 ? '\u00A0' : ''),
        id: `${w}-${idx}`
      }));
    }
    if (splitBy === 'lines') {
      return currentText.split('\n').map((l, idx) => ({
        text: l,
        id: `${l}-${idx}`
      }));
    }
    // characters default (keep words grouped for proper wrapping if needed or single chars)
    const words = currentText.split(' ');
    const charsList: { char: string; wordIdx: number; charIdx: number; isSpace?: boolean }[] = [];
    
    words.forEach((word, wIdx) => {
      Array.from(word).forEach((char, cIdx) => {
        charsList.push({ char, wordIdx: wIdx, charIdx: cIdx });
      });
      if (wIdx < words.length - 1) {
        charsList.push({ char: '\u00A0', wordIdx: wIdx, charIdx: word.length, isSpace: true });
      }
    });

    return charsList;
  }, [currentText, splitBy]);

  const totalElements = elements.length;

  const getStaggerDelay = useCallback((index: number, total: number) => {
    if (total <= 1) return 0;
    if (staggerFrom === 'first') return index * staggerDuration;
    if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
    if (staggerFrom === 'center') {
      const center = (total - 1) / 2;
      return Math.abs(center - index) * staggerDuration;
    }
    if (staggerFrom === 'random') {
      return Math.random() * total * staggerDuration;
    }
    if (typeof staggerFrom === 'number') {
      return Math.abs(staggerFrom - index) * staggerDuration;
    }
    return index * staggerDuration;
  }, [staggerFrom, staggerDuration]);

  return (
    <span className={mainClassName}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentIndex}
          className="inline-flex flex-wrap items-center justify-center"
          layout
        >
          {splitBy === 'characters' ? (
            // Group by word for responsive text flow
            currentText.split(' ').map((word, wordIdx, wordArr) => (
              <span key={`word-${wordIdx}`} className="inline-flex whitespace-nowrap">
                {Array.from(word).map((char, charIdx) => {
                  // calculate global index
                  const prevWordsLength = wordArr
                    .slice(0, wordIdx)
                    .reduce((acc, w) => acc + w.length + 1, 0);
                  const globalIdx = prevWordsLength + charIdx;
                  const delay = getStaggerDelay(globalIdx, totalElements);

                  return (
                    <span key={`char-${charIdx}`} className={splitLevelClassName}>
                      <motion.span
                        className={elementLevelClassName}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{ ...transition, delay }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  );
                })}
                {wordIdx < wordArr.length - 1 && (
                  <span className={splitLevelClassName}>
                    <motion.span
                      className={elementLevelClassName}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          wordArr.slice(0, wordIdx).reduce((acc, w) => acc + w.length + 1, 0) + word.length,
                          totalElements
                        )
                      }}
                    >
                      {'\u00A0'}
                    </motion.span>
                  </span>
                )}
              </span>
            ))
          ) : (
            elements.map((item: any, idx: number) => {
              const delay = getStaggerDelay(idx, totalElements);
              return (
                <span key={item.id || idx} className={splitLevelClassName}>
                  <motion.span
                    className={elementLevelClassName}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{ ...transition, delay }}
                  >
                    {item.text}
                  </motion.span>
                </span>
              );
            })
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

RotatingText.displayName = 'RotatingText';

export default RotatingText;
