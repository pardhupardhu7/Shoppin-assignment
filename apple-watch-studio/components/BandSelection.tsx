'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BandSelectionProps {
  selectedBand: string | null
  setSelectedBand: (band: string) => void
}

export default function BandSelection({ selectedBand, setSelectedBand }: BandSelectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const bands = [
    { id: 'solo-loop', name: 'Solo Loop', color: 'bg-blue-500' },
    { id: 'braided-solo-loop', name: 'Braided Solo Loop', color: 'bg-green-500' },
    { id: 'sport-band', name: 'Sport Band', color: 'bg-red-500' },
    { id: 'leather-link', name: 'Leather Link', color: 'bg-yellow-500' },
  ]

  const nextBand = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bands.length)
  }

  const prevBand = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bands.length) % bands.length)
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Choose your band</h2>
      <div className="relative">
        <button
          onClick={prevBand}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex justify-center items-center space-x-4 overflow-hidden">
          {[...bands, ...bands, ...bands].slice(currentIndex, currentIndex + 3).map((band, index) => (
            <button
              key={`${band.id}-${index}`}
              onClick={() => setSelectedBand(band.id)}
              className={`p-4 rounded-lg ${
                selectedBand === band.id ? 'ring-2 ring-purple-500' : ''
              } hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
            >
              <div className={`w-16 h-16 rounded-full ${band.color} mx-auto mb-2`}></div>
              <span className="block text-center">{band.name}</span>
            </button>
          ))}
        </div>
        <button
          onClick={nextBand}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

