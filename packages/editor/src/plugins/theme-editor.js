/** @jsx jsx */
import { useState } from 'react'
import { ThemeProvider, css } from 'theme-ui'
import { jsx, Global } from '@emotion/core'
import { EditProvider, FieldSet } from '@styled-system/edit'

import ColorFillIcon from '@material-ui/icons/FormatColorFill'
import CloseIcon from '@material-ui/icons/Close'

const demoFonts = [
  'system-ui, sans-serif',
  '"Avenir Next", sans-serif',
  'Georgia, serif',
  'Baskerville, serif',
  'Menlo, monospace',
  'Roboto, sans-serif',
  '"Roboto Condensed", sans-serif',
  'Poppins, sans-serif',
  'Montserrat, sans-serif',
  'Merriweather, serif'
]

const IconButton = props => (
  <button
    {...props}
    css={{
      display: 'block',
      position: 'fixed',
      top: 0,
      right: 0,
      margin: 8,
      color: 'inherit',
      backgroundColor: 'transparent',
      border: 0,
      padding: 4,
      '&:focus': {
        outline: '2px solid',
        color: 'primary'
      }
    }}
  />
)

const ThemeEditor = props => {
  const [edit, setEdit] = useState(false)
  if (!edit) {
    return (
      <IconButton
        title="Edit Theme"
        onClick={e => {
          setEdit(true)
        }}
      >
        <ColorFillIcon />
      </IconButton>
    )
  }
  return (
    <div>
      <div
        css={css({
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          width: 256,
          px: 16,
          pt: 48,
          color: 'black',
          bg: '#f6f6fc'
        })}
      >
        <FieldSet name="colors" type="color" />
        <FieldSet name="fonts" type="select" options={demoFonts} />
        <FieldSet
          name="fontWeights"
          type="number"
          step="100"
          min="100"
          max="900"
        />
        <FieldSet
          name="lineHeights"
          type="number"
          step={1 / 16}
          min={1}
          max={2}
        />
      </div>
      <IconButton
        title="Close Theme Editor"
        onClick={e => {
          setEdit(false)
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default (opts = {}) => ({
  renderEditor: (props, editor, next) => {
    const { theme } = opts
    const children = next()
    const { components } = props

    return (
      <ThemeProvider components={components} theme={theme}>
        <EditProvider>
          {children}
          <ThemeEditor />
          <Global
            styles={css({
              '*': {
                boxSizing: 'border-box'
              },
              body: {
                m: 0,
                fontFamily: 'system-ui, sans-serif',
                lineHeight: 1.5,
                color: 'text',
                bg: 'background',
                transitionProperty: 'background-color',
                transitionTimingFunction: 'ease-out',
                transitionDuration: '.4s'
              }
            })}
          />
        </EditProvider>
      </ThemeProvider>
    )
  }
})
