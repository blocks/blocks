import React, { Component } from 'react'
import { Editor, getEventRange, getEventTransfer } from 'slate-react'
import { keyboardEvent } from '@slate-editor/utils'
import DeepTable from 'slate-deep-table'
import { ThemeProvider, css } from 'theme-ui'
import { EditProvider, FieldSet } from '@styled-system/edit'
import { Global } from '@emotion/core'

import schema from '../lib/schema'
import initialValue from '!!raw-loader!../lib/value.mdx'
import { parseMDX, serializer } from '../lib/mdx-serializer'
import { isUrl, isImageUrl } from '../lib/util'

import theme from './theme'
import Icon from './Icon'

import NodesPlugin from '../plugins/nodes'
import MarksPlugin from '../plugins/marks'
import CodePlugin from '../plugins/code'
import LiveJSXPlugin from '../plugins/live-jsx'
import TablePlugin from '../plugins/table'
import ImagePlugin from '../plugins/image'
import MarkdownShortcutsPlugin from '../plugins/markdown-shortcuts'
import ListsPlugin from '../plugins/lists'

const styles = (
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
)

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

const plugins = [
  NodesPlugin(),
  MarksPlugin(),
  CodePlugin(),
  LiveJSXPlugin(),
  TablePlugin(),
  DeepTable({}),
  ImagePlugin(),
  MarkdownShortcutsPlugin(),
  ListsPlugin()
]

const insertImage = (change, src, target) => {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'image',
    data: { src }
  })
}

const insertLink = (change, href, target) => {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'link',
    data: { href }
  })
}

class BlockEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingThemeEditor: false,
      value: serializer.deserialize(
        parseMDX(props.initialValue || initialValue)
      )
    }
  }

  emitChange = () => {
    const { value } = this.state
    this.props.onChange({ value })
  }

  // think this can be a renderEditor plugin
  handleChange = ({ value }) => {
    this.setState({ value }, this.emitChange)
  }

  handleKeyDown = (event, change, next) => {
    // Keyboard shortcuts
    if (keyboardEvent.isMod(event) && event.key === 'b') {
      return change.toggleMark('bold').focus()
    }
    if (keyboardEvent.isMod(event) && !event.shiftKey && event.key === 'i') {
      return change.toggleMark('italic').focus()
    }

    // shortcuts
    switch (event.key) {
      case '/':
        this.setState({ commandMenu: true })
        return
      case 'Escape':
        this.setState({ emojiMenu: false })
        this.setState({ menu: false })
        return
      default:
        return next()
    }
  }

  handlePaste = (event, editor, next) => {
    const { value } = editor
    const { document, startBlock } = value

    const target = getEventRange(event, editor)
    const transfer = getEventTransfer(event)
    const { type, text } = transfer

    if (type === 'text' || type === 'fragment') {
      if (isImageUrl(text)) {
        return editor.command(insertImage, text, target)
      }

      if (isUrl(text)) {
        return editor.command(insertLink, text, target)
      }

      const parent = document.getParent(startBlock.key)
      // We're inside a table and pasting a fragment, for now lets
      // not allow embedded table pasting.
      if (type === 'fragment' && parent.type === 'table_cell') {
        return editor.insertText(text || '')
      }

      return next()
    }

    next()
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <EditProvider>
          <div style={{ minHeight: '100vh' }}>
            <Editor
              ref={editor => (this.editor = editor)}
              schema={schema}
              placeholder="Write some MDX..."
              plugins={plugins}
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onPaste={this.handlePaste}
              renderEditor={(_props, _editor, next) => {
                const children = next()

                return <>{children}</>
              }}
            />
            {styles}
            {this.state.showingThemeEditor ? (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, .05)',
                  padding: '20px',
                  minHeight: '100vh'
                }}
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
                <Icon
                  name="close"
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5
                  }}
                  onClick={() => this.setState({ showingThemeEditor: false })}
                />
              </div>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5
                }}
              >
                <Icon
                  name="format_color_fill"
                  onClick={() => this.setState({ showingThemeEditor: true })}
                />
              </div>
            )}
          </div>
        </EditProvider>
      </ThemeProvider>
    )
  }
}

export default BlockEditor
