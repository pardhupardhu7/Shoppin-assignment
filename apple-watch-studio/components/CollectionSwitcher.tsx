'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface CollectionSwitcherProps {
  currentCollection: string
  setCurrentCollection: (collection: string) => void
}

export default function CollectionSwitcher({ currentCollection, setCurrentCollection }: CollectionSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const collections = ['Series 10', 'Hermès', 'SE']

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-lg font-medium text-left bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      >
        <span>{currentCollection}</span>
        <ChevronDown className={`${isOpen ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg">
          {collections.map((collection) => (
            <button
              key={collection}
              onClick={() => {
                setCurrentCollection(collection)
                setIsOpen(false)
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
            >
              {collection}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

