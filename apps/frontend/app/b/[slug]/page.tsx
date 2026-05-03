import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTemplate } from '../../dashboard/bio/templates'
import type { Section, BioTemplate } from '../../dashboard/bio/templates'

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000'

async function getBio(slug: string) {
  try {
    const res = await fetch(`${API_URL}/bio/public/${slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return (await res.json()).bio
  } catch { return null }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const bio = await getBio(params.slug)
  if (!bio) return {}
  const title = bio.seoTitle || bio.title
  const description = bio.seoDescription || bio.description || `${bio.title}'s bio page`
  const image = bio.ogImage || bio.avatar
  return {
    title, description,
    openGraph: { title, description, images: image ? [{ url: image, width: 1200, height: 630 }] : [], type: 'profile' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// ── Social SVG icons ──────────────────────────────────────────────────────────
const SOCIAL_SVGS: Record<string, React.ReactNode> = {
  twitter:   <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  youtube:   <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  linkedin:  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  tiktok:    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  github:    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  facebook:  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  spotify:   <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
}

const ALIGN: Record<string, string> = { left: 'text-left', center: 'text-center', right: 'text-right' }

// ── Section renderer ──────────────────────────────────────────────────────────
function RenderSection({ section, tpl, slug }: { section: Section; tpl: BioTemplate; slug: string }) {
  const clickUrl = (url: string) => `${API_URL}/bio/click?slug=${encodeURIComponent(slug)}&url=${encodeURIComponent(url)}`

  switch (section.type) {

    case 'hero':
      return (
        <div className="w-full text-center py-8 px-4 space-y-4"
          style={section.background_image ? { backgroundImage: `url(${section.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
          {section.profile_photo && <img src={section.profile_photo} alt="" className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg" />}
          {section.headline && <h1 className={tpl.nameClass}>{section.headline}</h1>}
          {section.subheadline && <p className={tpl.bioClass}>{section.subheadline}</p>}
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            {section.cta1_text && section.cta1_url && (
              <a href={clickUrl(section.cta1_url)} target="_blank" rel="noopener noreferrer" className={tpl.linkBtn}>{section.cta1_text}</a>
            )}
            {section.cta2_text && section.cta2_url && (
              <a href={clickUrl(section.cta2_url)} target="_blank" rel="noopener noreferrer" className={`${tpl.linkBtn} opacity-80`}>{section.cta2_text}</a>
            )}
          </div>
        </div>
      )

    case 'about':
      return (
        <div className="w-full space-y-4">
          {section.stats && section.stats.length > 0 && (
            <div className="flex justify-center gap-6 flex-wrap">
              {section.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className={`${tpl.nameClass} text-2xl`}>{s.value}</p>
                  <p className={`${tpl.bioClass} text-xs`}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
          {section.photo && <img src={section.photo} alt="" className="w-32 h-32 rounded-full mx-auto object-cover shadow-md" />}
          {section.bio_text && <p className={`${tpl.bioClass} leading-relaxed`}>{section.bio_text}</p>}
        </div>
      )

    case 'services':
      return (
        <div className="w-full space-y-3">
          <p className={tpl.sectionHeading}>Services</p>
          <div className="grid grid-cols-1 gap-3">
            {(section.services ?? []).map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/10">
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div>
                  <p className={`${tpl.nameClass} text-sm font-semibold`}>{s.name}</p>
                  <p className={`${tpl.bioClass} text-xs mt-0.5`}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'gallery':
      return (
        <div className="w-full space-y-2">
          <p className={tpl.sectionHeading}>Gallery</p>
          <div className="grid grid-cols-2 gap-2">
            {(section.images ?? []).filter(img => img.src).map((img, i) => (
              <img key={i} src={img.src} alt={img.caption ?? ''} className="w-full aspect-square object-cover rounded-xl" />
            ))}
          </div>
        </div>
      )

    case 'testimonials':
      return (
        <div className="w-full space-y-3">
          <p className={tpl.sectionHeading}>Testimonials</p>
          {(section.testimonials ?? []).map((t, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/10 space-y-2">
              <p className={`${tpl.bioClass} italic`}>"{t.quote}"</p>
              <div className="flex items-center gap-2">
                <div>
                  <p className={`${tpl.nameClass} text-sm font-semibold`}>{t.name}</p>
                  {t.title && <p className={`${tpl.bioClass} text-xs`}>{t.title}</p>}
                </div>
                <span className="ml-auto text-yellow-400 text-sm">{'★'.repeat(t.rating)}</span>
              </div>
            </div>
          ))}
        </div>
      )

    case 'social_links':
      return (
        <div className="w-full space-y-3">
          <p className={tpl.sectionHeading}>Find Me Online</p>
          <div className="flex flex-wrap justify-center gap-3">
            {(section.social_links ?? []).filter(s => s.url).map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity" aria-label={s.platform}>
                {SOCIAL_SVGS[s.platform] ?? <span className="text-sm">{s.platform}</span>}
              </a>
            ))}
          </div>
        </div>
      )

    case 'contact':
      return (
        <div className="w-full space-y-3">
          <p className={tpl.sectionHeading}>Get In Touch</p>
          <div className="space-y-2">
            {section.email && <p className={`${tpl.bioClass} text-sm`}>✉ {section.email}</p>}
            {section.phone && <p className={`${tpl.bioClass} text-sm`}>📞 {section.phone}</p>}
            {section.address && <p className={`${tpl.bioClass} text-sm`}>📍 {section.address}</p>}
            {section.hours && <p className={`${tpl.bioClass} text-sm`}>🕐 {section.hours}</p>}
          </div>
          {section.cta1_text && section.cta1_url && (
            <a href={section.cta1_url} target="_blank" rel="noopener noreferrer" className={tpl.linkBtn}>{section.cta1_text}</a>
          )}
          {section.booking_url && (
            <a href={section.booking_url} target="_blank" rel="noopener noreferrer" className={`${tpl.linkBtn} opacity-80`}>Book Appointment</a>
          )}
        </div>
      )

    case 'featured':
      return (
        <div className="w-full space-y-3">
          <p className={tpl.sectionHeading}>Featured</p>
          {section.stats_banner && section.stats_banner.length > 0 && (
            <div className="flex justify-center gap-6 flex-wrap py-3 rounded-xl bg-white/10">
              {section.stats_banner.map((s, i) => (
                <div key={i} className="text-center">
                  <p className={`${tpl.nameClass} text-xl font-bold`}>{s.value}</p>
                  <p className={`${tpl.bioClass} text-xs`}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
          <div className="space-y-2">
            {(section.featured_items ?? []).map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/10">
                <span className="text-xl shrink-0">🏆</span>
                <div>
                  <p className={`${tpl.nameClass} text-sm font-semibold`}>{item.title}</p>
                  {item.description && <p className={`${tpl.bioClass} text-xs mt-0.5`}>{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'header':
      return (
        <div className="w-full flex items-center justify-between py-3 border-b border-white/20 mb-2">
          <span className={`${tpl.nameClass} text-base`}>{section.logo_text}</span>
          <div className="flex items-center gap-4">
            {(section.nav_links ?? []).map((link, i) => (
              <a key={i} href={link.url} className={`${tpl.bioClass} text-sm hover:opacity-100 opacity-70 transition-opacity`}>{link.label}</a>
            ))}
            {section.cta_text && section.cta_url && (
              <a href={section.cta_url} target="_blank" rel="noopener noreferrer" className={`${tpl.linkBtn} text-sm py-1.5 px-4`}>{section.cta_text}</a>
            )}
          </div>
        </div>
      )

    case 'footer':
      return (
        <div className="w-full text-center pt-6 mt-4 border-t border-white/20 space-y-1">
          {section.logo_text && <p className={`${tpl.nameClass} text-sm`}>{section.logo_text}</p>}
          {section.tagline && <p className={`${tpl.bioClass} text-xs`}>{section.tagline}</p>}
          {section.copyright && <p className={`${tpl.bioClass} text-xs opacity-50`}>{section.copyright}</p>}
        </div>
      )

    // ── legacy ────────────────────────────────────────────────────────────────
    case 'links':
      return (
        <div className="space-y-3 w-full">
          {(section.links ?? []).filter(l => l.url).map((link, i) => (
            <a key={i} href={clickUrl(link.url)} target="_blank" rel="noopener noreferrer" className={tpl.linkBtn}>
              {link.label || link.url}
            </a>
          ))}
        </div>
      )
    case 'heading':
      return <p className={`${tpl.sectionHeading} ${ALIGN[section.align ?? 'center']}`}>{section.content}</p>
    case 'text':
      return <p className={`text-sm leading-relaxed ${ALIGN[section.align ?? 'center']} ${tpl.bioClass}`}>{section.content}</p>
    case 'divider':
      return <hr className={tpl.divider} />
    case 'social':
      return (
        <div className="flex flex-wrap justify-center gap-3">
          {(section.handles ?? []).filter(h => h.url).map((h, i) => (
            <a key={i} href={h.url} target="_blank" rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity" aria-label={h.platform}>
              {SOCIAL_SVGS[h.platform] ?? <span className="text-xs">{h.platform}</span>}
            </a>
          ))}
        </div>
      )
    case 'image':
      return section.src
        ? <img src={section.src} alt={section.alt ?? ''} className="w-full rounded-xl object-cover max-h-64" />
        : null

    default:
      return null
  }
}

// ── Public page ───────────────────────────────────────────────────────────────
export default async function PublicBioPage({ params }: { params: { slug: string } }) {
  const bio = await getBio(params.slug)
  if (!bio) notFound()

  const tpl = getTemplate(bio.template ?? 'creator_neon_pulse')
  const sections: Section[] = (bio.sections ?? []).filter((s: Section) => s.visible !== false)
  const hasHero = sections.some(s => s.type === 'hero')
  const initials = bio.title ? bio.title.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase() : 'U'

  return (
    <div className={tpl.page}>
      <div className="w-full max-w-sm animate-fade-up">
        {/* Default avatar/name block — hidden when a hero section is present */}
        {!hasHero && (
          <div className="text-center mb-6">
            {bio.avatar
              ? <img src={bio.avatar} alt={bio.title} className={tpl.avatar} />
              : <div className={`${tpl.avatar} flex items-center justify-center text-xl font-bold bg-white/20`}>{initials}</div>
            }
            <h1 className={`${tpl.nameClass} mt-1`}>{bio.title}</h1>
            {bio.description && <p className={`${tpl.bioClass} mt-2 max-w-xs mx-auto`}>{bio.description}</p>}
          </div>
        )}

        {sections.length > 0 ? (
          <div className="space-y-6">
            {sections.map((sec: Section) => (
              <RenderSection key={sec.id} section={sec} tpl={tpl} slug={params.slug} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {(bio.links ?? []).map((link: { url: string; label: string }, i: number) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className={tpl.linkBtn}>{link.label}</a>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a href="https://urli.ideasprout.in" target="_blank" rel="noopener noreferrer"
            className="text-xs opacity-30 hover:opacity-60 transition-opacity">Made with Urli</a>
        </div>
      </div>
    </div>
  )
}
