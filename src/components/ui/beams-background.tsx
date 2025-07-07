"use client";

import React, { useEffect, useRef } from "react"; // Added React import
import { cn } from "../../lib/utils"; // Revert to relative path

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode; // Added children prop
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5, // Ensure beams are long enough
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 190 + Math.random() * 70, // Cool hues (adjust as needed)
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export function BeamsBackground({
    className,
    children, // Destructure children
    intensity = "strong",
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 20;

    const opacityMap = {
        subtle: 0.7,
        medium: 0.85,
        strong: 1,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            // Use parent element size for canvas dimensions
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS * 1.5;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(rect.width, rect.height) // Use rect dimensions
            );
        };

        updateCanvasSize();
        // Use ResizeObserver for more reliable size updates
        const resizeObserver = new ResizeObserver(updateCanvasSize);
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }
        // window.addEventListener("resize", updateCanvasSize); // Keep resize listener as fallback

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            if (!canvas) return beam;
            const parent = canvas.parentElement;
            if (!parent) return beam;
            const rect = parent.getBoundingClientRect();

            const column = index % 3;
            const spacing = rect.width / 3;

            beam.y = rect.height + 100; // Start below parent
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 190 + (index * 70) / totalBeams; // Cool hues
            beam.opacity = 0.2 + Math.random() * 0.1;
            beam.length = rect.height * 2.5; // Update length based on parent height
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity =
                beam.opacity *
                (0.8 + Math.sin(beam.pulse) * 0.2) *
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();

            ctx.clearRect(0, 0, rect.width, rect.height); // Use parent dimensions
            // ctx.filter = "blur(35px)"; // Apply blur via CSS instead for better performance

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }
                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            // window.removeEventListener("resize", updateCanvasSize);
            if (canvas.parentElement) {
                resizeObserver.unobserve(canvas.parentElement);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity]); // Rerun effect if intensity changes

    return (
        // Changed outer div to allow children and relative positioning
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ filter: "blur(35px)" }} // Apply blur via style
            />
            {/* Optional overlay */}
            {/* <div className="absolute inset-0 bg-neutral-950/5" /> */}
            {/* Render children above the canvas */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
