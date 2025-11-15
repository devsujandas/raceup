'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CarDetail {
  id: string
  name: string
  image: string
  description: string
  specs: Array<{ label: string; value: string }>
  features: string[]
  textColor: string
  colorBg: string
}

export default function CarPage() {
  const params = useParams()
  const carId = params.id as string
  const [car, setCar] = useState<CarDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/cars.json')
      .then(res => res.json())
      .then(data => {
        const foundCar = data.cars.find((c: CarDetail) => c.id === carId)
        setCar(foundCar || null)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load car data:', err)
        setLoading(false)
      })
  }, [carId])

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-white text-lg animate-pulse">Loading...</p>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center flex-col gap-4">
        <h1 className="text-white text-4xl font-bold">Car Not Found</h1>
        <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition text-lg">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-20 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl sm:text-2xl hover:text-gray-300 transition">
            RaceUp
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm sm:text-base"
          >
            <i className="fas fa-arrow-left"></i> <span className="hidden sm:inline">Back</span>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">

            {/* TEXT (left side) */}
            <motion.div 
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {car.name}
              </h1>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                {car.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {car.specs.map((spec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition backdrop-blur-md"
                  >
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">{spec.label}</p>
                    <p className={`text-xl sm:text-2xl font-bold ${car.textColor}`}>
                      {spec.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CAR IMAGE (right side driving in) */}
            <motion.div
              initial={{ x: 250, opacity: 0, rotate: 4 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full aspect-square max-w-md">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 bg-white/5 border-y border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {car.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="flex items-center gap-4 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 backdrop-blur-sm"
              >
                <div className={`w-3 h-3 rounded-full ${car.textColor.replace('text-', 'bg-')}`}></div>
                <span className="text-lg font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Explore More Cars</h2>
        
        <Link 
          href="/"
          className={`inline-block mt-6 px-8 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${car.textColor} border-current hover:bg-white/10`}
        >
          Back to Showcase <i className="fas fa-arrow-right ml-2"></i>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-400">
          © 2025 RaceUp. All rights reserved.
        </div>
      </footer>

    </main>
  )
}
