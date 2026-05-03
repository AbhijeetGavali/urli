'use client'
import { getTemplate } from './templates'
import type { Section, BioTemplate } from './templates'

const SOCIAL_ICONS: Record<string, string> = {
  twitter: '𝕏', instagram: '📸', youtube: '▶️', linkedin: '💼',
  tiktok: '🎵', github: '⌨️', facebook: '👤', spotify: '🎧',
  whatsapp: '💬', telegram: '✈️', behance: 'Bē', website: '🌐',
}

// ── Section renderers (preview-scale) ─────────────────────────────────────────
function PreviewSection({ section, tpl }: { section: Section; tpl: BioTemplate }) {
  switch (section.type) {

    case 'hero':
      return (
        <div className="w-full text-center space-y-3 py-6 px-4 rounded-xl"
          style={section.background_image
            ? { backgroundImage: `url(${section.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {}}>
          {section.profile_photo
            ? <img src={section.profile_photo} alt="" className="w-16 h-16 rounded-full mx-auto object-cover shadow-lg ring-2 ring-white/30" />
            : <div className="w-16 h-16 rounded-full mx-auto bg-white/20 flex items-center justify-center text-xl">👤</div>
          }
          {section.headline && <p className={`${tpl.nameClass} !text-lg !leading-tight`}>{section.headline}</p>}
          {section.subheadline && <p className={`${tpl.bioClass} !text-sm`}>{section.subheadline}</p>}
          <div className="space-y-2 max-w-[220px] mx-auto">
            {section.cta1_text && <div className={`${tpl.linkBtn} text-xs py-2.5 px-4 pointer-events-none`}>{section.cta1_text}</div>}
            {section.cta2_text && <div className={`${tpl.linkBtn} text-xs py-2.5 px-4 pointer-events-none opacity-70`}>{section.cta2_text}</div>}
          </div>
        </div>
      )

    case 'about':
      return (
        <div className="w-full space-y-3">
          {section.stats && section.stats.length > 0 && (
            <div className="flex justify-center gap-4 py-3 rounded-xl bg-white/10">
              {section.stats.slice(0, 3).map((s, i) => (
                <div key={i} className="text-center">
                  <p className={`${tpl.nameClass} !text-base font-bold`}>{s.value}</p>
                  <p className={`${tpl.bioClass} !text-[10px]`}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
          {section.bio_text && <p className={`${tpl.bioClass} !text-xs leading-relaxed line-clamp-4`}>{section.bio_text}</p>}
        </div>
      )

    case 'services':
      return (
        <div className="w-full space-y-2">
          <p className={`${tpl.sectionHeading} !text-[10px]`}>Services</p>
          {(section.services ?? []).slice(0, 4).map((s, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/10">
              <span className="text-base shrink-0">{s.icon}</span>
              <div className="min-w-0">
                <p className={`${tpl.bioClass} !text-xs font-semibold truncate`}>{s.name}</p>
                {s.description && <p className={`${tpl.bioClass} !text-[10px] opacity-70 truncate`}>{s.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )

    case 'gallery':
      return (
        <div className="w-full space-y-2">
          <p className={`${tpl.sectionHeading} !text-[10px]`}>Gallery</p>
          <div className="grid grid-cols-3 gap-1">
            {(section.images ?? []).slice(0, 6).map((img, i) =>
              img.src
                ? <img key={i} src={img.src} alt={img.caption ?? ''} className="w-full aspect-square object-cover rounded-md" />
                : <div key={i} className="w-full aspect-square bg-white/15 rounded-md flex items-center justify-center text-lg">🖼️</div>
            )}
            {(section.images ?? []).length === 0 && [1,2,3,4,5,6].map(i => (
              <div key={i} className="w-full aspect-square bg-white/10 rounded-md" />
            ))}
          </div>
        </div>
      )

    case 'testimonials':
      return (
        <div className="w-full space-y-2">
          <p className={`${tpl.sectionHeading} !text-[10px]`}>Testimonials</p>
          {(section.testimonials ?? []).slice(0, 2).map((t, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/10 space-y-1">
              <p className={`${tpl.bioClass} !text-xs italic line-clamp-2`}>"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <p className={`${tpl.bioClass} !text-[10px] font-semibold`}>{t.name}</p>
                <span className="text-yellow-400 text-[10px]">{'★'.repeat(t.rating)}</span>
              </div>
            </div>
          ))}
        </div>
      )

    case 'social_links':
      return (
        <div className="w-full space-y-2">
          <p className={`${tpl.sectionHeading} !text-[10px]`}>Find Me Online</p>
          <div className="flex flex-wrap gap-2">
            {(section.social_links ?? []).slice(0, 8).map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/15 text-[10px]">
                <span>{SOCIAL_ICONS[s.platform] ?? '🔗'}</span>
                <span className={`${tpl.bioClass} !text-[10px] capitalize`}>{s.platform}</span>
              </div>
            ))}
          </div>
        </div>
      )

    case 'contact':
      return (
        <div className="w-full space-y-2">
          <p className={`${tpl.sectionHeading} !text-[10px]`}>Get In Touch</p>
          <div className="space-y-1.5">
            {section.email && <p className={`${tpl.bioClass} !text-xs flex items-center gap-1.5`}><span>✉️</span>{section.email}</p>}
            {section.phone && <p className={`${tpl.bioClass} !text-xs flex items-center gap-1.5`}><span>📞</span>{section.phone}</p>}
            {section.address && <p className={`${tpl.bioClass} !text-xs flex items-center gap-1.5`}><span>📍</span>{section.address}</p>}
            {section.hours && <p className={`${tpl.bioClass} !text-xs flex items-center gap-1.5`}><span>🕐</span>{section.hours}</p>}
          </div>
          {section.cta1_text && <div className={`${tpl.linkBtn} text-xs py-2.5 px-4 pointer-events-none mt-1`}>{section.cta1_text}</div>}
        </div>
      )

    case 'featured':
      return (
        <div className="w-full space-y-2">
          <p className={`${tpl.sectionHeading} !text-[10px]`}>Featured</p>
          {section.stats_banner && section.stats_banner.length > 0 && (
            <div className="flex justify-center gap-4 py-3 rounded-xl bg-white/10">
              {section.stats_banner.slice(0, 3).map((s, i) => (
                <div key={i} className="text-center">
                  <p className={`${tpl.nameClass} !text-base font-bold`}>{s.value}</p>
                  <p className={`${tpl.bioClass} !text-[10px]`}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
          {(section.featured_items ?? []).slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/10">
              <span className="text-base">🏆</span>
              <p className={`${tpl.bioClass} !text-xs font-medium`}>{item.title}</p>
            </div>
          ))}
        </div>
      )

    case 'header':
      return (
        <div className="w-full flex items-center justify-between py-2 border-b border-white/20 mb-1">
          <span className={`${tpl.nameClass} !text-sm font-bold`}>{section.logo_text || 'Your Name'}</span>
          {section.cta_text && <div className={`${tpl.linkBtn} text-[10px] py-1 px-3 pointer-events-none`}>{section.cta_text}</div>}
        </div>
      )

    case 'footer':
      return (
        <div className="w-full text-center pt-4 mt-2 border-t border-white/20 space-y-1">
          {section.logo_text && <p className={`${tpl.nameClass} !text-sm`}>{section.logo_text}</p>}
          {section.tagline && <p className={`${tpl.bioClass} !text-xs`}>{section.tagline}</p>}
          {section.copyright && <p className={`${tpl.bioClass} !text-[10px] opacity-50`}>{section.copyright}</p>}
        </div>
      )

    // ── legacy ────────────────────────────────────────────────────────────────
    case 'links':
      return (
        <div className="space-y-2 w-full">
          {(section.links ?? []).filter(l => l.label).map((link, i) => (
            <div key={i} className={`${tpl.linkBtn} text-xs py-2.5 px-4 pointer-events-none`}>{link.label}</div>
          ))}
        </div>
      )
    case 'heading':
      return <p className={`${tpl.sectionHeading} !text-xs`} style={{ textAlign: section.align ?? 'center' }}>{section.content || 'Heading'}</p>
    case 'text':
      return <p className={`${tpl.bioClass} !text-xs leading-relaxed`} style={{ textAlign: section.align ?? 'center' }}>{section.content || 'Text block'}</p>
    case 'divider':
      return <hr className={tpl.divider} />
    case 'social':
      return (
        <div className="flex flex-wrap justify-center gap-2">
          {(section.handles ?? []).map((h, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-lg border opacity-70" style={{ borderColor: 'currentColor' }}>
              {SOCIAL_ICONS[h.platform] ?? h.platform}
            </span>
          ))}
        </div>
      )
    case 'image':
      return section.src
        ? <img src={section.src} alt={section.alt ?? ''} className="w-full rounded-xl object-cover max-h-32" />
        : <div className="w-full h-20 rounded-xl bg-white/10 flex items-center justify-center text-2xl">🖼️</div>

    default:
      return null
  }
}

// ── Page content ──────────────────────────────────────────────────────────────
function PreviewContent({ title, description, avatar, tpl, sections }: {
  title: string; description: string; avatar: string; tpl: BioTemplate; sections: Section[]
}) {
  const initials = title ? title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : 'YN'
  const visibleSections = sections.filter(s => s.visible !== false)
  const hasHero = visibleSections.some(s => s.type === 'hero')

  return (
    <div className="px-4 py-6 space-y-4 w-full">
      {!hasHero && (
        <div className="text-center space-y-2">
          {avatar
            ? <img src={avatar} alt={title} className={`${tpl.avatar} !w-16 !h-16 !mb-0 mx-auto`} />
            : <div className="w-16 h-16 rounded-full mx-auto bg-white/20 flex items-center justify-center text-xl font-bold">{initials}</div>
          }
          <p className={`${tpl.nameClass} !text-lg`}>{title || 'Your Name'}</p>
          {description && <p className={`${tpl.bioClass} !text-sm line-clamp-2`}>{description}</p>}
        </div>
      )}
      {visibleSections.length > 0
        ? visibleSections.map(sec => <PreviewSection key={sec.id} section={sec} tpl={tpl} />)
        : (
          <div className="space-y-2">
            {['My Website', 'Book a Call', 'Follow Me'].map((label, i) => (
              <div key={i} className={`${tpl.linkBtn} text-xs py-3 px-4 pointer-events-none opacity-${i === 0 ? '100' : i === 1 ? '70' : '40'}`}>{label}</div>
            ))}
          </div>
        )
      }
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function PhonePreview({ title, description, avatar, template, sections, mode = 'mobile' }: {
  title: string; description: string; avatar: string
  template: string; sections: Section[]; mode?: 'mobile' | 'desktop'
}) {
  const tpl = getTemplate(template)
  const bgClasses = tpl.page
    .replace('min-h-screen', '')
    .replace('flex items-center justify-center', '')
    .replace('px-4 py-12', '')
    .trim()

  if (mode === 'desktop') {
    return (
      <div className="w-full select-none">
        {/* Browser chrome */}
        <div className="bg-gray-800 rounded-t-2xl px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5 shrink-0">
            {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map(c => (
              <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
            ))}
          </div>
          <div className="flex-1 bg-gray-700 rounded-lg px-3 py-1 text-[11px] text-gray-400 truncate">
            urli.ideasprout.in/b/{title?.toLowerCase().replace(/\s+/g, '') || 'yourname'}
          </div>
        </div>
        {/* Page */}
        <div className={`rounded-b-2xl overflow-hidden h-[480px] overflow-y-auto scrollbar-thin shadow-2xl ${bgClasses}`}>
          <PreviewContent title={title} description={description} avatar={avatar} tpl={tpl} sections={sections} />
        </div>
      </div>
    )
  }

  // Mobile phone frame
  return (
    <div className="select-none flex flex-col items-center">
      {/* Phone shell */}
      <div className="relative bg-gray-900 rounded-[44px] p-[10px] shadow-2xl ring-1 ring-white/10"
        style={{ width: 300 }}>
        {/* Notch */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-20 flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          <div className="w-8 h-1.5 rounded-full bg-gray-700" />
        </div>
        {/* Status bar */}
        <div className="absolute top-[6px] left-[24px] right-[24px] flex items-center justify-between px-2 z-20">
          <span className="text-[9px] text-white/40 font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5 items-end h-2.5">
              {[3,4,5,6].map(h => <div key={h} className="w-0.5 bg-white/40 rounded-sm" style={{ height: h }} />)}
            </div>
            <svg className="w-2.5 h-2.5 text-white/40" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.5a13 13 0 0121 0M5 12a10 10 0 0114 0M8.5 15.5a6 6 0 017 0M12 19h.01"/></svg>
            <div className="w-4 h-2 rounded-sm border border-white/40 flex items-center px-0.5">
              <div className="w-2 h-1 bg-white/40 rounded-sm" />
            </div>
          </div>
        </div>
        {/* Screen */}
        <div className={`rounded-[36px] overflow-hidden ${bgClasses}`} style={{ height: 580 }}>
          <div className="h-full overflow-y-auto scrollbar-none pt-8">
            <PreviewContent title={title} description={description} avatar={avatar} tpl={tpl} sections={sections} />
          </div>
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-2 pb-1">
          <div className="w-20 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
