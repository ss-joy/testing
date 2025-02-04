import React, { useState, MouseEvent, useRef } from "react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ x, y }, setPositionOfMovingDiv] = useState({
    x: 0,
    y: 0,
  });

  function logData(e: MouseEvent<HTMLDivElement>) {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.pageX - rect.left;
      const relativeY = e.pageY - rect.top;

      setPositionOfMovingDiv({ x: relativeX, y: relativeY });
    }
  }

  return (
    <div>
      <main className="h-[100vh] flex items-center justify-center">
        <div
          ref={containerRef}
          onMouseMove={logData}
          className="relative w-[400px] h-[400px] border-2 border-slate-600 rounded-md 
          after:content-[''] 
          after:absolute 
          after:w-[98%] 
          after:h-[98%] 
          after:rounded-full 
          after:bg-slate-900 
          after:p-4"
          style={
            {
              "--mouse-x": `${x}px`,
              "--mouse-y": `${y}px`,
            } as React.CSSProperties
          }
        />
      </main>
      <style jsx>{`
        div::after {
          transform: translate(var(--mouse-x, 0), var(--mouse-y, 0));
        }
      `}</style>
    </div>
  );
};

export default Index;
