interface PriceDisplayProps {
  price: number
}

export default function PriceDisplay({ price }: PriceDisplayProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Total Price</h2>
      <p className="text-3xl font-bold text-purple-600">${price}</p>
    </div>
  )
}

