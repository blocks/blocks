/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { css } from 'theme-ui'
import { Link2 } from 'react-feather'

// todo: figure out the best package for React material icons
import BoldIcon from '@material-ui/icons/FormatBold'
import ItalicIcon from '@material-ui/icons/FormatItalic'
import LinkIcon from '@material-ui/icons/InsertLink'
import ColorIcon from '@material-ui/icons/FormatColorText'
import BackgroundColorIcon from '@material-ui/icons/FormatColorFill'

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
  return (
    editor.value.activeMarks.some(mark => mark.type === type) ||
    editor.value.inlines.some(inline => inline.type === type)
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
    title: 'Insert Link',
    Icon: LinkIcon,
    command: 'toggleLink',
    isActive: isActive('link')
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
