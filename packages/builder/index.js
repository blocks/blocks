/* @jsx jsx */
import React, { useState, useEffect, useMemo } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Styled, ThemeProvider, jsx } from 'theme-ui'
import { system } from '@theme-ui/presets'
import { Global } from '@emotion/core'

import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider
} from '@theme-ui/components'

import { transform } from '@babel/standalone'
import babelPluginTransformJsx from '@babel/plugin-transform-react-jsx'
import babelPluginSyntaxJsx from '@babel/plugin-syntax-jsx'
import babelPluginSetDefaultExportToContainer from './babel-plugin-set-default-export-to-container'
import babelPluginAddTuid from './babel-plugin-add-tuid-prop'
import babelPluginRemoveNamedExports from './babel-plugin-remove-named-exports'
import babelPluginDnd from './babel-plugin-dnd'
import babelPluginRemoveTuid from './babel-plugin-remove-tuid'
import babelPluginReorderBlocks from './babel-plugin-reorder-blocks'
import babelPluginApplySxProp from './babel-plugin-apply-sx-prop'
import babelPluginApplyProp from './babel-plugin-apply-prop'
import babelPluginInjectBlocksRoot from './babel-plugin-inject-blocks-root'
import babelPluginRemoveImports from './babel-plugin-remove-imports'
import BabelPluginGetCurrentElement from './babel-plugin-get-current-element'
import babelPluginRemoveSxProp from './babel-plugin-remove-sx-prop'
import babelPluginRemove from './babel-plugin-remove'
import babelPluginInsertBefore from './babel-plugin-insert-before'

import pragma from './pragma'
import CODE from './fixture'

const Blocks = {}
Blocks.Root = React.Fragment

const transformPlugins = [
  babelPluginSetDefaultExportToContainer,
  babelPluginDnd,
  babelPluginInjectBlocksRoot,
  babelPluginRemoveNamedExports,
  babelPluginRemoveImports,
  [
    babelPluginTransformJsx,
    {
      pragma: 'jsx'
    }
  ]
]

const toTransformedJSX = code => {
  try {
    return transform(code, {
      plugins: transformPlugins
    }).code
  } catch (e) {
    return null
  }
}

const applySxProp = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginApplySxProp, options]]
  })

const removeSxProp = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginRemoveSxProp, options]]
  })

const removeElement = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginRemove, options]]
  })

const insertElement = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginInsertBefore, options]]
  })

const applyProp = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginApplyProp, options]]
  })

const toRawJSX = code => {
  try {
    return transform(code, {
      plugins: [babelPluginSyntaxJsx, babelPluginRemoveTuid]
    }).code
  } catch (e) {
    return null
  }
}

const reorderJSXBlocks = (code, drag) => {
  return transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginReorderBlocks, drag]]
  }).code
}

const getCurrentElement = (code, elementId) => {
  const plugin = new BabelPluginGetCurrentElement({ elementId })

  transform(code, {
    plugins: [babelPluginSyntaxJsx, [plugin.plugin, { elementId }]]
  })

  return plugin.state.element
}

export default () => {
  const [code, setCode] = useState(null)
  const [transformedCode, setTransformedCode] = useState(null)
  const [elementId, setElementId] = useState(null)
  const [elementData, setElementData] = useState(null)

  const scope = {
    Blocks,
    Styled,
    jsx: pragma(setElementId),
    BLOCKS_DragDropContext: DragDropContext,
    BLOCKS_Droppable: Droppable,
    BLOCKS_Draggable: Draggable,
    BLOCKS_DraggableInner: props => <div {...props} />,
    BLOCKS_DroppableInner: props => <div {...props} />,
    BLOCKS_onDragEnd: drag => {
      if (!drag.destination) {
        return
      }

      const newCode = reorderJSXBlocks(code, drag)
      setCode(newCode)
    }
  }

  useEffect(() => {
    const { code: newCode } = transform(CODE, {
      plugins: [babelPluginSyntaxJsx, babelPluginAddTuid]
    })

    setCode(newCode)
  }, [])

  const element = useMemo(() => {
    if (!transformedCode) {
      return null
    }

    /* eslint-disable */
    const fn = new Function(
      'React',
      ...Object.keys(scope),
      `${transformedCode};
      return React.createElement(BLOCKS_Container)`
    )
    /* eslint-enable */

    return fn(React, ...Object.values(scope))
  }, [transformedCode])

  useEffect(() => {
    if (!elementId) {
      return
    }

    const newElementData = getCurrentElement(code, elementId)
    setElementData(newElementData)
  }, [elementId])

  useEffect(() => {
    try {
      const newTransformedCode = toTransformedJSX(code)

      if (newTransformedCode) {
        setTransformedCode(newTransformedCode)
      }
    } catch (e) {}
  }, [code])

  if (!code || !transformedCode) {
    return null
  }

  const handleRemove = key => () => {
    const sx = elementData.props.sx || {}
    delete sx[key]

    setElementData({ ...elementData, props: { ...elementData.props, sx } })

    const { code: newCode } = removeSxProp(code, { elementId, key })
    setCode(newCode)
  }

  const handleRemoveElement = () => {
    const { code: newCode } = removeElement(code, { elementId })
    setCode(newCode)
    setElementId(null)
    setElementData(null)
  }

  const handleInsertElement = () => {
    const { code: newCode } = insertElement(code, { elementId })
    setCode(newCode)
  }

  const handleChange = key => e => {
    const sx = elementData.props.sx || {}
    sx[key] = e.target.value

    setElementData({ ...elementData, props: { ...elementData.props, sx } })

    const { code: newCode } = applySxProp(code, {
      elementId,
      key,
      value: e.target.value
    })

    setCode(newCode)
  }

  const handlePropChange = key => e => {
    setElementData({
      ...elementData,
      props: { ...elementData.props, [key]: e.target.value }
    })

    const { code: newCode } = applyProp(code, {
      elementId,
      key,
      value: e.target.value
    })

    setCode(newCode)
  }

  return (
    <ThemeProvider theme={system}>
      <Styled.root>
        <Global
          styles={{
            '*': {
              boxSizing: 'border-box'
            },
            body: {
              margin: 0
            }
          }}
        />
        <div
          sx={{
            display: 'flex',
            width: '100%',
            padding: 3,
            borderBottom: 'thin solid #e1e6eb'
          }}
        >
          <h3 sx={{ fontWeight: 'normal', m: 0 }}>Blocks</h3>
        </div>
        <div
          sx={{
            display: 'flex',
            width: '100%'
          }}
        >
          <div
            sx={{
              width: '70%',
              backgroundColor: 'white',
              padding: 20,
              minHeight: '100vh'
            }}
          >
            {element}
          </div>
          <div
            sx={{
              borderLeft: 'thin solid #e1e6eb',
              width: '30%',
              minHeight: '100vh'
            }}
          >
            {elementData && (
              <h3
                sx={{
                  textTransform: 'uppercase',
                  fontSize: 2,
                  fontWeight: 600,
                  m: 0,
                  px: 3,
                  py: 1,
                  borderBottom: 'thin solid #e1e6eb'
                }}
              >
                {elementData.name}
                <button onClick={handleRemoveElement}>Remove</button>
                <button onClick={handleInsertElement}>Insert</button>
              </h3>
            )}
            <div
              sx={{
                minHeight: '80vh',
                backgroundColor: '#fafbfc'
              }}
            >
              {elementData && (
                <div sx={{ px: 3 }}>
                  <h3 sx={{ fontWeight: 'normal', m: 0, pb: 2, pt: 4 }}>
                    Props
                  </h3>
                  {elementData.props.hasOwnProperty('to') && (
                    <React.Fragment>
                      <Label>To</Label>
                      <Input
                        sx={{
                          display: 'block',
                          width: '100%'
                        }}
                        onChange={handlePropChange('to')}
                        value={elementData.props.to || ''}
                      />
                    </React.Fragment>
                  )}
                  <h3
                    sx={{
                      fontWeight: 'normal',
                      mt: 4,
                      mb: 0,
                      pt: 4,
                      borderTop: 'thin solid'
                    }}
                  >
                    Styles
                  </h3>
                  {elementData.props.sx && elementData.props.sx.p && (
                    <React.Fragment>
                      <Label>Padding</Label>
                      <Input
                        sx={{
                          display: 'block',
                          width: '100%'
                        }}
                        onChange={handleChange('p')}
                        value={elementData.props.sx.p}
                      />
                      <button onClick={handleRemove('p')}>Remove</button>
                    </React.Fragment>
                  )}
                  <h3
                    sx={{
                      fontWeight: 'normal',
                      mt: 4,
                      mb: 0,
                      pt: 4,
                      borderTop: 'thin solid'
                    }}
                  >
                    Variant
                  </h3>
                  {elementData.props.sx && elementData.props.sx.variant && (
                    <React.Fragment>
                      <Label>
                        {elementData.props.sx.variant.replace('styles.', '')}
                      </Label>
                      <Input
                        sx={{
                          display: 'block',
                          width: '100%'
                        }}
                        onChange={handleChange('variant')}
                        value={elementData.props.sx.variant}
                      />
                    </React.Fragment>
                  )}
                  <pre>{JSON.stringify(elementData, null, 2)}</pre>
                </div>
              )}
            </div>
            <textarea
              sx={{
                p: 3,
                width: '100%',
                height: '20vh',
                fontSize: 16,
                borderLeft: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                borderTop: 'thin solid #e1e6eb',
                fontFamily: 'monospace'
              }}
              onChange={e => setCode(e.target.value)}
              value={toRawJSX(code)}
            />
          </div>
        </div>
      </Styled.root>
    </ThemeProvider>
  )
}
