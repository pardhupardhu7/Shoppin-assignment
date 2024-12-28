'use client'

interface SizeSelectionProps {
  selectedSize: string | null
  setSelectedSize: (size: string) => void
}

export default function SizeSelection({ selectedSize, setSelectedSize }: SizeSelectionProps) {
  const sizes = ['42mm', '46mm']

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Choose your size</h2>
      <div className="flex space-x-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-6 py-2 rounded-full ${
              selectedSize === size
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } hover:bg-purple-600 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

