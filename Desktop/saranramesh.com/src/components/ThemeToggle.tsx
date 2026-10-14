import { useTheme } from "next-themes";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const SPAM_COUNT = 6;
const SPAM_WINDOW = 1500;

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [showWarning, setShowWarning] = useState(false);
  const clickTimes = useRef<number[]>([]);
  const warningOpenedAt = useRef<number>(0);

  const handleClick = () => {
    const now = Date.now();
    clickTimes.current.push(now);
    clickTimes.current = clickTimes.current.filter((t) => now - t < SPAM_WINDOW);
    if (clickTimes.current.length >= SPAM_COUNT) {
      clickTimes.current = [];
      setShowWarning(true);
      warningOpenedAt.current = Date.now();
      return;
    }
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const modal = (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
          style={{ backgroundColor: "hsl(var(--background) / 0.8)", backdropFilter: "blur(10px)" }}
          onClick={() => { if (Date.now() - warningOpenedAt.current > 600) setShowWarning(false); }}
        >
          <motion.div
            initial={{ scale: 0.84, y: 28, rotate: -1.5 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.84, y: 28, rotate: -1.5 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="card-playful max-w-md w-full relative overflow-hidden"
            style={{ boxShadow: "5px 5px 0px 0px hsl(var(--primary) / 0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >

            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex justify-end">
                <span className="text-2xl leading-none select-none">⚠️</span>
              </div>

              <div>
                <p className="font-display font-extrabold text-3xl text-foreground leading-[1.1] mb-3">
                  Photosensitivity<br />Warning
                </p>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  Flashing between light and dark this fast is hard on the eyes. Please use the theme toggle calmly.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={() => setShowWarning(false)}
                  className="sticker-primary text-xs py-2 px-5 hover:opacity-90 transition-opacity"
                >
                  Understood
                </button>
                <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                  or click outside
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={handleClick}
        className="sticker-utility text-xs py-1 hover:opacity-90 transition-opacity duration-200"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? (
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            Light
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            Dark
          </span>
        )}
      </button>

      {createPortal(modal, document.body)}
    </>
  );
};

export default ThemeToggle;
