'use client'

export default function EditableText({
  value,
  isEditing,
  onChange,
  className = '',
  rows = 4,
  label,
}: {
  value: string
  isEditing: boolean
  onChange?: (value: string) => void
  className?: string
  rows?: number
  label?: string
}) {
  if (!isEditing) {
    return (
      <div className={className}>
        <p className="whitespace-pre-wrap">{value}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows}
        className="w-full border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text)]
          bg-[var(--bg-elevated)] focus:outline-none focus:border-[var(--accent)] resize-y
          placeholder:text-[var(--text-muted)]"
      />
    </div>
  )
}
