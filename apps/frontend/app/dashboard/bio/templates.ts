import { nanoid } from 'nanoid'
import type { BioTemplate, ProfessionId, Section, SectionType } from './types'
import { SECTION_DEFAULTS } from './types'
export * from './types'

// ─────────────────────────────────────────────────────────────────────────────
// 100 BioPage Templates  (10 per profession × 10 professions)
// Each template is fully self-contained via Tailwind CSS class strings.
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATES: BioTemplate[] = [

  // ── 1. CREATOR / INFLUENCER / CONTENT MAKER ──────────────────────────────

  {
    id: 'creator_neon_pulse', name: 'Neon Pulse', tagline: 'Dark + glowing accents',
    profession: 'CREATOR', variantIndex: 1, palette: 'Black + Neon Green',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-400 shadow-[0_0_24px_rgba(74,222,128,0.5)]',
    nameClass: 'text-3xl font-black text-white text-center tracking-tight',
    bioClass: 'text-sm text-gray-400 text-center mt-2',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-bold text-black bg-green-400 hover:bg-green-300 transition-all shadow-[0_0_12px_rgba(74,222,128,0.4)]',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-green-400 text-center mb-3',
    divider: 'border-t border-green-900 my-4',
    previewGradient: 'from-black to-green-950', bestFor: 'Streamers, gamers, tech creators',
  },
  {
    id: 'creator_pastel_cloud', name: 'Pastel Cloud', tagline: 'Soft gradients, rounded',
    profession: 'CREATOR', variantIndex: 2, palette: 'Lavender + Cream',
    page: 'min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white shadow-lg',
    nameClass: 'text-2xl font-bold text-purple-900 text-center',
    bioClass: 'text-sm text-purple-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-purple-400 text-center mb-3',
    divider: 'border-t border-purple-100 my-4',
    previewGradient: 'from-purple-50 to-pink-50', bestFor: 'Lifestyle, beauty, fashion creators',
  },
  {
    id: 'creator_minimal_black', name: 'Minimal Black', tagline: 'Editorial, photography-first',
    profession: 'CREATOR', variantIndex: 3, palette: 'Black + White',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-28 h-28 rounded-none mx-auto mb-4 object-cover',
    nameClass: 'text-4xl font-black text-gray-950 text-center tracking-tighter uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-2 font-light',
    linkBtn: 'block w-full text-center py-3 px-6 border-2 border-gray-950 font-bold text-gray-950 hover:bg-gray-950 hover:text-white transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-[0.3em] text-gray-300 text-center mb-3',
    divider: 'border-t-2 border-gray-950 my-4',
    previewGradient: 'from-white to-gray-50', bestFor: 'Photographers, editorial creators',
  },
  {
    id: 'creator_retro_wave', name: 'Retro Wave', tagline: '80s synthwave vibes',
    profession: 'CREATOR', variantIndex: 4, palette: 'Purple + Hot Pink',
    page: 'min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-none mx-auto mb-4 object-cover ring-2 ring-pink-500',
    nameClass: 'text-3xl font-black text-pink-400 text-center tracking-widest uppercase',
    bioClass: 'text-sm text-purple-300 text-center mt-2',
    linkBtn: 'block w-full text-center py-3 px-6 font-bold text-pink-400 border border-pink-500 hover:bg-pink-500/20 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-pink-500 text-center mb-3',
    divider: 'border-t border-pink-900 my-4',
    previewGradient: 'from-indigo-950 to-pink-950', bestFor: 'Music, retro, nostalgia creators',
  },
  {
    id: 'creator_magazine_cut', name: 'Magazine Cut', tagline: 'Overlapping, editorial',
    profession: 'CREATOR', variantIndex: 5, palette: 'Off-white + Deep Red',
    page: 'min-h-screen bg-stone-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-600 shadow-xl',
    nameClass: 'text-3xl font-black text-stone-900 text-center leading-tight',
    bioClass: 'text-sm text-stone-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 font-bold text-white bg-red-600 hover:bg-red-700 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-red-600 text-center mb-3',
    divider: 'border-t-2 border-red-200 my-4',
    previewGradient: 'from-stone-100 to-red-50', bestFor: 'Journalists, writers, media creators',
  },
  {
    id: 'creator_glassmorphism', name: 'Glassmorphism', tagline: 'Frosted glass, modern',
    profession: 'CREATOR', variantIndex: 6, palette: 'Indigo + Teal',
    page: 'min-h-screen bg-gradient-to-br from-indigo-600 via-teal-500 to-cyan-400 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white/50 shadow-xl',
    nameClass: 'text-2xl font-bold text-white text-center drop-shadow',
    bioClass: 'text-sm text-white/80 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-white/60 text-center mb-3',
    divider: 'border-t border-white/20 my-4',
    previewGradient: 'from-indigo-600 to-teal-500', bestFor: 'Tech, design, modern creators',
  },
  {
    id: 'creator_studio_clean', name: 'Studio Clean', tagline: 'White space, museum vibe',
    profession: 'CREATOR', variantIndex: 7, palette: 'White + Stone + Black',
    page: 'min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-1 ring-stone-200',
    nameClass: 'text-2xl font-light text-stone-900 text-center tracking-wide',
    bioClass: 'text-sm text-stone-400 text-center mt-1 font-light',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-none font-medium text-stone-900 border border-stone-300 hover:bg-stone-900 hover:text-white transition-all',
    sectionHeading: 'text-xs font-medium uppercase tracking-[0.25em] text-stone-300 text-center mb-3',
    divider: 'border-t border-stone-200 my-4',
    previewGradient: 'from-stone-50 to-white', bestFor: 'Artists, curators, minimalists',
  },
  {
    id: 'creator_street_art', name: 'Street Art', tagline: 'Bold blocks, graffiti energy',
    profession: 'CREATOR', variantIndex: 8, palette: 'Yellow + Black + Red',
    page: 'min-h-screen bg-yellow-400 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-none mx-auto mb-4 object-cover ring-4 ring-black',
    nameClass: 'text-4xl font-black text-black text-center uppercase tracking-tighter',
    bioClass: 'text-sm text-black/70 text-center mt-1 font-bold',
    linkBtn: 'block w-full text-center py-3 px-6 font-black text-yellow-400 bg-black hover:bg-red-600 transition-all uppercase tracking-wide',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-black text-center mb-3',
    divider: 'border-t-4 border-black my-4',
    previewGradient: 'from-yellow-400 to-yellow-300', bestFor: 'Urban, hip-hop, street culture creators',
  },
  {
    id: 'creator_soft_gradient', name: 'Soft Gradient', tagline: 'Floating cards, emoji-forward',
    profession: 'CREATOR', variantIndex: 9, palette: 'Pink + Orange + Yellow',
    page: 'min-h-screen bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-300 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white shadow-xl',
    nameClass: 'text-2xl font-bold text-white text-center drop-shadow-md',
    bioClass: 'text-sm text-white/90 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-orange-600 bg-white hover:bg-orange-50 shadow-md transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-white/70 text-center mb-3',
    divider: 'border-t border-white/30 my-4',
    previewGradient: 'from-pink-400 to-yellow-300', bestFor: 'Lifestyle, food, travel creators',
  },
  {
    id: 'creator_dark_editorial', name: 'Dark Editorial', tagline: 'Newspaper column, moody',
    profession: 'CREATOR', variantIndex: 10, palette: 'Charcoal + Cream',
    page: 'min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-zinc-600',
    nameClass: 'text-3xl font-bold text-amber-50 text-center',
    bioClass: 'text-sm text-zinc-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-zinc-900 bg-amber-100 hover:bg-amber-200 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-zinc-500 text-center mb-3',
    divider: 'border-t border-zinc-700 my-4',
    previewGradient: 'from-zinc-900 to-zinc-800', bestFor: 'Writers, journalists, podcasters',
  },

  // ── 2. GRAPHIC DESIGNER / VISUAL ARTIST ──────────────────────────────────

  {
    id: 'designer_portfolio_grid', name: 'Portfolio Grid', tagline: 'Masonry, case study previews',
    profession: 'DESIGNER', variantIndex: 1, palette: 'White + Black + Accent',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-gray-200',
    nameClass: 'text-2xl font-semibold text-gray-900 text-center tracking-tight',
    bioClass: 'text-sm text-gray-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-lg font-medium text-white bg-gray-900 hover:bg-gray-700 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-3',
    divider: 'border-t border-gray-100 my-4',
    previewGradient: 'from-white to-gray-50', bestFor: 'UX/UI designers, product designers',
  },
  {
    id: 'designer_dark_canvas', name: 'Dark Canvas', tagline: 'Black bg, colorful project cards',
    profession: 'DESIGNER', variantIndex: 2, palette: 'Black + Electric Blue',
    page: 'min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-2 ring-blue-500',
    nameClass: 'text-3xl font-bold text-white text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-2',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-blue-400 text-center mb-3',
    divider: 'border-t border-gray-800 my-4',
    previewGradient: 'from-gray-950 to-blue-950', bestFor: 'Brand designers, motion designers',
  },
  {
    id: 'designer_type_forward', name: 'Type-Forward', tagline: 'Typography as art',
    profession: 'DESIGNER', variantIndex: 3, palette: 'Cream + Deep Navy',
    page: 'min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-16 h-16 rounded-full mx-auto mb-4 object-cover ring-2 ring-navy-900',
    nameClass: 'text-5xl font-black text-navy-900 text-center leading-none tracking-tighter text-blue-950',
    bioClass: 'text-sm text-blue-900/60 text-center mt-2',
    linkBtn: 'block w-full text-center py-3 px-6 font-bold text-amber-50 bg-blue-950 hover:bg-blue-900 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-[0.3em] text-blue-900/40 text-center mb-3',
    divider: 'border-t-2 border-blue-950/20 my-4',
    previewGradient: 'from-amber-50 to-yellow-50', bestFor: 'Type designers, lettering artists',
  },
  {
    id: 'designer_case_study', name: 'Case Study', tagline: 'Process-heavy, step-by-step',
    profession: 'DESIGNER', variantIndex: 4, palette: 'White + Warm Gray',
    page: 'min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-gray-300',
    nameClass: 'text-2xl font-semibold text-gray-800 text-center',
    bioClass: 'text-sm text-gray-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:border-gray-500 hover:bg-gray-50 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-3',
    divider: 'border-t border-gray-200 my-4',
    previewGradient: 'from-gray-50 to-white', bestFor: 'Product designers, UX researchers',
  },
  {
    id: 'designer_swiss_grid', name: 'Swiss Grid', tagline: 'Bauhaus, rigid columns',
    profession: 'DESIGNER', variantIndex: 5, palette: 'Red + Black + White',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-none mx-auto mb-4 object-cover',
    nameClass: 'text-3xl font-black text-gray-950 text-center uppercase tracking-tighter',
    bioClass: 'text-sm text-gray-600 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 font-black text-white bg-red-600 hover:bg-red-700 transition-all uppercase tracking-widest',
    sectionHeading: 'text-xs font-black uppercase tracking-[0.3em] text-red-600 text-center mb-3',
    divider: 'border-t-4 border-gray-950 my-4',
    previewGradient: 'from-white to-red-50', bestFor: 'Graphic designers, print designers',
  },
  {
    id: 'designer_liquid_motion', name: 'Liquid Motion', tagline: 'Blob shapes, organic',
    profession: 'DESIGNER', variantIndex: 6, palette: 'Violet + Mint + White',
    page: 'min-h-screen bg-gradient-to-br from-violet-100 via-mint-50 to-emerald-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-violet-300 shadow-lg',
    nameClass: 'text-2xl font-bold text-violet-900 text-center',
    bioClass: 'text-sm text-violet-600/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-violet-600 hover:bg-violet-700 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-violet-400 text-center mb-3',
    divider: 'border-t border-violet-200 my-4',
    previewGradient: 'from-violet-100 to-emerald-100', bestFor: 'Illustrators, digital artists',
  },
  {
    id: 'designer_gallery_wall', name: 'Gallery Wall', tagline: 'Art gallery, oversized tiles',
    profession: 'DESIGNER', variantIndex: 7, palette: 'Off-white + Taupe',
    page: 'min-h-screen bg-stone-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-stone-300',
    nameClass: 'text-2xl font-light text-stone-800 text-center tracking-widest uppercase',
    bioClass: 'text-sm text-stone-500 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-medium text-stone-800 bg-stone-200 hover:bg-stone-300 transition-all',
    sectionHeading: 'text-xs font-medium uppercase tracking-[0.25em] text-stone-400 text-center mb-3',
    divider: 'border-t border-stone-300 my-4',
    previewGradient: 'from-stone-100 to-stone-50', bestFor: 'Fine artists, gallery artists',
  },
  {
    id: 'designer_monochrome_studio', name: 'Monochrome Studio', tagline: 'All gray, silent luxury',
    profession: 'DESIGNER', variantIndex: 8, palette: 'Light Gray + Charcoal',
    page: 'min-h-screen bg-neutral-200 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-neutral-400',
    nameClass: 'text-2xl font-semibold text-neutral-800 text-center',
    bioClass: 'text-sm text-neutral-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-neutral-200 bg-neutral-700 hover:bg-neutral-600 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-neutral-500 text-center mb-3',
    divider: 'border-t border-neutral-300 my-4',
    previewGradient: 'from-neutral-200 to-neutral-100', bestFor: 'Luxury brand designers, art directors',
  },
  {
    id: 'designer_brand_kit', name: 'Brand Kit', tagline: 'Shows brand identity elements',
    profession: 'DESIGNER', variantIndex: 9, palette: 'White + Chosen Accent',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-xl mx-auto mb-4 object-cover ring-2 ring-indigo-200',
    nameClass: 'text-2xl font-bold text-indigo-900 text-center',
    bioClass: 'text-sm text-indigo-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-indigo-300 text-center mb-3',
    divider: 'border-t border-indigo-100 my-4',
    previewGradient: 'from-white to-indigo-50', bestFor: 'Brand strategists, identity designers',
  },
  {
    id: 'designer_playful_pop', name: 'Playful Pop', tagline: 'Sticker aesthetic, fun',
    profession: 'DESIGNER', variantIndex: 10, palette: 'Yellow + Pink + Blue',
    page: 'min-h-screen bg-yellow-300 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-pink-500 shadow-lg',
    nameClass: 'text-3xl font-black text-gray-900 text-center',
    bioClass: 'text-sm text-gray-700 text-center mt-1 font-medium',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-black text-yellow-300 bg-gray-900 hover:bg-pink-600 transition-all',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-pink-600 text-center mb-3',
    divider: 'border-t-2 border-pink-400 my-4',
    previewGradient: 'from-yellow-300 to-pink-200', bestFor: 'Illustrators, character designers',
  },

  // ── 3. BARBER / HAIR STYLIST / SALON PROFESSIONAL ────────────────────────

  {
    id: 'barber_sharp_fade', name: 'Sharp Fade', tagline: 'Bold, masculine, vintage',
    profession: 'BARBER', variantIndex: 1, palette: 'Black + Gold',
    page: 'min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-yellow-500',
    nameClass: 'text-3xl font-black text-white text-center uppercase tracking-wide',
    bioClass: 'text-sm text-yellow-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-bold text-gray-950 bg-yellow-500 hover:bg-yellow-400 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-yellow-500 text-center mb-3',
    divider: 'border-t border-yellow-900 my-4',
    previewGradient: 'from-gray-950 to-yellow-950', bestFor: "Barbers, men's grooming",
  },
  {
    id: 'barber_salon_rose', name: 'Salon Rose', tagline: 'Feminine, floral, Instagram',
    profession: 'BARBER', variantIndex: 2, palette: 'Dusty Rose + White',
    page: 'min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-rose-200 shadow-lg',
    nameClass: 'text-2xl font-bold text-rose-900 text-center',
    bioClass: 'text-sm text-rose-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-rose-400 text-center mb-3',
    divider: 'border-t border-rose-100 my-4',
    previewGradient: 'from-rose-50 to-pink-50', bestFor: 'Hair stylists, beauty salons',
  },
  {
    id: 'barber_chrome_edge', name: 'Chrome Edge', tagline: 'Metallic, ultra-modern',
    profession: 'BARBER', variantIndex: 3, palette: 'Dark Gray + Chrome',
    page: 'min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-gray-400 shadow-[0_0_16px_rgba(156,163,175,0.3)]',
    nameClass: 'text-2xl font-bold text-gray-100 text-center tracking-wide',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-gray-300 to-gray-100 hover:from-white hover:to-gray-200 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-gray-500 text-center mb-3',
    divider: 'border-t border-gray-700 my-4',
    previewGradient: 'from-gray-900 to-slate-800', bestFor: 'Modern barbershops, premium grooming',
  },
  {
    id: 'barber_vintage_parlour', name: 'Vintage Parlour', tagline: 'Classic barbershop, striped',
    profession: 'BARBER', variantIndex: 4, palette: 'Navy + Red + White',
    page: 'min-h-screen bg-blue-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-500',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-blue-200 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 font-bold text-blue-950 bg-red-500 hover:bg-red-400 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-red-400 text-center mb-3',
    divider: 'border-t border-blue-800 my-4',
    previewGradient: 'from-blue-950 to-red-950', bestFor: 'Traditional barbershops',
  },
  {
    id: 'barber_street_style', name: 'Street Style', tagline: 'Urban, bold, street photography',
    profession: 'BARBER', variantIndex: 5, palette: 'Black + Yellow',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-none mx-auto mb-4 object-cover ring-4 ring-yellow-400',
    nameClass: 'text-4xl font-black text-yellow-400 text-center uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-black bg-yellow-400 hover:bg-yellow-300 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-yellow-400 text-center mb-3',
    divider: 'border-t-2 border-yellow-400 my-4',
    previewGradient: 'from-black to-yellow-950', bestFor: 'Urban barbers, streetwear stylists',
  },
  {
    id: 'barber_luxe_salon', name: 'Luxe Salon', tagline: 'Upscale, magazine-editorial',
    profession: 'BARBER', variantIndex: 6, palette: 'White + Champagne + Black',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-amber-200 shadow-xl',
    nameClass: 'text-2xl font-light text-gray-900 text-center tracking-widest uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-white bg-gray-900 hover:bg-gray-700 transition-all',
    sectionHeading: 'text-xs font-light uppercase tracking-[0.3em] text-amber-400 text-center mb-3',
    divider: 'border-t border-amber-100 my-4',
    previewGradient: 'from-white to-amber-50', bestFor: 'Luxury salons, high-end stylists',
  },
  {
    id: 'barber_curly_collective', name: 'Curly Collective', tagline: 'Natural hair, warm tones',
    profession: 'BARBER', variantIndex: 7, palette: 'Terracotta + Brown',
    page: 'min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-orange-300 shadow-md',
    nameClass: 'text-2xl font-bold text-orange-900 text-center',
    bioClass: 'text-sm text-orange-600/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-orange-700 hover:bg-orange-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-orange-500 text-center mb-3',
    divider: 'border-t border-orange-200 my-4',
    previewGradient: 'from-orange-50 to-amber-50', bestFor: 'Natural hair stylists, locticians',
  },
  {
    id: 'barber_classic_cut', name: 'The Classic Cut', tagline: 'Simple, clean, professional',
    profession: 'BARBER', variantIndex: 8, palette: 'White + Navy',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-blue-200',
    nameClass: 'text-2xl font-semibold text-blue-900 text-center',
    bioClass: 'text-sm text-gray-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-lg font-semibold text-white bg-blue-800 hover:bg-blue-900 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-400 text-center mb-3',
    divider: 'border-t border-blue-100 my-4',
    previewGradient: 'from-white to-blue-50', bestFor: 'Family barbershops, all-around stylists',
  },
  {
    id: 'barber_glam_studio', name: 'Glam Studio', tagline: 'High-fashion beauty, sparkle',
    profession: 'BARBER', variantIndex: 9, palette: 'Hot Pink + Black',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]',
    nameClass: 'text-3xl font-black text-pink-400 text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-bold text-black bg-pink-400 hover:bg-pink-300 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-pink-500 text-center mb-3',
    divider: 'border-t border-pink-900 my-4',
    previewGradient: 'from-black to-pink-950', bestFor: 'Glam stylists, celebrity hair artists',
  },
  {
    id: 'barber_clean_lines', name: 'Clean Lines', tagline: 'Geometric, architect-inspired',
    profession: 'BARBER', variantIndex: 10, palette: 'White + Stone + Rust',
    page: 'min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-none mx-auto mb-4 object-cover ring-2 ring-stone-300',
    nameClass: 'text-2xl font-semibold text-stone-800 text-center tracking-wide',
    bioClass: 'text-sm text-stone-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-white bg-orange-700 hover:bg-orange-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-orange-600 text-center mb-3',
    divider: 'border-t-2 border-stone-300 my-4',
    previewGradient: 'from-stone-50 to-orange-50', bestFor: 'Modern salons, precision stylists',
  },

  // ── 4. DOCTOR / HEALTHCARE PROFESSIONAL ──────────────────────────────────

  {
    id: 'doctor_clinical_trust', name: 'Clinical Trust', tagline: 'Clean, white, authoritative',
    profession: 'DOCTOR', variantIndex: 1, palette: 'White + Navy Blue',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-blue-100 shadow-md',
    nameClass: 'text-2xl font-semibold text-blue-900 text-center',
    bioClass: 'text-sm text-gray-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-400 text-center mb-3',
    divider: 'border-t border-blue-100 my-4',
    previewGradient: 'from-white to-blue-50', bestFor: 'General practitioners, specialists',
  },
  {
    id: 'doctor_warm_care', name: 'Warm Care', tagline: 'Friendly, approachable',
    profession: 'DOCTOR', variantIndex: 2, palette: 'Light Blue + Warm Gray',
    page: 'min-h-screen bg-gradient-to-b from-sky-50 to-blue-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-sky-200 shadow-lg',
    nameClass: 'text-2xl font-bold text-sky-900 text-center',
    bioClass: 'text-sm text-sky-600/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-sky-400 text-center mb-3',
    divider: 'border-t border-sky-100 my-4',
    previewGradient: 'from-sky-50 to-blue-50', bestFor: 'Family doctors, pediatricians',
  },
  {
    id: 'doctor_expert_profile', name: 'Expert Profile', tagline: 'Executive, formal',
    profession: 'DOCTOR', variantIndex: 3, palette: 'Charcoal + White',
    page: 'min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-2 ring-gray-600',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-gray-900 bg-white hover:bg-gray-100 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-gray-500 text-center mb-3',
    divider: 'border-t border-gray-700 my-4',
    previewGradient: 'from-gray-900 to-gray-800', bestFor: 'Surgeons, consultants, professors',
  },
  {
    id: 'doctor_pediatric_bright', name: 'Pediatric Bright', tagline: 'Colorful, child-friendly',
    profession: 'DOCTOR', variantIndex: 4, palette: 'Orange + Teal + Yellow',
    page: 'min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-teal-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-orange-300 shadow-lg',
    nameClass: 'text-2xl font-bold text-orange-800 text-center',
    bioClass: 'text-sm text-teal-700/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-bold text-white bg-teal-500 hover:bg-teal-600 shadow-sm transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-orange-500 text-center mb-3',
    divider: 'border-t border-orange-200 my-4',
    previewGradient: 'from-orange-100 to-teal-100', bestFor: 'Pediatricians, child therapists',
  },
  {
    id: 'doctor_holistic_wellness', name: 'Holistic Wellness', tagline: 'Earthy, soft, spa blend',
    profession: 'DOCTOR', variantIndex: 5, palette: 'Sage Green + Cream',
    page: 'min-h-screen bg-gradient-to-b from-green-50 to-stone-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-200 shadow-md',
    nameClass: 'text-2xl font-semibold text-green-900 text-center',
    bioClass: 'text-sm text-green-600/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-green-700 hover:bg-green-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-500 text-center mb-3',
    divider: 'border-t border-green-100 my-4',
    previewGradient: 'from-green-50 to-stone-50', bestFor: 'Naturopaths, integrative medicine',
  },
  {
    id: 'doctor_specialist_pro', name: 'Specialist Pro', tagline: 'Technical, badge-heavy',
    profession: 'DOCTOR', variantIndex: 6, palette: 'Deep Blue + White',
    page: 'min-h-screen bg-blue-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-2 ring-blue-400',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-blue-200 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-blue-950 bg-blue-200 hover:bg-white transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-400 text-center mb-3',
    divider: 'border-t border-blue-800 my-4',
    previewGradient: 'from-blue-950 to-blue-900', bestFor: 'Cardiologists, neurologists, specialists',
  },
  {
    id: 'doctor_dental_bright', name: 'Dental Bright', tagline: 'White, clean, smile-focused',
    profession: 'DOCTOR', variantIndex: 7, palette: 'Sky Blue + White',
    page: 'min-h-screen bg-gradient-to-b from-white to-sky-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-sky-300 shadow-lg',
    nameClass: 'text-2xl font-semibold text-sky-800 text-center',
    bioClass: 'text-sm text-sky-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-sky-400 text-center mb-3',
    divider: 'border-t border-sky-100 my-4',
    previewGradient: 'from-white to-sky-50', bestFor: 'Dentists, orthodontists',
  },
  {
    id: 'doctor_mental_health', name: 'Mental Health Care', tagline: 'Soft, calming, empathetic',
    profession: 'DOCTOR', variantIndex: 8, palette: 'Muted Violet + Cream',
    page: 'min-h-screen bg-gradient-to-b from-violet-50 to-stone-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-violet-200 shadow-md',
    nameClass: 'text-2xl font-semibold text-violet-900 text-center',
    bioClass: 'text-sm text-violet-500/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-violet-400 text-center mb-3',
    divider: 'border-t border-violet-100 my-4',
    previewGradient: 'from-violet-50 to-stone-50', bestFor: 'Therapists, psychologists, counselors',
  },
  {
    id: 'doctor_telemedicine', name: 'Telemedicine', tagline: 'Digital-native, app-like',
    profession: 'DOCTOR', variantIndex: 9, palette: 'Gradient Blue',
    page: 'min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white/50 shadow-xl',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-blue-100 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-blue-700 bg-white hover:bg-blue-50 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-200 text-center mb-3',
    divider: 'border-t border-blue-500 my-4',
    previewGradient: 'from-blue-600 to-indigo-700', bestFor: 'Telehealth doctors, online consultants',
  },
  {
    id: 'doctor_community', name: 'Community Doctor', tagline: 'Warm, local, community-focused',
    profession: 'DOCTOR', variantIndex: 10, palette: 'Warm Red + Cream',
    page: 'min-h-screen bg-red-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-200 shadow-md',
    nameClass: 'text-2xl font-bold text-red-900 text-center',
    bioClass: 'text-sm text-red-600/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-red-400 text-center mb-3',
    divider: 'border-t border-red-100 my-4',
    previewGradient: 'from-red-50 to-orange-50', bestFor: 'Community health workers, GPs',
  },

  // ── 5. HOME BUSINESS OWNER ────────────────────────────────────────────────

  {
    id: 'home_cottage_core', name: 'Cottage Core', tagline: 'Soft, handmade, cozy',
    profession: 'HOME_BUSINESS', variantIndex: 1, palette: 'Peach + Sage + Brown',
    page: 'min-h-screen bg-gradient-to-b from-orange-50 via-green-50 to-amber-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-orange-200 shadow-md',
    nameClass: 'text-2xl font-bold text-orange-900 text-center',
    bioClass: 'text-sm text-green-700/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-600 text-center mb-3',
    divider: 'border-t border-orange-100 my-4',
    previewGradient: 'from-orange-50 to-green-50', bestFor: 'Home bakers, crafters, artisans',
  },
  {
    id: 'home_bold_market', name: 'Bold Market', tagline: 'Farmers market, bold type',
    profession: 'HOME_BUSINESS', variantIndex: 2, palette: 'Yellow + Green + Black',
    page: 'min-h-screen bg-yellow-400 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-black shadow-lg',
    nameClass: 'text-3xl font-black text-black text-center uppercase',
    bioClass: 'text-sm text-black/70 text-center mt-1 font-bold',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-yellow-400 bg-black hover:bg-green-800 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-black text-center mb-3',
    divider: 'border-t-4 border-black my-4',
    previewGradient: 'from-yellow-400 to-green-300', bestFor: 'Market vendors, produce sellers',
  },
  {
    id: 'home_handcrafted', name: 'Handcrafted', tagline: 'Texture-forward, artisan',
    profession: 'HOME_BUSINESS', variantIndex: 3, palette: 'Kraft Brown + Cream',
    page: 'min-h-screen bg-amber-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-amber-700 shadow-md',
    nameClass: 'text-2xl font-bold text-amber-900 text-center',
    bioClass: 'text-sm text-amber-700/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-amber-100 bg-amber-800 hover:bg-amber-900 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-amber-700 text-center mb-3',
    divider: 'border-t-2 border-amber-300 my-4',
    previewGradient: 'from-amber-100 to-yellow-50', bestFor: 'Potters, woodworkers, handmade goods',
  },
  {
    id: 'home_sweet_minimal', name: 'Sweet Minimal', tagline: 'Clean bakery, elegant',
    profession: 'HOME_BUSINESS', variantIndex: 4, palette: 'White + Pink + Gold',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-pink-200 shadow-lg',
    nameClass: 'text-2xl font-light text-gray-900 text-center tracking-widest',
    bioClass: 'text-sm text-pink-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-white bg-pink-500 hover:bg-pink-600 shadow-sm transition-all',
    sectionHeading: 'text-xs font-light uppercase tracking-[0.3em] text-amber-400 text-center mb-3',
    divider: 'border-t border-pink-100 my-4',
    previewGradient: 'from-white to-pink-50', bestFor: 'Home bakers, cake artists, confectioners',
  },
  {
    id: 'home_study_corner', name: 'Study Corner', tagline: 'Tutor aesthetic, academic',
    profession: 'HOME_BUSINESS', variantIndex: 5, palette: 'Navy + Yellow',
    page: 'min-h-screen bg-blue-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-yellow-400',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-blue-200 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-bold text-blue-950 bg-yellow-400 hover:bg-yellow-300 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-yellow-400 text-center mb-3',
    divider: 'border-t border-blue-800 my-4',
    previewGradient: 'from-blue-950 to-blue-900', bestFor: 'Home tutors, online teachers',
  },
  {
    id: 'home_made_with_love', name: 'Made With Love', tagline: 'Heartfelt, small business pride',
    profession: 'HOME_BUSINESS', variantIndex: 6, palette: 'Warm Red + Cream',
    page: 'min-h-screen bg-red-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-200 shadow-md',
    nameClass: 'text-2xl font-bold text-red-900 text-center',
    bioClass: 'text-sm text-red-500/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-red-500 hover:bg-red-600 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-red-400 text-center mb-3',
    divider: 'border-t border-red-100 my-4',
    previewGradient: 'from-red-50 to-orange-50', bestFor: 'Home-based food, gift, craft businesses',
  },
  {
    id: 'home_studio', name: 'Home Studio', tagline: 'Clean workspace, organized',
    profession: 'HOME_BUSINESS', variantIndex: 7, palette: 'Gray + White + Pop Color',
    page: 'min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-xl mx-auto mb-4 object-cover ring-2 ring-gray-300',
    nameClass: 'text-2xl font-semibold text-gray-800 text-center',
    bioClass: 'text-sm text-gray-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-indigo-400 text-center mb-3',
    divider: 'border-t border-gray-200 my-4',
    previewGradient: 'from-gray-100 to-white', bestFor: 'Home studios, freelancers, makers',
  },
  {
    id: 'home_market_fresh', name: 'Market Fresh', tagline: 'Organic, natural, wellness',
    profession: 'HOME_BUSINESS', variantIndex: 8, palette: 'Green + Cream + Brown',
    page: 'min-h-screen bg-gradient-to-b from-green-50 to-stone-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-300 shadow-md',
    nameClass: 'text-2xl font-semibold text-green-900 text-center',
    bioClass: 'text-sm text-green-600/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-green-700 hover:bg-green-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-500 text-center mb-3',
    divider: 'border-t border-green-100 my-4',
    previewGradient: 'from-green-50 to-stone-50', bestFor: 'Organic food, herbal products, wellness',
  },
  {
    id: 'home_bright_kitchen', name: 'Bright Kitchen', tagline: 'Bold food photography, lively',
    profession: 'HOME_BUSINESS', variantIndex: 9, palette: 'Orange + White',
    page: 'min-h-screen bg-orange-500 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white shadow-xl',
    nameClass: 'text-3xl font-black text-white text-center',
    bioClass: 'text-sm text-orange-100 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-bold text-orange-600 bg-white hover:bg-orange-50 shadow-sm transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-orange-200 text-center mb-3',
    divider: 'border-t border-orange-400 my-4',
    previewGradient: 'from-orange-500 to-orange-400', bestFor: 'Home cooks, meal prep, catering',
  },
  {
    id: 'home_story_led', name: 'Story-Led', tagline: 'Long-form narrative, editorial',
    profession: 'HOME_BUSINESS', variantIndex: 10, palette: 'Cream + Charcoal',
    page: 'min-h-screen bg-stone-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-stone-300',
    nameClass: 'text-2xl font-semibold text-stone-800 text-center',
    bioClass: 'text-sm text-stone-500 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-stone-100 bg-stone-800 hover:bg-stone-700 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-stone-400 text-center mb-3',
    divider: 'border-t border-stone-300 my-4',
    previewGradient: 'from-stone-100 to-stone-50', bestFor: 'Storytellers, personal brands',
  },

  // ── 6. CONTRACTOR / PLUMBER / ELECTRICIAN / TRADE WORKER ─────────────────

  {
    id: 'contractor_hard_hat', name: 'Hard Hat Pro', tagline: 'Bold, strong, worksite colors',
    profession: 'CONTRACTOR', variantIndex: 1, palette: 'Yellow + Black',
    page: 'min-h-screen bg-yellow-400 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-none mx-auto mb-4 object-cover ring-4 ring-black',
    nameClass: 'text-3xl font-black text-black text-center uppercase',
    bioClass: 'text-sm text-black/70 text-center mt-1 font-bold',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-yellow-400 bg-black hover:bg-gray-900 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-black text-center mb-3',
    divider: 'border-t-4 border-black my-4',
    previewGradient: 'from-yellow-400 to-yellow-300', bestFor: 'General contractors, construction',
  },
  {
    id: 'contractor_clean_trade', name: 'Clean Trade', tagline: 'Professional, modern, trustworthy',
    profession: 'CONTRACTOR', variantIndex: 2, palette: 'Navy + White + Orange',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-xl mx-auto mb-4 object-cover ring-2 ring-blue-200',
    nameClass: 'text-2xl font-bold text-blue-900 text-center',
    bioClass: 'text-sm text-gray-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-400 text-center mb-3',
    divider: 'border-t border-gray-100 my-4',
    previewGradient: 'from-white to-blue-50', bestFor: 'Plumbers, electricians, HVAC',
  },
  {
    id: 'contractor_blueprint', name: 'Blueprint', tagline: 'Blueprint-style, technical',
    profession: 'CONTRACTOR', variantIndex: 3, palette: 'Blueprint Blue + White',
    page: 'min-h-screen bg-blue-800 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-none mx-auto mb-4 object-cover ring-2 ring-blue-300',
    nameClass: 'text-2xl font-bold text-blue-100 text-center tracking-wide',
    bioClass: 'text-sm text-blue-300 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-blue-900 bg-blue-100 hover:bg-white transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-300 text-center mb-3',
    divider: 'border-t border-blue-600 my-4',
    previewGradient: 'from-blue-800 to-blue-700', bestFor: 'Architects, engineers, builders',
  },
  {
    id: 'contractor_community_first', name: 'Community First', tagline: 'Local business, hometown pride',
    profession: 'CONTRACTOR', variantIndex: 4, palette: 'Green + Cream',
    page: 'min-h-screen bg-green-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-300 shadow-md',
    nameClass: 'text-2xl font-bold text-green-900 text-center',
    bioClass: 'text-sm text-green-600/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-green-700 hover:bg-green-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-500 text-center mb-3',
    divider: 'border-t border-green-100 my-4',
    previewGradient: 'from-green-50 to-stone-50', bestFor: 'Local handymen, community contractors',
  },
  {
    id: 'contractor_steel_glass', name: 'Steel & Glass', tagline: 'Ultra modern, architectural',
    profession: 'CONTRACTOR', variantIndex: 5, palette: 'Dark Gray + Chrome',
    page: 'min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-2 ring-gray-400',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-gray-900 bg-gray-200 hover:bg-white transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-gray-500 text-center mb-3',
    divider: 'border-t border-gray-700 my-4',
    previewGradient: 'from-gray-900 to-slate-800', bestFor: 'Modern construction, premium contractors',
  },
  {
    id: 'contractor_family_business', name: 'Family Business', tagline: 'Warm, generational, trust',
    profession: 'CONTRACTOR', variantIndex: 6, palette: 'Warm Brown + Cream',
    page: 'min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-amber-300 shadow-md',
    nameClass: 'text-2xl font-bold text-amber-900 text-center',
    bioClass: 'text-sm text-amber-700/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-amber-700 hover:bg-amber-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-amber-600 text-center mb-3',
    divider: 'border-t border-amber-200 my-4',
    previewGradient: 'from-amber-50 to-yellow-50', bestFor: 'Family-owned trade businesses',
  },
  {
    id: 'contractor_emergency_ready', name: 'Emergency Ready', tagline: 'High contrast, 24/7 vibe',
    profession: 'CONTRACTOR', variantIndex: 7, palette: 'Red + Black + White',
    page: 'min-h-screen bg-red-600 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white shadow-xl',
    nameClass: 'text-3xl font-black text-white text-center uppercase',
    bioClass: 'text-sm text-red-100 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-red-600 bg-white hover:bg-red-50 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-red-200 text-center mb-3',
    divider: 'border-t border-red-500 my-4',
    previewGradient: 'from-red-600 to-red-500', bestFor: 'Emergency plumbers, 24/7 electricians',
  },
  {
    id: 'contractor_licensed', name: 'License & Insured', tagline: 'Compliance-focused, proof-forward',
    profession: 'CONTRACTOR', variantIndex: 8, palette: 'Blue + White',
    page: 'min-h-screen bg-blue-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-xl mx-auto mb-4 object-cover ring-2 ring-blue-300',
    nameClass: 'text-2xl font-semibold text-blue-900 text-center',
    bioClass: 'text-sm text-blue-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-400 text-center mb-3',
    divider: 'border-t border-blue-100 my-4',
    previewGradient: 'from-blue-50 to-white', bestFor: 'Licensed contractors, insured tradespeople',
  },
  {
    id: 'contractor_before_after', name: 'Before & After', tagline: 'Results-focused, gallery-heavy',
    profession: 'CONTRACTOR', variantIndex: 9, palette: 'Dark + Orange',
    page: 'min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-2 ring-orange-500',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-bold text-gray-950 bg-orange-500 hover:bg-orange-400 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-orange-500 text-center mb-3',
    divider: 'border-t border-gray-800 my-4',
    previewGradient: 'from-gray-950 to-orange-950', bestFor: 'Renovation contractors, remodelers',
  },
  {
    id: 'contractor_veteran', name: 'Veteran Owned', tagline: 'Military-inspired, honor',
    profession: 'CONTRACTOR', variantIndex: 10, palette: 'OD Green + Tan + Red',
    page: 'min-h-screen bg-stone-800 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-none mx-auto mb-4 object-cover ring-4 ring-red-600',
    nameClass: 'text-2xl font-black text-stone-100 text-center uppercase tracking-wide',
    bioClass: 'text-sm text-stone-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 font-bold text-stone-900 bg-red-600 hover:bg-red-500 transition-all uppercase',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-red-500 text-center mb-3',
    divider: 'border-t border-stone-600 my-4',
    previewGradient: 'from-stone-800 to-stone-700', bestFor: 'Veteran-owned trade businesses',
  },

  // ── 7. RESTAURANT OWNER / F&B BUSINESS ───────────────────────────────────

  {
    id: 'restaurant_bistro_noir', name: 'Bistro Noir', tagline: 'Dark, moody, French-inspired',
    profession: 'RESTAURANT', variantIndex: 1, palette: 'Black + Gold + Cream',
    page: 'min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-yellow-600 shadow-xl',
    nameClass: 'text-2xl font-bold text-amber-100 text-center tracking-wide',
    bioClass: 'text-sm text-gray-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-gray-950 bg-yellow-600 hover:bg-yellow-500 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-yellow-600 text-center mb-3',
    divider: 'border-t border-yellow-900 my-4',
    previewGradient: 'from-gray-950 to-yellow-950', bestFor: 'Fine dining, French bistros',
  },
  {
    id: 'restaurant_bright_bites', name: 'Bright Bites', tagline: 'Colorful, casual, fast-casual',
    profession: 'RESTAURANT', variantIndex: 2, palette: 'Yellow + Tomato Red',
    page: 'min-h-screen bg-yellow-400 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-500 shadow-lg',
    nameClass: 'text-3xl font-black text-red-700 text-center',
    bioClass: 'text-sm text-red-800/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-black text-yellow-400 bg-red-600 hover:bg-red-700 transition-all',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-red-700 text-center mb-3',
    divider: 'border-t-2 border-red-400 my-4',
    previewGradient: 'from-yellow-400 to-red-300', bestFor: 'Fast food, casual dining, food trucks',
  },
  {
    id: 'restaurant_fine_dine', name: 'Fine Dine', tagline: 'Luxe, minimal, high-end',
    profession: 'RESTAURANT', variantIndex: 3, palette: 'White + Champagne + Black',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-amber-200 shadow-xl',
    nameClass: 'text-2xl font-light text-gray-900 text-center tracking-widest uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-white bg-gray-900 hover:bg-gray-700 transition-all',
    sectionHeading: 'text-xs font-light uppercase tracking-[0.3em] text-amber-400 text-center mb-3',
    divider: 'border-t border-amber-100 my-4',
    previewGradient: 'from-white to-amber-50', bestFor: 'Fine dining, tasting menus, upscale',
  },
  {
    id: 'restaurant_farm_table', name: 'Farm to Table', tagline: 'Organic, rustic, farm aesthetic',
    profession: 'RESTAURANT', variantIndex: 4, palette: 'Sage + Brown + Cream',
    page: 'min-h-screen bg-gradient-to-b from-green-50 to-stone-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-300 shadow-md',
    nameClass: 'text-2xl font-bold text-green-900 text-center',
    bioClass: 'text-sm text-green-600/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-green-800 hover:bg-green-900 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-600 text-center mb-3',
    divider: 'border-t border-green-100 my-4',
    previewGradient: 'from-green-50 to-stone-50', bestFor: 'Farm-to-table, organic restaurants',
  },
  {
    id: 'restaurant_street_food', name: 'Street Food Stall', tagline: 'Bold, vibrant, international',
    profession: 'RESTAURANT', variantIndex: 5, palette: 'Orange + Deep Blue',
    page: 'min-h-screen bg-blue-900 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-orange-400 shadow-lg',
    nameClass: 'text-3xl font-black text-orange-400 text-center',
    bioClass: 'text-sm text-blue-200 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-black text-blue-900 bg-orange-400 hover:bg-orange-300 transition-all',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-orange-400 text-center mb-3',
    divider: 'border-t border-blue-700 my-4',
    previewGradient: 'from-blue-900 to-orange-900', bestFor: 'Street food, food stalls, pop-ups',
  },
  {
    id: 'restaurant_coastal_kitchen', name: 'Coastal Kitchen', tagline: 'Beach, seafood, light and airy',
    profession: 'RESTAURANT', variantIndex: 6, palette: 'Seafoam + Sandy Beige',
    page: 'min-h-screen bg-gradient-to-b from-teal-50 to-amber-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-teal-200 shadow-lg',
    nameClass: 'text-2xl font-semibold text-teal-900 text-center',
    bioClass: 'text-sm text-teal-600/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-teal-500 text-center mb-3',
    divider: 'border-t border-teal-100 my-4',
    previewGradient: 'from-teal-50 to-amber-50', bestFor: 'Seafood restaurants, beach cafes',
  },
  {
    id: 'restaurant_family_recipe', name: 'Family Recipe', tagline: 'Generational, heartwarming, local',
    profession: 'RESTAURANT', variantIndex: 7, palette: 'Warm Red + Cream',
    page: 'min-h-screen bg-red-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-200 shadow-md',
    nameClass: 'text-2xl font-bold text-red-900 text-center',
    bioClass: 'text-sm text-red-500/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-red-400 text-center mb-3',
    divider: 'border-t border-red-100 my-4',
    previewGradient: 'from-red-50 to-orange-50', bestFor: 'Family restaurants, heritage cuisine',
  },
  {
    id: 'restaurant_modern_fusion', name: 'Modern Fusion', tagline: 'Bold contrast, global cuisine',
    profession: 'RESTAURANT', variantIndex: 8, palette: 'Black + Electric Red',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-2 ring-red-500',
    nameClass: 'text-3xl font-black text-white text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-bold text-black bg-red-500 hover:bg-red-400 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-red-500 text-center mb-3',
    divider: 'border-t border-red-900 my-4',
    previewGradient: 'from-black to-red-950', bestFor: 'Fusion restaurants, modern Asian, global',
  },
  {
    id: 'restaurant_dessert_house', name: 'Dessert House', tagline: 'Sweet, pastel, Instagram-friendly',
    profession: 'RESTAURANT', variantIndex: 9, palette: 'Pink + Cream + Gold',
    page: 'min-h-screen bg-gradient-to-b from-pink-50 to-amber-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-pink-200 shadow-lg',
    nameClass: 'text-2xl font-bold text-pink-900 text-center',
    bioClass: 'text-sm text-pink-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-pink-500 hover:bg-pink-600 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-amber-400 text-center mb-3',
    divider: 'border-t border-pink-100 my-4',
    previewGradient: 'from-pink-50 to-amber-50', bestFor: 'Dessert shops, bakeries, patisseries',
  },
  {
    id: 'restaurant_popup_spot', name: 'Pop-Up Spot', tagline: 'Temporary venue, hype-led',
    profession: 'RESTAURANT', variantIndex: 10, palette: 'Neon + Black',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.4)]',
    nameClass: 'text-3xl font-black text-lime-400 text-center uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-black bg-lime-400 hover:bg-lime-300 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-lime-400 text-center mb-3',
    divider: 'border-t border-lime-900 my-4',
    previewGradient: 'from-black to-lime-950', bestFor: 'Pop-up restaurants, supper clubs',
  },

  // ── 8. CHEF / PERSONAL COOK / CATERER ────────────────────────────────────

  {
    id: 'chef_chefs_table', name: "Chef's Table", tagline: 'Sophisticated, white tablecloth',
    profession: 'CHEF', variantIndex: 1, palette: 'White + Charcoal + Gold',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-amber-200 shadow-xl',
    nameClass: 'text-2xl font-light text-gray-900 text-center tracking-widest uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-white bg-gray-900 hover:bg-gray-700 transition-all',
    sectionHeading: 'text-xs font-light uppercase tracking-[0.3em] text-amber-500 text-center mb-3',
    divider: 'border-t border-amber-100 my-4',
    previewGradient: 'from-white to-amber-50', bestFor: 'Fine dining chefs, private chefs',
  },
  {
    id: 'chef_street_chef', name: 'Street Chef', tagline: 'Raw, urban, food truck energy',
    profession: 'CHEF', variantIndex: 2, palette: 'Black + Neon Yellow',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-none mx-auto mb-4 object-cover ring-4 ring-yellow-400',
    nameClass: 'text-4xl font-black text-yellow-400 text-center uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-black bg-yellow-400 hover:bg-yellow-300 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-yellow-400 text-center mb-3',
    divider: 'border-t-2 border-yellow-400 my-4',
    previewGradient: 'from-black to-yellow-950', bestFor: 'Food truck chefs, street food cooks',
  },
  {
    id: 'chef_recipe_journal', name: 'Recipe Journal', tagline: 'Warm editorial, recipe blog',
    profession: 'CHEF', variantIndex: 3, palette: 'Cream + Brown + Terracotta',
    page: 'min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-amber-300 shadow-md',
    nameClass: 'text-2xl font-bold text-amber-900 text-center',
    bioClass: 'text-sm text-amber-700/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-orange-700 hover:bg-orange-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-orange-600 text-center mb-3',
    divider: 'border-t border-amber-200 my-4',
    previewGradient: 'from-amber-50 to-orange-50', bestFor: 'Food bloggers, recipe developers',
  },
  {
    id: 'chef_tasting_menu', name: 'Tasting Menu', tagline: 'Minimalist, seasonal, course-by-course',
    profession: 'CHEF', variantIndex: 4, palette: 'Off-white + Black',
    page: 'min-h-screen bg-stone-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-none mx-auto mb-4 object-cover ring-1 ring-stone-400',
    nameClass: 'text-3xl font-light text-stone-900 text-center tracking-widest uppercase',
    bioClass: 'text-sm text-stone-500 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-stone-100 bg-stone-800 hover:bg-stone-700 transition-all',
    sectionHeading: 'text-xs font-light uppercase tracking-[0.3em] text-stone-400 text-center mb-3',
    divider: 'border-t border-stone-300 my-4',
    previewGradient: 'from-stone-100 to-stone-50', bestFor: 'Michelin-star chefs, tasting menus',
  },
  {
    id: 'chef_home_kitchen', name: 'Home Kitchen', tagline: 'Personal, cozy, home cooking',
    profession: 'CHEF', variantIndex: 5, palette: 'Yellow + White',
    page: 'min-h-screen bg-yellow-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-yellow-300 shadow-md',
    nameClass: 'text-2xl font-bold text-yellow-900 text-center',
    bioClass: 'text-sm text-yellow-700/70 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-yellow-600 hover:bg-yellow-700 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-yellow-500 text-center mb-3',
    divider: 'border-t border-yellow-200 my-4',
    previewGradient: 'from-yellow-50 to-white', bestFor: 'Home cooks, meal prep chefs',
  },
  {
    id: 'chef_vegan_pantry', name: 'Vegan Pantry', tagline: 'Plant-based, fresh, earthy',
    profession: 'CHEF', variantIndex: 6, palette: 'Green + Cream + Sage',
    page: 'min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-300 shadow-md',
    nameClass: 'text-2xl font-semibold text-green-900 text-center',
    bioClass: 'text-sm text-green-600/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-green-700 hover:bg-green-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-500 text-center mb-3',
    divider: 'border-t border-green-100 my-4',
    previewGradient: 'from-green-50 to-emerald-50', bestFor: 'Vegan chefs, plant-based cooks',
  },
  {
    id: 'chef_private_chef', name: 'Private Chef', tagline: 'Luxury, bespoke, concierge',
    profession: 'CHEF', variantIndex: 7, palette: 'Midnight Blue + Gold',
    page: 'min-h-screen bg-blue-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-yellow-600 shadow-xl',
    nameClass: 'text-2xl font-bold text-amber-100 text-center tracking-wide',
    bioClass: 'text-sm text-blue-300 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-blue-950 bg-yellow-600 hover:bg-yellow-500 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-yellow-600 text-center mb-3',
    divider: 'border-t border-blue-800 my-4',
    previewGradient: 'from-blue-950 to-yellow-950', bestFor: 'Private chefs, luxury catering',
  },
  {
    id: 'chef_catering_pros', name: 'Catering Pros', tagline: 'Corporate-adjacent, clean',
    profession: 'CHEF', variantIndex: 8, palette: 'Navy + White',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-xl mx-auto mb-4 object-cover ring-2 ring-blue-200',
    nameClass: 'text-2xl font-semibold text-blue-900 text-center',
    bioClass: 'text-sm text-gray-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-blue-800 hover:bg-blue-900 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-400 text-center mb-3',
    divider: 'border-t border-blue-100 my-4',
    previewGradient: 'from-white to-blue-50', bestFor: 'Corporate caterers, event catering',
  },
  {
    id: 'chef_international', name: 'International Kitchen', tagline: 'Global flags, fusion cuisine',
    profession: 'CHEF', variantIndex: 9, palette: 'Multi-color on cream',
    page: 'min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-orange-300 shadow-md',
    nameClass: 'text-2xl font-bold text-stone-800 text-center',
    bioClass: 'text-sm text-stone-500 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-orange-500 text-center mb-3',
    divider: 'border-t border-stone-200 my-4',
    previewGradient: 'from-stone-50 to-orange-50', bestFor: 'International cuisine, fusion chefs',
  },
  {
    id: 'chef_pop_chef', name: 'Pop Chef', tagline: 'Social-media native, Gen Z energy',
    profession: 'CHEF', variantIndex: 10, palette: 'Pink + Black + Yellow',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]',
    nameClass: 'text-3xl font-black text-pink-400 text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-black text-black bg-yellow-400 hover:bg-yellow-300 transition-all',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-pink-500 text-center mb-3',
    divider: 'border-t border-pink-900 my-4',
    previewGradient: 'from-black to-pink-950', bestFor: 'Social media chefs, food influencers',
  },

  // ── 9. FITNESS TRAINER / YOGA INSTRUCTOR / WELLNESS COACH ────────────────

  {
    id: 'fitness_iron_grit', name: 'Iron & Grit', tagline: 'Dark, high-intensity, gym energy',
    profession: 'FITNESS', variantIndex: 1, palette: 'Black + Electric Blue',
    page: 'min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-4 ring-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.4)]',
    nameClass: 'text-3xl font-black text-white text-center uppercase tracking-wide',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-500 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-blue-500 text-center mb-3',
    divider: 'border-t border-blue-900 my-4',
    previewGradient: 'from-gray-950 to-blue-950', bestFor: 'Personal trainers, powerlifters, gym coaches',
  },
  {
    id: 'fitness_mindful_flow', name: 'Mindful Flow', tagline: 'Yoga, calming, nature-connected',
    profession: 'FITNESS', variantIndex: 2, palette: 'Sage + White + Blush',
    page: 'min-h-screen bg-gradient-to-b from-green-50 via-white to-pink-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-200 shadow-md',
    nameClass: 'text-2xl font-semibold text-green-900 text-center',
    bioClass: 'text-sm text-green-600/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-green-600 hover:bg-green-700 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-400 text-center mb-3',
    divider: 'border-t border-green-100 my-4',
    previewGradient: 'from-green-50 to-pink-50', bestFor: 'Yoga instructors, meditation coaches',
  },
  {
    id: 'fitness_transformation', name: 'Transformation', tagline: 'Before/after focus, motivational',
    profession: 'FITNESS', variantIndex: 3, palette: 'Orange + Dark Gray',
    page: 'min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-4 ring-orange-500',
    nameClass: 'text-3xl font-black text-white text-center uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-gray-900 bg-orange-500 hover:bg-orange-400 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-orange-500 text-center mb-3',
    divider: 'border-t border-orange-900 my-4',
    previewGradient: 'from-gray-900 to-orange-950', bestFor: 'Body transformation coaches, weight loss',
  },
  {
    id: 'fitness_wellness_studio', name: 'Wellness Studio', tagline: 'Studio photography, clean, premium',
    profession: 'FITNESS', variantIndex: 4, palette: 'White + Warm Gray',
    page: 'min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-gray-200 shadow-lg',
    nameClass: 'text-2xl font-light text-gray-900 text-center tracking-widest',
    bioClass: 'text-sm text-gray-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-white bg-gray-800 hover:bg-gray-700 transition-all',
    sectionHeading: 'text-xs font-light uppercase tracking-[0.3em] text-gray-400 text-center mb-3',
    divider: 'border-t border-gray-200 my-4',
    previewGradient: 'from-gray-50 to-white', bestFor: 'Pilates studios, premium fitness coaches',
  },
  {
    id: 'fitness_run_club', name: 'Run Club', tagline: 'Outdoor, community, athlete-forward',
    profession: 'FITNESS', variantIndex: 5, palette: 'Green + Yellow',
    page: 'min-h-screen bg-gradient-to-br from-green-500 to-yellow-400 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white shadow-xl',
    nameClass: 'text-3xl font-black text-white text-center drop-shadow',
    bioClass: 'text-sm text-white/90 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-black text-green-700 bg-white hover:bg-green-50 shadow-sm transition-all',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-white/70 text-center mb-3',
    divider: 'border-t border-white/30 my-4',
    previewGradient: 'from-green-500 to-yellow-400', bestFor: 'Running coaches, outdoor fitness',
  },
  {
    id: 'fitness_soft_strength', name: 'Soft Strength', tagline: 'Pilates, barre, feminine power',
    profession: 'FITNESS', variantIndex: 6, palette: 'Blush + White',
    page: 'min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-pink-200 shadow-md',
    nameClass: 'text-2xl font-semibold text-pink-900 text-center',
    bioClass: 'text-sm text-pink-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-white bg-pink-500 hover:bg-pink-600 shadow-sm transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-pink-400 text-center mb-3',
    divider: 'border-t border-pink-100 my-4',
    previewGradient: 'from-pink-50 to-white', bestFor: "Pilates, barre, women's fitness",
  },
  {
    id: 'fitness_digital_coach', name: 'Digital Coach', tagline: 'App-like, online coaching',
    profession: 'FITNESS', variantIndex: 7, palette: 'Dark + Cyan',
    page: 'min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-2 ring-cyan-400',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-bold text-gray-950 bg-cyan-400 hover:bg-cyan-300 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-cyan-400 text-center mb-3',
    divider: 'border-t border-cyan-900 my-4',
    previewGradient: 'from-gray-950 to-cyan-950', bestFor: 'Online fitness coaches, digital trainers',
  },
  {
    id: 'fitness_holistic_health', name: 'Holistic Health', tagline: 'Integrative wellness, calm authority',
    profession: 'FITNESS', variantIndex: 8, palette: 'Sage + Cream + Brown',
    page: 'min-h-screen bg-gradient-to-b from-green-50 to-stone-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-200 shadow-md',
    nameClass: 'text-2xl font-semibold text-green-900 text-center',
    bioClass: 'text-sm text-green-600/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-green-800 hover:bg-green-900 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-500 text-center mb-3',
    divider: 'border-t border-green-100 my-4',
    previewGradient: 'from-green-50 to-stone-50', bestFor: 'Holistic health coaches, nutritionists',
  },
  {
    id: 'fitness_athletes_first', name: 'Athletes First', tagline: 'Sports coaching, performance',
    profession: 'FITNESS', variantIndex: 9, palette: 'Navy + Gold',
    page: 'min-h-screen bg-blue-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-4 ring-yellow-500',
    nameClass: 'text-3xl font-black text-white text-center uppercase',
    bioClass: 'text-sm text-blue-200 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-blue-950 bg-yellow-500 hover:bg-yellow-400 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-yellow-500 text-center mb-3',
    divider: 'border-t border-blue-800 my-4',
    previewGradient: 'from-blue-950 to-yellow-950', bestFor: 'Sports coaches, athletic trainers',
  },
  {
    id: 'fitness_new_you', name: 'New You', tagline: 'Life coaching, motivational',
    profession: 'FITNESS', variantIndex: 10, palette: 'White + Gradient Coral',
    page: 'min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white shadow-xl',
    nameClass: 'text-2xl font-bold text-white text-center drop-shadow',
    bioClass: 'text-sm text-white/90 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-2xl font-semibold text-orange-600 bg-white hover:bg-orange-50 shadow-md transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-white/70 text-center mb-3',
    divider: 'border-t border-white/30 my-4',
    previewGradient: 'from-orange-400 to-pink-500', bestFor: 'Life coaches, wellness motivators',
  },

  // ── 10. MUSICIAN / DJ / PERFORMER / ARTIST ────────────────────────────────

  {
    id: 'musician_stage_presence', name: 'Stage Presence', tagline: 'Dark, dramatic, concert poster',
    profession: 'MUSICIAN', variantIndex: 1, palette: 'Black + Crimson + Gold',
    page: 'min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-700 shadow-[0_0_20px_rgba(185,28,28,0.4)]',
    nameClass: 'text-3xl font-black text-white text-center uppercase tracking-wide',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-bold text-white bg-red-700 hover:bg-red-600 transition-all uppercase',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-red-600 text-center mb-3',
    divider: 'border-t border-red-900 my-4',
    previewGradient: 'from-gray-950 to-red-950', bestFor: 'Rock bands, metal artists, performers',
  },
  {
    id: 'musician_lofi_aesthetic', name: 'Lo-Fi Aesthetic', tagline: 'Warm grain, cassette nostalgia',
    profession: 'MUSICIAN', variantIndex: 2, palette: 'Tan + Brown + Blue',
    page: 'min-h-screen bg-amber-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-amber-400 shadow-md',
    nameClass: 'text-2xl font-bold text-amber-900 text-center',
    bioClass: 'text-sm text-amber-700/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-amber-100 bg-blue-800 hover:bg-blue-900 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-blue-700 text-center mb-3',
    divider: 'border-t border-amber-300 my-4',
    previewGradient: 'from-amber-100 to-blue-100', bestFor: 'Lo-fi artists, bedroom producers',
  },
  {
    id: 'musician_electronic_pulse', name: 'Electronic Pulse', tagline: 'Dark neon, club music, DJ',
    profession: 'MUSICIAN', variantIndex: 3, palette: 'Black + Neon Green',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-400 shadow-[0_0_24px_rgba(74,222,128,0.5)]',
    nameClass: 'text-3xl font-black text-green-400 text-center uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-bold text-black bg-green-400 hover:bg-green-300 transition-all uppercase',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-green-400 text-center mb-3',
    divider: 'border-t border-green-900 my-4',
    previewGradient: 'from-black to-green-950', bestFor: 'DJs, electronic music producers',
  },
  {
    id: 'musician_indie_folk', name: 'Indie Folk', tagline: 'Warm, acoustic, handcrafted',
    profession: 'MUSICIAN', variantIndex: 4, palette: 'Cream + Rust + Forest',
    page: 'min-h-screen bg-gradient-to-b from-amber-50 to-green-50 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-amber-300 shadow-md',
    nameClass: 'text-2xl font-bold text-amber-900 text-center',
    bioClass: 'text-sm text-green-700/70 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-white bg-orange-700 hover:bg-orange-800 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-green-600 text-center mb-3',
    divider: 'border-t border-amber-200 my-4',
    previewGradient: 'from-amber-50 to-green-50', bestFor: 'Folk musicians, singer-songwriters',
  },
  {
    id: 'musician_classical_portrait', name: 'Classical Portrait', tagline: 'Formal, concert hall, serious',
    profession: 'MUSICIAN', variantIndex: 5, palette: 'White + Navy + Gold',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-yellow-600 shadow-xl',
    nameClass: 'text-2xl font-light text-blue-950 text-center tracking-widest uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-white bg-blue-950 hover:bg-blue-900 transition-all',
    sectionHeading: 'text-xs font-light uppercase tracking-[0.3em] text-yellow-600 text-center mb-3',
    divider: 'border-t border-yellow-200 my-4',
    previewGradient: 'from-white to-blue-50', bestFor: 'Classical musicians, orchestral performers',
  },
  {
    id: 'musician_hype_machine', name: 'Hype Machine', tagline: 'Maximum hype, streetwear artist',
    profession: 'MUSICIAN', variantIndex: 6, palette: 'Black + Yellow',
    page: 'min-h-screen bg-black flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-none mx-auto mb-4 object-cover ring-4 ring-yellow-400',
    nameClass: 'text-4xl font-black text-yellow-400 text-center uppercase tracking-tighter',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 font-black text-black bg-yellow-400 hover:bg-yellow-300 transition-all uppercase',
    sectionHeading: 'text-xs font-black uppercase tracking-widest text-yellow-400 text-center mb-3',
    divider: 'border-t-2 border-yellow-400 my-4',
    previewGradient: 'from-black to-yellow-950', bestFor: 'Hip-hop artists, rap, trap music',
  },
  {
    id: 'musician_singer_songwriter', name: 'Singer-Songwriter', tagline: 'Intimate, acoustic, personal',
    profession: 'MUSICIAN', variantIndex: 7, palette: 'Warm Cream + Brown',
    page: 'min-h-screen bg-stone-100 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-stone-300 shadow-md',
    nameClass: 'text-2xl font-semibold text-stone-800 text-center',
    bioClass: 'text-sm text-stone-500 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-stone-100 bg-stone-700 hover:bg-stone-600 transition-all',
    sectionHeading: 'text-xs font-semibold uppercase tracking-widest text-stone-400 text-center mb-3',
    divider: 'border-t border-stone-300 my-4',
    previewGradient: 'from-stone-100 to-stone-50', bestFor: 'Acoustic artists, indie pop, folk',
  },
  {
    id: 'musician_visual_artist', name: 'Visual Artist', tagline: 'Gallery-style, music meets art',
    profession: 'MUSICIAN', variantIndex: 8, palette: 'White + Black',
    page: 'min-h-screen bg-white flex items-center justify-center px-4 py-12',
    avatar: 'w-20 h-20 rounded-none mx-auto mb-4 object-cover ring-1 ring-gray-200',
    nameClass: 'text-3xl font-light text-gray-950 text-center tracking-widest uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1 italic',
    linkBtn: 'block w-full text-center py-3 px-6 font-semibold text-white bg-gray-950 hover:bg-gray-800 transition-all',
    sectionHeading: 'text-xs font-light uppercase tracking-[0.3em] text-gray-300 text-center mb-3',
    divider: 'border-t border-gray-100 my-4',
    previewGradient: 'from-white to-gray-50', bestFor: 'Art-music crossover, experimental artists',
  },
  {
    id: 'musician_band_hub', name: 'Band Hub', tagline: 'Group artist page, multiple members',
    profession: 'MUSICIAN', variantIndex: 9, palette: 'Dark + Primary Color',
    page: 'min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-xl mx-auto mb-4 object-cover ring-4 ring-indigo-500',
    nameClass: 'text-3xl font-black text-white text-center uppercase',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3.5 px-6 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-indigo-400 text-center mb-3',
    divider: 'border-t border-indigo-900 my-4',
    previewGradient: 'from-gray-900 to-indigo-950', bestFor: 'Bands, music groups, collectives',
  },
  {
    id: 'musician_streamer_ready', name: 'Streamer Ready', tagline: 'Digital-native, Spotify/YT-first',
    profession: 'MUSICIAN', variantIndex: 10, palette: 'Dark Gray + Green',
    page: 'min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12',
    avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-500 shadow-[0_0_16px_rgba(34,197,94,0.3)]',
    nameClass: 'text-2xl font-bold text-white text-center',
    bioClass: 'text-sm text-gray-400 text-center mt-1',
    linkBtn: 'block w-full text-center py-3 px-6 rounded-xl font-bold text-black bg-green-500 hover:bg-green-400 transition-all',
    sectionHeading: 'text-xs font-bold uppercase tracking-widest text-green-500 text-center mb-3',
    divider: 'border-t border-green-900 my-4',
    previewGradient: 'from-gray-900 to-green-950', bestFor: 'Spotify artists, streaming-first musicians',
  },
]

// ── Helper functions ──────────────────────────────────────────────────────────

export function getTemplate(id: string): BioTemplate {
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0]
}

export function getTemplatesForProfession(professionId: string): BioTemplate[] {
  return TEMPLATES.filter(t => t.profession === professionId)
    .sort((a, b) => a.variantIndex - b.variantIndex)
}

// ── Pre-filled default sections per profession ────────────────────────────────
// Used when a user picks a template for the first time (SRS §6.3)
export const PROFESSION_DEFAULTS: Record<ProfessionId, Partial<Section>[]> = {
  CREATOR: [
    { type: 'hero', headline: '✨ Hey, I\'m Alex Rivera', subheadline: 'Content Creator · Lifestyle · Travel', cta1_text: 'Watch My Videos', cta1_url: 'https://youtube.com', cta2_text: 'Follow Me', cta2_url: 'https://instagram.com' },
    { type: 'about', bio_text: 'I create content about travel, lifestyle, and personal growth. Join 500K+ followers on this journey around the world 🌍', stats: [{ value: '500K+', label: 'Followers' }, { value: '200+', label: 'Videos' }, { value: '50+', label: 'Countries' }] },
    { type: 'social_links', social_links: [{ platform: 'youtube', url: 'https://youtube.com' }, { platform: 'instagram', url: 'https://instagram.com' }, { platform: 'tiktok', url: 'https://tiktok.com' }, { platform: 'twitter', url: 'https://twitter.com' }] },
    { type: 'links', links: [{ label: '🎬 Latest YouTube Video', url: 'https://youtube.com' }, { label: '📸 Instagram Feed', url: 'https://instagram.com' }, { label: '🛍️ My Merch Store', url: 'https://shop.example.com' }] },
  ],
  DESIGNER: [
    { type: 'hero', headline: 'Jordan Kim', subheadline: 'Brand Designer & Visual Artist · Available for hire', cta1_text: 'View Portfolio', cta1_url: 'https://behance.net', cta2_text: 'Hire Me', cta2_url: 'mailto:hello@example.com' },
    { type: 'about', bio_text: 'I craft bold brand identities and digital experiences for startups and established brands. 8 years of turning ideas into visual stories.', stats: [{ value: '8 yrs', label: 'Experience' }, { value: '120+', label: 'Projects' }, { value: '40+', label: 'Clients' }] },
    { type: 'services', services: [{ icon: '🎨', name: 'Brand Identity', description: 'Logo, color palette, typography system' }, { icon: '📱', name: 'UI/UX Design', description: 'Web & mobile interface design' }, { icon: '🖼️', name: 'Print & Packaging', description: 'Brochures, packaging, signage' }] },
    { type: 'social_links', social_links: [{ platform: 'behance', url: 'https://behance.net' }, { platform: 'instagram', url: 'https://instagram.com' }, { platform: 'linkedin', url: 'https://linkedin.com' }] },
  ],
  BARBER: [
    { type: 'hero', headline: 'Marcus Cuts', subheadline: 'Master Barber · Clean Fades · Sharp Lines', cta1_text: '📅 Book Appointment', cta1_url: 'https://calendly.com', cta2_text: 'View Gallery', cta2_url: '#gallery' },
    { type: 'about', bio_text: 'Precision cuts and fresh fades since 2015. Walk-ins welcome, appointments preferred. Located in the heart of downtown.', stats: [{ value: '10 yrs', label: 'Experience' }, { value: '5000+', label: 'Clients' }, { value: '4.9★', label: 'Rating' }] },
    { type: 'services', services: [{ icon: '✂️', name: 'Classic Haircut', description: 'Scissor or clipper cut + style' }, { icon: '🪒', name: 'Fade & Lineup', description: 'Skin fade with sharp lineup' }, { icon: '🧔', name: 'Beard Trim', description: 'Shape, trim & hot towel finish' }, { icon: '👑', name: 'Full Grooming', description: 'Cut + beard + hot towel shave' }] },
    { type: 'gallery', images: [] },
    { type: 'contact', email: 'marcus@example.com', phone: '+1 (555) 234-5678', address: '123 Main St, Downtown', hours: 'Tue–Sat: 9am–7pm', booking_url: 'https://calendly.com' },
  ],
  DOCTOR: [
    { type: 'hero', headline: 'Dr. Sarah Chen, MD', subheadline: 'Board-Certified Cardiologist · 15 Years Experience', cta1_text: 'Book Appointment', cta1_url: 'https://calendly.com', cta2_text: 'Learn More', cta2_url: '#about' },
    { type: 'about', bio_text: 'Specializing in preventive cardiology and heart health. Committed to compassionate, evidence-based care for every patient.', stats: [{ value: '15 yrs', label: 'Experience' }, { value: '3000+', label: 'Patients' }, { value: 'Top 1%', label: 'Rated' }] },
    { type: 'services', services: [{ icon: '❤️', name: 'Cardiac Consultation', description: 'Comprehensive heart health evaluation' }, { icon: '🩺', name: 'Preventive Care', description: 'Risk assessment & lifestyle guidance' }, { icon: '📊', name: 'ECG & Diagnostics', description: 'Advanced cardiac testing' }] },
    { type: 'contact', email: 'dr.chen@clinic.com', phone: '+1 (555) 345-6789', address: 'City Medical Center, Suite 400', hours: 'Mon–Fri: 8am–5pm', booking_url: 'https://calendly.com' },
  ],
  HOME_BUSINESS: [
    { type: 'hero', headline: 'Sweet by Sofia 🧁', subheadline: 'Custom Cakes & Pastries · Made with Love', cta1_text: 'Order Now', cta1_url: 'https://wa.me/15551234567', cta2_text: 'See Menu', cta2_url: '#services' },
    { type: 'about', bio_text: 'Home baker specializing in custom celebration cakes, cupcakes, and pastries. Every order is made fresh with premium ingredients. DM to order! 🎂', stats: [{ value: '5 yrs', label: 'Baking' }, { value: '500+', label: 'Orders' }, { value: '5★', label: 'Reviews' }] },
    { type: 'services', services: [{ icon: '🎂', name: 'Custom Cakes', description: 'Birthday, wedding, celebration cakes' }, { icon: '🧁', name: 'Cupcakes', description: 'Dozen packs, custom flavors' }, { icon: '🍪', name: 'Cookie Boxes', description: 'Decorated gift boxes' }] },
    { type: 'contact', email: 'sofia@sweetbysofia.com', phone: '+1 (555) 456-7890', hours: 'Orders: 48hr advance notice', booking_url: 'https://wa.me/15551234567' },
  ],
  CONTRACTOR: [
    { type: 'hero', headline: 'ProBuild Services', subheadline: 'Licensed & Insured · Residential & Commercial', cta1_text: '📞 Call Now', cta1_url: 'tel:+15551234567', cta2_text: 'Get Free Quote', cta2_url: 'mailto:quote@probuild.com' },
    { type: 'about', bio_text: 'Family-owned contracting business serving the metro area for 20+ years. Specializing in renovations, plumbing, electrical, and general repairs. Licensed, bonded, and insured.', stats: [{ value: '20 yrs', label: 'In Business' }, { value: '1000+', label: 'Projects' }, { value: 'A+', label: 'BBB Rating' }] },
    { type: 'services', services: [{ icon: '🔧', name: 'Plumbing', description: 'Repairs, installations, emergency' }, { icon: '⚡', name: 'Electrical', description: 'Wiring, panels, fixtures' }, { icon: '🏠', name: 'Renovation', description: 'Kitchen, bath, full remodels' }, { icon: '🚨', name: '24/7 Emergency', description: 'Same-day emergency service' }] },
    { type: 'contact', email: 'info@probuild.com', phone: '+1 (555) 567-8901', address: 'Serving Metro Area', hours: 'Mon–Sat: 7am–7pm · Emergency: 24/7' },
  ],
  RESTAURANT: [
    { type: 'hero', headline: 'Casa Bella 🍝', subheadline: 'Authentic Italian · Est. 1998 · Downtown', cta1_text: '🍽️ Reserve a Table', cta1_url: 'https://opentable.com', cta2_text: 'View Menu', cta2_url: '#menu' },
    { type: 'about', bio_text: 'Three generations of authentic Italian cooking. Fresh pasta made daily, wood-fired pizza, and an award-winning wine list. Join us for an unforgettable dining experience.', stats: [{ value: '25 yrs', label: 'Open' }, { value: '4.8★', label: 'Google' }, { value: '200+', label: 'Seats' }] },
    { type: 'services', services: [{ icon: '🍝', name: 'Dine In', description: 'Lunch & dinner, Tue–Sun' }, { icon: '📦', name: 'Takeout', description: 'Order online or by phone' }, { icon: '🎉', name: 'Private Events', description: 'Parties up to 80 guests' }] },
    { type: 'contact', email: 'reservations@casabella.com', phone: '+1 (555) 678-9012', address: '456 Olive Street, Downtown', hours: 'Tue–Sun: 11:30am–10pm', booking_url: 'https://opentable.com' },
  ],
  CHEF: [
    { type: 'hero', headline: 'Chef Marco Rossi', subheadline: 'Private Chef · Catering · Culinary Events', cta1_text: 'Book Chef Marco', cta1_url: 'mailto:marco@example.com', cta2_text: 'View Menu', cta2_url: '#services' },
    { type: 'about', bio_text: 'Classically trained in Florence, Italy. 12 years crafting unforgettable dining experiences for private clients, corporate events, and intimate dinner parties.', stats: [{ value: '12 yrs', label: 'Experience' }, { value: '500+', label: 'Events' }, { value: '3', label: 'Cuisines' }] },
    { type: 'services', services: [{ icon: '🍽️', name: 'Private Dining', description: 'In-home chef experience for 2–20' }, { icon: '🎊', name: 'Event Catering', description: 'Corporate & private events' }, { icon: '👨‍🍳', name: 'Cooking Classes', description: 'Private & group lessons' }] },
    { type: 'contact', email: 'marco@chefmarco.com', phone: '+1 (555) 789-0123', booking_url: 'https://calendly.com' },
  ],
  FITNESS: [
    { type: 'hero', headline: 'Train with Coach Kai 💪', subheadline: 'Certified Personal Trainer · Online & In-Person', cta1_text: 'Start Your Journey', cta1_url: 'https://calendly.com', cta2_text: 'View Programs', cta2_url: '#services' },
    { type: 'about', bio_text: 'NASM-certified trainer helping busy professionals build strength, lose fat, and feel unstoppable. 200+ transformations and counting. Your goals are my mission.', stats: [{ value: '7 yrs', label: 'Coaching' }, { value: '200+', label: 'Clients' }, { value: '98%', label: 'Retention' }] },
    { type: 'services', services: [{ icon: '🏋️', name: '1-on-1 Training', description: 'Personalized in-person sessions' }, { icon: '📱', name: 'Online Coaching', description: 'Custom plan + weekly check-ins' }, { icon: '🥗', name: 'Nutrition Plan', description: 'Macro-based meal planning' }] },
    { type: 'testimonials', testimonials: [{ quote: 'Lost 30 lbs in 4 months. Coach Kai changed my life!', name: 'Sarah M.', title: 'Client', rating: 5 }, { quote: 'Best investment I\'ve made in myself. Highly recommend!', name: 'James T.', title: 'Client', rating: 5 }] },
    { type: 'contact', email: 'kai@trainwithkai.com', phone: '+1 (555) 890-1234', booking_url: 'https://calendly.com' },
  ],
  MUSICIAN: [
    { type: 'hero', headline: 'Luna Waves 🎵', subheadline: 'Singer-Songwriter · Indie Pop · Available for Bookings', cta1_text: '🎧 Listen Now', cta1_url: 'https://spotify.com', cta2_text: 'Book Luna', cta2_url: 'mailto:booking@lunawaves.com' },
    { type: 'about', bio_text: 'Indie pop artist blending dreamy vocals with electronic production. Featured on Spotify Editorial playlists. Available for live shows, festivals, and private events.', stats: [{ value: '50K+', label: 'Monthly Listeners' }, { value: '3', label: 'EPs Released' }, { value: '100+', label: 'Shows Played' }] },
    { type: 'social_links', social_links: [{ platform: 'spotify', url: 'https://spotify.com' }, { platform: 'instagram', url: 'https://instagram.com' }, { platform: 'youtube', url: 'https://youtube.com' }, { platform: 'tiktok', url: 'https://tiktok.com' }] },
    { type: 'links', links: [{ label: '🎵 Stream on Spotify', url: 'https://spotify.com' }, { label: '▶️ Watch on YouTube', url: 'https://youtube.com' }, { label: '🎤 Book for Events', url: 'mailto:booking@lunawaves.com' }] },
    { type: 'contact', email: 'booking@lunawaves.com', phone: '+1 (555) 901-2345' },
  ],
}

// ── Build sections from a template's structure + profession content ───────────
export function getProfessionDefaultSections(
  professionId: ProfessionId,
  templateId?: string
): Section[] {
  const structure = templateId ? getTemplateStructure(templateId) : getTemplateStructure('')
  const profContent = PROFESSION_DEFAULTS[professionId] ?? PROFESSION_DEFAULTS.CREATOR

  // Index profession content by section type for quick lookup
  const contentByType: Record<string, Partial<Section>> = {}
  for (const s of profContent) {
    if (s.type) contentByType[s.type] = s
  }

  return structure.map(type => ({
    id: nanoid(8),
    visible: true,
    type,
    ...(contentByType[type] ?? SECTION_DEFAULTS[type] ?? {}),
  } as Section))
}

// ── Template structures: professionally-designed section compositions ─────────
// Each template variant has a DIFFERENT page structure — not just different colors.
// This is what makes templates feel like distinct landing page experiences.
//
// Structure design principles per profession:
//  CREATOR      → link-in-bio first, social proof, content discovery
//  DESIGNER     → portfolio-first, work samples, process, hire CTA
//  BARBER       → booking-first, gallery proof, services, location
//  DOCTOR       → trust-first, credentials, services, appointment CTA
//  HOME_BUSINESS→ story-first, product showcase, social proof, order CTA
//  CONTRACTOR   → credibility-first, services, work proof, call CTA
//  RESTAURANT   → ambiance-first, menu/hours, reservation CTA
//  CHEF         → chef identity, cuisine style, services, booking
//  FITNESS      → transformation proof, programs, testimonials, signup
//  MUSICIAN     → artist identity, music links, shows, booking

export const TEMPLATE_STRUCTURES: Record<string, SectionType[]> = {
  // ── CREATOR: 10 structurally distinct link-in-bio layouts ─────────────────
  // 1. Pure link-in-bio: hero → social grid → links → featured press
  'creator_neon_pulse':     ['hero', 'social_links', 'links', 'featured'],
  // 2. Bio card first: hero → about with stats → links → social
  'creator_pastel_cloud':   ['hero', 'about', 'links', 'social_links'],
  // 3. Photography portfolio: hero → gallery → about → links
  'creator_minimal_black':  ['hero', 'gallery', 'about', 'links'],
  // 4. Minimal links only: hero → links → social_links
  'creator_retro_wave':     ['hero', 'links', 'social_links'],
  // 5. Editorial: hero → featured press → links → testimonials
  'creator_magazine_cut':   ['hero', 'featured', 'links', 'testimonials'],
  // 6. Full profile: hero → about → social_links → contact
  'creator_glassmorphism':  ['hero', 'about', 'social_links', 'contact'],
  // 7. Portfolio + links: hero → gallery → links → about
  'creator_studio_clean':   ['hero', 'gallery', 'links', 'about'],
  // 8. Hype page: hero → featured stats → social_links → links
  'creator_street_art':     ['hero', 'featured', 'social_links', 'links'],
  // 9. Lifestyle: hero → about → links → social_links
  'creator_soft_gradient':  ['hero', 'about', 'links', 'social_links'],
  // 10. Writer/journalist: about → featured → links → social_links
  'creator_dark_editorial': ['about', 'featured', 'links', 'social_links'],

  // ── DESIGNER: portfolio-first structures ──────────────────────────────────
  // 1. Classic portfolio: hero → work gallery → services → contact
  'designer_portfolio_grid':    ['hero', 'gallery', 'services', 'contact'],
  // 2. Dark showcase: hero → gallery → about → social_links
  'designer_dark_canvas':       ['hero', 'gallery', 'about', 'social_links'],
  // 3. Type-led identity: hero → about → services → contact
  'designer_type_forward':      ['hero', 'about', 'services', 'contact'],
  // 4. Process-heavy: about → services → gallery → contact
  'designer_case_study':        ['about', 'services', 'gallery', 'contact'],
  // 5. Services table: hero → services → featured → contact
  'designer_swiss_grid':        ['hero', 'services', 'featured', 'contact'],
  // 6. Artistic: hero → about → gallery → contact
  'designer_liquid_motion':     ['hero', 'about', 'gallery', 'contact'],
  // 7. Gallery-first: gallery → about → social_links → contact
  'designer_gallery_wall':      ['gallery', 'about', 'social_links', 'contact'],
  // 8. Photo-first: hero → gallery → about → contact
  'designer_monochrome_studio': ['hero', 'gallery', 'about', 'contact'],
  // 9. Brand identity: hero → about → services → social_links
  'designer_brand_kit':         ['hero', 'about', 'services', 'social_links'],
  // 10. Fun links: hero → links → featured → contact
  'designer_playful_pop':       ['hero', 'links', 'featured', 'contact'],

  // ── BARBER: booking-first structures ──────────────────────────────────────
  // 1. Booking CTA first: hero → gallery → services → contact
  'barber_sharp_fade':      ['hero', 'gallery', 'services', 'contact'],
  // 2. Full salon profile: hero → about → gallery → services → contact
  'barber_salon_rose':      ['hero', 'about', 'gallery', 'services', 'contact'],
  // 3. Services + gallery: hero → services → gallery → contact
  'barber_chrome_edge':     ['hero', 'services', 'gallery', 'contact'],
  // 4. Social proof: hero → gallery → testimonials → contact
  'barber_vintage_parlour': ['hero', 'gallery', 'testimonials', 'contact'],
  // 5. Stats + gallery: hero → featured → gallery → contact
  'barber_street_style':    ['hero', 'featured', 'gallery', 'contact'],
  // 6. Premium: hero → gallery → services → testimonials → contact
  'barber_luxe_salon':      ['hero', 'gallery', 'services', 'testimonials', 'contact'],
  // 7. Community: hero → about → services → gallery → contact
  'barber_curly_collective':['hero', 'about', 'services', 'gallery', 'contact'],
  // 8. Simple: hero → services → gallery → contact
  'barber_classic_cut':     ['hero', 'services', 'gallery', 'contact'],
  // 9. Glam: hero → gallery → testimonials → contact
  'barber_glam_studio':     ['hero', 'gallery', 'testimonials', 'contact'],
  // 10. Modern: hero → about → gallery → services → contact
  'barber_clean_lines':     ['hero', 'about', 'gallery', 'services', 'contact'],

  // ── DOCTOR: trust-first structures ────────────────────────────────────────
  // 1. Credentials first: hero → featured badges → services → contact
  'doctor_clinical_trust':   ['hero', 'featured', 'services', 'contact'],
  // 2. Warm profile: hero → about → services → testimonials → contact
  'doctor_warm_care':        ['hero', 'about', 'services', 'testimonials', 'contact'],
  // 3. Executive: hero → about → featured → contact
  'doctor_expert_profile':   ['hero', 'about', 'featured', 'contact'],
  // 4. Pediatric: hero → services → gallery → contact
  'doctor_pediatric_bright': ['hero', 'services', 'gallery', 'contact'],
  // 5. Holistic: hero → about → services → contact
  'doctor_holistic_wellness':['hero', 'about', 'services', 'contact'],
  // 6. Specialist: hero → featured → services → contact
  'doctor_specialist_pro':   ['hero', 'featured', 'services', 'contact'],
  // 7. Dental: hero → services → gallery → testimonials → contact
  'doctor_dental_bright':    ['hero', 'services', 'gallery', 'testimonials', 'contact'],
  // 8. Mental health: hero → about → services → contact
  'doctor_mental_health':    ['hero', 'about', 'services', 'contact'],
  // 9. Telehealth: hero → services → featured → contact
  'doctor_telemedicine':     ['hero', 'services', 'featured', 'contact'],
  // 10. Community: hero → about → services → contact
  'doctor_community':        ['hero', 'about', 'services', 'contact'],

  // ── HOME BUSINESS: story-first structures ─────────────────────────────────
  // 1. Cottage: hero → about → gallery → services → contact
  'home_cottage_core':   ['hero', 'about', 'gallery', 'services', 'contact'],
  // 2. Market: hero → services → gallery → contact
  'home_bold_market':    ['hero', 'services', 'gallery', 'contact'],
  // 3. Artisan: hero → gallery → testimonials → contact
  'home_handcrafted':    ['hero', 'gallery', 'testimonials', 'contact'],
  // 4. Bakery: hero → gallery → services → testimonials → contact
  'home_sweet_minimal':  ['hero', 'gallery', 'services', 'testimonials', 'contact'],
  // 5. Tutor: hero → about → services → testimonials → contact
  'home_study_corner':   ['hero', 'about', 'services', 'testimonials', 'contact'],
  // 6. Heartfelt: hero → about → gallery → testimonials → contact
  'home_made_with_love': ['hero', 'about', 'gallery', 'testimonials', 'contact'],
  // 7. Studio: hero → services → gallery → contact
  'home_studio':         ['hero', 'services', 'gallery', 'contact'],
  // 8. Organic: hero → about → services → contact
  'home_market_fresh':   ['hero', 'about', 'services', 'contact'],
  // 9. Kitchen: hero → gallery → services → contact
  'home_bright_kitchen': ['hero', 'gallery', 'services', 'contact'],
  // 10. Story-led: about → gallery → testimonials → links → contact
  'home_story_led':      ['about', 'gallery', 'testimonials', 'links', 'contact'],

  // ── CONTRACTOR: credibility-first structures ──────────────────────────────
  // 1. Bold CTA: hero → services → gallery → contact
  'contractor_hard_hat':       ['hero', 'services', 'gallery', 'contact'],
  // 2. Professional: hero → featured → services → contact
  'contractor_clean_trade':    ['hero', 'featured', 'services', 'contact'],
  // 3. Technical: hero → about → services → gallery → contact
  'contractor_blueprint':      ['hero', 'about', 'services', 'gallery', 'contact'],
  // 4. Community: hero → about → testimonials → contact
  'contractor_community_first':['hero', 'about', 'testimonials', 'contact'],
  // 5. Modern: hero → services → gallery → contact
  'contractor_steel_glass':    ['hero', 'services', 'gallery', 'contact'],
  // 6. Family: hero → about → services → testimonials → contact
  'contractor_family_business':['hero', 'about', 'services', 'testimonials', 'contact'],
  // 7. Emergency: hero → services → testimonials → contact
  'contractor_emergency_ready':['hero', 'services', 'testimonials', 'contact'],
  // 8. Compliance: hero → featured → services → contact
  'contractor_licensed':       ['hero', 'featured', 'services', 'contact'],
  // 9. Before/after: hero → gallery → services → contact
  'contractor_before_after':   ['hero', 'gallery', 'services', 'contact'],
  // 10. Veteran: hero → about → services → contact
  'contractor_veteran':        ['hero', 'about', 'services', 'contact'],

  // ── RESTAURANT: ambiance-first structures ─────────────────────────────────
  // 1. Fine dining: hero → about → services (menu) → gallery → contact
  'restaurant_bistro_noir':    ['hero', 'about', 'services', 'gallery', 'contact'],
  // 2. Casual: hero → gallery → services → contact
  'restaurant_bright_bites':   ['hero', 'gallery', 'services', 'contact'],
  // 3. Upscale: hero → about → services → contact
  'restaurant_fine_dine':      ['hero', 'about', 'services', 'contact'],
  // 4. Farm: hero → about → gallery → contact
  'restaurant_farm_table':     ['hero', 'about', 'gallery', 'contact'],
  // 5. Street food: hero → gallery → services → contact
  'restaurant_street_food':    ['hero', 'gallery', 'services', 'contact'],
  // 6. Coastal: hero → gallery → services → testimonials → contact
  'restaurant_coastal_kitchen':['hero', 'gallery', 'services', 'testimonials', 'contact'],
  // 7. Family: hero → about → gallery → contact
  'restaurant_family_recipe':  ['hero', 'about', 'gallery', 'contact'],
  // 8. Fusion: hero → gallery → featured → contact
  'restaurant_modern_fusion':  ['hero', 'gallery', 'featured', 'contact'],
  // 9. Dessert: hero → gallery → services → social_links → contact
  'restaurant_dessert_house':  ['hero', 'gallery', 'services', 'social_links', 'contact'],
  // 10. Pop-up: hero → featured → gallery → contact
  'restaurant_popup_spot':     ['hero', 'featured', 'gallery', 'contact'],

  // ── CHEF: culinary identity structures ────────────────────────────────────
  // 1. Fine dining chef: hero → about → services → gallery → contact
  'chef_chefs_table':    ['hero', 'about', 'services', 'gallery', 'contact'],
  // 2. Street chef: hero → gallery → services → contact
  'chef_street_chef':    ['hero', 'gallery', 'services', 'contact'],
  // 3. Recipe journal: hero → about → gallery → contact
  'chef_recipe_journal': ['hero', 'about', 'gallery', 'contact'],
  // 4. Tasting menu: hero → about → services → contact
  'chef_tasting_menu':   ['hero', 'about', 'services', 'contact'],
  // 5. Home kitchen: hero → about → services → testimonials → contact
  'chef_home_kitchen':   ['hero', 'about', 'services', 'testimonials', 'contact'],
  // 6. Vegan: hero → about → gallery → services → contact
  'chef_vegan_pantry':   ['hero', 'about', 'gallery', 'services', 'contact'],
  // 7. Private chef: hero → services → gallery → contact
  'chef_private_chef':   ['hero', 'services', 'gallery', 'contact'],
  // 8. Catering: hero → services → testimonials → contact
  'chef_catering_pros':  ['hero', 'services', 'testimonials', 'contact'],
  // 9. International: hero → about → gallery → social_links → contact
  'chef_international':  ['hero', 'about', 'gallery', 'social_links', 'contact'],
  // 10. Pop chef: hero → social_links → gallery → contact
  'chef_pop_chef':       ['hero', 'social_links', 'gallery', 'contact'],

  // ── FITNESS: transformation-first structures ──────────────────────────────
  // 1. Gym energy: hero → featured stats → services → testimonials → contact
  'fitness_iron_grit':       ['hero', 'featured', 'services', 'testimonials', 'contact'],
  // 2. Yoga: hero → about → services → testimonials → contact
  'fitness_mindful_flow':    ['hero', 'about', 'services', 'testimonials', 'contact'],
  // 3. Transformation: hero → gallery → services → testimonials → contact
  'fitness_transformation':  ['hero', 'gallery', 'services', 'testimonials', 'contact'],
  // 4. Studio: hero → about → services → featured → contact
  'fitness_wellness_studio': ['hero', 'about', 'services', 'featured', 'contact'],
  // 5. Run club: hero → featured → services → contact
  'fitness_run_club':        ['hero', 'featured', 'services', 'contact'],
  // 6. Pilates: hero → about → services → testimonials → contact
  'fitness_soft_strength':   ['hero', 'about', 'services', 'testimonials', 'contact'],
  // 7. Digital coach: hero → services → featured → testimonials → contact
  'fitness_digital_coach':   ['hero', 'services', 'featured', 'testimonials', 'contact'],
  // 8. Holistic: hero → about → services → contact
  'fitness_holistic_health': ['hero', 'about', 'services', 'contact'],
  // 9. Sports: hero → testimonials → services → contact
  'fitness_athletes_first':  ['hero', 'testimonials', 'services', 'contact'],
  // 10. Life coach: hero → about → services → testimonials → contact
  'fitness_new_you':         ['hero', 'about', 'services', 'testimonials', 'contact'],

  // ── MUSICIAN: artist identity structures ──────────────────────────────────
  // 1. Concert poster: hero → about → social_links → links → contact
  'musician_stage_presence':    ['hero', 'about', 'social_links', 'links', 'contact'],
  // 2. Lo-fi: hero → links → about → contact
  'musician_lofi_aesthetic':    ['hero', 'links', 'about', 'contact'],
  // 3. DJ/Electronic: hero → social_links → featured → contact
  'musician_electronic_pulse':  ['hero', 'social_links', 'featured', 'contact'],
  // 4. Indie folk: hero → about → links → gallery → contact
  'musician_indie_folk':        ['hero', 'about', 'links', 'gallery', 'contact'],
  // 5. Classical: hero → about → featured → contact
  'musician_classical_portrait':['hero', 'about', 'featured', 'contact'],
  // 6. Hype: hero → social_links → links → contact
  'musician_hype_machine':      ['hero', 'social_links', 'links', 'contact'],
  // 7. Singer-songwriter: hero → about → gallery → links → contact
  'musician_singer_songwriter': ['hero', 'about', 'gallery', 'links', 'contact'],
  // 8. Visual artist: hero → gallery → about → contact
  'musician_visual_artist':     ['hero', 'gallery', 'about', 'contact'],
  // 9. Band: hero → about → links → social_links → contact
  'musician_band_hub':          ['hero', 'about', 'links', 'social_links', 'contact'],
  // 10. Streamer: hero → social_links → links → featured → contact
  'musician_streamer_ready':    ['hero', 'social_links', 'links', 'featured', 'contact'],
}

// ── Get structure for a template (with fallback) ──────────────────────────────
export function getTemplateStructure(templateId: string): SectionType[] {
  return TEMPLATE_STRUCTURES[templateId] ?? ['hero', 'about', 'services', 'contact']
}
