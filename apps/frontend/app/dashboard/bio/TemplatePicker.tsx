'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { PROFESSIONS, TEMPLATES, getTemplatesForProfession, TEMPLATE_STRUCTURES } from './templates'
import type { ProfessionId, SectionType } from './templates'

// Human-readable labels + colors for each section type
const SECTION_CHIP: Record<SectionType, { label: string; color: string }> = {
  hero:         { label: 'Hero',         color: 'bg-blue-100 text-blue-700' },
  about:        { label: 'About',        color: 'bg-purple-100 text-purple-700' },
  services:     { label: 'Services',     color: 'bg-green-100 text-green-700' },
  gallery:      { label: 'Gallery',      color: 'bg-orange-100 text-orange-700' },
  testimonials: { label: 'Reviews',      color: 'bg-yellow-100 text-yellow-700' },
  social_links: { label: 'Social',       color: 'bg-pink-100 text-pink-700' },
  contact:      { label: 'Contact',      color: 'bg-teal-100 text-teal-700' },
  featured:     { label: 'Featured',     color: 'bg-amber-100 text-amber-700' },
  header:       { label: 'Header',       color: 'bg-gray-100 text-gray-600' },
  footer:       { label: 'Footer',       color: 'bg-gray-100 text-gray-600' },
  links:        { label: 'Links',        color: 'bg-indigo-100 text-indigo-700' },
  heading:      { label: 'Heading',      color: 'bg-gray-100 text-gray-600' },
  text:         { label: 'Text',         color: 'bg-gray-100 text-gray-600' },
  divider:      { label: 'Divider',      color: 'bg-gray-100 text-gray-600' },
  social:       { label: 'Social Icons', color: 'bg-pink-100 text-pink-700' },
  image:        { label: 'Image',        color: 'bg-orange-100 text-orange-700' },
}

function TemplateCard({ template, selected, onSelect }: {
  template: { id: string; name: string; tagline: string; palette: string; page: string; linkBtn: string; nameClass: string; bioClass: string }
  selected: boolean
  onSelect: () => void
}) {
  const structure = TEMPLATE_STRUCTURES[template.id] ?? ['hero', 'about', 'contact']
  const bgClasses = template.page
    .replace('min-h-screen', '').replace('flex items-center justify-center', '').replace('px-4 py-12', '').trim()

  return (
    <button type="button" onClick={onSelect}
      className={`relative rounded-2xl overflow-hidden border-2 text-left transition-all group hover:scale-[1.01] active:scale-[0.99] ${
        selected
          ? 'border-blue-500 shadow-xl shadow-blue-100 ring-2 ring-blue-500/20'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}>

      {/* Visual preview */}
      <div className={`h-36 ${bgClasses} relative overflow-hidden`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-white/25 ring-2 ring-white/40 flex items-center justify-center text-sm">👤</div>
          <div className={`${template.nameClass} !text-xs !leading-tight text-center truncate w-full px-2`}>Your Name</div>
          <div className={`${template.bioClass} !text-[9px] text-center opacity-75 truncate w-full px-4`}>Your tagline</div>
          <div className="w-full px-3 space-y-1 mt-0.5">
            <div className={`${template.linkBtn} text-[8px] py-1 px-2 pointer-events-none text-center`}>
              {structure[1] === 'gallery' ? '📸 View Gallery' : structure[1] === 'services' ? '⚡ My Services' : '👋 About Me'}
            </div>
            <div className={`${template.linkBtn} text-[8px] py-1 px-2 pointer-events-none text-center opacity-60`}>
              {structure.includes('contact') ? '📩 Contact Me' : '🔗 More Links'}
            </div>
          </div>
        </div>
        {selected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Check size={13} className="text-white" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Name + palette */}
      <div className="px-3 pt-2.5 pb-1 bg-white">
        <p className="text-xs font-semibold text-gray-900 leading-tight">{template.name}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{template.palette}</p>
      </div>

      {/* Structure chips — the key differentiator */}
      <div className="px-3 pb-2.5 bg-white flex flex-wrap gap-1">
        {structure.map(type => {
          const chip = SECTION_CHIP[type]
          return chip ? (
            <span key={type} className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${chip.color}`}>
              {chip.label}
            </span>
          ) : null
        })}
      </div>
    </button>
  )
}

export function TemplatePicker({ value, onChange, profession }: {
  value: string
  onChange: (id: string) => void
  profession?: ProfessionId
}) {
  const [activeProfession, setActiveProfession] = useState<ProfessionId>(
    profession ?? (TEMPLATES.find(t => t.id === value)?.profession ?? 'CREATOR')
  )
  const templates = getTemplatesForProfession(activeProfession)

  return (
    <div className="space-y-3">
      {/* Profession tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin -mx-1 px-1">
        {PROFESSIONS.map(p => (
          <button key={p.id} type="button"
            onClick={() => setActiveProfession(p.id as ProfessionId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
              activeProfession === p.id ? 'bg-gray-900 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            <span>{p.emoji}</span>
            <span className="hidden sm:inline">{p.label.split(' / ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <p className="text-[10px] text-gray-400">
        Each template has a different page structure — shown as colored chips below each preview.
      </p>

      {/* Template grid */}
      <div className="grid grid-cols-2 gap-3">
        {templates.map(t => (
          <TemplateCard key={t.id} template={t} selected={value === t.id} onSelect={() => onChange(t.id)} />
        ))}
      </div>
    </div>
  )
}
