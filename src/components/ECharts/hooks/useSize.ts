import { useState, useEffect, useRef } from 'react'

interface Size {
  width: number
  height: number
}

export function useSize() {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current
        setSize({
          width: offsetWidth,
          height: offsetHeight
        })
      }
    }

    // 初始化大小
    updateSize()

    // 监听窗口大小变化
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return { size, containerRef }
}
