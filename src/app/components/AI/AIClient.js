'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../MainLayout';

// Custom typing hook
function useTypingEffect(text, speed = 25) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

// Original content
const originalContent = [
  {
    title: 'Revolutionising Web Design Essentials',
    body: `At Sarnex Digital, we're more than just a web agency. We empower small businesses with customized, high-impact websites, morphing them into industry contenders.`,
    quote: `"Design is strength. Control is freedom. Small business deserves equal playing fields."`,
    points: [
      {
        heading: 'Innovation Origins',
        text: 'Created from a dissatisfaction with generic templates, we provide distinct designs that reflect your unique ethos.',
      },
      {
        heading: 'Key Approach',
        text: 'Our recipe is strategy and storytelling, crafting intuitive interfaces that are visually remarkable and experientially memorable.',
      },
      {
        heading: 'Empowering Associates',
        text: 'Our clients are in control. We provide the tools you need for complete style and content autonomy, devoid of compromise.',
      },
    ],
  },
];

// Enhanced content suggestions
const enhancedContent = [
  {
    title: 'Elevate Your Web Presence',
    body: `Sarnex Digital transcends typical web agencies, transforming SMEs with high-impact, personalized websites. We evolutionize contenders.`,
    quote: `"Strong design is power. You deserve undisputed control and levelled platforms."`,
    points: [
      {
        heading: 'Inception of Creativity',
        text: 'We\'re born from disdain for ordinary designs. We celebrate your unique essence with exceptional design.',
      },
      {
        heading: 'Formulated Strategy',
        text: 'Our potion combines strategic narrative, creating visually striking, unforgettable interaction.',
      },
      {
        heading: 'Empowerment',
        text: 'We arm clients with mastery tools ensuring entire design and content are under your dominion.',
      },
    ],
  },
  {
    title: 'Crafting Stories, Not Just Websites',
    body: `We don't just build pages — we build digital experiences that speak volumes for your brand.`,
    quote: `"Your brand deserves more than pixels. It deserves presence."`,
    points: [
      {
        heading: 'Narrative-Driven Interfaces',
        text: 'Each design speaks directly to your audience with visual clarity and emotional connection.',
      },
      {
        heading: 'Performance Meets Personality',
        text: 'Fast-loading pages that don’t sacrifice design flair or brand identity.',
      },
      {
        heading: 'Command Over Content',
        text: 'You stay in control. We just give you the superpowers.',
      },
    ],
  },
];

export default function AIClient() {
  const [index, setIndex] = useState(0);

  // Cycle enhanced suggestions
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % enhancedContent.length);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  // Typing text output
  const typingText = `
${enhancedContent[index].title}

${enhancedContent[index].body}

${enhancedContent[index].quote}

${enhancedContent[index].points
    .map((pt) => `${pt.heading}:\n${pt.text}`)
    .join('\n\n')}
`;

  const typedOutput = useTypingEffect(typingText, 18);

  return (
    <MainLayout>
    <main className="bg-white min-h-screen">

        {/* Feature Cards Section */}
      <section className="py-28 px-6 md:px-20 bg-gradient-to-b from-hunter to-army">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">✨ AI Features</h2>
    <p className="text-beige text-md">
      Enhance more than just your homepage — let AI boost every page of your website.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Card 1 */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 transition-transform"
    >
      <h3 className="text-xl font-semibold text-white mb-2">🧠 Smart Content Improver</h3>
      <p className="text-sm text-beige mb-4">
        Instantly upgrade the tone, clarity, and SEO of your web pages.
      </p>
      <ul className="text-sm text-beige/80 space-y-1">
        <li>✓ Professional rewrite suggestions</li>
        <li>✓ Live preview with AI confidence</li>
        <li>✓ One-click apply</li>
      </ul>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 transition-transform"
    >
      <h3 className="text-xl font-semibold text-white mb-2">📝 AI Blog Writer</h3>
      <p className="text-sm text-beige mb-4">
        Generate full blog posts in seconds based on topic, keywords, or season.
      </p>
      <ul className="text-sm text-beige/80 space-y-1">
        <li>✓ Blog ideas + outline</li>
        <li>✓ Optimized titles + metadata</li>
        <li>✓ Full draft in 1 click</li>
      </ul>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 transition-transform"
    >
      <h3 className="text-xl font-semibold text-white mb-2">🎯 CTA Generator</h3>
      <p className="text-sm text-beige mb-4">
        Generate persuasive calls to action for buttons, banners, or forms.
      </p>
      <ul className="text-sm text-beige/80 space-y-1">
        <li>✓ High-converting CTA lines</li>
        <li>✓ Personality tuning</li>
        <li>✓ Tone: casual, corporate, bold</li>
      </ul>
    </motion.div>
  </div>
</section>

      {/* Hero + Content Section */}
      <section className="pt-32 pb-20 px-6 md:px-20 bg-gradient-to-b from-white to-beige">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-serif font-bold text-hunter text-center mb-10"
        >
          AI Writing Assistant
        </motion.h1>

        <div className="max-w-4xl mx-auto rounded-2xl shadow-xl bg-white border border-army/10 p-8 space-y-6">
          {/* Original Content */}
          <div>
            <p className="text-sm text-army/70 mb-2">Your original content:</p>
            <div className="bg-army/5 p-4 rounded-md text-army text-sm space-y-2">
              <h3 className="font-semibold">{originalContent[0].title}</h3>
              <p>{originalContent[0].body}</p>
              <blockquote className="italic text-army/80">{originalContent[0].quote}</blockquote>
              {originalContent[0].points.map((pt, idx) => (
                <div key={idx}>
                  <p className="font-semibold">{pt.heading}</p>
                  <p>{pt.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Enhanced */}
          <div>
            <p className="text-sm text-army/70 mb-2">AI Enhanced:</p>
            <div className="bg-brand-green/10 text-brand-green rounded-md p-4 text-sm whitespace-pre-line min-h-[300px]">
              {typedOutput}
            </div>
          </div>
        </div>
      </section>

      
    </main>
    </MainLayout>
  );
}
