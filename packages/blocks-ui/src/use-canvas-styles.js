import chroma from 'chroma-js'

import { useEditor } from './providers/editor'

export const gradient = (angle = 0, size, color) =>
  `linear-gradient(${angle}deg, transparent, transparent ${size - 1}px, ${alpha(
    color,
    1 / 6
  )} ${size - 1}px)`

const alpha = (val, a) => {
  try {
    return chroma(val)
      .alpha(a)
      .css()
  } catch (e) {
    return val
  }
}

export default ({ color = '#6bf', size = 8 } = {}) => {
  const editorState = useEditor() || {}

  // https://github.com/jxnblk/react-x-ray
  const xrayStyles = {
    '& > * *': {
      outline: `1px solid ${alpha(color, 1 / 2)} !important`,
      backgroundColor: `${alpha(color, 1 / 8)} !important`,
      backgroundImage: `${gradient(0, size, color)}, ${gradient(
        90,
        size,
        color
      )}`,
      backgroundSize: `${size}px ${size}px`
    }
  }

  const styles = {
    ...(editorState.xray ? xrayStyles : {})
  }

  return styles
}
