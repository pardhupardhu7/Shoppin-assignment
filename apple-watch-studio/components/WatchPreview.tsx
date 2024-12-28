'use client'

interface WatchPreviewProps {
  selectedCase: string | null
  selectedSize: string | null
  selectedBand: string | null
}

export default function WatchPreview({ selectedCase, selectedSize, selectedBand }: WatchPreviewProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Your Apple Watch</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="w-64 h-64 mx-auto relative">
          {/* Placeholder for watch case */}
          <div className={`absolute inset-0 rounded-lg ${
            selectedCase === 'aluminum' ? 'bg-gray-300' : 'bg-gray-400'
          }`}></div>
          {/* Placeholder for watch face */}
          <div className="absolute inset-4 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">{selectedSize || '42mm'}</span>
          </div>
          {/* Placeholder for watch band */}
          <div className={`absolute inset-x-0 -top-8 -bottom-8 ${
            selectedBand === 'solo-loop' ? 'bg-blue-500' :
            selectedBand === 'braided-solo-loop' ? 'bg-green-500' :
            selectedBand === 'sport-band' ? 'bg-red-500' :
            selectedBand === 'leather-link' ? 'bg-yellow-500' :
            'bg-gray-500'
          }`}></div>
        </div>
      </div>
    </div>
  )
}

