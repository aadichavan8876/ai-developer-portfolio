import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        className="fixed pointer-events-none z-50 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_10px_#00f0ff]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`
        }}
      />
      {/* Glowing Outer Ring */}
      <div
        className="fixed pointer-events-none z-40 w-8 h-8 border border-indigo-400/60 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.8 : 1})`
        }}
      />
    </>
  );
};

export default CustomCursor;
