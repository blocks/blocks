/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react'
import { navigate } from 'gatsby'

const DEFAULT_PAGE_JSX = `
import React from "react";
import { Blocks, QuoteBasic } from "@blocks/react";

export default () => (
  <Blocks.Root>
    <QuoteBasic>
      <QuoteBasic.Content>Science is magic that works.</QuoteBasic.Content>
      <QuoteBasic.Author>Kurt Vonnegut</QuoteBasic.Author>
    </QuoteBasic>
  </Blocks.Root>
);
`

export default () => {
  const [pages, setPages] = useState(null)
  const [newPage, setNewPage] = useState('')

  useEffect(() => {
    const initializePages = async () => {
      const res = await fetch('/___blocks/pages')
      const allPages = await res.json()
      setPages(allPages)
    }

    initializePages()
  }, [])

  if (!pages) {
    return null
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!newPage) {
      return
    }

    const page = newPage.endsWith('.js') ? newPage : newPage + '.js'

    await fetch('/___blocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: DEFAULT_PAGE_JSX,
        page
      })
    })

    navigate(`/___blocks/edit?page=${page}`)
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          New page <br />
          <input onChange={e => setNewPage(e.target.value)} />
          <input type="submit" value="Create new page" />
        </label>
      </form>
      <ul sx={{ mt: [3, 4, 5] }}>
        {pages.map(page => (
          <li key={page}>
            <a href={`/___blocks/edit?page=${page}`}>{page}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
