'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function WatchStudioLanding() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const handleGetStarted = async () => {
    setIsLeaving(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    router.push('/studio')
  }

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen"
        >
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
            <div className="max-w-[980px] mx-auto px-6 py-3">
              <div className="flex items-center h-11">
                <Image
                  src="/placeholder.svg?height=22&width=80&text=WATCH"
                  alt="Apple Watch"
                  width={80}
                  height={22}
                  className="h-[22px] w-auto"
                  priority
                />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="pt-[44px] flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-[980px] mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-[21px] font-semibold mb-8">
                  Apple Watch Studio
                </h2>
                <motion.div 
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {[
                    "Choose a case.",
                    "Pick a band.",
                    "Create your own style."
                  ].map((text, i) => (
                    <motion.h1
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="text-[48px] sm:text-[56px] font-semibold leading-tight"
                    >
                      {text}
                    </motion.h1>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="pt-8"
                >
                  <Button
                    onClick={handleGetStarted}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-full px-8 py-4 text-[17px] font-medium transition-all duration-300 relative overflow-hidden"
                  >
                    <motion.span
                      animate={{
                        y: isHovered ? -30 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="block"
                    >
                      Get started
                    </motion.span>
                    <motion.span
                      animate={{
                        y: isHovered ? -30 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center translate-y-[30px]"
                    >
                      Get started
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Watch Image with Parallax Effect */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-16 relative"
              >
                <div className="max-w-[980px] mx-auto relative">
                  <motion.div
                    animate={{
                      y: isHovered ? -20 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <Image
                      src="/placeholder.svg?height=600&width=800&text=Apple+Watch"
                      alt="Apple Watch"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      priority
                    />
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.8) 100%)',
                        opacity: isHovered ? 1 : 0,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

