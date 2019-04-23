/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { css } from 'theme-ui'

// todo: figure out the best package for React material icons
import BoldIcon from '@material-ui/icons/FormatBold'
import ItalicIcon from '@material-ui/icons/FormatItalic'
import LinkIcon from '@material-ui/icons/InsertLink'
import ImageIcon from '@material-ui/icons/InsertPhoto'
import QuoteIcon from '@material-ui/icons/FormatQuote'
// import ListIcon from '@material-ui/icons/FormatListBulleted'
// import StrikethroughIcon from '@material-ui/icons/StrikethroughS'
// import HeadingIcon from '@material-ui/icons/Title'
// import CodeIcon from '@material-ui/icons/Code'
// import NumberedListIcon from '@material-ui/icons/FormatListNumbered'
// import ColorIcon from '@material-ui/icons/FormatColorText'
// import BackgroundColorIcon from '@material-ui/icons/FormatColorFill'

const Root = props => (
  <div
    {...props}
    css={css({
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      backgroundColor: 'white',
      paddingTop: 2,
      paddingBottom: 2,
      borderBottom: '1px solid'
    })}
  />
)

const IconButton = ({ active, ...props }) => (
  <button
    {...props}
    css={css({
      display: 'block',
      padding: 1,
      margin: '1px',
      color: active ? 'primary' : 'inherit',
      backgroundColor: active ? 'lightgray' : 'transparent',
      border: 0,
      '&:focus': {
        outline: '2px solid',
        color: 'primary'
      }
    })}
  />
)

const isActive = type => editor => {
  const block = editor.value.focusBlock || {}
  return (
    editor.value.activeMarks.some(mark => mark.type === type) ||
    editor.value.inlines.some(inline => inline.type === type) ||
    editor.hasBlock(type)
    // block.type === type
  )
}

// config
const buttons = [
  {
    title: 'Toggle Bold',
    Icon: BoldIcon,
    command: 'toggleBold',
    isActive: isActive('bold')
  },
  {
    title: 'Toggle Italic',
    Icon: ItalicIcon,
    command: 'toggleItalic',
    isActive: isActive('italic')
  },
  {
    title: 'Toggle Block Quote',
    Icon: QuoteIcon,
    command: 'toggleBlockQuote',
    isActive: isActive('block-quote')
  },
  {
    title: 'Insert Link',
    Icon: LinkIcon,
    command: 'toggleLink',
    isActive: isActive('link')
  },
  {
    title: 'Insert Image',
    Icon: ImageIcon,
    command: 'insertImage',
    isActive: isActive('image')
  }
]

export default props => {
  const { editor } = props

  return (
    <Root>
      {buttons.map(({ Icon, title, command, isActive }, i) => (
        <IconButton
          key={i}
          title={title}
          active={isActive(editor)}
          onClick={editor[command]}
        >
          <Icon size={20} />
        </IconButton>
      ))}
    </Root>
  )
}
