import { useEffect, useRef, useState } from 'react';

export default function Squares({ 
  direction = 'right',
  speed = 1,
  borderColor = '#333',
  squareSize = 40,
  hoverFillColor = '#222'
}) {
  const canvasRef = useRef(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let gridOffset = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / squareSize) + 1;
      const rows = Math.ceil(canvas.height / squareSize) + 1;

      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const squareX = x * squareSize - (gridOffset.x % squareSize);
          const squareY = y * squareSize - (gridOffset.y % squareSize);

          if (
            hoveredSquare &&
            Math.floor((squareX + (gridOffset.x % squareSize)) / squareSize) === hoveredSquare.x &&
            Math.floor((squareY + (gridOffset.y % squareSize)) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      if (direction === 'right') gridOffset.x += speed;
      else if (direction === 'left') gridOffset.x -= speed;
      else if (direction === 'up') gridOffset.y -= speed;
      else if (direction === 'down') gridOffset.y += speed;
      else if (direction === 'diagonal') {
        gridOffset.x += speed;
        gridOffset.y += speed;
      }
      drawGrid();
      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    updateAnimation();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, hoverFillColor, hoveredSquare, squareSize]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoveredSquare({
      x: Math.floor(x / squareSize),
      y: Math.floor(y / squareSize)
    });
  };

  const handleMouseLeave = () => setHoveredSquare(null);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full border-none block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
