import React, { useEffect, useState } from 'react'
import Editor from 'blocks-ui'
import * as Blocks from '@blocks/react'

import useDebounce from '../use-debounce'

const PAGE = 'foo.js'

const Layout = props => {
  return <div className="layout">{props.children}</div>
}

export default ({ relativePath = PAGE }) => {
  const [code, setCode] = useState(null)
  const debouncedCode = useDebounce(code)

  useEffect(() => {
    const initializeCode = async () => {
      const res = await fetch('/___blocks/src', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page: relativePath
        })
      })
      const srcCode = await res.text()
      setCode(srcCode)
    }

    initializeCode()
  }, [])

  useEffect(() => {
    if (!debouncedCode) {
      return
    }

    fetch('/___blocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: debouncedCode,
        page: relativePath
      })
    })
  }, [debouncedCode])

  if (!code) {
    return null
  }

  return (
    <Editor
      src={code}
      blocks={Blocks}
      layout={Layout}
      onChange={newCode => {
        setCode(newCode)
      }}
    />
  )
}
