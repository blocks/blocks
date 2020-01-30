/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useCode } from '../providers/code'
import { useScope } from '../providers/scope'

import InlineRender from '../inline-render'
import { PreviewArea, Device } from '../device-preview'

const ViewportsMode = () => {
  const { theme, ...scope } = useScope()
  const { transformedCode } = useCode()

  return (
    <PreviewArea>
      {theme.breakpoints.map(breakpoint => (
        <Device key={breakpoint} width={breakpoint} height={500}>
          <InlineRender scope={scope} code={transformedCode} theme={theme} />
        </Device>
      ))}
    </PreviewArea>
  )
}

export default ViewportsMode
