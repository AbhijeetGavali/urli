'use client'
import { useState } from 'react'
import { X, ArrowRight, Check } from 'lucide-react'
import { PROFESSIONS, getTemplatesForProfession, TEMPLATE_STRUCTURES } from './templates'
import type { ProfessionId, BioTemplate } from './templates'

const CHIP: Partial<Record<string, { label: string; color: string }>> = {
  hero:         { label: 'Hero',      color: 'bg-blue-100 text-blue-700' },
  about:        { label: 'About',     color: 'bg-purple-100 text-purple-700' },
  services:     { label: 'Services',  color: 'bg-green-100 text-green-700' },
  gallery:      { label: 'Gallery',   color: 'bg-orange-100 text-orange-700' },
  testimonials: { label: 'Reviews',   color: 'bg-yellow-100 text-yellow-700' },
  social_links: { label: 'Social',    color: 'bg-pink-100 text-pink-700' },
  contact:      { label: 'Contact',   color: 'bg-teal-100 text-teal-700' },
  featured:     { label: 'Featured',  color: 'bg-amber-100 text-amber-700' },
  links:        { label: 'Links',     color: 'bg-indigo-100 text-indigo-700' },
}

// ── Step 1: Profession picker ─────────────────────────────────────────────────
function ProfessionStep({ onSelect }: { onSelect: (id: ProfessionId) => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">What best describes you?</h2>
      <p className="text-sm text-gray-500 mb-5">We'll show you templates made for your profession.</p>
      <div className="grid grid-cols-2 gap-2 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
        {PROFESSIONS.map(p => (
          <button key={p.id} type="button" onClick={() => onSelect(p.id as ProfessionId)}
            className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all group">
            <span className="text-2xl shrink-0 mt-0.5">{p.emoji}</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 leading-tight">{p.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">{p.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Template card ─────────────────────────────────────────────────────────────
function TemplateCard({ template, selected, onSelect }: {
  template: BioTemplate; selected: boolean; onSelect: () => void
}) {
  const structure = TEMPLATE_STRUCTURES[template.id] ?? ['hero', 'about', 'contact']
  const bgClasses = template.page
    .replace('min-h-screen', '')
    .replace('flex items-center justify-center', '')
    .replace('px-4 py-12', '')
    .trim()

  const CHIP_COLOR: Partial<Record<string, string>> = {
    hero: 'bg-blue-100 text-blue-700', about: 'bg-purple-100 text-purple-700',
    services: 'bg-green-100 text-green-700', gallery: 'bg-orange-100 text-orange-700',
    testimonials: 'bg-yellow-100 text-yellow-700', social_links: 'bg-pink-100 text-pink-700',
    contact: 'bg-teal-100 text-teal-700', featured: 'bg-amber-100 text-amber-700',
    links: 'bg-indigo-100 text-indigo-700',
  }
  const CHIP_LABEL: Partial<Record<string, string>> = {
    hero: 'Hero', about: 'About', services: 'Services', gallery: 'Gallery',
    testimonials: 'Reviews', social_links: 'Social', contact: 'Contact',
    featured: 'Featured', links: 'Links',
  }

  return (
    <button type="button" onClick={onSelect}
      className={`relative rounded-2xl overflow-hidden border-2 text-left transition-all ${
        selected ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-gray-200 hover:border-gray-300'
      }`}>
      <div className={`h-28 ${bgClasses} flex flex-col items-center justify-center gap-1.5 px-3 py-3`}>
        <div className="w-8 h-8 rounded-full bg-white/25 ring-2 ring-white/40 flex items-center justify-center text-sm">👤</div>
        <div className={`${template.nameClass} !text-xs text-center truncate w-full px-2`}>Your Name</div>
        <div className="w-full px-3 space-y-1">
          <div className={`${template.linkBtn} text-[8px] py-1 px-2 pointer-events-none text-center`}>
            {structure.includes('gallery') ? '📸 Gallery' : structure.includes('services') ? '⚡ Services' : '👋 About'}
          </div>
        </div>
      </div>
      <div className="px-2.5 pt-2 pb-1 bg-white">
        <p className="text-xs font-semibold text-gray-900 truncate">{template.name}</p>
        <p className="text-[10px] text-gray-400 truncate">{template.palette}</p>
      </div>
      <div className="px-2.5 pb-2 bg-white flex flex-wrap gap-1">
        {structure.filter(t => CHIP_LABEL[t]).map(type => (
          <span key={type} className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${CHIP_COLOR[type] ?? 'bg-gray-100 text-gray-600'}`}>
            {CHIP_LABEL[type]}
          </span>
        ))}
      </div>
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow">
          <Check size={11} className="text-white" strokeWidth={3} />
        </div>
      )}
    </button>
  )
}

// ── Step 2: Template gallery ──────────────────────────────────────────────────
function TemplateStep({ profession, selected, onSelect, onBack, onConfirm }: {
  profession: ProfessionId; selected: string
  onSelect: (id: string) => void; onBack: () => void; onConfirm: () => void
}) {
  const templates = getTemplatesForProfession(profession)
  const profLabel = PROFESSIONS.find(p => p.id === profession)?.label ?? profession

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <button type="button" onClick={onBack} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">← Back</button>
        <span className="text-xs text-gray-300">|</span>
        <span className="text-xs text-gray-500">{profLabel}</span>
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">Choose a template</h2>
      <p className="text-sm text-gray-500 mb-4">Pick the look that fits your brand. You can change it anytime.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {templates.map(t => (
          <TemplateCard key={t.id} template={t} selected={selected === t.id} onSelect={() => onSelect(t.id)} />
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button type="button" onClick={onConfirm} disabled={!selected}
          className="btn-primary gap-2 disabled:opacity-40">
          Use this template <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

// ── Main onboarding modal ─────────────────────────────────────────────────────
export function OnboardingModal({ onComplete, onClose, initialProfession }: {
  onComplete: (profession: ProfessionId, templateId: string) => void
  onClose?: () => void
  initialProfession?: ProfessionId
}) {
  const [step, setStep] = useState<'profession' | 'template'>(initialProfession ? 'template' : 'profession')
  const [profession, setProfession] = useState<ProfessionId>(initialProfession ?? 'CREATOR')
  const [templateId, setTemplateId] = useState(
    getTemplatesForProfession(initialProfession ?? 'CREATOR')[0]?.id ?? ''
  )

  const handleProfessionSelect = (id: ProfessionId) => {
    setProfession(id)
    setTemplateId(getTemplatesForProfession(id)[0]?.id ?? '')
    setStep('template')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fade-up max-h-[90vh] overflow-y-auto">
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X size={16} />
          </button>
        )}
        {step === 'profession' && <ProfessionStep onSelect={handleProfessionSelect} />}
        {step === 'template' && (
          <TemplateStep
            profession={profession}
            selected={templateId}
            onSelect={setTemplateId}
            onBack={() => setStep('profession')}
            onConfirm={() => onComplete(profession, templateId)}
          />
        )}
      </div>
    </div>
  )
}

// ── Standalone template gallery (for "Change Template" button) ────────────────
export function TemplateGalleryModal({ currentTemplate, currentProfession, onSelect, onClose }: {
  currentTemplate: string; currentProfession: ProfessionId
  onSelect: (templateId: string) => void; onClose: () => void
}) {
  const [activeProfession, setActiveProfession] = useState<ProfessionId>(currentProfession)
  const [selected, setSelected] = useState(currentTemplate)
  const templates = getTemplatesForProfession(activeProfession)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fade-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
          <X size={16} />
        </button>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Change Template</h2>
        <p className="text-sm text-gray-500 mb-3">Your content will be preserved.</p>

        {/* Profession tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-thin">
          {PROFESSIONS.map(p => (
            <button key={p.id} type="button"
              onClick={() => { setActiveProfession(p.id as ProfessionId); setSelected('') }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                activeProfession === p.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              <span>{p.emoji}</span>
              <span className="hidden sm:inline">{p.label.split(' / ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
          {templates.map(t => (
            <TemplateCard key={t.id} template={t} selected={selected === t.id} onSelect={() => setSelected(t.id)} />
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          <button type="button" onClick={() => { if (selected) { onSelect(selected); onClose() } }}
            disabled={!selected} className="btn-primary gap-2 disabled:opacity-40">
            Apply template <Check size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
