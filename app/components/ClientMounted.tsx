'use client'

import React, { useState, useEffect } from 'react'

interface ClientMounted {
  children: React.ReactNode
}

const ClientMounted: React.FC<ClientMounted> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return <>{children}</>
}

export default ClientMounted


/* TODO:  Hydration errors result from a mismatch between server- and client-rendered markup and differences in component states. Specifically, Next.js hydration errors arise when you wrap your components or HTML elements with an improper tag ! */