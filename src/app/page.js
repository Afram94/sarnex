'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MainLayout from '../app/components/MainLayout';
import WhyChooseUs from './components/WhyChooseUs';
import FeaturesGrid from './components/FeaturesGrid';

const messages = [
  "Websites that rank. And convert.",
  "Design, SEO, control — all yours.",
  "No templates. Just custom builds.",
  "Admin dashboards you’ll love.",
  "Scale your site, effortlessly.",
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
        }, 65);
      } else {
        timeout = setTimeout(() => setVisible(false), 2000);
      }
    } else {
      timeout = setTimeout(() => {
        setText('');
        setSubIndex(0);
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [subIndex, visible]);

  return (
    <motion.h2
      className="text-[1.5rem] min-h-[6rem] neon-text sm:text-3xl md:text-5xl text-green-400 font-mono text-center whitespace-pre-wrap leading-snug tracking-normal"
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
    </motion.h2>
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

  useEffect(() => {
    if (!isClient) return;
    const canvas = document.getElementById('codeRain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const symbols = '<>/@{}[]$%&*#'.split('');
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff90';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = symbols[Math.floor(Math.random() * symbols.length)];
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

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <MainLayout>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <section
          ref={heroRef}
          onMouseMove={(e) => {
            const x = e.clientX;
            const y = e.clientY;

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
          }}
          className="relative flex flex-col items-center justify-center min-h-screen w-full text-center overflow-hidden bg-black px-4 sm:px-6 pt-40 pb-12 sm:pt-0"
        >
          <h1 className="sr-only">
            Sarnex Digital: Custom Websites with Admin Access, SEO, and Hosting
          </h1>

          {/*
          <div className="absolute top-6 sm:top-10 left-1/2 transform -translate-x-1/2 bg-green-700 text-black text-xs sm:text-sm px-4 py-1 rounded-full shadow-md z-20 tracking-wide font-semibold">
            ⚡ Premium websites with admin access, SEO, and zero templates
          </div>
          */}

          <canvas
            id="codeRain"
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          />

          <motion.div
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="relative z-10 w-full max-w-6xl px-4 sm:px-6"
          >
            <div className="bg-black/60 backdrop-blur-sm border border-green-500/10 rounded-xl px-4 py-6 sm:px-8 sm:py-10 shadow-lg shadow-green-400/5">
              <p className="text-sm sm:text-base md:text-lg text-green-300 font-mono text-center mb-4 tracking-wide">
                We build custom websites for you, giving you full control over design, content, and performance.
              </p>

              <TypewriterText />

              <motion.p
                data-text="Precision-engineered websites built with performance, security, and clarity — no noise, no fluff."
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="glitch-text text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-6 text-green-200 text-center break-words hyphens-auto"
              >
                Precision-engineered websites built with performance, security, and clarity — no noise, no fluff.
              </motion.p>

              {/* <div className="relative w-full sm:w-fit mx-auto mt-8 group">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                  href="#fade-section"
                  className="block w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 text-white text-base sm:text-lg font-semibold tracking-wide bg-black rounded-md overflow-hidden text-center"
                >
                  Start Your Digital Evolution
                </motion.a>
                <span className="hidden sm:block absolute bottom-full mb-2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Custom-built websites with total control.
                </span>
              </div> */}
            </div>

            {/* Feature Highlights */}
            <div className="mt-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
              <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Custom CMS',
                    icon: '⚙️',
                    desc: 'Easily manage content and design without touching code.',
                  },
                  {
                    title: 'SEO Dashboard',
                    icon: '📈',
                    desc: 'Track visibility, keywords, and traffic in real time.',
                  },
                  {
                    title: 'Fast Hosting',
                    icon: '🚀',
                    desc: 'Scalable infrastructure optimized for speed and security.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative group bg-black/30 border border-green-500/20 rounded-2xl px-6 py-8 text-center shadow-lg backdrop-blur-md hover:shadow-green-500/30 transition-all duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="text-4xl sm:text-5xl drop-shadow-glow text-green-400">{item.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-green-300 tracking-wide mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-green-100 opacity-80 leading-relaxed">{item.desc}</p>
                    <div className="absolute -inset-px border border-green-400/10 rounded-2xl blur-sm group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </motion.div>
        </section>

        <div className="scroll-section">
          <WhyChooseUs />
        </div>
        <div className="scroll-section">
          <FeaturesGrid />
        </div>
      </main>
    </MainLayout>
  );
}
