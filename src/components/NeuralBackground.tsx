import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

const NeuralBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 100);
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        const getThemeColor = (variable: string) => {
            return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        };


        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };


        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);


            const particleColor = getThemeColor('--text-secondary') || '#9ca3af';

            ctx.fillStyle = particleColor;
            ctx.strokeStyle = particleColor;

            particles.forEach((p, i) => {

                p.x += p.vx;
                p.y += p.vy;


                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;


                const dxMouse = mouse.x - p.x;
                const dyMouse = mouse.y - p.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distMouse < 150) {
                    const angle = Math.atan2(dyMouse, dxMouse);
                    const force = (150 - distMouse) / 150;
                    const repelX = Math.cos(angle) * force * 0.5;
                    const repelY = Math.sin(angle) * force * 0.5;
                    p.x -= repelX;
                    p.y -= repelY;
                }


                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.globalAlpha = 0.5;
                ctx.fill();


                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.globalAlpha = 1 - dist / 150;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default NeuralBackground;
