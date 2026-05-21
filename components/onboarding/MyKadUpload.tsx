'use client'

import { useState, useEffect } from 'react'

interface MyKadUploadProps {
  onUpload?: (uploaded: boolean) => void
}

type UploadState = 'idle' | 'uploading' | 'done' | 'error'

export function MyKadUpload({ onUpload }: MyKadUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [kycStatus, setKycStatus] = useState<string>('PENDING')

  // Fetch current KYC status on mount
  useEffect(() => {
    fetch('/api/kyc/status')
      .then(r => r.json())
      .then(data => {
        if (data.hasUploaded) {
          setKycStatus(data.kycStatus ?? 'SUBMITTED')
          setFileName('MyKad uploaded')
          setUploadState('done')
        }
      })
      .catch(() => {})
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Client-side validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Invalid file type. Use JPEG, PNG, WebP, or PDF.')
      setUploadState('error')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File too large. Max 10MB.')
      setUploadState('error')
      return
    }

    setFileName(file.name)
    setUploadState('uploading')
    setErrorMsg(null)

    const formData = new FormData()
    formData.append('mykad', file)

    try {
      const response = await fetch('/api/kyc/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setUploadState('done')
        setKycStatus('SUBMITTED')
        onUpload?.(true)
      } else {
        const data = await response.json()
        setErrorMsg(data.error ?? 'Upload failed')
        setUploadState('error')
      }
    } catch {
      setErrorMsg('Upload failed. Check your connection.')
      setUploadState('error')
    }
  }

  const statusColors: Record<string, string> = {
    PENDING: 'bg-gray-100 text-gray-600',
    SUBMITTED: 'bg-amber-100 text-amber-700',
    VERIFIED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  }
  const statusLabels: Record<string, string> = {
    PENDING: 'Not uploaded',
    SUBMITTED: 'Under review',
    VERIFIED: 'Verified',
    REJECTED: 'Rejected',
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
      <div className="text-4xl mb-3">🪪</div>
      <h3 className="font-semibold mb-1">Upload MyKad (Front & Back)</h3>
      <p className="text-sm text-gray-600 mb-4">
        Required for Labour talent verification. Your ID will be kept secure.
      </p>

      {/* Status badge */}
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${statusColors[kycStatus] ?? statusColors.PENDING}`}>
        {kycStatus === 'SUBMITTED' && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />}
        {kycStatus === 'VERIFIED' && '✓'}
        {statusLabels[kycStatus] ?? 'Not uploaded'}
      </div>

      {uploadState !== 'done' ? (
        <>
          <label className="inline-block cursor-pointer bg-emerald-50 border border-emerald-200 px-6 py-2 rounded-lg hover:bg-emerald-100 transition text-sm font-medium">
            {uploadState === 'uploading' ? 'Uploading...' : 'Choose File'}
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploadState === 'uploading'}
            />
          </label>

          {uploadState === 'error' && errorMsg && (
            <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
          )}
        </>
      ) : (
        <div className="space-y-2">
          <p className="text-green-600 font-medium text-sm">✓ {fileName}</p>
          <p className="text-xs text-gray-500">
            We'll review your MyKad within 24 hours. You'll be notified once verified.
          </p>
        </div>
      )}
    </div>
  )
}