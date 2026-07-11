import { useState } from 'react'
import FadeIn from '../components/FadeIn'

const FORMSPREE_PARTNERSHIP_URL = 'https://formspree.io/f/xykqrvwd'
const FORMSPREE_NEWSLETTER_URL = 'https://formspree.io/f/xkoldera'

export default function Partner() {
  const [form, setForm] = useState({ org: '', email: '', city: '', newsletter: false })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch(FORMSPREE_PARTNERSHIP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ org: form.org, email: form.email, city: form.city }),
      })
      if (!res.ok) { setError(true); return }

      if (form.newsletter) {
        await fetch(FORMSPREE_NEWSLETTER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: form.email }),
        })
      }

      setSubmitted(true)
    } catch {
      setError(true)
    }
  }

  return (
    <main style={{ paddingTop: 68 }}>
      <style>{`
        .partner-input:focus-visible {
          outline: 2px solid #1A6E78;
          outline-offset: 2px;
        }
      `}</style>
      {/* Hero */}
      <section style={{ background: '#fff', padding: 'clamp(72px, 10vw, 112px) 24px clamp(24px, 3vw, 40px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#C04040', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 16 }}>Partnerships</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: '#1A6E78', lineHeight: 1.1, marginBottom: 20 }}>
              Partner with{' '}
              <span style={{ fontStyle: 'italic', color: '#E06060' }}>us.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2vw, 19px)', color: '#555', lineHeight: 1.7, maxWidth: 620, margin: '0 auto' }}>
              At Unified STEM, we believe that creating accessible STEM opportunities takes a community. By partnering with us, your business or organization can help empower students of all abilities through hands-on STEM experiences that foster curiosity, confidence, and inclusion.
            </p>
            <div style={{ maxWidth: 560, margin: '24px auto 0', background: '#1A6E78', border: '1.5px solid rgba(26,110,120,0.1)', borderRadius: 12, padding: '16px 24px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.8vw, 17px)', color: '#fff', lineHeight: 1.7, margin: 0 }}>
                We welcome partnerships with businesses, nonprofits, schools, and community organizations that share our commitment to educational equity and inclusion.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* Inquiry form */}
      <section style={{ background: '#EFEFEF', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#C04040', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12, textAlign: 'center' }}>Partnership Inquiry</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#1A6E78', lineHeight: 1.2, marginBottom: 12, textAlign: 'center' }}>
              Let's work together.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#555', textAlign: 'center', lineHeight: 1.65, marginBottom: 36 }}>
              Fill out your information below and a member of our team will be in touch soon!
            </p>
          </FadeIn>
          {submitted ? (
            <FadeIn>
              <div style={{ background: '#fff', borderRadius: 20, padding: '40px 32px', textAlign: 'center', border: '1.5px solid rgba(26,110,120,0.08)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#1A6E78', marginBottom: 8 }}>Thank you!</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#666' }}>We've received your inquiry and will be in touch soon.</p>
              </div>
            </FadeIn>
          ) : error ? (
            <FadeIn>
              <div style={{ background: '#fff', borderRadius: 20, padding: '40px 32px', textAlign: 'center', border: '1.5px solid rgba(26,110,120,0.08)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#1A6E78', marginBottom: 8 }}>Something went wrong.</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#666' }}>Please try again or email us directly.</p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={100}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'org', label: 'Business / Organization Name', type: 'text', placeholder: 'Dunder Mifflin' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'contact@example.com' },
                  { name: 'city', label: 'City / Location', type: 'text', placeholder: 'Scranton, PA' },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#333', display: 'block', marginBottom: 6 }}>{field.label}</label>
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form] as string}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="partner-input"
                      style={{
                        width: '100%',
                        fontFamily: 'var(--font-body)',
                        fontSize: 16,
                        padding: '13px 16px',
                        borderRadius: 12,
                        border: '1.5px solid #ddd',
                        transition: 'border-color 0.2s',
                        background: '#fff',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#1A6E78' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#ddd' }}
                    />
                  </div>
                ))}
                <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={handleChange}
                    style={{ marginTop: 3, width: 18, height: 18, accentColor: '#1A6E78', flexShrink: 0, cursor: 'pointer' }}
                  />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: '#555', lineHeight: 1.5 }}>
                    Subscribe to our monthly newsletter.
                  </span>
                </label>
                <button
                  type="submit"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    fontWeight: 600,
                    padding: '15px 32px',
                    borderRadius: 50,
                    border: 'none',
                    background: '#E06060',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    marginTop: 4,
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none' }}
                >
                  Send Inquiry
                </button>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Past partners */}
      <section style={{ background: '#fff', padding: 'clamp(48px, 6vw, 72px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#C04040', textTransform: 'uppercase', letterSpacing: '1.5px', textAlign: 'center', marginBottom: 36 }}>Past Partners</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <img
                src="/teahouse-logo.png"
                alt="Tea House"
                style={{ height: 60, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#666', textAlign: 'center', marginTop: 24, fontStyle: 'italic' }}>More partners coming soon!</p>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
