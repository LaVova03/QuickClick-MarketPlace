import React, { useEffect, useRef } from 'react';

const CanvasWaveAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let animationFrameId;

        const draw = (time) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const waveHeight = Math.sin(time / 1000) * 100; // Высота волны
            const lineWidth = 5;
            const lineCount = 40;
            const spacing = 20;

            for (let i = 0; i < lineCount; i++) {
                const y = canvas.height / 2 + Math.sin((time / 1000 + i) * 2) * waveHeight;
                const x = i * (lineWidth + spacing) + 20;

                const gradient = context.createLinearGradient(x, 0, x, canvas.height);
                gradient.addColorStop(0, '#ffea00'); // Желтый снизу
                gradient.addColorStop(1, '#3498db'); // Синий сверху

                context.beginPath();
                context.moveTo(x, canvas.height / 2);
                context.lineTo(x, y);
                context.lineWidth = lineWidth;
                context.strokeStyle = gradient;
                context.stroke();
            }

            animationFrameId = requestAnimationFrame((newTime) => draw(newTime));
        };

        draw(0);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return <canvas ref={canvasRef} width={500} height={240} />;
};

export default CanvasWaveAnimation;

