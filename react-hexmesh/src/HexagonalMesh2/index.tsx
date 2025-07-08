import React, { useEffect, useRef, useCallback } from "react";

interface Hexagon {
  x: number;
  y: number;
  centerX: number;
  centerY: number;
}

const HexagonalMesh2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexagonsRef = useRef<Hexagon[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // 六边形参数
  const hexSize = 25; // 六边形半径
  const hexWidth = hexSize * 2;
  const hexHeight = hexSize * Math.sqrt(3);
  const strokeWidth = 2;

  // 初始化六边形网格
  const initializeHexagons = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸为窗口大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hexagons: Hexagon[] = [];
    
    // 计算网格参数
    const cols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 2;
    const rows = Math.ceil(canvas.height / hexHeight) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexWidth * 0.75;
        const y = row * hexHeight + (col % 2) * (hexHeight / 2);
        
        // 计算六边形中心点
        const centerX = x + hexSize;
        const centerY = y + hexSize;

        hexagons.push({
          x,
          y,
          centerX,
          centerY
        });
      }
    }

    hexagonsRef.current = hexagons;
  }, [hexWidth, hexHeight, hexSize]);

  // 绘制单个六边形，支持可选填充
  const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, hex: Hexagon, strokeColor?: string, opacity: number = 1, fillColor?: string, fillOpacity: number = 0) => {
    // 填充
    if (fillColor && fillOpacity > 0) {
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = hex.centerX + hexSize * Math.cos(angle);
        const y = hex.centerY + hexSize * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.globalAlpha = fillOpacity;
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.restore();
    }
    // 描边
    if (strokeColor && opacity > 0) {
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = hex.centerX + hexSize * Math.cos(angle);
        const y = hex.centerY + hexSize * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();
      ctx.restore();
    }
  }, [strokeWidth, hexSize]);

  // 计算HSL彩虹颜色
  const getRainbowColor = useCallback((hue: number, saturation: number = 100, lightness: number = 50) => {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, []);

  // 渲染函数
  const render = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mouseX = mousePosRef.current?.x;
    const mouseY = mousePosRef.current?.y;
    const maxDistance = 150; // 最大发光距离

    hexagonsRef.current.forEach(hex => {
      if (mouseX == null || mouseY == null) {
        // 只画普通描边+淡填充
        drawHexagon(ctx, hex, '#2C3D57', 0.4, '#111', 0.13);
        return;
      }
      // 计算到鼠标的距离
      const distance = Math.sqrt(
        Math.pow(hex.centerX - mouseX, 2) + Math.pow(hex.centerY - mouseY, 2)
      );

      if (distance <= maxDistance) {
        // 在发光范围内的六边形
        const normalizedDistance = distance / maxDistance;
        const opacity = 1 - normalizedDistance;
        const hue = (1 - normalizedDistance) * 360;
        const fillColor = getRainbowColor(hue, 100, 40);
        const fillOpacity = 0.35 * opacity; // 填充透明度
        // 先填充
        drawHexagon(ctx, hex, undefined, 0, fillColor, fillOpacity);
        // 多层发光描边
        for (let i = 0; i < 3; i++) {
          const glowOpacity = opacity * (1 - i * 0.3);
          const glowColor = getRainbowColor(hue, 100, 60 + i * 10);
          drawHexagon(ctx, hex, glowColor, glowOpacity);
        }
      } else {
        // 非发光范围，深灰描边+淡填充
        drawHexagon(ctx, hex, '#2C3D57', 0.5, '#111', 0.13);
      }
    });

    // 继续动画循环
    animationIdRef.current = requestAnimationFrame(render);
  }, [drawHexagon, getRainbowColor]);

  // 鼠标移动处理
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  }, []);

  // 鼠标离开处理
  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = null;
  }, []);

  // 窗口大小改变处理
  const handleResize = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    initializeHexagons();
    render();
  }, [initializeHexagons, render]);

  useEffect(() => {
    initializeHexagons();
    render();

    // 添加事件监听器
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [initializeHexagons, render, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'block',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 0,
        cursor: 'pointer',
        background: '#000'
      }}
    />
  );
};

export default HexagonalMesh2;
