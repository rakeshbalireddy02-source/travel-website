import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ 
  target, 
  prefix = '', 
  suffix = '', 
  duration = 2200, 
  decimals = 0,
  formatComma = true 
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, duration]);

  const animateCount = () => {
    const startTime = performance.now();
    const startVal = 0;
    const endVal = Number(target);

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easeOutExpo transition
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = startVal + (endVal - startVal) * easeOut;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(endVal);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const formatDisplay = (num) => {
    const fixed = num.toFixed(decimals);
    if (!formatComma) return fixed;

    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <span ref={elementRef} className="counter-animated-number" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{formatDisplay(count)}{suffix}
    </span>
  );
}
