import { motion } from "framer-motion";
import SiteFooter from "./SiteFooter";

const StarDeco = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="4" y1="6" x2="10" y2="10" strokeWidth="0.75" stroke="currentColor" strokeOpacity="0.4" />
    <line x1="10" y1="10" x2="18" y2="8" strokeWidth="0.75" stroke="currentColor" strokeOpacity="0.4" />
    <line x1="18" y1="8" x2="20" y2="16" strokeWidth="0.75" stroke="currentColor" strokeOpacity="0.4" />
    <line x1="10" y1="10" x2="13" y2="19" strokeWidth="0.75" stroke="currentColor" strokeOpacity="0.4" />
    <circle cx="4" cy="6" r="1.2" fill="currentColor" />
    <circle cx="10" cy="10" r="1.8" fill="currentColor" />
    <circle cx="18" cy="8" r="1.2" fill="currentColor" />
    <circle cx="20" cy="16" r="1" fill="currentColor" />
    <circle cx="13" cy="19" r="1.4" fill="currentColor" />
    <circle cx="7" cy="17" r="0.9" fill="currentColor" />
  </svg>
);

const About = ({ scored }: { scored?: boolean }) => {
  return (
    <>
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 relative">

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-10 relative z-10"
      >
        <div className="sticker-accent text-xs inline-flex">
          About
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10">
        <div className="md:col-span-3" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="md:col-span-6 space-y-8"
        >
          <div className="card-playful">
            <p className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl leading-[1.35] text-foreground relative z-10">
              I turn undefined
              <span className="bg-accent/30 px-2 py-0.5 rounded-md ml-2">problems</span> into
              real <span className="bg-accent/30 px-2 py-0.5 rounded-md">products.</span>
            </p>
          </div>

          <div className="space-y-5 text-sm md:text-base text-foreground/80 leading-relaxed font-body">
            <p>
              I conceptualize and design products from zero, then build them myself. Most UX designers hand off a Figma file. I take an idea from first spark to shipped product: figure out what it should be, define it, design it, code it, deploy it.
            </p>
            <p>
              My CS background means the products aren't vibe-coded. They have real architecture, handle edge cases, and hold up when people actually use them. My UX background means they're built for people and feel good to use.
            </p>
            <p>
              I'm finishing a Master's in Information at the University of Michigan, focused on UX Research and Design. Everything here is shipped or actively being built.
            </p>
          </div>

          {/* Degree cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* CS Degree */}
            <motion.a
              href="https://catalog.gmu.edu/colleges-schools/engineering-computing/school-computing/computer-science/computer-science-bs/#requirementstext"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card-playful group cursor-pointer"
              style={{ boxShadow: "5px 5px 0px 0px hsl(var(--primary) / 0.25)" }}
            >
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <span className="sticker-primary sticker-sm">
                    Completed
                  </span>
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="text-primary/50 group-hover:text-primary/80 transition-colors">
                    <path d="M2 10l5 6-5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
                    <path d="M3 10l4 0" stroke="currentColor" strokeWidth="0" />
                    <text x="1" y="15" fontFamily="monospace" fontSize="13" fill="currentColor" opacity="0.8">&gt;</text>
                    <motion.rect
                      x="16" y="16" width="8" height="2" rx="0.5" fill="currentColor"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "steps(1)" }}
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-extrabold text-base leading-tight text-foreground">
                    B.S. Computer Science
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    George Mason University · 2024
                  </p>
                </div>
              </div>
            </motion.a>

            {/* UX Design Degree */}
            <motion.a
              href="https://www.si.umich.edu/programs/master-science-information/curriculum/ux-research-and-design"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card-playful group cursor-pointer"
              style={{ boxShadow: "5px 5px 0px 0px hsl(var(--accent) / 0.35)", borderColor: "hsl(var(--accent) / 0.3)" }}
            >
              <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-accent/10 blur-xl" />
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <span className="sticker-accent sticker-sm">
                    In Progress
                  </span>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent/60 group-hover:text-accent transition-colors">
                    {/* Frame / artboard */}
                    <rect x="2" y="2" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
                    {/* Corner marks */}
                    <path d="M2 7h3M2 21h3M23 7h3M23 21h3M7 2v3M21 2v3M7 23v3M21 23v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Cursor arrow with subtle float */}
                    <motion.path
                      d="M11 11l7 3.5-4 1-1.5 4L11 11z"
                      fill="currentColor"
                      opacity="0.7"
                      animate={{ x: [0, 1.5, 0], y: [0, -1.5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-extrabold text-base leading-tight text-foreground">
                    M.S. Information
                  </p>
                  <p className="font-body text-xs font-bold text-foreground/85 mt-0.5 uppercase tracking-wider">
                    UX Research &amp; Design
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    University of Michigan · 2027
                  </p>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        <div className="md:col-span-3" />
      </div>

    </section>
    <SiteFooter scored={scored} />
    </>
  );
};

export default About;
