'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { verifyPassword } from '../app/actions/auth'

export default function EditToolbar({
  isEditing,
  onAuth,
  onSave,
  onCancel,
}: {
  isEditing: boolean
  onAuth: () => void
  onSave: () => void
  onCancel: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showPassword) inputRef.current?.focus()
  }, [showPassword])

  const handleSubmit = () => {
    setError('')
    startTransition(async () => {
      const result = await verifyPassword(password)
      if (result.success) {
        setPassword('')
        setShowPassword(false)
        onAuth()
      } else {
        setError(result.error ?? '비밀번호가 틀렸습니다.')
      }
    })
  }

  if (isEditing) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-surface)]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[720px] px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-[var(--accent)] font-semibold uppercase tracking-wider">Edit Mode</span>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] text-[var(--text-sub)] hover:bg-[var(--bg-elevated)] transition"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 text-sm rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showPassword) {
    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => { setShowPassword(false); setPassword(''); setError('') }}
        />
        <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-6 w-80">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-3 uppercase tracking-wider">Password</h3>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter password"
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)]
              bg-[var(--bg-elevated)] focus:outline-none focus:border-[var(--accent)] mb-3 placeholder:text-[var(--text-muted)]"
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { setShowPassword(false); setPassword(''); setError('') }}
              className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] text-[var(--text-sub)] hover:bg-[var(--bg-elevated)] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending || !password}
              className="px-3 py-1.5 text-xs rounded-lg bg-[var(--accent)] text-white transition
                disabled:opacity-30 hover:bg-[var(--accent-hover)]"
            >
              {isPending ? '...' : 'Confirm'}
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <button
      onClick={() => setShowPassword(true)}
      className="px-3 py-1 text-xs rounded-lg border border-[var(--border)] text-[var(--text-muted)]
        hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
    >
      Edit
    </button>
  )
}
