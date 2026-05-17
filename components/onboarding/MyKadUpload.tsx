'use client'

import { useState } from 'react'

interface MyKadUploadProps {
  onUpload?: (file: File) => void
}

export function MyKadUpload({ onUpload }: MyKadUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      if (onUpload) {
        onUpload(file)
      }
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
      <div className="text-4xl mb-4">🪪</div>
      <h3 className="font-semibold mb-2">Upload MyKad (Front & Back)</h3>
      <p className="text-sm text-gray-600 mb-4">
        Required for Labour talent verification. Your ID will be kept secure.
      </p>

      <label className="inline-block cursor-pointer bg-white border px-6 py-2 rounded-lg hover:bg-gray-50 transition">
        Choose File
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </label>

      {fileName && (
        <p className="mt-3 text-sm text-green-600">
          ✓ Uploaded: {fileName}
        </p>
      )}
    </div>
  )
}
