'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const MaskedHeading = ({
  text = 'Designed in the details',
  tag = 'h2',
  mediaType = 'image',
  src = '',
  poster = '',
  fillScale = 1.25,
  parallax = 26,
  drift = 16,
  brightness = 1.2,
  saturation = 1.35,
  grayscale = false,
  reveal = 'rise',
  duration = 1.1,
  stagger = 0.08,
  trigger = 'view',
  align = 'left',
  weight = 900,
  tracking = -0.02,
  lineHeight = 1.12,
  textScale = 0.075,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef(null);
  const wordElsRef = useRef([]);
  const tweenRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const words = useMemo(() => String(text).split(/\s+/).filter(Boolean), [text]);

  const settingsRef = useRef({ fillScale, parallax, drift, brightness, saturation, grayscale, textScale, mediaType, poster });
  useEffect(() => {
    settingsRef.current = { fillScale, parallax, drift, brightness, saturation, grayscale, textScale, mediaType, poster };
  }, [fillScale, parallax, drift, brightness, saturation, grayscale, textScale, mediaType, poster]);

  // Handle pointer parallax & idle organic drift loop
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    let last = performance.now();
    let clock = 0;

    const frame = now => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      const s = settingsRef.current;
      const off = offsetRef.current;

      const dx = Math.sin(clock * 0.22) * s.drift;
      const dy = Math.cos(clock * 0.18) * s.drift * 0.6;

      const ease = 1 - Math.exp(-dt / 0.16);
      off.x += (off.tx + dx - off.x) * ease;
      off.y += (off.ty + dy - off.y) * ease;

      const bgX = (50 + off.x * 0.2).toFixed(2);
      const bgY = (50 + off.y * 0.25).toFixed(2);

      root.style.setProperty('--bg-pos-x', `${bgX}%`);
      root.style.setProperty('--bg-pos-y', `${bgY}%`);

      raf = requestAnimationFrame(frame);
    };

    const onMove = e => {
      const s = settingsRef.current;
      if (s.parallax <= 0) return;
      const r = root.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / (r.width || 1)) * 2 - 1;
      const ny = ((e.clientY - r.top) / (r.height || 1)) * 2 - 1;
      offsetRef.current.tx = clamp(nx, -1, 1) * -s.parallax;
      offsetRef.current.ty = clamp(ny, -1, 1) * -s.parallax;
    };

    const onLeave = () => {
      offsetRef.current.tx = 0;
      offsetRef.current.ty = 0;
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // GSAP Entrance reveal animation
  const playEntrance = useCallback(() => {
    const targets = wordElsRef.current.filter(Boolean);
    if (!targets.length) return;

    tweenRef.current?.kill();

    if (reveal === 'rise') {
      tweenRef.current = gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            hasAnimatedRef.current = true;
          }
        }
      );
    } else if (reveal === 'wipe') {
      tweenRef.current = gsap.fromTo(
        targets,
        { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.3 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onComplete: () => {
            hasAnimatedRef.current = true;
          }
        }
      );
    } else if (reveal === 'fade') {
      tweenRef.current = gsap.fromTo(
        targets,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            hasAnimatedRef.current = true;
          }
        }
      );
    } else {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      hasAnimatedRef.current = true;
    }
  }, [duration, reveal, stagger]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || reveal === 'none') {
      const targets = wordElsRef.current.filter(Boolean);
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    if (trigger === 'hover') {
      root.addEventListener('pointerenter', playEntrance);
      return () => {
        root.removeEventListener('pointerenter', playEntrance);
        tweenRef.current?.kill();
      };
    }

    if (trigger === 'view') {
      const targets = wordElsRef.current.filter(Boolean);
      if (!hasAnimatedRef.current) {
        gsap.set(targets, { yPercent: 110, opacity: 0 });
      }

      const io = new IntersectionObserver(
        entries => {
          if (entries.some(e => e.isIntersecting)) {
            playEntrance();
            io.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      io.observe(root);
      return () => {
        io.disconnect();
        tweenRef.current?.kill();
      };
    }

    // Default: mount
    playEntrance();
    return () => tweenRef.current?.kill();
  }, [playEntrance, reveal, trigger]);

  const Tag = tag;
  const imageSource = src || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=85';

  return (
    <Tag
      ref={rootRef}
      className={`relative inline-block w-full m-0 p-0 antialiased select-none ${className}`.trim()}
      style={{
        textAlign: align,
        fontWeight: weight,
        letterSpacing: `${tracking}em`,
        lineHeight,
        '--bg-pos-x': '50%',
        '--bg-pos-y': '50%',
        ...style
      }}
      {...rest}
    >
      <span className="block [text-wrap:balance]">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden py-1 align-top [&:not(:last-child)]:mr-[0.26em]"
          >
            <span
              ref={el => {
                wordElsRef.current[i] = el;
              }}
              className="inline-block [will-change:transform,opacity] transition-[filter] duration-300"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(220, 252, 231, 0.94) 30%, rgba(134, 239, 172, 0.90) 65%, rgba(74, 222, 128, 0.88) 100%), url(${imageSource})`,
                backgroundSize: `${fillScale * 120}% auto`,
                backgroundPosition: 'var(--bg-pos-x) var(--bg-pos-y)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                filter: `brightness(${brightness}) saturate(${saturation})${grayscale ? ' grayscale(1)' : ''}`,
                textShadow: '0 0 35px rgba(74, 222, 128, 0.25)'
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
};

export default MaskedHeading;
