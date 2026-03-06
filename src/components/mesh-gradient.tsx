'use client'

import dynamic from 'next/dynamic'
import { MeshGradientProps } from '@paper-design/shaders-react'

const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.MeshGradient),
  { ssr: false }
)

export function MeshGradientComponent({ speed, ...props }: MeshGradientProps) {
  return <MeshGradient {...props} speed={speed ? speed / 10 : 0.25} />
}
