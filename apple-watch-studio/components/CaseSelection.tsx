'use client'

interface CaseSelectionProps {
  selectedCase: string | null
  setSelectedCase: (caseType: string) => void
}

export default function CaseSelection({ selectedCase, setSelectedCase }: CaseSelectionProps) {
  const cases = [
    { id: 'aluminum', name: 'Aluminum', color: 'bg-gray-300' },
    { id: 'titanium', name: 'Titanium', color: 'bg-gray-400' },
  ]

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Choose your case</h2>
      <div className="grid grid-cols-2 gap-4">
        {cases.map((caseType) => (
          <button
            key={caseType.id}
            onClick={() => setSelectedCase(caseType.id)}
            className={`p-4 rounded-lg ${
              selectedCase === caseType.id ? 'ring-2 ring-purple-500' : ''
            } hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
          >
            <div className={`w-16 h-16 rounded-full ${caseType.color} mx-auto mb-2`}></div>
            <span className="block text-center">{caseType.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

