import { useState } from 'react'
import { ArrowSquareOut } from '@phosphor-icons/react'
import FadeIn from '../components/FadeIn'

const FORMSPREE_URL = 'https://formspree.io/f/xkoldera'

export default function GetInvolved() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
  }

  return (
    <main style={{ paddingTop: 68 }}>
      {/* How it works */}
      <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <FadeIn>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#C04040', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 16 }}>Get Involved</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: '#1A6E78', lineHeight: 1.1, marginBottom: 20 }}>
              Help make an impact in your{' '}
              <span style={{ fontStyle: 'italic', color: '#E06060' }}>community.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2vw, 19px)', color: '#555', lineHeight: 1.7 }}>
              Bring Unified STEM to your school or city. We provide the blueprint, resources, and mentorship to launch your chapter.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Application form */}
      <section style={{ background: '#EFEFEF', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#C04040', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12, textAlign: 'center' }}>Chapter Application</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#1A6E78', lineHeight: 1.2, marginBottom: 16, textAlign: 'center' }}>
              Ready to apply?
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#555', textAlign: 'center', lineHeight: 1.7, marginBottom: 32 }}>
              Have any questions about the application process? Please email{' '}
              <a href="mailto:unifiedstem2025@gmail.com" style={{ color: '#C04040', fontWeight: 600 }}>unifiedstem2025@gmail.com</a>
            </p>
            <div style={{ textAlign: 'center' }}>
              <a
                href="https://forms.gle/2SRpJhqY1EixuUvt9"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#E06060',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 17,
                  padding: '16px 40px',
                  borderRadius: 50,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none' }}
              >
                Open Application Form
                <ArrowSquareOut size={18} weight="bold" />
              </a>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#1A6E78', marginTop: 14 }}>Opens in a new tab (Google Forms)</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: 'var(--primary-dark)', padding: 'clamp(64px, 8vw, 80px) 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#E06060', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 16 }}>Stay in the Loop</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
              Join our monthly newsletter.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 32 }}>
              Get updates on new chapters, activities, and ways to get involved — delivered to your inbox monthly.
            </p>
            {submitted ? (
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '24px 28px', border: '1.5px solid rgba(255,255,255,0.20)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#E06060', marginBottom: 6 }}>You're signed up!</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.65)' }}>We'll be in touch soon.</p>
              </div>
            ) : error ? (
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '24px 28px', border: '1.5px solid rgba(255,255,255,0.20)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Something went wrong.</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.65)' }}>Please try again or email us directly.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                <label
                  htmlFor="newsletter-email"
                  style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
                >
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    padding: '14px 20px',
                    borderRadius: 50,
                    border: '1.5px solid rgba(255,255,255,0.20)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    outline: 'none',
                    flex: '1 1 220px',
                    minWidth: 220,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    fontWeight: 600,
                    padding: '14px 28px',
                    borderRadius: 50,
                    border: 'none',
                    background: '#E06060',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none' }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
