'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Mousewheel, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import '@/app/swiper.css'

const cars = [
  {
    id: 'lamborghini',
    name: 'Lamborghini Aventador',
    color: 'yellow',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1-D1vxyfnozhmD6YPul1K4gXEGz3U3nO.png',
    specs: { speed: '302 MPH', acceleration: '0-100 KMPH', power: '350 KW' }
  },
  {
    id: 'cadillac',
    name: 'Classic Cadillac',
    color: 'red',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2-fIVaahs7xYCqzjhl9wmMoJZ97Oz3w5.png',
    specs: { speed: '302 MPH', acceleration: '0-100 KMPH', power: '350 KW' }
  },
  {
    id: 'bugatti',
    name: 'Bugatti Chiron',
    color: 'blue',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-3-6fAcWNdizNQI666CQ0BwxgICZ5vXHm.png',
    specs: { speed: '302 MPH', acceleration: '0-100 KMPH', power: '350 KW' }
  }
]

export default function Home() {
  const firstSlideRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // GSAP animations for first slide
    if (firstSlideRef.current) {
      gsap.from(firstSlideRef.current.querySelector('.color-bg'), {
        y: -1000,
        duration: 2
      })
      gsap.from(firstSlideRef.current.querySelector('.black-bg'), {
        y: 1000,
        duration: 2
      })
      gsap.from(firstSlideRef.current.querySelector('img'), {
        x: 1000,
        duration: 2
      })
      gsap.from(firstSlideRef.current.querySelector('.small-text'), {
        y: 100,
        opacity: 0,
        delay: 2.1
      })
      gsap.from(firstSlideRef.current.querySelectorAll('.big-text span'), {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        delay: 2.1
      })
    }
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-5">

        {/* Logo */}
        <Link
  href="/"
  className="font-bold drop-shadow-lg hover:opacity-90 transition flex items-end gap-1"
>
  <span className="text-white text-2xl font-script">Race</span>
  <span className="text-yellow-400 text-3xl font-script leading-none">Up</span>
</Link>


        {/* Menu Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-full border-white flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition border-2"
          aria-label="Menu"
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
        </button>

        {menuOpen && (
          <div className="absolute top-full right-10 mt-2 bg-black/90 border border-white/20 rounded-lg p-4 min-w-48">
            <ul className="space-y-3">
              <li><Link href="/" className="text-white hover:text-yellow-400 transition">Home</Link></li>
              <li><Link href="/cars/lamborghini" className="text-white hover:text-yellow-400 transition">Lamborghini</Link></li>
              <li><Link href="/cars/cadillac" className="text-white hover:text-red-500 transition">Cadillac</Link></li>
              <li><Link href="/cars/bugatti" className="text-white hover:text-cyan-400 transition">Bugatti</Link></li>
            </ul>
          </div>
        )}
      </nav>


      {/* Social */}
<div className="absolute top-24 left-10 z-20 flex flex-col items-center gap-4">
  <div className="w-px h-72 bg-white"></div>
  <a href="#" className="text-white hover:text-gray-300 transition" title="Facebook" aria-label="Facebook">
    <i className="fab fa-facebook text-xl"></i>
  </a>
  <a href="#" className="text-white hover:text-gray-300 transition" title="Instagram" aria-label="Instagram">
    <i className="fab fa-instagram text-xl"></i>
  </a>
  <a href="#" className="text-white hover:text-gray-300 transition" title="Twitter" aria-label="Twitter">
    <i className="fab fa-twitter text-xl"></i>
  </a>
</div>


      {/* Swiper Carousel */}
      <Swiper
        modules={[Pagination, Mousewheel, EffectCoverflow]}
        direction="vertical"
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        effect="coverflow"
        speed={2000}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"><span>${String(index + 1).padStart(2, '0')}</span></span>`
          },
        }}
        className="w-full h-full"
      >
        {cars.map((car, index) => (
          <SwiperSlide key={car.id} ref={index === 0 ? firstSlideRef : null}>
            <CarSlide car={car} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Styles */}
      <style jsx>{`
  /* Pagination Container */
  :global(.swiper-pagination) {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 30px;                /* premium balanced spacing */
    z-index: 50;
  }

  /* Inactive Items (01, 03) */
  :global(.swiper-pagination-bullet) {
    background: transparent !important;
    width: auto !important;
    height: auto !important;
    padding: 2px 0;           /* perfect vertical alignment */
    color: #b3b3b3 !important; /* softer grey for premium feel */
    opacity: 1 !important;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.5px;    /* premium micro-kerning */
    transition: all .25s ease;
  }

  /* ACTIVE Bullet (the oval) */
  :global(.swiper-pagination-bullet-active) {
    padding: 8px 22px;        /* perfect oval shape */
    border: 2px solid #ffffff;
    border-radius: 999px;
    color: #ffffff !important;
    background: transparent !important;
    font-size: 17px !important;
    font-weight: 700;
    letter-spacing: 0.7px;    /* slight wide tracking = premium */
    transform: translateX(3px); /* small push for subtle focus */
    transition: all .28s ease;  /* smoother transition */
  }

  /* Number inside bullet */
  :global(.swiper-pagination-bullet span) {
    display: inline-block;
    transform: translateY(1px); /* visually centered text */
  }
`}</style>

    </main>
  )
}

function CarSlide({ car }: { car: (typeof cars)[0] }) {
  const colorClass = car.color === 'yellow' ? 'bg-yellow-400' : 
                     car.color === 'red' ? 'bg-red-900' : 
                     'bg-cyan-400'
  
  const textColorClass = car.color === 'yellow' ? 'text-yellow-400 border-yellow-400' :
                         car.color === 'red' ? 'text-red-500 border-red-500' :
                         'text-cyan-400 border-cyan-400'

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Color Background */}
      <div className={`color-bg absolute left-0 top-0 w-2/5 h-full ${colorClass} z-0`}></div>

      {/* Black Background */}
      <div className="black-bg absolute right-0 top-0 w-3/5 h-full bg-black z-0"></div>

      {/* Content */}
      <div className="w-full h-full flex items-center justify-center relative z-10">
        {/* Title */}
        <div className="absolute top-20 left-1/4 text-white text-shadow">
          <div className="small-text font-script text-5xl drop-shadow-lg">Let's</div>
          <div className="big-text font-bold text-9xl font-sans drop-shadow-lg">
            <span>R</span><span>A</span><span>C</span><span>E</span>
          </div>
        </div>

        {/* Car Image */}
        <div className="absolute w-3/5 h-3/5">
          <img 
            src={car.image || "/placeholder.svg"} 
            alt={car.name} 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>


{/* Specs */}
<div
  className={`
    absolute 
    bottom-24   /* moved UP */
    left-1/2 md:left-2/5
    -translate-x-1/2 md:translate-x-0

    flex flex-col sm:flex-row
    items-center
    gap-2 sm:gap-6 md:gap-10

    text-white   /* white text */
    text-xs sm:text-sm md:text-base
    font-semibold
  `}
>
  <span><b>302</b> MPH</span>
  <span><b>0-100</b> KMPH</span>
  <span><b>350</b> KW</span>

  <Link
    href={`/cars/${car.id}`}
    className={`
      px-5 sm:px-7 md:px-10 
      py-1.5 md:py-2 
      rounded-full border border-white
      text-white

      hover:bg-white/10 
      transition-all 
      duration-300

      flex items-center gap-2
      whitespace-nowrap
      no-underline

      mt-2 sm:mt-0   /* mobile spacing fix */
    `}
  >
    Discover Now 
    <i className="fas fa-arrow-right text-xs sm:text-sm"></i>
  </Link>
</div>




      </div>
    </div>
  )
}
