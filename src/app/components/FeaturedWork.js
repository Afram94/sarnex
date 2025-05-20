'use client';

import ProjectCard from './ProjectCard';

const featuredProjects = [
  {
    title: 'Yoga Bloom Studio',
    description: 'Elegant design for a local yoga studio.',
    image: '/sarnex_logo_navbar.png',
    gallery: ['/sarnex_logo_navbar.png'],
    url: 'https://yogabloomstudio.com',
    gradient: 'from-green-400/20 to-emerald-500/30',
  },
  {
    title: 'Craft Coffee Co.',
    description: 'Modern site for an artisanal coffee brand.',
    image: '/DIGITAL.png',
    gallery: ['/DIGITAL.png'],
    url: 'https://craftcoffeeco.com',
    gradient: 'from-lime-300/20 to-green-400/30',
  },
  {
    title: 'TechLabs AI',
    description: 'Clean, powerful SaaS website with animations.',
    image: '/DIGITAL.png',
    gallery: ['/DIGITAL.png'],
    url: 'https://techlabs.ai',
    gradient: 'from-teal-400/20 to-cyan-500/30',
  },
];

export default function FeaturedWork() {
  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-16 text-white bg-[#0c0c0c]">
      {/* Animated Background Spotlight using brand.green */}
      <div className="pointer-events-none absolute inset-0 z-0 before:absolute before:inset-0 before:animate-spotlight before:bg-[radial-gradient(ellipse_at_center,_rgba(156,192,171,0.1)_0%,_transparent_70%)] before:bg-[length:300%_300%]" />

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-green relative z-10">
        Featured Work
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative z-10">
        {featuredProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}
