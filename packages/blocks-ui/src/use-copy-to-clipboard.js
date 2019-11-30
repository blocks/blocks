import { useCallback, useState } from 'react'

const copy = toCopy => {
  const el = document.createElement(`textarea`)
  el.value = toCopy
  el.setAttribute(`readonly`, ``)
  el.style.position = `absolute`
  el.style.left = `-9999px`
  document.body.appendChild(el)
  el.select()
  document.execCommand(`copy`)
  document.body.removeChild(el)
}

const useCopyToClipboard = () => {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = useCallback(
    toCopy => {
      if (hasCopied) return
      copy(toCopy)
      setHasCopied(true)
      setTimeout(() => {
        setHasCopied(false)
      }, 2000)
    },
    [hasCopied]
  )

  return { hasCopied, copyToClipboard }
}

export default useCopyToClipboard
