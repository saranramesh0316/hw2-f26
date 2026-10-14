import { useEffect, useState } from "react";
import { Diamond } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { track } from "@vercel/analytics/react";
import ThemeToggle from "@/components/ThemeToggle";
import SiteFooter from "@/components/SiteFooter";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const SectionLabel = ({ children, color = "primary" }: { children: React.ReactNode; color?: "primary" | "accent" | "secondary" }) => (
  <div className={`sticker-${color} text-xs py-1 inline-flex mb-8`}>{children}</div>
);

const TicketAnnotation = ({ x, y, label, flip, className }: { x: string; y: string; label: string; flip?: boolean; className?: string }) => (
  <div
    className={`absolute pointer-events-none flex items-center gap-1.5 z-10${flip ? " flex-row-reverse" : ""}${className ? ` ${className}` : ""}`}
    style={{ [flip ? "right" : "left"]: x, top: y, transform: "translateY(-50%)" }}
  >
    <div
      className="w-2 h-2 rounded-full bg-primary flex-none"
      style={{ boxShadow: "0 0 0 2px hsl(var(--background))" }}
    />
    <span
      className="font-body text-[12px] font-bold uppercase tracking-widest px-2 py-[3px] whitespace-nowrap leading-none"
      style={{
        background: "hsl(var(--background) / 0.95)",
        border: "1.5px solid hsl(var(--primary))",
        borderRadius: "4px",
        boxShadow: "2px 2px 0px 0px hsl(var(--primary) / 0.3)",
      }}
    >
      {label}
    </span>
  </div>
);

const ScreenPlaceholder = () => (
  <div className="rounded-3xl overflow-hidden shadow-2xl w-full aspect-[1/2] md:w-[260px] md:h-[520px] md:aspect-auto relative bg-foreground/5 border border-foreground/10">
  </div>
);

const VIPCardDemo = () => {
  const [flipped, setFlipped] = useState(false);
  const [name, setName] = useState("");
  const [nameTracked, setNameTracked] = useState(false);

  return (
    <div className="select-none">
      <div
        className="cursor-pointer w-full"
        style={{ perspective: "1000px", aspectRatio: "1.586 / 1" }}
        onClick={() => { setFlipped(f => !f); track("vip_card_flipped"); }}
      >
        <div style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d" as const,
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ backfaceVisibility: "hidden" as const }}>
            <img src="/stadium-hero-2.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />
            <div className="absolute inset-0 flex flex-col justify-between p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Diamond className="w-3 h-3" style={{ color: "#FFC015" }} />
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#FFC015" }}>VIP Member</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest" style={{ color: "#FFFFFF80" }}>2025 Season</span>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] mb-1" style={{ color: "#FFFFFF80" }}>Season Ticket Holder</p>
                <h1 className="text-[30px] text-white leading-none truncate" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>{name || "Your Name"}</h1>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex gap-5">
                  <div>
                    <p className="text-[8px] uppercase tracking-widest" style={{ color: "#FFFFFF80" }}>Member Since</p>
                    <p className="text-[14px] font-bold text-white">2023</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest" style={{ color: "#FFFFFF80" }}>Games</p>
                    <p className="text-[14px] font-bold text-white">23</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest" style={{ color: "#FFFFFF80" }}>Fan Rank</p>
                    <p className="text-[14px] font-bold" style={{ color: "#FFC015" }}>Top 5%</p>
                  </div>
                </div>
                <span className="text-[8px] uppercase tracking-widest text-right leading-tight" style={{ color: "#FFFFFF80" }}>U of M<br />Athletics</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" as const, transform: "rotateY(180deg)", background: "#00274C" }}>
            <img src="/michigan-m.png" alt="Michigan M" className="w-2/3 h-2/3 object-contain opacity-90" />
          </div>
        </div>
      </div>
      <p className="text-center font-body text-xs text-muted-foreground mt-3 uppercase tracking-widest">
        {flipped ? "Tap to flip back" : "Tap card to flip"}
      </p>
      <div className="mt-4" onClick={e => e.stopPropagation()}>
        <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">Your name</label>
        <input
          type="text"
          value={name}
          onChange={e => { if (!nameTracked && e.target.value.length > 0) { setNameTracked(true); track("vip_name_typed"); } setName(e.target.value); }}
          placeholder="Enter your name"
          className="w-full bg-background border-2 border-foreground/15 rounded-md px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-[3px_3px_0px_0px_hsl(var(--accent)/0.25)] transition-colors"
        />
      </div>
    </div>
  );
};


const MichiganVIP = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-background border-b border-foreground/5 flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 font-body text-xs uppercase tracking-widest text-muted-foreground"
      >
        <Link to="/" className="sticker-primary text-xs py-1 hover:opacity-80 transition-opacity">
          ← Back
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </motion.div>

      {/* ── HERO ── */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 pb-24 relative overflow-hidden">

        <div className="relative z-10 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display font-extrabold text-6xl sm:text-8xl md:text-9xl leading-[0.95] tracking-tight text-foreground mb-8"
          >
            Michigan<br />VIP
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex items-center gap-0 mb-10 origin-left max-w-3xl"
          >
            <div className="h-[4px] w-full bg-primary rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="card-playful max-w-2xl"
          >
            <p className="font-display font-bold text-xl sm:text-2xl text-foreground leading-[1.2] mb-3">
              Make the Michigan season ticket feel like a
              <span className="bg-accent/30 px-2 py-0.5 rounded-md ml-2">credential.</span>
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-1">
              A mobile app that treats the University of Michigan season ticket like something worth holding. Your name, your rank, your history. Gate entry, parking, perks, and food ordering, all in one scrollable view.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: "Claude Code", icon: "https://cdn.simpleicons.org/anthropic/black", adaptive: true },
                { label: "Lovable", icon: "https://cdn.simpleicons.org/lovable/black", adaptive: true },
              ].map((tool) => (
                <span key={tool.label} className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-body font-bold uppercase tracking-wider rounded-full bg-foreground text-background">
                  {tool.icon && (
                    <img src={tool.icon} alt={tool.label} className={`w-3.5 h-3.5${tool.adaptive ? " invert dark:invert-0" : ""}`} loading="lazy" />
                  )}
                  {tool.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SCREENS ── */}
      <section className="pb-28 relative">

        <motion.div {...fadeUp} className="relative z-10">
          <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-6 px-6 md:px-12 lg:px-20">
            Final prototype · Claude Code
          </p>

          <div className="flex flex-col gap-8 px-6 md:px-12 lg:px-20 md:flex-row md:gap-5 md:overflow-x-auto md:overflow-y-clip md:pb-4 md:snap-x md:snap-mandatory" style={{ scrollbarWidth: "none" }}>
            {[
              { label: "Home · Ticket + gameday info", src: "/mvip-home.png" },
              { label: "QR scan · Full-screen at gate", src: "/mvip-qr.png" },
              { label: "VIP card · Front", src: "/mvip-card-front.png" },
              { label: "VIP card · Back", src: "/mvip-card-back.png" },
              { label: "Parking modal", src: "/mvip-parking.png" },
            ].map((screen, i) => (
              <motion.div
                key={screen.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                className="md:flex-none md:snap-center"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl w-full md:w-[260px] border border-foreground/10">
                  <img src={screen.src} alt={screen.label} className="w-full h-auto block" />
                </div>
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mt-3 text-center w-full md:w-[260px]">
                  {screen.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="px-6 md:px-12 lg:px-20 mt-8">
            <a
              href="https://michigan-vip-pass.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("prototype_link_clicked", { project: "michigan_vip" })}
              className="sticker-accent text-xs py-1 inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              Try the live prototype →
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <SectionLabel color="accent">The Problem</SectionLabel>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-[1.05] mb-10 max-w-3xl">
              A season pass and a single-game ticket
              <span className="bg-accent/30 px-2 py-0.5 rounded-md ml-2">look exactly the same.</span>
            </h2>
          </motion.div>

          {/* Ticket comparison */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }} className="flex flex-col md:flex-row gap-12 mb-10 max-w-xl mx-auto items-start">
            {/* Physical ticket */}
            <div className="flex-1">
              <div className="relative">
                <div className="rounded-xl overflow-hidden border border-foreground/10" style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,0.10)" }}>
                  <img src="/2021-michigan.jpg" alt="Physical season ticket, 2021" className="w-full h-auto" />
                </div>
                <TicketAnnotation x="13%" y="7%" label="Felt like memorabilia." />
                <TicketAnnotation x="20%" y="40%" label="Something to look at while you hold it." flip className="hidden md:flex" />
                <TicketAnnotation x="13%" y="78%" label="You'd keep this." />
              </div>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mt-3">Physical ticket · 2021</p>
            </div>
            {/* Digital QR ticket */}
            <div className="flex-1">
              <div className="relative">
                <div className="rounded-xl overflow-hidden border border-foreground/10" style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,0.10)" }}>
                  <img src="/qr-code-ticket.png" alt="Digital QR ticket" className="w-full h-auto" />
                </div>
                <TicketAnnotation x="5%" y="25%" label="A yellow rectangle." />
                <TicketAnnotation x="5%" y="65%" label="With a QR code on it." />
              </div>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mt-3">Digital ticket · today</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }} className="card-playful">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">The situation</p>
              <p className="font-body text-foreground/80 leading-relaxed">
                University of Michigan football is a big deal. The season ticket isn't.
                Holders get a generic QR code added to Apple Wallet. There's no indication that holding
                a season ticket feels meaningfully different from holding a ticket to one game.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }} className="card-playful">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">The design brief</p>
              <p className="font-body text-foreground/80 leading-relaxed">
                Make season ticket holders feel like they're holding something valuable before they set
                foot in stadium. The inspiration wasn't another sports app. It was the AmEx Black Card.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── THE PRODUCT ── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <SectionLabel color="primary">The Product</SectionLabel>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-[1.05] mb-10 max-w-3xl">
              The ticket is the product. Everything else confirms
              <span className="bg-accent/30 px-2 py-0.5 rounded-md ml-2">the membership.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }} className="card-playful">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">The home screen</p>
              <p className="font-display font-bold text-xl text-foreground mb-2">One scroll, no navbar.</p>
              <p className="font-body text-sm text-foreground/85 leading-relaxed">
                This isn't an app people browse. They open it for something specific, find it, close it. At those moments they're in a crowd, one-handed, moving. A bottom navbar works when you have attention to give. One scroll is designed for when you don't.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }} className="card-playful">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">The ticket card</p>
              <p className="font-display font-bold text-xl text-foreground mb-2">Shaped like an actual ticket</p>
              <p className="font-body text-sm text-foreground/85 leading-relaxed">
                The card uses display fonts that mimic real printed ticket lettering.
                The code expands when you need to scan it.
                An Add to Apple Wallet button is included as a backup in case the app is unavailable at the gate.
              </p>
            </motion.div>
          </div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }} className="card-playful mb-10">
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">The VIP membership card</p>
            <p className="font-display font-bold text-xl text-foreground mb-2">Flippable and 3D.</p>
            <p className="font-body text-sm text-foreground/85 leading-relaxed">
              A credential card modeled after premium physical cards. Front shows member name, member since year,
              lifetime games attended, and fan rank. Back shows the Michigan M. Tapping Sideline Access or Merch Discount
              opens the same card with a context-specific instruction banner: "Show this card at the South tunnel entrance."
            </p>
          </motion.div>

          {/* Interactive demo */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.38 }} className="mb-10 max-w-md mx-auto">
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-4">VIP card</p>
            <VIPCardDemo />
          </motion.div>

          {/* Who it's for */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-4">Who it's for</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  who: "The loyal alum",
                  what: "Has attended every game since graduating in 1995. Already knows where to park, which gate to use, how digital ticketing works. Needs the app to be fast and invisible, something that confirms what he already knows without adding friction.",
                  color: "bg-primary/10 border-primary/20",
                },
                {
                  who: "The first-time holder",
                  what: "International student, first American football game, first digital ticketing experience. Needs the parking tile to tell him where to go, the gate tile to tell him where to enter, and the ticket to scan without hesitation at the gate.",
                  color: "bg-foreground/5 border-foreground/10",
                },
                {
                  who: "The intermittent buyer",
                  what: "U-M professor who buys some years and not others. Price-sensitive. Needs to feel the premium is real before she decides to renew, which means perks she can actually use on gameday.",
                  color: "bg-accent/10 border-accent/20",
                },
              ].map((item, i) => (
                <motion.div key={item.who} {...fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.08 }} className={`rounded-2xl border-2 p-5 ${item.color}`}>
                  <p className="font-display font-bold text-base text-foreground mb-2">{item.who}</p>
                  <p className="font-body text-sm text-foreground/85 leading-relaxed">{item.what}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STRATEGY ── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <SectionLabel color="primary">Strategy</SectionLabel>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-foreground leading-[1.05] mb-4 max-w-3xl">
              Make the app feel like it's worth keeping.
            </h2>
            <p className="font-body text-foreground/80 text-lg mb-10 max-w-2xl leading-relaxed">
              The design bets that perceived exclusivity can be built into a product even when real exclusivity doesn't exist.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Form before function",
                body: "Most ticketing apps look like ticketing apps. The VIP card was designed to look like it's from your wallet. The 3D flip, your name on the front, the dark finish: exclusivity is communicated before the user does anything. By the time they tap it, it already feels different.",
              },
              {
                label: "Attendance as identity",
                body: "Fan rank is assigned from attendance history. Loyal Alum, Season Veteran, Legend. The credential surfaces what you've already done. Season pass holders feel like members of an exclusive club.",
              },
              {
                label: "Design can't drive renewal. But it can change what giving it up feels like.",
                body: "Renewal is driven by football performance and price. Design can't control either. But making it feel like yours changes the cost of letting it lapse. A QR code is easy to drop. A credential that carries your name, your rank, and a streak of consecutive seasons is harder to walk away from.",
              },
            ].map((item, i) => (
              <motion.div key={item.label} {...fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }} className="card-playful">
                <p className="font-display font-bold text-lg text-foreground mb-2">{item.label}</p>
                <p className="font-body text-sm text-foreground/85 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <SectionLabel color="accent">Gameday flow</SectionLabel>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10 mt-8">
            {[
              {
                num: "01",
                title: "Check in",
                sub: "Before you leave",
                body: "Open the app. See the ticket, parking lot, gate assignment, weather, and gates open time, all on one screen.",
              },
              {
                num: "02",
                title: "Navigate",
                sub: "Parking or gate",
                body: "Tap parking to see lots ranked by your arrival time with walk estimates and links to Apple Maps or Google Maps.",
              },
              {
                num: "03",
                title: "Scan",
                sub: "At the gate",
                body: "Tap the QR code for a full-screen scan view. Screen brightness maximizes automatically. Add to Apple Wallet if you need a backup.",
              },
              {
                num: "04",
                title: "Unlock perks",
                sub: "Inside the stadium",
                body: "Tap Sideline Access or Merch Discount. The VIP card opens with instructions for where to show it.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
                className="relative flex flex-col gap-4 p-6 md:p-8 bg-card"
              >
                <div className="flex items-start justify-between">
                  <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{step.num}</span>
                  <span className="sticker-accent sticker-sm">
                    {step.sub}
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-xl mb-2 text-foreground">{step.title}</p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">{step.body}</p>
                </div>
                {i < 3 && (
                  <svg className="hidden md:block absolute text-accent" style={{ right: "-0.7rem", top: "50%", transform: "translateY(-50%)", zIndex: 10 }} width="22" height="22" viewBox="0 0 22 22" fill="currentColor"><path d="M4 11L14 11L10 6L12 4L20 11L12 18L10 16L14 11" strokeLinejoin="round" /></svg>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <SiteFooter />

    </main>
  );
};

export default MichiganVIP;
