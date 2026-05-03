'use client'
import { useState } from 'react'
import { Plus, X, ChevronDown, Link2, Type, AlignLeft, Minus, Share2, Image,
  Zap, User, Briefcase, LayoutGrid, Star, AtSign, Phone, Award, Navigation, AlignJustify } from 'lucide-react'
import { SECTION_DEFAULTS, SOCIAL_PLATFORMS } from './templates'
import type { Section, SectionType, ServiceItem, TestimonialItem, SocialLinkItem, FeaturedItem } from './templates'

export const SECTION_ICONS: Record<SectionType, React.ReactNode> = {
  hero: <Zap size={13} />,
  about: <User size={13} />,
  services: <Briefcase size={13} />,
  gallery: <LayoutGrid size={13} />,
  testimonials: <Star size={13} />,
  social_links: <AtSign size={13} />,
  contact: <Phone size={13} />,
  featured: <Award size={13} />,
  header: <Navigation size={13} />,
  footer: <AlignJustify size={13} />,
  // legacy
  links: <Link2 size={13} />,
  heading: <Type size={13} />,
  text: <AlignLeft size={13} />,
  divider: <Minus size={13} />,
  social: <Share2 size={13} />,
  image: <Image size={13} />,
}

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: 'Hero', about: 'About / Bio', services: 'Services',
  gallery: 'Gallery', testimonials: 'Testimonials', social_links: 'Social Links',
  contact: 'Contact', featured: 'Featured', header: 'Header', footer: 'Footer',
  links: 'Links', heading: 'Heading', text: 'Text',
  divider: 'Divider', social: 'Social Icons', image: 'Image',
}

// ── Shared field helpers ──────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  )
}

function Inp({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} type={type}
      className="input text-sm w-full" />
  )
}

// ── Hero editor ───────────────────────────────────────────────────────────────
function HeroEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const u = (k: keyof Section, v: string) => onChange({ ...section, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Headline"><Inp value={section.headline ?? ''} onChange={v => u('headline', v)} placeholder="Your Name or Tagline" /></Field>
      <Field label="Subheadline"><Inp value={section.subheadline ?? ''} onChange={v => u('subheadline', v)} placeholder="What you do" /></Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="CTA 1 Text"><Inp value={section.cta1_text ?? ''} onChange={v => u('cta1_text', v)} placeholder="Contact Me" /></Field>
        <Field label="CTA 1 URL"><Inp value={section.cta1_url ?? ''} onChange={v => u('cta1_url', v)} placeholder="https://…" type="url" /></Field>
        <Field label="CTA 2 Text"><Inp value={section.cta2_text ?? ''} onChange={v => u('cta2_text', v)} placeholder="View Work" /></Field>
        <Field label="CTA 2 URL"><Inp value={section.cta2_url ?? ''} onChange={v => u('cta2_url', v)} placeholder="https://…" type="url" /></Field>
      </div>
      <Field label="Background Image URL"><Inp value={section.background_image ?? ''} onChange={v => u('background_image', v)} placeholder="https://…" /></Field>
      <Field label="Profile Photo URL"><Inp value={section.profile_photo ?? ''} onChange={v => u('profile_photo', v)} placeholder="https://…" /></Field>
    </div>
  )
}

// ── About editor ──────────────────────────────────────────────────────────────
function AboutEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const stats = section.stats ?? []
  return (
    <div className="space-y-2">
      <Field label="Bio Text">
        <textarea value={section.bio_text ?? ''} onChange={e => onChange({ ...section, bio_text: e.target.value })}
          placeholder="Tell your story…" rows={3} className="input resize-none text-sm w-full" />
      </Field>
      <Field label="Photo URL"><Inp value={section.photo ?? ''} onChange={v => onChange({ ...section, photo: v })} placeholder="https://…" /></Field>
      <Field label="Stats">
        {stats.map((s, i) => (
          <div key={i} className="flex gap-2 items-center mb-1">
            <input value={s.value} onChange={e => onChange({ ...section, stats: stats.map((x, j) => j === i ? { ...x, value: e.target.value } : x) })}
              placeholder="5+" className="input text-sm w-16" />
            <input value={s.label} onChange={e => onChange({ ...section, stats: stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x) })}
              placeholder="Years Exp." className="input text-sm flex-1" />
            <button type="button" onClick={() => onChange({ ...section, stats: stats.filter((_, j) => j !== i) })}
              className="p-1 text-gray-400 hover:text-red-500"><X size={12} /></button>
          </div>
        ))}
        <button type="button" onClick={() => onChange({ ...section, stats: [...stats, { label: '', value: '' }] })}
          className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={11} /> Add stat</button>
      </Field>
    </div>
  )
}

// ── Services editor ───────────────────────────────────────────────────────────
function ServicesEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const items: ServiceItem[] = section.services ?? []
  const update = (i: number, patch: Partial<ServiceItem>) =>
    onChange({ ...section, services: items.map((x, j) => j === i ? { ...x, ...patch } : x) })
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start p-2 bg-gray-50 rounded-lg">
          <input value={item.icon} onChange={e => update(i, { icon: e.target.value })}
            placeholder="⭐" className="input text-sm w-10 text-center" />
          <div className="flex-1 space-y-1">
            <input value={item.name} onChange={e => update(i, { name: e.target.value })}
              placeholder="Service name" className="input text-sm w-full" />
            <input value={item.description} onChange={e => update(i, { description: e.target.value })}
              placeholder="Short description" className="input text-sm w-full" />
          </div>
          <button type="button" onClick={() => onChange({ ...section, services: items.filter((_, j) => j !== i) })}
            className="p-1 text-gray-400 hover:text-red-500 mt-1"><X size={12} /></button>
        </div>
      ))}
      {items.length < 12 && (
        <button type="button" onClick={() => onChange({ ...section, services: [...items, { icon: '⭐', name: '', description: '' }] })}
          className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={11} /> Add service</button>
      )}
    </div>
  )
}

// ── Gallery editor ────────────────────────────────────────────────────────────
function GalleryEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const images = section.images ?? []
  return (
    <div className="space-y-2">
      {images.map((img, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={img.src} onChange={e => onChange({ ...section, images: images.map((x, j) => j === i ? { ...x, src: e.target.value } : x) })}
            placeholder="Image URL" className="input text-sm flex-1" />
          <input value={img.caption ?? ''} onChange={e => onChange({ ...section, images: images.map((x, j) => j === i ? { ...x, caption: e.target.value } : x) })}
            placeholder="Caption" className="input text-sm w-24" />
          <button type="button" onClick={() => onChange({ ...section, images: images.filter((_, j) => j !== i) })}
            className="p-1 text-gray-400 hover:text-red-500"><X size={12} /></button>
        </div>
      ))}
      {images.length < 24 && (
        <button type="button" onClick={() => onChange({ ...section, images: [...images, { src: '', caption: '' }] })}
          className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={11} /> Add image</button>
      )}
    </div>
  )
}

// ── Testimonials editor ───────────────────────────────────────────────────────
function TestimonialsEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const items: TestimonialItem[] = section.testimonials ?? []
  const update = (i: number, patch: Partial<TestimonialItem>) =>
    onChange({ ...section, testimonials: items.map((x, j) => j === i ? { ...x, ...patch } : x) })
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="p-2 bg-gray-50 rounded-lg space-y-1">
          <div className="flex gap-2 items-center">
            <textarea value={item.quote} onChange={e => update(i, { quote: e.target.value })}
              placeholder="Quote…" rows={2} className="input resize-none text-sm flex-1" />
            <button type="button" onClick={() => onChange({ ...section, testimonials: items.filter((_, j) => j !== i) })}
              className="p-1 text-gray-400 hover:text-red-500 self-start"><X size={12} /></button>
          </div>
          <div className="flex gap-2">
            <input value={item.name} onChange={e => update(i, { name: e.target.value })}
              placeholder="Name" className="input text-sm flex-1" />
            <input value={item.title} onChange={e => update(i, { title: e.target.value })}
              placeholder="Role / Company" className="input text-sm flex-1" />
            <select value={item.rating} onChange={e => update(i, { rating: Number(e.target.value) })}
              className="input text-sm w-16">
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}★</option>)}
            </select>
          </div>
        </div>
      ))}
      {items.length < 10 && (
        <button type="button" onClick={() => onChange({ ...section, testimonials: [...items, { quote: '', name: '', title: '', rating: 5 }] })}
          className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={11} /> Add testimonial</button>
      )}
    </div>
  )
}

// ── Social links editor ───────────────────────────────────────────────────────
function SocialLinksEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const items: SocialLinkItem[] = section.social_links ?? []
  const update = (i: number, patch: Partial<SocialLinkItem>) =>
    onChange({ ...section, social_links: items.map((x, j) => j === i ? { ...x, ...patch } : x) })
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <select value={item.platform} onChange={e => update(i, { platform: e.target.value })}
            className="input text-sm w-32 capitalize">
            {SOCIAL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input value={item.url} onChange={e => update(i, { url: e.target.value })}
            placeholder="Profile URL" type="url" className="input text-sm flex-1" />
          <button type="button" onClick={() => onChange({ ...section, social_links: items.filter((_, j) => j !== i) })}
            className="p-1 text-gray-400 hover:text-red-500"><X size={12} /></button>
        </div>
      ))}
      {items.length < 16 && (
        <button type="button" onClick={() => onChange({ ...section, social_links: [...items, { platform: 'instagram', url: '' }] })}
          className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={11} /> Add platform</button>
      )}
    </div>
  )
}

// ── Contact editor ────────────────────────────────────────────────────────────
function ContactEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const u = (k: keyof Section, v: string) => onChange({ ...section, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Email"><Inp value={section.email ?? ''} onChange={v => u('email', v)} placeholder="you@example.com" type="email" /></Field>
      <Field label="Phone"><Inp value={section.phone ?? ''} onChange={v => u('phone', v)} placeholder="+1 234 567 8900" /></Field>
      <Field label="Address"><Inp value={section.address ?? ''} onChange={v => u('address', v)} placeholder="City, Country" /></Field>
      <Field label="Hours"><Inp value={section.hours ?? ''} onChange={v => u('hours', v)} placeholder="Mon–Fri 9am–6pm" /></Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="CTA Text"><Inp value={section.cta1_text ?? ''} onChange={v => u('cta1_text', v)} placeholder="Email Me" /></Field>
        <Field label="CTA URL"><Inp value={section.cta1_url ?? ''} onChange={v => u('cta1_url', v)} placeholder="mailto:…" /></Field>
      </div>
      <Field label="Booking URL"><Inp value={section.booking_url ?? ''} onChange={v => u('booking_url', v)} placeholder="Calendly / Acuity link" type="url" /></Field>
    </div>
  )
}

// ── Featured editor ───────────────────────────────────────────────────────────
function FeaturedEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const items: FeaturedItem[] = section.featured_items ?? []
  const stats = section.stats_banner ?? []
  const updateItem = (i: number, patch: Partial<FeaturedItem>) =>
    onChange({ ...section, featured_items: items.map((x, j) => j === i ? { ...x, ...patch } : x) })
  return (
    <div className="space-y-3">
      <Field label="Feature Items">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start mb-1 p-2 bg-gray-50 rounded-lg">
            <div className="flex-1 space-y-1">
              <input value={item.title} onChange={e => updateItem(i, { title: e.target.value })}
                placeholder="Title / Badge" className="input text-sm w-full" />
              <input value={item.description} onChange={e => updateItem(i, { description: e.target.value })}
                placeholder="Description" className="input text-sm w-full" />
              <input value={item.url ?? ''} onChange={e => updateItem(i, { url: e.target.value })}
                placeholder="Link (optional)" type="url" className="input text-sm w-full" />
            </div>
            <button type="button" onClick={() => onChange({ ...section, featured_items: items.filter((_, j) => j !== i) })}
              className="p-1 text-gray-400 hover:text-red-500 mt-1"><X size={12} /></button>
          </div>
        ))}
        {items.length < 6 && (
          <button type="button" onClick={() => onChange({ ...section, featured_items: [...items, { title: '', description: '' }] })}
            className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={11} /> Add item</button>
        )}
      </Field>
      <Field label="Stats Banner">
        {stats.map((s, i) => (
          <div key={i} className="flex gap-2 items-center mb-1">
            <input value={s.value} onChange={e => onChange({ ...section, stats_banner: stats.map((x, j) => j === i ? { ...x, value: e.target.value } : x) })}
              placeholder="500+" className="input text-sm w-16" />
            <input value={s.label} onChange={e => onChange({ ...section, stats_banner: stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x) })}
              placeholder="Clients served" className="input text-sm flex-1" />
            <button type="button" onClick={() => onChange({ ...section, stats_banner: stats.filter((_, j) => j !== i) })}
              className="p-1 text-gray-400 hover:text-red-500"><X size={12} /></button>
          </div>
        ))}
        <button type="button" onClick={() => onChange({ ...section, stats_banner: [...stats, { label: '', value: '' }] })}
          className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={11} /> Add stat</button>
      </Field>
    </div>
  )
}

// ── Header editor ─────────────────────────────────────────────────────────────
function HeaderEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const navLinks = section.nav_links ?? []
  const u = (k: keyof Section, v: string) => onChange({ ...section, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Name / Logo Text"><Inp value={section.logo_text ?? ''} onChange={v => u('logo_text', v)} placeholder="Your Name" /></Field>
      <Field label="Nav Links">
        {navLinks.map((link, i) => (
          <div key={i} className="flex gap-2 items-center mb-1">
            <input value={link.label} onChange={e => onChange({ ...section, nav_links: navLinks.map((l, j) => j === i ? { ...l, label: e.target.value } : l) })}
              placeholder="Label" className="input text-sm w-24" />
            <input value={link.url} onChange={e => onChange({ ...section, nav_links: navLinks.map((l, j) => j === i ? { ...l, url: e.target.value } : l) })}
              placeholder="URL" type="url" className="input text-sm flex-1" />
            <button type="button" onClick={() => onChange({ ...section, nav_links: navLinks.filter((_, j) => j !== i) })}
              className="p-1 text-gray-400 hover:text-red-500"><X size={12} /></button>
          </div>
        ))}
        {navLinks.length < 8 && (
          <button type="button" onClick={() => onChange({ ...section, nav_links: [...navLinks, { label: '', url: '' }] })}
            className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Plus size={11} /> Add link</button>
        )}
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="CTA Text"><Inp value={section.cta_text ?? ''} onChange={v => u('cta_text', v)} placeholder="Book Now" /></Field>
        <Field label="CTA URL"><Inp value={section.cta_url ?? ''} onChange={v => u('cta_url', v)} placeholder="https://…" type="url" /></Field>
      </div>
    </div>
  )
}

// ── Footer editor ─────────────────────────────────────────────────────────────
function FooterEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const u = (k: keyof Section, v: string) => onChange({ ...section, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Name / Logo"><Inp value={section.logo_text ?? ''} onChange={v => u('logo_text', v)} placeholder="Your Name" /></Field>
      <Field label="Tagline"><Inp value={section.tagline ?? ''} onChange={v => u('tagline', v)} placeholder="Short tagline" /></Field>
      <Field label="Copyright"><Inp value={section.copyright ?? ''} onChange={v => u('copyright', v)} placeholder={`© ${new Date().getFullYear()}`} /></Field>
    </div>
  )
}

// ── Legacy editors ────────────────────────────────────────────────────────────
function LinksEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const links = section.links ?? []
  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={link.label} onChange={e => onChange({ ...section, links: links.map((l, j) => j === i ? { ...l, label: e.target.value } : l) })}
            placeholder="Label" className="input w-[38%] text-sm" />
          <input value={link.url} onChange={e => onChange({ ...section, links: links.map((l, j) => j === i ? { ...l, url: e.target.value } : l) })}
            placeholder="https://…" type="url" className="input flex-1 text-sm" />
          <button type="button" onClick={() => onChange({ ...section, links: links.filter((_, j) => j !== i) })}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"><X size={13} /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange({ ...section, links: [...links, { label: '', url: '' }] })}
        className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"><Plus size={12} /> Add link</button>
    </div>
  )
}

function TextEditor({ section, onChange, placeholder }: { section: Section; onChange: (s: Section) => void; placeholder: string }) {
  return (
    <div className="space-y-2">
      <textarea value={section.content ?? ''} onChange={e => onChange({ ...section, content: e.target.value })}
        placeholder={placeholder} rows={2} className="input resize-none text-sm w-full" />
      <div className="flex gap-1.5">
        {(['left', 'center', 'right'] as const).map(a => (
          <button key={a} type="button" onClick={() => onChange({ ...section, align: a })}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${section.align === a ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            {a[0].toUpperCase() + a.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

function LegacySocialEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const handles = section.handles ?? []
  return (
    <div className="space-y-2">
      {handles.map((h, i) => (
        <div key={i} className="flex gap-2 items-center">
          <select value={h.platform} onChange={e => onChange({ ...section, handles: handles.map((hh, j) => j === i ? { ...hh, platform: e.target.value } : hh) })}
            className="input w-[38%] text-sm capitalize">
            {SOCIAL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input value={h.url} onChange={e => onChange({ ...section, handles: handles.map((hh, j) => j === i ? { ...hh, url: e.target.value } : hh) })}
            placeholder="Profile URL" type="url" className="input flex-1 text-sm" />
          <button type="button" onClick={() => onChange({ ...section, handles: handles.filter((_, j) => j !== i) })}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"><X size={13} /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange({ ...section, handles: [...handles, { platform: 'twitter', url: '' }] })}
        className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"><Plus size={12} /> Add social</button>
    </div>
  )
}

// ── Section body dispatcher ───────────────────────────────────────────────────
function SectionBody({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  switch (section.type) {
    case 'hero':         return <HeroEditor section={section} onChange={onChange} />
    case 'about':        return <AboutEditor section={section} onChange={onChange} />
    case 'services':     return <ServicesEditor section={section} onChange={onChange} />
    case 'gallery':      return <GalleryEditor section={section} onChange={onChange} />
    case 'testimonials': return <TestimonialsEditor section={section} onChange={onChange} />
    case 'social_links': return <SocialLinksEditor section={section} onChange={onChange} />
    case 'contact':      return <ContactEditor section={section} onChange={onChange} />
    case 'featured':     return <FeaturedEditor section={section} onChange={onChange} />
    case 'header':       return <HeaderEditor section={section} onChange={onChange} />
    case 'footer':       return <FooterEditor section={section} onChange={onChange} />
    case 'links':        return <LinksEditor section={section} onChange={onChange} />
    case 'heading':      return <TextEditor section={section} onChange={onChange} placeholder="Section heading…" />
    case 'text':         return <TextEditor section={section} onChange={onChange} placeholder="Paragraph text…" />
    case 'divider':      return <p className="text-xs text-gray-400">A horizontal divider line.</p>
    case 'social':       return <LegacySocialEditor section={section} onChange={onChange} />
    case 'image':
      return (
        <div className="space-y-2">
          <input value={section.src ?? ''} onChange={e => onChange({ ...section, src: e.target.value })}
            placeholder="Image URL (https://…)" className="input text-sm w-full" />
          <input value={section.alt ?? ''} onChange={e => onChange({ ...section, alt: e.target.value })}
            placeholder="Alt text" className="input text-sm w-full" />
        </div>
      )
    default: return null
  }
}

// ── SectionCard ───────────────────────────────────────────────────────────────
export function SectionCard({ section, index, total, onChange, onRemove, onMove,
  onDragStart, onDragOver, onDrop, isDragging }: {
  section: Section; index: number; total: number
  onChange: (s: Section) => void; onRemove: () => void; onMove: (dir: -1 | 1) => void
  onDragStart?: () => void; onDragOver?: (e: React.DragEvent) => void
  onDrop?: () => void; isDragging?: boolean
}) {
  const [open, setOpen] = useState(true)
  const isHidden = section.visible === false
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={e => { e.preventDefault(); onDragOver?.(e) }}
      onDrop={onDrop}
      className={`rounded-xl border overflow-hidden transition-all ${
        isDragging ? 'opacity-40 scale-[0.98]' : ''
      } ${isHidden ? 'opacity-60 border-dashed border-gray-200' : 'border-gray-200'}`}>
      <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
        {/* Drag handle */}
        <span className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing shrink-0 touch-none"
          onClick={e => e.stopPropagation()}>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
            <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
            <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
          </svg>
        </span>
        <span className="text-gray-400 shrink-0">{SECTION_ICONS[section.type]}</span>
        <span className={`text-sm font-medium flex-1 ${isHidden ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
          {SECTION_LABELS[section.type]}
        </span>
        <div className="flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
          <button type="button" title={isHidden ? 'Show section' : 'Hide section'}
            onClick={() => onChange({ ...section, visible: !isHidden })}
            className={`p-1 rounded transition-colors ${isHidden ? 'text-gray-300 hover:text-blue-500' : 'text-blue-400 hover:text-blue-600'}`}>
            {isHidden
              ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              : <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            }
          </button>
          <button type="button" onClick={onRemove}
            className="p-1 rounded text-gray-400 hover:text-red-500 transition-colors"><X size={13} /></button>
        </div>
        <ChevronDown size={13} className={`text-gray-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && !isHidden && (
        <div className="px-3 pb-3 pt-2 border-t border-gray-200 bg-white">
          <SectionBody section={section} onChange={onChange} />
        </div>
      )}
    </div>
  )
}

// ── AddSectionBar ─────────────────────────────────────────────────────────────
const PRIMARY_TYPES: SectionType[] = ['hero', 'about', 'services', 'gallery', 'testimonials', 'social_links', 'contact', 'featured', 'header', 'footer']
const LEGACY_TYPES: SectionType[] = ['links', 'heading', 'text', 'divider', 'social', 'image']

export function AddSectionBar({ onAdd }: { onAdd: (type: SectionType) => void }) {
  const [showLegacy, setShowLegacy] = useState(false)
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {PRIMARY_TYPES.map(type => (
          <button key={type} type="button" onClick={() => onAdd(type)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300 px-2.5 py-1.5 rounded-lg transition-colors">
            <Plus size={11} className="text-gray-400" />
            {SECTION_LABELS[type]}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => setShowLegacy(v => !v)}
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
        {showLegacy ? '▲ Hide' : '▼ More'} (legacy blocks)
      </button>
      {showLegacy && (
        <div className="flex flex-wrap gap-1.5">
          {LEGACY_TYPES.map(type => (
            <button key={type} type="button" onClick={() => onAdd(type)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-white hover:bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors">
              <Plus size={11} className="text-gray-400" />
              {SECTION_LABELS[type]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
