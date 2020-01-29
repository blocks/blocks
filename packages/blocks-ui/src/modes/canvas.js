/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useCode } from '../providers/code'
import InlineRender from '../inline-render'
import { useScope } from '../providers/scope'

import { CanvasWrap } from '../canvas'

const CanvasMode = () => {
  const { theme, ...scope } = useScope()
  const { transformedCode } = useCode()

  return (
    <CanvasWrap>
      <InlineRender
        fullHeight
        scope={scope}
        code={transformedCode}
        theme={theme}
      />
    </CanvasWrap>
  )
}

export default CanvasMode
