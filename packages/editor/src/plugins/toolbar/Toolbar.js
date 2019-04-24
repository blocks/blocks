/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'theme-ui'

// todo: figure out the best package for React material icons
import BoldIcon from '@material-ui/icons/FormatBold'
import ItalicIcon from '@material-ui/icons/FormatItalic'
import LinkIcon from '@material-ui/icons/InsertLink'
import ImageIcon from '@material-ui/icons/InsertPhoto'
import QuoteIcon from '@material-ui/icons/FormatQuote'
import CodeIcon from '@material-ui/icons/Code'
// import ListIcon from '@material-ui/icons/FormatListBulleted'
// import StrikethroughIcon from '@material-ui/icons/StrikethroughS'
// import HeadingIcon from '@material-ui/icons/Title'
// import NumberedListIcon from '@material-ui/icons/FormatListNumbered'
// import ColorIcon from '@material-ui/icons/FormatColorText'
// import BackgroundColorIcon from '@material-ui/icons/FormatColorFill'

// "icons"
const B = props => (
  <b
    {...props}
    css={{
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 2
    }}
  />
)
const H1 = () => <B>H1</B>
const H2 = () => <B>H2</B>
const JSX = () => <B>JSX</B>

const Separator = () => (
  <div
    css={css({
      width: '1px',
      mx: 2,
      height: 24,
      bg: 'gray'
    })}
  />
)

const Root = props => (
  <div
    {...props}
    css={theme =>
      css({
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: '1px solid',
        borderColor: theme.colors.gray
      })(theme)
    }
  />
)

const IconButton = ({ active, ...props }) => (
  <button
    {...props}
    css={css({
      display: 'block',
      minWidth: 32,
      height: 32,
      padding: 1,
      fontSize: 16,
      lineHeight: 1.5,
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
    editor.value.inlines.some(inline => inline.type === type) ||
    editor.hasBlock(type) ||
    editor.hasOuterBlock(type)
  )
}

// config
const buttons = [
  {
    title: 'Toggle Bold (⌘ B)',
    Icon: BoldIcon,
    command: 'toggleBold',
    isActive: isActive('bold')
  },
  {
    title: 'Toggle Italic (⌘ I)',
    Icon: ItalicIcon,
    command: 'toggleItalic',
    isActive: isActive('italic')
  },
  {
    title: 'Toggle Heading Level 1 (⌘ ⌥ 1)',
    Icon: H1,
    command: 'toggleHeadingOne',
    isActive: isActive('heading-one')
  },
  {
    title: 'Toggle Heading Level 2 (⌘ ⌥ 2)',
    Icon: H2,
    command: 'toggleHeadingTwo',
    isActive: isActive('heading-two')
  },
  {
    title: 'Toggle Block Quote (⌃ ⌥ Q)',
    Icon: QuoteIcon,
    command: 'toggleBlockQuote',
    isActive: isActive('block-quote')
  },
  {
    title: 'Toggle Code Block',
    Icon: CodeIcon,
    command: 'togglePre',
    isActive: isActive('pre')
  },
  { separator: true },
  {
    title: 'Insert Link (⌘ K)',
    Icon: LinkIcon,
    command: 'toggleLink',
    isActive: isActive('link')
  },
  {
    title: 'Insert Image (⌘ ⇧ I)',
    Icon: ImageIcon,
    command: 'insertImage',
    isActive: isActive('image')
  },
  { separator: true },
  {
    title: 'Insert JSX Block',
    Icon: JSX,
    command: 'toggleJSX',
    isActive: isActive('jsx')
  }
]

export const Toolbar = props => {
  const { buttons, editor } = props

  return (
    <Root>
      {buttons.map(({ separator, Icon, title, command, isActive }, i) =>
        separator ? (
          <Separator key={i} />
        ) : (
          <IconButton
            key={i}
            title={title}
            active={isActive(editor)}
            onClick={editor[command]}
          >
            <Icon size={20} />
          </IconButton>
        )
      )}
    </Root>
  )
}

Toolbar.defaultProps = {
  buttons
}

export default Toolbar
