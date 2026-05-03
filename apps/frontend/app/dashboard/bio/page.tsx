'use client'
import { extractError } from '@/lib/extractError'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetBioQuery, useUpsertBioMutation, useLazyCheckBioSlugQuery } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'
import type { RootState } from '../../../store'
import Link from 'next/link'
import { nanoid } from 'nanoid'
import {
  ExternalLink, Zap, Lock, Eye, EyeOff, X, Copy, Check,
  AlertCircle, CheckCircle2, Loader2, Save, Palette, Lightbulb, LayoutTemplate,
} from 'lucide-react'
import { SECTION_DEFAULTS, DEFAULT_GLOBAL_STYLES } from './types'
import { getTemplate, getProfessionDefaultSections, getTemplateStructure } from './templates'
import type { Section, SectionType, GlobalStyles, ProfessionId } from './types'
import { SectionCard, AddSectionBar } from './SectionEditor'
import { TemplatePicker } from './TemplatePicker'
import { PhonePreview } from './PhonePreview'
import { GlobalStylePanel } from './GlobalStylePanel'
import { OnboardingModal, TemplateGalleryModal } from './OnboardingModal'
import { FeatureRequestModal } from './FeatureRequestModal'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://urli.ideasprout.in'

function ProGateModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center relative animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><X size={16} /></button>
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
          <Lock size={22} className="text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Publish requires Pro</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">Free users can build and preview. Upgrade to Pro to publish live.</p>
        <Link href="/pricing" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors w-full justify-center shadow-sm shadow-blue-200">
          <Zap size={14} fill="white" /> Upgrade to Pro — ₹999/mo
        </Link>
        <p className="text-xs text-gray-400 mt-3">Your draft is saved. Upgrade anytime.</p>
      </div>
    </div>
  )
}

function SlugStatus({ status }: { status: 'idle' | 'checking' | 'available' | 'taken' }) {
  if (status === 'idle') return null
  if (status === 'checking') return <Loader2 size={13} className="text-gray-400 animate-spin" />
  if (status === 'available') return <CheckCircle2 size={13} className="text-green-500" />
  return <AlertCircle size={13} className="text-red-500" />
}

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button type="button" onClick={() => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
      {copied ? <Check size={11} className="text-green-500" /> : <Copy size={11} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

type Tab = 'content' | 'design' | 'style' | 'seo'

export default function BioPage() {
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.user)
  const { data, isLoading: isLoadingBio } = useGetBioQuery()
  const [upsert, { isLoading: isSaving }] = useUpsertBioMutation()
  const [checkSlug] = useLazyCheckBioSlugQuery()

  const [form, setForm] = useState({ slug: '', title: '', description: '', avatar: '' })
  const [seo, setSeo] = useState({ seoTitle: '', seoDescription: '', ogImage: '' })
  const [template, setTemplate] = useState('minimal')
  const [profession, setProfession] = useState<ProfessionId>('CREATOR')
  const [sections, setSections] = useState<Section[]>([])
  const [globalStyles, setGlobalStyles] = useState<GlobalStyles>(DEFAULT_GLOBAL_STYLES)
  const [published, setPublished] = useState(false)
  const [bioPageId, setBioPageId] = useState<string | undefined>()

  const [tab, setTab] = useState<Tab>('content')
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [isDirty, setIsDirty] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const [showProGate, setShowProGate] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)
  const [showFeatureRequest, setShowFeatureRequest] = useState(false)

  const slugTimer = useRef<ReturnType<typeof setTimeout>>()
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>()
  const savedSlug = useRef('')
  const onboardingShown = useRef(false)
  const isPro = user?.plan === 'PRO' || user?.plan === 'BUSINESS'
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile')

  useEffect(() => {
    if (data?.bio) {
      const b = data.bio
      setForm({ slug: b.slug ?? '', title: b.title ?? '', description: b.description ?? '', avatar: b.avatar ?? '' })
      setSeo({ seoTitle: b.seoTitle ?? '', seoDescription: b.seoDescription ?? '', ogImage: b.ogImage ?? '' })
      setTemplate(b.template ?? 'minimal')
      setProfession((b.profession as ProfessionId) ?? 'CREATOR')
      setSections((b.sections as Section[]) ?? [])
      setGlobalStyles({ ...DEFAULT_GLOBAL_STYLES, ...(b.globalStyles as Partial<GlobalStyles>) })
      setPublished(b.published ?? false)
      setBioPageId(b.id)
      savedSlug.current = b.slug ?? ''
      setIsDirty(false)
    } else if (data && !data.bio) {
      // No bio yet — show onboarding only once per mount
      if (!onboardingShown.current) {
        onboardingShown.current = true
        setShowOnboarding(true)
      }
    }
  }, [data])

  // Auto-save every 30s when dirty (SRS FR-13)
  useEffect(() => {
    if (!isDirty) return
    autoSaveTimer.current = setTimeout(async () => {
      if (!form.slug || slugStatus === 'taken') return
      try {
        await upsert({ ...form, ...seo, template, profession, sections, globalStyles, published }).unwrap()
        savedSlug.current = form.slug; setIsDirty(false); setLastSaved(new Date())
      } catch {}
    }, 30_000)
    return () => clearTimeout(autoSaveTimer.current)
  }, [isDirty, form, seo, template, profession, sections, globalStyles, published, slugStatus])

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => { if (isDirty) { e.preventDefault(); e.returnValue = '' } }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  const handleSlugChange = (val: string) => {
    // Sanitize: lowercase, replace spaces with hyphens, strip invalid chars
    const sanitized = val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
    setForm(f => ({ ...f, slug: sanitized })); setIsDirty(true)
    clearTimeout(slugTimer.current)
    if (!sanitized || sanitized === savedSlug.current) { setSlugStatus('idle'); return }
    setSlugStatus('checking')
    slugTimer.current = setTimeout(async () => {
      try { const r = await checkSlug(sanitized).unwrap(); setSlugStatus(r.available ? 'available' : 'taken') }
      catch { setSlugStatus('idle') }
    }, 500)
  }

  const addSection = (type: SectionType) => {
    setSections(s => [...s, { id: nanoid(8), type, ...SECTION_DEFAULTS[type] } as Section])
    setIsDirty(true)
  }
  const updateSection = useCallback((id: string, updated: Section) => {
    setSections(s => s.map(sec => sec.id === id ? updated : sec)); setIsDirty(true)
  }, [])
  const removeSection = useCallback((id: string) => {
    setSections(s => s.filter(sec => sec.id !== id)); setIsDirty(true)
  }, [])
  const moveSection = useCallback((index: number, dir: -1 | 1) => {
    setSections(s => {
      const next = [...s]; const target = index + dir
      if (target < 0 || target >= next.length) return s
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    }); setIsDirty(true)
  }, [])

  // Apply a template: reorder existing sections to match structure,
  // show sections in structure, hide sections not in structure,
  // add missing sections with pre-filled content.
  const applyTemplate = useCallback((tplId: string) => {
    setTemplate(tplId)
    const structure = getTemplateStructure(tplId)
    setSections(prev => {
      // Build a map of existing sections by type (keep first of each type)
      const byType = new Map<string, Section>()
      for (const s of prev) {
        if (!byType.has(s.type)) byType.set(s.type, s)
      }
      // Build new ordered list from structure
      const inStructure = structure.map(type => {
        const existing = byType.get(type)
        if (existing) return { ...existing, visible: true }
        // Create new section with profession defaults
        const defaults = SECTION_DEFAULTS[type as keyof typeof SECTION_DEFAULTS] ?? {}
        return { id: nanoid(8), type, visible: true, ...defaults } as Section
      })
      // Append any extra sections not in structure, hidden
      const structureSet = new Set(structure)
      const extras = prev
        .filter(s => !structureSet.has(s.type))
        .map(s => ({ ...s, visible: false }))
      return [...inStructure, ...extras]
    })
    setIsDirty(true)
  }, [])

  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const reorderSections = useCallback((from: number, to: number) => {
    if (from === to) return
    setSections(s => {
      const next = [...s]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    setIsDirty(true)
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (slugStatus === 'taken') { dispatch(showToast({ message: 'Slug is already taken', type: 'error' })); return }
    try {
      await upsert({ ...form, ...seo, template, profession, sections, globalStyles, published }).unwrap()
      savedSlug.current = form.slug; setIsDirty(false); setLastSaved(new Date())
      dispatch(showToast({ message: published ? 'Bio page published!' : 'Draft saved!', type: 'success' }))
    } catch (err: any) { dispatch(showToast({ message: extractError(err), type: 'error' })) }
  }

  const previewUrl = form.slug ? `${APP_URL}/b/${form.slug}` : null

  if (isLoadingBio) return (
    <div className="flex items-center justify-center h-64"><Loader2 size={20} className="animate-spin text-gray-400" /></div>
  )

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Content', icon: null },
    { id: 'design',  label: 'Design',  icon: <LayoutTemplate size={12} /> },
    { id: 'style',   label: 'Style',   icon: <Palette size={12} /> },
    { id: 'seo',     label: 'SEO',     icon: null },
  ]

  return (
    <div className="flex h-full overflow-hidden">
      {showProGate && <ProGateModal onClose={() => setShowProGate(false)} />}
      {showOnboarding && (
        <OnboardingModal
          onComplete={(prof, tplId) => {
            setProfession(prof)
            setTemplate(tplId)
            if (sections.length === 0) setSections(getProfessionDefaultSections(prof, tplId))
            setShowOnboarding(false)
            setIsDirty(true)
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}
      {showTemplateGallery && (
        <TemplateGalleryModal
          currentTemplate={template}
          currentProfession={profession}
          onSelect={id => { applyTemplate(id) }}
          onClose={() => setShowTemplateGallery(false)}
        />
      )}
      {showFeatureRequest && (
        <FeatureRequestModal
          bioPageId={bioPageId}
          context={`profession:${profession}, template:${template}, tab:${tab}`}
          onClose={() => setShowFeatureRequest(false)}
        />
      )}

      {/* ── Left editor panel ── */}
      <div className="flex-1 overflow-y-auto min-w-0 flex flex-col">
        <div className="p-4 md:p-6 flex-1">

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-base font-semibold text-gray-900">Bio Page</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {lastSaved ? `Saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : isDirty ? 'Unsaved changes' : 'Your link-in-bio page'}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {previewUrl && <CopyButton url={previewUrl} />}
              {previewUrl && (
                <a href={previewUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 px-2.5 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors">
                  <ExternalLink size={11} /> Preview
                </a>
              )}
              <button type="button" onClick={() => { if (!isPro && !published) { setShowProGate(true); return } setPublished(p => !p); setIsDirty(true) }}
                className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${published ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                {published ? <Eye size={11} /> : <EyeOff size={11} />}
                {published ? 'Live' : 'Draft'}
                {!isPro && <Lock size={10} className="text-gray-400" />}
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {TABS.map(t => (
                <button key={t.id} type="button" onClick={() => setTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${tab === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {t.icon}{t.label}
                </button>
              ))}
            </div>

            {/* ── Content tab ── */}
            {tab === 'content' && (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
                  <h2 className="text-sm font-semibold text-gray-900">Page settings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label">URL slug</label>
                      <div className={`flex items-center border rounded-xl overflow-hidden bg-white transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 ${slugStatus === 'taken' ? 'border-red-400' : slugStatus === 'available' ? 'border-green-400' : 'border-gray-200'}`}>
                        <span className="px-3 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 py-2.5 shrink-0">/b/</span>
                        <input value={form.slug} onChange={e => handleSlugChange(e.target.value)} required
                          className="flex-1 px-3 py-2.5 text-sm focus:outline-none bg-white" placeholder="yourname" />
                        <span className="px-2.5 shrink-0"><SlugStatus status={slugStatus} /></span>
                      </div>
                      {slugStatus === 'taken' && <p className="text-xs text-red-500 mt-1">Already taken.</p>}
                    </div>
                    <div>
                      <label className="label">Display name</label>
                      <input value={form.title} onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setIsDirty(true) }} required className="input" placeholder="Jane Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Bio</label>
                    <textarea value={form.description} onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setIsDirty(true) }} rows={2} className="input resize-none" placeholder="A short bio…" />
                  </div>
                  <div>
                    <label className="label">Avatar URL</label>
                    <div className="flex gap-2 items-center">
                      <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center text-sm font-bold text-gray-500">
                        {form.avatar
                          ? <img src={form.avatar} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                          : (form.title ? form.title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : 'U')}
                      </div>
                      <input value={form.avatar} onChange={e => { setForm(f => ({ ...f, avatar: e.target.value })); setIsDirty(true) }} className="input flex-1" placeholder="https://…" type="url" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h2 className="text-sm font-semibold text-gray-900 mb-3">Sections</h2>
                  {sections.length === 0 && (
                    <div className="text-center py-6 mb-3 border border-dashed border-gray-200 rounded-xl">
                      <p className="text-sm text-gray-400">No sections yet.</p>
                      <p className="text-xs text-gray-400 mt-0.5">Add a section below to build your page.</p>
                    </div>
                  )}
                  <div className="space-y-2 mb-3">
                    {sections.map((sec, i) => (
                      <SectionCard key={sec.id} section={sec} index={i} total={sections.length}
                        onChange={updated => updateSection(sec.id, updated)}
                        onRemove={() => removeSection(sec.id)}
                        onMove={dir => moveSection(i, dir)}
                        isDragging={dragIndex === i}
                        onDragStart={() => setDragIndex(i)}
                        onDragOver={() => { if (dragIndex !== null && dragIndex !== i) { reorderSections(dragIndex, i); setDragIndex(i) } }}
                        onDrop={() => setDragIndex(null)}
                      />
                    ))}
                  </div>
                  <AddSectionBar onAdd={addSection} />
                </div>
              </>
            )}

            {/* ── Design tab ── */}
            {tab === 'design' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">Template</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Your content is preserved when switching.</p>
                  </div>
                  <button type="button" onClick={() => setShowTemplateGallery(true)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors">
                    Browse all
                  </button>
                </div>
                <TemplatePicker value={template} onChange={applyTemplate} />
              </div>
            )}

            {/* ── Style tab ── */}
            {tab === 'style' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">Global styles</h2>
                <GlobalStylePanel styles={globalStyles} onChange={s => { setGlobalStyles(s); setIsDirty(true) }} />
              </div>
            )}

            {/* ── SEO tab ── */}
            {tab === 'seo' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
                <h2 className="text-sm font-semibold text-gray-900">SEO & sharing</h2>
                <div>
                  <label className="label">Page title <span className="text-gray-400">(overrides display name)</span></label>
                  <input value={seo.seoTitle} onChange={e => { setSeo(s => ({ ...s, seoTitle: e.target.value })); setIsDirty(true) }} className="input" placeholder={form.title || 'Page title'} />
                </div>
                <div>
                  <label className="label">Meta description</label>
                  <textarea value={seo.seoDescription} onChange={e => { setSeo(s => ({ ...s, seoDescription: e.target.value })); setIsDirty(true) }} rows={2} className="input resize-none" placeholder="A short description for search engines…" />
                </div>
                <div>
                  <label className="label">Social sharing image (OG image URL)</label>
                  <input value={seo.ogImage} onChange={e => { setSeo(s => ({ ...s, ogImage: e.target.value })); setIsDirty(true) }} className="input" placeholder="https://…" type="url" />
                  {seo.ogImage && <img src={seo.ogImage} alt="OG preview" className="mt-2 rounded-lg w-full max-h-32 object-cover border border-gray-100" />}
                </div>
              </div>
            )}

            {!isPro && (
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <Zap size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700">
                  Free plan — build and preview.{' '}
                  <Link href="/pricing" className="font-semibold underline">Upgrade to Pro</Link> to publish live.
                </p>
              </div>
            )}

            <button type="submit" disabled={isSaving || slugStatus === 'taken'} className="btn-primary w-full gap-2">
              {isSaving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : <><Save size={14} /> {published ? 'Save & publish' : 'Save draft'}</>}
            </button>
          </form>
        </div>

        {/* Feature request button — pinned to bottom */}
        <div className="p-4 md:px-6 border-t border-gray-100 bg-white">
          <button type="button" onClick={() => setShowFeatureRequest(true)}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition-colors">
            <Lightbulb size={13} /> Request a feature or section type
          </button>
        </div>
      </div>

      {/* ── Right preview panel ── */}
      <div className="hidden lg:flex flex-col w-[460px] shrink-0 border-l border-gray-100 bg-gray-50 sticky top-0 h-screen overflow-hidden">
        {/* Toggle bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Preview</span>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button type="button" onClick={() => setPreviewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${previewMode === 'mobile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="0.5" fill="currentColor"/></svg>
              Mobile
            </button>
            <button type="button" onClick={() => setPreviewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${previewMode === 'desktop' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Desktop
            </button>
          </div>
          {previewUrl && (
            <a href={previewUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors">
              <ExternalLink size={11} /> Open
            </a>
          )}
        </div>
        <div className="flex-1 overflow-y-auto flex items-start justify-center py-6 px-4">
          <PhonePreview title={form.title} description={form.description} avatar={form.avatar}
            template={template} sections={sections} mode={previewMode} />
        </div>
      </div>
    </div>
  )
}
