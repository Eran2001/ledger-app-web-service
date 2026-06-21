import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";

import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const navigate = useNavigate();
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const cardRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.title = "404 | Page Not Found";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 150;

    const computed = getComputedStyle(document.documentElement);
    const foreground = computed.getPropertyValue("--foreground").trim();
    const particleColor = `hsl(${foreground} / 0.25)`;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        for (
          let nextIndex = index + 1;
          nextIndex < particles.length;
          nextIndex += 1
        ) {
          const comparison = particles[nextIndex];
          const dx = particle.x - comparison.x;
          const dy = particle.y - comparison.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${foreground} / ${0.08 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(comparison.x, comparison.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setMousePos({ x: clientX, y: clientY });

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <div
      className="unauthorized-bg relative flex min-h-dvh overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="unauthorized-canvas absolute w-full h-full inset-0"
      />

      <div
        className="unauthorized-spotlight absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.08), transparent 80%)`,
        }}
      />

      <nav className="unauthorized-nav absolute top-0 right-0 left-0 flex justify-between items-center p-4 md:p-6">
        <div />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="app-sidebar-link app-sidebar-icon-btn"
        >
          {isDark ? (
            <Icon.Sun className="h-5 w-5" />
          ) : (
            <Icon.Moon className="h-5 w-5" />
          )}
        </Button>
      </nav>

      <main
        ref={cardRef}
        className={cn(
          "unauthorized-main relative mx-auto flex flex-col justify-center items-center",
          "gap-6 px-6 py-20 md:py-24 text-center min-h-dvh w-full max-w-4xl",
        )}
      >
        <div className="unauthorized-hero-code t-error-code">404</div>

        <div
          className={cn(
            "relative -mt-4 md:-mt-5 flex flex-col items-center gap-4 md:gap-5",
            "unauthorized-fade unauthorized-stagger-2",
          )}
        >
          <h1 className="unauthorized-heading">Page Not Found</h1>
          <p className="unauthorized-body">
            The resource you are looking for might have been removed, renamed,
            or is temporarily unavailable in the portal.
          </p>

          <div className="unauthorized-actions">
            <Button onClick={() => navigate({ to: "/dashboard" })}>
              <Icon.Home className="h-5 w-5" />
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                window.location.href = "mailto:support@dunner.com";
              }}
            >
              <Icon.Headset className="h-5 w-5" />
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
