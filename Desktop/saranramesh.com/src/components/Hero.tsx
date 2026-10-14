import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { track } from "@vercel/analytics/react";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import SMonogram from "@/components/SMonogram";
import SMonogram2 from "@/components/SMonogram2";

const TOOLS = [
{ name: "Claude Code", url: "https://cdn.simpleicons.org/anthropic/black", darkInvert: true },
{ name: "Figma", icon: "figma" },
{ name: "React", icon: "react" },
{ name: "Replit", icon: "replit" },
{ name: "Antigravity", url: "/icons/antigravity.png" }];


const StarDeco = ({ className }: {className?: string;}) =>
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
</svg>;


const ArrowDeco = ({ className }: {className?: string;}) =>
<svg className={className} width="28" height="16" viewBox="0 0 28 16" fill="currentColor">
    <path d="M0 8L6 2V5H22V2L28 8L22 14V11H6V14L0 8Z" />
  </svg>;


const TypeWriter = ({ text, delay = 0, speed = 80 }: { text: string; delay?: number; speed?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay, prefersReducedMotion, text]);

  useEffect(() => {
    if (!started || prefersReducedMotion) return;
    if (displayed.length >= text.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed + Math.random() * 25);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed, prefersReducedMotion]);

  return (
    <>
      {prefersReducedMotion ? text : displayed}
      {started && !done && <span className="inline-block w-[3px] h-[0.85em] bg-current align-baseline ml-[2px] animate-blink" />}
    </>
  );
};

const SCORE_MAX = 50;

const Hero = ({ onScored }: { onScored?: (scored: boolean) => void }) => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardX = useMotionValue(0);
  const [slideCount, setSlideCount] = useState(0);
  const [showPlus, setShowPlus] = useState(false);
  const plusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cheated, setCheated] = useState(false);
  const [editingScore, setEditingScore] = useState(false);
  const [editValue, setEditValue] = useState("");

  const [hasScrolled, setHasScrolled] = useState(false);
  const wiggleControls = useAnimation();

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 40) setHasScrolled(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scored = slideCount >= SCORE_MAX;
  const showScore = slideCount >= 3;

  useEffect(() => { onScored?.(scored); }, [scored, onScored]);

  const playWin = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [523, 659, 784, 1047, 1319];
      const step = 0.1;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * step);
        const start = ctx.currentTime + i * step;
        const isLast = i === notes.length - 1;
        const duration = isLast ? 0.6 : step + 0.02;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.15, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.start(start);
        osc.stop(start + duration);
      });
    } catch {}
  };

  const playCoin = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(988, ctx.currentTime);
      osc.frequency.setValueAtTime(1319, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  };

  useEffect(() => {
    const compute = () => {
      if (!sectionRef.current || !cardRef.current) return;
      const section = sectionRef.current.getBoundingClientRect();
      const card = cardRef.current.getBoundingClientRect();
      const paddingRight = parseFloat(getComputedStyle(sectionRef.current).paddingRight);
      const right = Math.max(0, section.right - paddingRight - card.right);
      setDragConstraints({ left: 0, right });
      setTrackWidth(card.width + right);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-8 pb-12 relative overflow-hidden">

      {/* S monogram decoration */}
      <SMonogram className="hidden lg:block absolute right-[2%] top-[34%] w-[160px] opacity-70 pointer-events-none" />
      <SMonogram2 className="hidden lg:block absolute right-[4%] bottom-[18%] w-[130px] opacity-65 pointer-events-none" />


      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-end font-body text-xs uppercase tracking-widest text-muted-foreground relative z-10">

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Main headline */}
      <div className="flex-1 flex flex-col justify-center py-16 md:py-24 relative z-10">
        <div>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.95] tracking-tight max-w-5xl text-foreground">
            <TypeWriter text="Saran " delay={170} speed={75} />
            <span className={`transition-colors duration-700 ${scored ? "text-accent" : "text-primary"}`}>
              <TypeWriter text="Ramesh" delay={630} speed={75} />
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 mb-2">
          <motion.div
            className="sticker-accent text-xs py-1 inline-flex cursor-default"
            animate={wiggleControls}
            whileHover={!isMobile ? { rotate: [0, -4, 4, -3, 3, 0], transition: { duration: 0.4 } } : undefined}
            onTap={isMobile ? () => wiggleControls.start({ rotate: [0, -4, 4, -3, 3, 0], transition: { duration: 0.4 } }) : undefined}>
            Product Designer & Builder
          </motion.div>
        </motion.div>

        {/* Colorful divider */}
        <div className="flex items-center gap-0 my-8 md:my-10 max-w-3xl">
          <div className={`h-[4px] w-full rounded-full transition-colors duration-700 ${scored ? "bg-accent" : "bg-primary"}`} />
        </div>

        <div className="relative">
          {/* Score counter */}
          {showScore && !isMobile && (
            <div className="absolute -top-8 left-0 flex items-center gap-2 z-20">
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                {cheated ? "🤨 you cheated." : scored ? "🎉 max score!" : (
                  <>
                    {"score: "}
                    {editingScore ? (
                      <input
                        autoFocus
                        className="font-body text-xs uppercase tracking-widest bg-transparent border-b border-primary/50 outline-none w-7 text-center text-foreground"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value.replace(/[^0-9]/g, ""))}
                        onBlur={() => {
                          setEditingScore(false);
                          const num = parseInt(editValue, 10);
                          if (!isNaN(num) && num >= SCORE_MAX) {
                            setSlideCount(SCORE_MAX);
                            setCheated(true);
                            playWin();
                            track("drag_cheat");
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                          if (e.key === "Escape") { setEditingScore(false); setEditValue(""); }
                        }}
                        maxLength={3}
                      />
                    ) : (
                      <span
                        className="cursor-text hover:text-foreground transition-colors"
                        onClick={() => { setEditValue(String(slideCount)); setEditingScore(true); }}
                      >
                        {slideCount}
                      </span>
                    )}
                    {`/${SCORE_MAX}`}
                  </>
                )}
              </span>
              {showPlus && !scored && !editingScore && (
                <motion.span
                  key={slideCount}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5 }}
                  className="font-body text-xs font-bold text-accent"
                >
                  +1
                </motion.span>
              )}
            </div>
          )}
          {/* Drag track */}
          {!isMobile && <div
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[8px] rounded-full pointer-events-none"
            style={{
              width: trackWidth,
              background: "linear-gradient(to right, hsl(var(--primary)/0.2), hsl(var(--accent)/0.12))",
              boxShadow: "inset 0 2px 4px hsl(var(--foreground) / 0.18), inset 0 -1px 2px hsl(0 0% 100% / 0.4)",
            }}
          />}

        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          drag={isMobile ? false : "x"}
          dragConstraints={dragConstraints}
          dragTransition={{ bounceStiffness: 250, bounceDamping: 22 }}
          dragElastic={0}
          whileDrag={{ zIndex: 50 }}
          style={{ x: cardX, cursor: isMobile ? "default" : "grab" }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false);
            const x = cardX.get();
            const atEdge = x <= 1 || x >= dragConstraints.right - 1;
            if (atEdge && slideCount < SCORE_MAX) {
              const next = slideCount + 1;
              setSlideCount(next);
              if (next === SCORE_MAX) playWin();
              else if (next >= 3) playCoin();
              setShowPlus(true);
              if (plusTimer.current) clearTimeout(plusTimer.current);
              plusTimer.current = setTimeout(() => setShowPlus(false), 600);
              if (next === 1) track("drag_first_slide");
              if (next === 10 || next === 25 || next === SCORE_MAX) track("drag_milestone", { score: next });
            }
          }}
          className="card-playful max-w-2xl select-none">

          {/* Little sticker on card */}
          <div className="absolute -top-3 -right-2 rotate-6">

          </div>
          <p className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground leading-[1.2] mb-3">
            Taking products from
            <span className="bg-accent/30 px-2 py-0.5 rounded-md ml-2">feeling</span> to
            <span className="bg-accent/30 px-2 py-0.5 rounded-md ml-2">function.</span>
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            I'm a designer and writer with a CS background who builds products with a point of view. I shape the brand, interface, and voice of a product and ship it myself, in code, not just screens.
          </p>
          <ArrowDeco className={`hidden md:block absolute bottom-4 right-6 w-6 transition-colors duration-150 ${isDragging ? "text-destructive/60" : "text-primary/30"}`} />
        </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ delay: hasScrolled ? 0 : 1.4, duration: 0.4 }}
        className="relative z-10 flex justify-center pb-6 pointer-events-none"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent text-lg leading-none select-none"
        >
          ↓
        </motion.span>
      </motion.div>

      {/* Tools row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10">

        <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
          Ships with
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {TOOLS.map((tool, i) =>
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.4 + i * 0.06 }}
            className="flex items-center gap-2 bg-card border-2 border-foreground/10 rounded-full px-3 py-1.5 hover:border-primary/40 hover:shadow-md transition-all duration-300 group">

              <img
              src={tool.url ?? `https://cdn.simpleicons.org/${tool.icon}`}
              alt={tool.name}
              className={`w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300${(tool as any).darkInvert ? " dark:invert" : ""}${(tool as any).mono ? " brightness-0 dark:invert" : ""}`}
              loading="lazy" />

              <span className="font-mono text-sm font-medium text-foreground/85 group-hover:text-foreground transition-colors duration-300">
                {tool.name}
              </span>
            </motion.div>
          )}
          {/* Lovable fallback */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.4 + TOOLS.length * 0.06 }}
            className="flex items-center gap-2 bg-card border-2 border-foreground/10 rounded-full px-3 py-1.5 hover:border-primary/40 hover:shadow-md transition-all duration-300 group">

            <img src="https://cdn.simpleicons.org/lovable/black" alt="Lovable" className="w-4 h-4 dark:invert" loading="lazy" />
            <span className="font-mono text-sm font-medium text-foreground/85 group-hover:text-foreground transition-colors duration-300">
              Lovable
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>);

};

export default Hero;