'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { watchImages } from '@/lib/watchImages'

type WatchSize = '41mm' | '45mm'
type CaseType = 'Aluminum' | 'Titanium'
type BandType = 'Solo Loop' | 'Sport Band' | 'Braided Solo Loop' | 'Nike Sport Loop' | 'Nike Sport Band'

type WatchConfiguration = {
  size: WatchSize
  caseType: CaseType
  caseColor: string
  bandType: BandType
  bandColor: string
}

const caseColors = {
  Aluminum: ['Midnight', 'Starlight', 'Silver', 'Pink'],
  Titanium: ['Natural', 'Black']
}

const bandColors = {
  'Solo Loop': ['Black', 'Storm Blue', 'Starlight', 'Pink Sand'],
  'Sport Band': ['Black', 'Midnight', 'Starlight', 'Pink'],
  'Braided Solo Loop': ['Pride Edition', 'Black', 'Blue', 'Beige'],
  'Nike Sport Loop': ['Black/Anthracite', 'Summit White', 'Olive Grey'],
  'Nike Sport Band': ['Black/Anthracite', 'Summit White', 'Olive Grey']
}

export default function WatchStudio() {
  const [activeTab, setActiveTab] = useState<'Size' | 'Case' | 'Band'>('Size')
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false)
  const [configuration, setConfiguration] = useState<WatchConfiguration>({
    size: '45mm',
    caseType: 'Aluminum',
    caseColor: 'Midnight',
    bandType: 'Solo Loop',
    bandColor: 'Black'
  })

  const collections = [
    'Apple Watch Series 10',
    'Apple Watch Hermès Series 10',
    'Apple Watch SE'
  ]

  const [selectedCollection, setSelectedCollection] = useState(collections[0])

  const bandCarouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const checkScroll = () => {
      if (bandCarouselRef.current) {
        setCanScrollLeft(bandCarouselRef.current.scrollLeft > 0)
        setCanScrollRight(
          bandCarouselRef.current.scrollLeft <
          bandCarouselRef.current.scrollWidth - bandCarouselRef.current.clientWidth
        )
      }
    }

    bandCarouselRef.current?.addEventListener('scroll', checkScroll)
    checkScroll()

    return () => bandCarouselRef.current?.removeEventListener('scroll', checkScroll)
  }, [])

  const scrollBandCarousel = (direction: 'left' | 'right') => {
    if (bandCarouselRef.current) {
      const scrollAmount = bandCarouselRef.current.clientWidth
      bandCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const updateConfiguration = (key: keyof WatchConfiguration, value: string) => {
    setConfiguration(prev => ({ ...prev, [key]: value as any }))
  }

  const getWatchImage = () => {
    const caseImage = watchImages.cases[configuration.caseType][configuration.caseColor]
    const bandImage = watchImages.bands[configuration.bandType][configuration.bandColor]
    return { caseImage, bandImage }
  }

  const { caseImage, bandImage } = getWatchImage()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[980px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between h-11">
            <Image
              src="https://placehold.co/80x22/png?text=WATCH"
              alt="Apple Watch"
              width={80}
              height={22}
              className="h-[22px] w-auto"
              priority
            />
            <div className="relative">
              <button
                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                className="flex items-center gap-2 text-[17px] font-medium"
              >
                Collections
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  isCollectionsOpen && "rotate-180"
                )} />
              </button>
              <AnimatePresence>
                {isCollectionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                  >
                    {collections.map((collection) => (
                      <button
                        key={collection}
                        onClick={() => {
                          setSelectedCollection(collection)
                          setIsCollectionsOpen(false)
                        }}
                        className={cn(
                          "w-full px-4 py-2 text-left text-[15px]",
                          "hover:bg-gray-50",
                          selectedCollection === collection && "font-medium"
                        )}
                      >
                        {collection}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="text-[17px] font-medium text-blue-600">
              Save
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[76px] min-h-screen">
        <div className="max-w-[980px] mx-auto">
          {/* Watch Preview */}
          <div className="flex justify-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-[400px] h-[400px]"
            >
              <Image
                src={caseImage}
                alt="Apple Watch Case"
                width={400}
                height={400}
                className="w-full h-full object-contain"
                priority
              />
              <Image
                src={bandImage}
                alt="Apple Watch Band"
                width={400}
                height={100}
                className="absolute bottom-0 left-0 right-0 w-full h-1/4 object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="text-center mb-8">
            <h1 className="text-[21px] font-semibold">
              {configuration.size} {configuration.caseType} Case
            </h1>
            <p className="text-[17px] text-gray-500">
              with {configuration.bandType}
            </p>
            <p className="text-[17px] mt-2">From $429</p>
          </div>

          {/* Configuration Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {['Size', 'Case', 'Band'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={cn(
                  "px-6 py-2 rounded-full text-[15px] font-medium",
                  "transition-colors duration-200",
                  activeTab === tab
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Options Grid */}
          <div className="px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'Size' && (
                  <div className="flex justify-center gap-8">
                    {(['41mm', '45mm'] as WatchSize[]).map((size) => (
                      <button
                        key={size}
                        onClick={() => updateConfiguration('size', size)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-colors",
                          configuration.size === size
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div className="aspect-square relative mb-4 w-40 h-40">
                          <Image
                            src={watchImages.sizes[size]}
                            alt={size}
                            width={160}
                            height={160}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-[17px] font-medium">{size}</div>
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === 'Case' && (
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {(['Aluminum', 'Titanium'] as CaseType[]).map((caseType) => (
                        <button
                          key={caseType}
                          onClick={() => updateConfiguration('caseType', caseType)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-colors",
                            configuration.caseType === caseType
                              ? "border-blue-500"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="aspect-square relative mb-4">
                            <Image
                              src={watchImages.cases[caseType][caseColors[caseType][0]]}
                              alt={caseType}
                              width={200}
                              height={200}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-[17px] font-medium">{caseType}</div>
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {caseColors[configuration.caseType].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateConfiguration('caseColor', color)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-colors",
                            configuration.caseColor === color
                              ? "border-blue-500"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="aspect-square relative mb-4">
                            <Image
                              src={watchImages.cases[configuration.caseType][color]}
                              alt={color}
                              width={100}
                              height={100}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-[15px]">{color}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'Band' && (
                  <div>
                    <div className="relative">
                      <button
                        onClick={() => scrollBandCarousel('left')}
                        className={cn(
                          "absolute left-0 top-1/2 transform -translate-y-1/2 z-10",
                          "bg-white rounded-full p-2 shadow-md",
                          "transition-opacity duration-200",
                          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <div
                        ref={bandCarouselRef}
                        className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
                      >
                        {Object.keys(bandColors).map((bandType) => (
                          <button
                            key={bandType}
                            onClick={() => updateConfiguration('bandType', bandType as BandType)}
                            className={cn(
                              "flex-shrink-0 p-4 rounded-xl border-2 transition-colors",
                              configuration.bandType === bandType
                                ? "border-blue-500"
                                : "border-gray-200 hover:border-gray-300"
                            )}
                          >
                            <div className="aspect-square relative mb-4 w-40 h-40">
                              <Image
                                src={watchImages.bands[bandType as BandType][bandColors[bandType as BandType][0]]}
                                alt={bandType}
                                width={160}
                                height={160}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-[17px] font-medium whitespace-nowrap">{bandType}</div>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => scrollBandCarousel('right')}
                        className={cn(
                          "absolute right-0 top-1/2 transform -translate-y-1/2 z-10",
                          "bg-white rounded-full p-2 shadow-md",
                          "transition-opacity duration-200",
                          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-8">
                      {bandColors[configuration.bandType].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateConfiguration('bandColor', color)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-colors",
                            configuration.bandColor === color
                              ? "border-blue-500"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="aspect-square relative mb-4">
                            <Image
                              src={watchImages.bands[configuration.bandType][color]}
                              alt={color}
                              width={100}
                              height={100}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-[15px]">{color}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

