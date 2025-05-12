'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MainLayout from '../components/MainLayout';

const messages = [
  "More than a website — a complete digital foundation",
  "Custom websites tailored to your business vision",
  "Built-in SEO. Admin access. Total control.",
  "From code to content — I handle it all",
  "No templates. No shortcuts. Just premium craftsmanship",
  "Make your brand unforgettable online",
  "Designed for growth. Optimized for Google.",
  "Advanced dashboards for SEO and performance insights",
  "Modern, fast, and always scalable",
  "One developer. One partner. Everything done right."
];

const TypewriterText = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout;

    if (visible) {
      if (subIndex < messages[index].length) {
        timeout = setTimeout(() => {
          setText((prev) => prev + messages[index][subIndex]);
          setSubIndex((prev) => prev + 1);
        }, 85);
      } else {
        timeout = setTimeout(() => setVisible(false), 2500);
      }
    } else {
      timeout = setTimeout(() => {
        setText('');
        setSubIndex(0);
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, visible]);

  return (
    <motion.h1
      className="text-[1.5rem] min-h-[9rem] neon-text sm:text-3xl md:text-5xl text-green-400 font-mono text-center whitespace-pre-wrap leading-snug tracking-normal"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
      <motion.span
        className="text-green-500"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        |
      </motion.span>
    </motion.h1>
  );
};

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const chars = '<>/@{}[]$%&*#'.split('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Code Rain Canvas Background (original)
  useEffect(() => {
    if (!isClient) return;
    const canvas = document.getElementById('codeRain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const chars = "<>/{[]}$()*&^@#%!".split('');
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff90';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const interval = setInterval(draw, 60);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isClient]);

  // Matrix Particles on Cursor Move
  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Move custom cursor
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }

    const particle = document.createElement('div');
    particle.className = 'matrix-particle';
    particle.innerText = chars[Math.floor(Math.random() * chars.length)];
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  };

  const { ref: slideRef, inView: slideIn } = useInView({ triggerOnce: false, threshold: 0.3 });
  const { ref: zoomRef, inView: zoomIn } = useInView({ triggerOnce: false, threshold: 0.3 });
  const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: false, threshold: 0.4 });

  return (
    <MainLayout>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className=" relative flex flex-col items-center justify-center min-h-screen w-full text-center overflow-hidden bg-black px-4 sm:px-6"
        >
          {/* Code Rain Background */}
          <div className="absolute inset-0 z-0">
            {isClient && <canvas id="codeRain" className="w-full h-full" />}
          </div>

          {/* Custom Cursor */}
          {/* <div ref={cursorRef} className="custom-cursor" /> */}

          {/* Hero Content */}
          <div className="relative z-10 text-white w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <TypewriterText />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 px-2 sm:px-4 relative text-center glitch-text"
            >
              Precision-engineered websites built with performance, security, and clarity — no noise, no fluff.
            </motion.p>

            <div className="relative w-fit mx-auto group">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                href="#fade-section"
                className="relative z-10 inline-block px-8 py-4 sm:px-10 sm:py-5 text-white text-base sm:text-lg font-semibold tracking-wide bg-black rounded-md overflow-hidden"
              >
                Start Your Digital Evolution
              </motion.a>
              <span className="absolute inset-0 rounded-md border-animation z-0 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Your Original Sections Below Hero */}
        <section id="slide-section" ref={slideRef} className="py-24 px-4 bg-gray-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={slideIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">🧗 Slide Up Animation</h2>
            <p className="text-lg text-gray-700">
              This section slides in from the bottom using both <code>opacity</code> and <code>y</code> motion properties.
            </p>
          </motion.div>
        </section>

        <section id="zoom-section" ref={zoomRef} className="py-24 px-4 bg-white flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={zoomIn ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">🔍 Zoom In Animation</h2>
            <p className="text-lg text-gray-700">
              This animation scales the element from 80% to full size using <code>scale</code> and fades it in at the same time.
            </p>
          </motion.div>
        </section>

        <section id="image-section" ref={imageRef} className="py-24 px-4 bg-gray-100 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={imageInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold mb-6">🖼️ Image Optimization with Sharp</h2>
            <p className="text-lg text-gray-700 mb-6">
              This image is optimized automatically by Next.js using the <strong>sharp</strong> package.
            </p>
            <img
              src="/test.png"
              alt="Optimized Example"
              width={800}
              height={500}
              className="rounded-xl shadow-md w-full h-auto object-cover"
            />
          </motion.div>
        </section>

        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
            <h2 className="text-3xl font-bold mb-6">📖 Extra Content</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Aenean dignissim libero non tellus ullamcorper.</p>
            <p>Vestibulum volutpat nisi ut luctus rhoncus.</p>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
