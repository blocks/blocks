import { useState, useLayoutEffect, useCallback } from 'react'

const getSize = el => {
  if (!el) {
    return {
      width: 0,
      height: 0
    }
  }
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

export const useElementSize = ref => {
  const [elementSize, setElementSize] = useState(
    getSize(ref ? ref.current : {})
  )

  const handleResize = useCallback(() => {
    if (ref.current) {
      setElementSize(getSize(ref.current))
    }
  }, [ref])

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    handleResize()

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(function() {
        handleResize()
      })
      resizeObserver.observe(ref.current)
      return function() {
        resizeObserver.disconnect(ref.current)
        resizeObserver = null
      }
    } else {
      window.addEventListener('resize', handleResize)
      return function() {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [ref.current])

  return elementSize
}
