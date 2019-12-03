import { useLayoutEffect, useRef } from 'react'
import interpolate from 'interpolate-range'

export function useScrollSync(refs) {
  const timeoutId = useRef()
  const handleScroll = event => {
    const targetRef = refs.current.filter(
      ref => ref.contentDocument === event.target
    )[0]
    const syncedRefs = refs.current.filter(
      ref => ref.contentDocument !== event.target
    )
    const targetScrollTop = targetRef.contentWindow.pageYOffset
    const targetMaxHeight =
      targetRef.contentDocument.documentElement.scrollHeight -
      targetRef.contentWindow.innerHeight
    syncedRefs.forEach(ref => {
      const { documentElement } = ref.contentDocument
      removeEvent(ref.contentDocument)
      documentElement.style.willChange = 'scroll-position'
      const scrollY = interpolate({
        inputRange: [0, targetMaxHeight],
        outputRange: [
          0,
          documentElement.scrollHeight - ref.contentWindow.innerHeight
        ]
      })(targetScrollTop)
      ref.contentWindow.scrollTo(0, scrollY)
    })
    timeoutId.current = setTimeout(() => {
      syncedRefs.forEach(ref => {
        addEvent(ref.contentDocument)
        ref.contentDocument.documentElement.style.willChange = ''
      })
    }, 120)
  }
  const addEvent = document => {
    document.addEventListener('scroll', handleScroll, {
      passive: true
    })
  }
  const removeEvent = document => {
    document.removeEventListener('scroll', handleScroll, {
      passive: true
    })
  }
  useLayoutEffect(() => {
    const documents = refs.current
      .map(ref => (ref ? ref.contentDocument : null))
      .filter(Boolean)
    if (documents.length === 0) {
      return
    }
    documents.forEach(addEvent)
    return () => {
      documents.forEach(removeEvent)
    }
  })
}
