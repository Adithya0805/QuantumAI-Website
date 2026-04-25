import dynamic from 'next/dynamic'
import React from 'react'

// Skeletons
const Skeleton = () => <div className="w-full h-[400px] bg-white/5 animate-pulse rounded-3xl" />

export const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
})

export const Demo = dynamic(() => import('@/components/sections/Demo'), {
  loading: () => <Skeleton />,
})

export const Architecture = dynamic(() => import('@/components/sections/Architecture'), {
  loading: () => <Skeleton />,
})

export const CryptoTerminal = dynamic(() => import('@/components/sections/CryptoTerminal'), {
  loading: () => <Skeleton />,
})

export const QuantumCore = dynamic(() => import('@/components/sections/QuantumCore'), {
  loading: () => <Skeleton />,
})

export const SearchSupremacy = dynamic(() => import('@/components/sections/SearchSupremacy'), {
  loading: () => <Skeleton />,
})
