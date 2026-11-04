import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle, Loader2, ChevronRight } from 'lucide-react';

export interface SlideCommitProps {
  label?: string;
  doneLabel?: string;
  errorLabel?: string;
  onConfirm?: () => Promise<any> | void;
  onDone?: () => void;
  onError?: (reason: any) => void;
  trackColor?: string;
  handleColor?: string;
  successColor?: string;
  dangerColor?: string;
  width?: number | string;
  height?: number;
  radius?: number;
  speed?: number;
  returnBounce?: number;
  landingDip?: number;
  holdMs?: number;
  outcome?: 'resolve' | 'reject';
  latency?: number;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function SlideCommit({
  label = 'Slide to pay',
  doneLabel = 'Paid',
  errorLabel = 'Payment failed',
  onConfirm,
  onDone,
  onError,
  trackColor = '#262626',
  handleColor = '#f5f5f5',
  successColor = '#22c55e',
  dangerColor = '#e5484d',
  width = 280,
  height = 56,
  radius = 28,
  speed = 50,
  returnBounce = 0.38,
  landingDip = 0.026,
  holdMs = 1500,
  outcome = 'resolve',
  latency = 1200,
  disabled = false,
  icon,
  className = ''
}: SlideCommitProps) {
  const [status, setStatus] = useState<'idle' | 'dragging' | 'confirming' | 'done' | 'error'>('idle');
  const [dragX, setDragX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const padding = 4;
  const handleSize = height - padding * 2;

  // Maximum draggable distance
  const [maxDrag, setMaxDrag] = useState(200);

  const calculateMaxDrag = useCallback(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      setMaxDrag(Math.max(0, trackWidth - handleSize - padding * 2));
    }
  }, [handleSize, padding]);

  useEffect(() => {
    calculateMaxDrag();
    window.addEventListener('resize', calculateMaxDrag);
    return () => window.removeEventListener('resize', calculateMaxDrag);
  }, [calculateMaxDrag]);

  const progress = maxDrag > 0 ? Math.min(1, Math.max(0, dragX / maxDrag)) : 0;

  // Handle pointer down
  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled || status !== 'idle') return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isPointerDownRef.current = true;
    startXRef.current = e.clientX - dragX;
    setStatus('dragging');
  };

  // Handle pointer move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || status !== 'dragging') return;
    const newX = Math.max(0, Math.min(maxDrag, e.clientX - startXRef.current));
    currentXRef.current = newX;
    setDragX(newX);
  };

  // Commit flow
  const triggerCommit = useCallback(async () => {
    setStatus('confirming');
    setDragX(maxDrag);

    // Haptic feedback if available
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {}
    }

    try {
      if (onConfirm) {
        const result = onConfirm();
        if (result && typeof result.then === 'function') {
          await result;
        } else if (latency > 0) {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (outcome === 'reject') {
                reject(new Error('Operation rejected by test outcome'));
              } else {
                resolve(true);
              }
            }, latency);
          });
        }
      } else if (latency > 0) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (outcome === 'reject') {
              reject(new Error('Operation rejected'));
            } else {
              resolve(true);
            }
          }, latency);
        });
      }

      // Success
      setStatus('done');
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([30, 40, 60]);
        } catch {}
      }
      onDone?.();

      setTimeout(() => {
        setDragX(0);
        setStatus('idle');
      }, holdMs);
    } catch (err) {
      setStatus('error');
      onError?.(err);

      setTimeout(() => {
        setDragX(0);
        setStatus('idle');
      }, holdMs);
    }
  }, [maxDrag, onConfirm, latency, outcome, onDone, holdMs, onError]);

  // Handle pointer up/cancel
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // Check if dragged beyond 85% threshold
    if (dragX >= maxDrag * 0.85) {
      triggerCommit();
    } else {
      // Spring back to 0 with returnBounce
      setStatus('idle');
      setDragX(0);
    }
  };

  // Track background color interpolation based on status
  let currentTrackBg = trackColor;
  if (status === 'done') currentTrackBg = successColor;
  else if (status === 'error') currentTrackBg = dangerColor;

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none overflow-hidden transition-colors duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab'} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: `${height}px`,
        borderRadius: `${radius}px`,
        backgroundColor: currentTrackBg,
        boxShadow: status === 'done' 
          ? `0 0 20px ${successColor}50, inset 0 1px 0 rgba(255,255,255,0.2)` 
          : status === 'error'
          ? `0 0 20px ${dangerColor}50, inset 0 1px 0 rgba(255,255,255,0.2)`
          : 'inset 0 1px 2px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
        transform: status === 'confirming' ? `scale(${1 - landingDip})` : 'scale(1)',
        transition: 'transform 0.15s ease-out, background-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      {/* Dynamic Fill progress bar behind the handle */}
      {status !== 'done' && status !== 'error' && (
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none transition-[width] duration-75"
          style={{
            width: `${dragX + handleSize + padding * 2}px`,
            borderRadius: `${radius}px`,
            background: `linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.12) 100%)`
          }}
        />
      )}

      {/* Shimmer / animated chevron text label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <AnimatePresence mode="wait">
          {status === 'confirming' ? (
            <motion.div
              key="confirming"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-white/90 font-bold text-xs uppercase tracking-wider"
            >
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Processing...</span>
            </motion.div>
          ) : status === 'done' ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{doneLabel}</span>
            </motion.div>
          ) : status === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errorLabel}</span>
            </motion.div>
          ) : (
            <motion.div
              key="label"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 - progress * 1.5 }}
              className="flex items-center justify-center gap-1.5 text-neutral-300 font-bold text-xs uppercase tracking-wider pl-6"
            >
              <span className="truncate">{label}</span>
              <div className="flex items-center text-neutral-400 opacity-60">
                <ChevronRight className="w-3.5 h-3.5 -mr-2 animate-pulse" />
                <ChevronRight className="w-3.5 h-3.5 -mr-2 animate-pulse delay-75" />
                <ChevronRight className="w-3.5 h-3.5 animate-pulse delay-150" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Draggable Slider Handle Knob */}
      <motion.div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        animate={{
          x: dragX,
          scale: status === 'dragging' ? 1.05 : isHovered ? 1.02 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: speed * 8,
          damping: 24 - returnBounce * 12,
          mass: 0.8
        }}
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full shadow-lg cursor-grab active:cursor-grabbing z-20 touch-none"
        style={{
          left: `${padding}px`,
          width: `${handleSize}px`,
          height: `${handleSize}px`,
          backgroundColor: status === 'done' ? '#ffffff' : status === 'error' ? '#ffffff' : handleColor,
          color: status === 'done' ? successColor : status === 'error' ? dangerColor : '#000000',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)'
        }}
      >
        {status === 'confirming' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : status === 'done' ? (
          <Check className="w-5 h-5 stroke-[3]" />
        ) : status === 'error' ? (
          <AlertCircle className="w-5 h-5 text-red-600" />
        ) : icon ? (
          icon
        ) : (
          <ChevronRight className="w-5 h-5 text-neutral-800 transition-transform group-hover:translate-x-0.5" />
        )}
      </motion.div>
    </div>
  );
}

export default SlideCommit;
