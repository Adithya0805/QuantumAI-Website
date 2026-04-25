"use client"

import React from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SceneErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Scene rendering error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center p-8 bg-[#050508] border border-white/10 rounded-[2.5rem] shadow-2xl max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4 font-grotesk">Scene Rendering Error</h2>
            <p className="text-white/60 mb-8 text-sm">{this.state.error?.message || 'An unexpected error occurred in the 3D engine.'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-primary text-black rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
