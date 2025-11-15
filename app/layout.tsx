import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'RaceUp - Premium Car Showcase',
  description: 'Experience the ultimate collection of luxury and classic cars.',
  authors: [{ name: 'Sujan Das', url: 'https://sujandas.info' }],
  creator: 'Sujan Das',
  publisher: 'Sujan Das',
  metadataBase: new URL('https://sujandas.info'),
  keywords: [
    'Car Showcase',
    'Luxury Cars',
    'Supercars',
    '3D Animation',
    'RaceUp',
    'Sujan Das Portfolio'
  ],
  openGraph: {
    title: 'RaceUp - Premium Car Showcase',
    description: 'Explore premium cars with immersive visuals and animations.',
    url: 'https://sujandas.info',
    siteName: 'RaceUp',
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
        alt: 'RaceUp Car Showcase'
      }
    ],
    type: 'website',
  },

  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },    
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
