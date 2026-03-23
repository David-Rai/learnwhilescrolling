import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowUpRight, Compass, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const SelectACategory = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-bg flex items-center justify-center px-6 py-12 md:py-0 overflow-hidden">

      {/* Geometric grid lines — subtle structure */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal rule — upper third */}
        <div className="absolute top-[30%] left-0 right-0 h-px bg-text/5" />
        {/* Horizontal rule — lower third */}
        <div className="absolute top-[70%] left-0 right-0 h-px bg-text/5" />
        {/* Vertical rule — left */}
        <div className="absolute top-0 bottom-0 left-[15%] w-px bg-text/5" />
        {/* Vertical rule — right */}
        <div className="absolute top-0 bottom-0 right-[15%] w-px bg-text/5" />

        {/* Corner accent — top left */}
        <div className="absolute top-10 left-10 w-16 h-16 border-l border-t border-primary/20" />
        {/* Corner accent — bottom right */}
        <div className="absolute bottom-10 right-10 w-16 h-16 border-r border-b border-primary/20" />

        {/* Soft ambient glow — not a gradient blob, just radial light */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] bg-primary"
          style={{ filter: 'blur(120px)' }}
        />
      </div>

      {/* Main Content */}
      <section className="relative z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-12"
        >

          {/* Index tag — editorial detail
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-px bg-primary" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">
              01 / Discovery
            </span>
          </motion.div> */}

          {/* Headline block */}
          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-text"
            >
              Ready to{' '}
              <span className="relative inline-block">
                <span className="text-primary">explore</span>
                {/* Underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-left block"
                />
              </span>
              ?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="text-base sm:text-lg text-text/60 max-w-sm leading-relaxed"
            >
              Pick a vibe, dive in, and let the endless scroll begin.
            </motion.p>
          </div>

          {/* CTA + side label row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55 }}
            className="flex items-center gap-6"
          >
            {/* Primary CTA */}
            <button
              onClick={() => navigate('/explore')}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group relative inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground font-bold text-base rounded-xl overflow-hidden transition-all duration-200 hover:shadow-[0_0_32px_0px] hover:shadow-primary/30 active:scale-[0.97]"
            >
              {/* Sliding shine */}
              <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 skew-x-12" />

              <Compass className="w-5 h-5 flex-shrink-0" />
              <span>Explore Categories</span>

              <motion.span
                animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.span>
            </button>

            {/* Side detail */}
            <div className="hidden sm:flex items-center gap-2 text-text/35 text-sm">
              <Layers className="w-4 h-4" />
              <span className="tracking-wide">Multiple categories</span>
            </div>
          </motion.div>

          {/* Bottom status row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex items-center gap-4 pt-2"
          >
            {/* Live dot */}
            <span className="flex items-center gap-2 text-xs text-text/40 tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Something awesome is waiting for you
            </span>
          </motion.div>

        </motion.div>
      </section>

    </main>
  );
};

export default SelectACategory;