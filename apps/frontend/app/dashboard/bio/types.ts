// ── Profession categories ─────────────────────────────────────────────────────
export const PROFESSIONS = [
  { id: 'CREATOR',       label: 'Creator / Influencer',      emoji: '🎬', desc: 'Content channels, link-in-bio, brand personality' },
  { id: 'DESIGNER',      label: 'Graphic Designer / Artist', emoji: '🎨', desc: 'Portfolio, case studies, hire-me CTA' },
  { id: 'BARBER',        label: 'Barber / Hair Stylist',      emoji: '✂️', desc: 'Gallery, booking link, pricing, social proof' },
  { id: 'DOCTOR',        label: 'Doctor / Healthcare',        emoji: '🩺', desc: 'Credentials, specialties, appointment info' },
  { id: 'HOME_BUSINESS', label: 'Home Business',              emoji: '🏠', desc: 'Baker, tutor, tailor — showcase & inquiries' },
  { id: 'CONTRACTOR',    label: 'Contractor / Trade Worker',  emoji: '🔧', desc: 'Credibility, past work, services, drive calls' },
  { id: 'RESTAURANT',    label: 'Restaurant / F&B',           emoji: '🍽️', desc: 'Ambiance, menu highlights, reservations' },
  { id: 'CHEF',          label: 'Chef / Caterer',             emoji: '👨‍🍳', desc: 'Culinary style, signature dishes, hire-me' },
  { id: 'FITNESS',       label: 'Fitness / Wellness Coach',   emoji: '💪', desc: 'Authority, transformations, programs, signups' },
  { id: 'MUSICIAN',      label: 'Musician / DJ / Performer',  emoji: '🎵', desc: 'Artist identity, music links, show bookings' },
] as const

export type ProfessionId = typeof PROFESSIONS[number]['id']

// ── Section types (SRS §4) ────────────────────────────────────────────────────
export type SectionType =
  | 'hero'          // §4.2 — headline, subheadline, CTA buttons, bg image
  | 'about'         // §4.3 — bio text, photo, stats
  | 'services'      // §4.4 — service items with icon/name/description
  | 'gallery'       // §4.5 — image grid
  | 'testimonials'  // §4.6 — quote cards
  | 'social_links'  // §4.7 — platform links
  | 'contact'       // §4.8 — email/phone/address/CTA
  | 'featured'      // §4.10 — badges, press logos, stats
  | 'header'        // §4.1 — nav bar (legacy: heading)
  | 'footer'        // §4.9 — copyright, links (legacy: divider/text)
  // legacy primitives kept for backward compat
  | 'links'
  | 'heading'
  | 'text'
  | 'divider'
  | 'social'
  | 'image'

// ── Service item ──────────────────────────────────────────────────────────────
export interface ServiceItem {
  icon: string   // emoji or lucide icon name
  name: string
  description: string
}

// ── Testimonial item ──────────────────────────────────────────────────────────
export interface TestimonialItem {
  quote: string
  name: string
  title: string
  rating: number  // 1–5
}

// ── Social link item ──────────────────────────────────────────────────────────
export interface SocialLinkItem {
  platform: string
  url: string
  handle?: string
}

// ── Featured item ─────────────────────────────────────────────────────────────
export interface FeaturedItem {
  title: string
  description: string
  url?: string
}

// ── Section ───────────────────────────────────────────────────────────────────
export interface Section {
  id: string
  type: SectionType
  visible?: boolean
  variant?: string

  // ── hero ──────────────────────────────────────────────────────────────────
  headline?: string
  subheadline?: string
  cta1_text?: string
  cta1_url?: string
  cta2_text?: string
  cta2_url?: string
  background_image?: string
  profile_photo?: string

  // ── about ─────────────────────────────────────────────────────────────────
  bio_text?: string
  photo?: string
  stats?: { label: string; value: string }[]

  // ── services ──────────────────────────────────────────────────────────────
  services?: ServiceItem[]

  // ── gallery ───────────────────────────────────────────────────────────────
  images?: { src: string; caption?: string }[]

  // ── testimonials ──────────────────────────────────────────────────────────
  testimonials?: TestimonialItem[]

  // ── social_links ──────────────────────────────────────────────────────────
  social_links?: SocialLinkItem[]

  // ── contact ───────────────────────────────────────────────────────────────
  email?: string
  phone?: string
  address?: string
  hours?: string
  booking_url?: string

  // ── featured ──────────────────────────────────────────────────────────────
  featured_items?: FeaturedItem[]
  stats_banner?: { label: string; value: string }[]

  // ── header / footer ───────────────────────────────────────────────────────
  logo_text?: string
  nav_links?: { label: string; url: string }[]
  cta_text?: string
  cta_url?: string
  tagline?: string
  copyright?: string

  // ── legacy primitives ─────────────────────────────────────────────────────
  links?: { label: string; url: string }[]
  content?: string
  align?: 'left' | 'center' | 'right'
  src?: string
  alt?: string
  handles?: { platform: string; url: string }[]

  // ── style overrides ───────────────────────────────────────────────────────
  bgColor?: string
  textColor?: string
}

// ── Global styles ─────────────────────────────────────────────────────────────
export interface GlobalStyles {
  primaryColor: string
  secondaryColor: string
  bgColor: string
  fontPair: string
  borderRadius: 'sharp' | 'soft' | 'round'
  buttonStyle: 'filled' | 'outlined' | 'ghost'
  spacing: 'compact' | 'normal' | 'airy'
}

export const DEFAULT_GLOBAL_STYLES: GlobalStyles = {
  primaryColor: '#3b82f6',
  secondaryColor: '#6366f1',
  bgColor: '#ffffff',
  fontPair: 'inter',
  borderRadius: 'soft',
  buttonStyle: 'filled',
  spacing: 'normal',
}

export const FONT_PAIRS = [
  { id: 'inter',        label: 'Inter',              heading: 'Inter',             body: 'Inter' },
  { id: 'playfair',     label: 'Playfair + Inter',   heading: 'Playfair Display',  body: 'Inter' },
  { id: 'oswald',       label: 'Oswald + Lato',      heading: 'Oswald',            body: 'Lato' },
  { id: 'poppins',      label: 'Poppins',            heading: 'Poppins',           body: 'Poppins' },
  { id: 'merriweather', label: 'Merriweather',       heading: 'Merriweather',      body: 'Open Sans' },
  { id: 'nunito',       label: 'Nunito',             heading: 'Nunito',            body: 'Nunito' },
  { id: 'dm-sans',      label: 'DM Sans',            heading: 'DM Sans',           body: 'DM Sans' },
  { id: 'cormorant',    label: 'Cormorant + Karla',  heading: 'Cormorant Garamond',body: 'Karla' },
  { id: 'space',        label: 'Space Grotesk',      heading: 'Space Grotesk',     body: 'Space Grotesk' },
  { id: 'lora',         label: 'Lora + Source Sans', heading: 'Lora',              body: 'Source Sans 3' },
] as const

// ── Template definition ───────────────────────────────────────────────────────
export interface BioTemplate {
  id: string
  name: string
  tagline: string
  profession: ProfessionId
  variantIndex: number
  palette: string
  // CSS classes for rendering
  page: string
  avatar: string
  nameClass: string
  bioClass: string
  linkBtn: string
  sectionHeading: string
  divider: string
  previewGradient: string
  bestFor: string
  // Structural section composition — defines the page layout
  structure?: SectionType[]
}

// ── Section defaults ──────────────────────────────────────────────────────────
export const SECTION_DEFAULTS: Record<SectionType, Partial<Section>> = {
  hero:         { headline: 'Your Name', subheadline: 'What you do', cta1_text: 'Contact Me', cta1_url: '', visible: true },
  about:        { bio_text: 'Tell your story here.', stats: [{ label: 'Years Experience', value: '5+' }], visible: true },
  services:     { services: [{ icon: '⭐', name: 'Service Name', description: 'Short description' }], visible: true },
  gallery:      { images: [], visible: true },
  testimonials: { testimonials: [{ quote: 'Great work!', name: 'Client Name', title: 'Role', rating: 5 }], visible: true },
  social_links: { social_links: [{ platform: 'instagram', url: 'https://instagram.com/' }], visible: true },
  contact:      { email: 'you@example.com', phone: '', cta1_text: 'Email Me', cta1_url: 'mailto:you@example.com', visible: true },
  featured:     { featured_items: [{ title: 'Achievement', description: 'Description' }], visible: true },
  header:       { logo_text: 'Your Name', nav_links: [], cta_text: 'Book Now', cta_url: '', visible: true },
  footer:       { logo_text: 'Your Name', tagline: 'Tagline here', copyright: `© ${new Date().getFullYear()}`, visible: true },
  // legacy
  links:        { links: [{ label: 'My Website', url: 'https://' }], visible: true },
  heading:      { content: 'Section Title', align: 'center', visible: true },
  text:         { content: 'Add a short description here.', align: 'center', visible: true },
  divider:      { visible: true },
  social:       { handles: [{ platform: 'instagram', url: 'https://instagram.com/' }], visible: true },
  image:        { src: '', alt: '', visible: true },
}

export const SOCIAL_PLATFORMS = [
  'instagram','twitter','youtube','linkedin','tiktok','github',
  'facebook','pinterest','snapchat','discord','spotify','threads',
  'whatsapp','telegram','behance','website',
]
