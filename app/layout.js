'use client'

import './globals.css'
import { useEffect } from 'react'

export default function RootLayout({ children }) {
  useEffect(() => {
    // Load LencoPay script
    const script = document.createElement('script')
    script.src = '/lenco.js'
    script.nonce = 294
    script.onload = () => {
      console.log('LencoPay script loaded')
    }
    document.body.appendChild(script)

    // Clean up script when component unmounts
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Payment Methods</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
          integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
          crossOrigin="anonymous"
          async  
        ></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
