'use client'

import { useCallback, useState } from 'react'
import { Upload, Check, AlertCircle } from 'lucide-react'

interface MyKadUploadProps {
  onUpload?: (fileUrl: string) => void
}

export function MyKadUpload({ onUpload }: MyKadUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploaded, setUploaded] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback(async (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, WebP or PDF files are accepted.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10MB.')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('mykad', file)

      const res = await fetch('/api/kyc/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await res.json()
      setFileUrl(data.fileUrl)
      setUploaded(true)
      setPreview(URL.createObjectURL(file))
      onUpload?.(data.fileUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }, [onUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      className={`border-2 border-dashed rounded-2xl p-6 text-center transition ${
        dragOver
          ? 'border-teal-500 bg-teal-50'
          : uploaded
            ? 'border-teal-400 bg-teal-50/50'
            : 'border-slate-200 hover:border-teal-300 bg-white'
      }`}
    >
      {uploaded && preview ? (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-teal-700">
            <Check className="w-5 h-5" />
            <span className="font-medium text-sm">MyKad uploaded</span>
          </div>
          {preview && fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-teal-600 hover:underline"
            >
              View file →
            </a>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
              <Upload className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Upload MyKad (front & back)
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPEG, WebP or PDF · Max 10MB
              </p>
            </div>
          </div>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Choose file'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              onChange={handleInput}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </>
      )}

      {error && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-red-600 justify-center">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </div>
      )}
    </div>
  )
}
