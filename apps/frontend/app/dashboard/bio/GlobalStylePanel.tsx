'use client'
import { FONT_PAIRS } from './types'
import type { GlobalStyles } from './types'

const RADIUS_OPTIONS = [
  { id: 'sharp', label: 'Sharp' },
  { id: 'soft',  label: 'Soft' },
  { id: 'round', label: 'Round' },
] as const

const BUTTON_OPTIONS = [
  { id: 'filled',   label: 'Filled' },
  { id: 'outlined', label: 'Outlined' },
  { id: 'ghost',    label: 'Ghost' },
] as const

const SPACING_OPTIONS = [
  { id: 'compact', label: 'Compact' },
  { id: 'normal',  label: 'Normal' },
  { id: 'airy',    label: 'Airy' },
] as const

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs text-gray-600">{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="w-7 h-7 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white" />
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="w-20 text-xs border border-gray-200 rounded-lg px-2 py-1.5 font-mono focus:outline-none focus:border-blue-400" />
      </div>
    </div>
  )
}

function SegmentedControl<T extends string>({
  options, value, onChange,
}: { options: readonly { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
      {options.map(o => (
        <button key={o.id} type="button" onClick={() => onChange(o.id)}
          className={`flex-1 text-xs py-1 rounded-md font-medium transition-colors ${
            value === o.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function GlobalStylePanel({
  styles, onChange,
}: { styles: GlobalStyles; onChange: (s: GlobalStyles) => void }) {
  const set = <K extends keyof GlobalStyles>(key: K, val: GlobalStyles[K]) =>
    onChange({ ...styles, [key]: val })

  return (
    <div className="space-y-5">
      {/* Colors */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Colors</p>
        <ColorField label="Primary color"    value={styles.primaryColor}   onChange={v => set('primaryColor', v)} />
        <ColorField label="Secondary color"  value={styles.secondaryColor} onChange={v => set('secondaryColor', v)} />
        <ColorField label="Background color" value={styles.bgColor}        onChange={v => set('bgColor', v)} />
      </div>

      {/* Font pair */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Font Pair</p>
        <select value={styles.fontPair} onChange={e => set('fontPair', e.target.value)}
          className="input text-sm">
          {FONT_PAIRS.map(f => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Border radius */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Border Radius</p>
        <SegmentedControl options={RADIUS_OPTIONS} value={styles.borderRadius} onChange={v => set('borderRadius', v)} />
      </div>

      {/* Button style */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Button Style</p>
        <SegmentedControl options={BUTTON_OPTIONS} value={styles.buttonStyle} onChange={v => set('buttonStyle', v)} />
      </div>

      {/* Spacing */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Spacing</p>
        <SegmentedControl options={SPACING_OPTIONS} value={styles.spacing} onChange={v => set('spacing', v)} />
      </div>
    </div>
  )
}
