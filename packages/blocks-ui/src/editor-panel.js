/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Label, Input, Flex } from '@theme-ui/components'
import { Delete, CornerRightUp, Copy } from 'react-feather'

import { IconButton } from './ui'

// TODO: Fix this prop drilling dance for common editor
// interactions.
export default ({
  elementData,
  handleChange,
  handlePropChange,
  handleRemove,
  handleRemoveElement,
  handleParentSelect,
  handleClone,
  handleTextUpdate,
  setElementId,
  blocks = [] // TODO: Fix
}) => (
  <div
    sx={{
      height: '100vh',
      overflow: 'scroll'
    }}
  >
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 'thin solid #e1e6eb',
        px: 3,
        py: 1
      }}
    >
      <h3
        sx={{
          fontSize: 1,
          fontWeight: 600,
          m: 0,
          lineHeight: 1
        }}
      >
        {elementData.name}
      </h3>
      <nav
        sx={{
          lineHeight: 1,
          aignItems: 'center'
        }}
      >
        <IconButton onClick={handleClone} aria-label="Copy element">
          <Copy size={17} />
        </IconButton>
        {elementData.parentId && (
          <IconButton onClick={handleParentSelect} aria-label="Go to parent">
            <CornerRightUp size={18} />
          </IconButton>
        )}
        <IconButton onClick={handleRemoveElement} aria-label="Remove">
          <Delete size={18} />
        </IconButton>
      </nav>
    </Flex>
    {elementData.children && elementData.children.length ? (
      <div
        sx={{
          borderBottom: 'thin solid #e1e6eb',
          backgroundColor: '#fafafa',
          p: 3,
          'div + div': {
            mt: 2
          }
        }}
      >
        <h4
          sx={{
            m: 0,
            fontSize: 0,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          Children
        </h4>
        {elementData.children.map(c => (
          <div
            key={c.id}
            tabIndex={0}
            onClick={() => setElementId(c.id)}
            sx={{
              backgroundColor: 'background',
              borderRadius: 4,
              border: 'thin solid #e1e6eb',
              px: 3,
              py: 2
            }}
          >
            {c.name}
          </div>
        ))}
      </div>
    ) : null}
    <div>
      {elementData && (
        <div sx={{ px: 3 }}>
          {elementData.hasOwnProperty('text') && (
            <React.Fragment>
              <Label id="text">Text</Label>
              <Input
                sx={{
                  display: 'block',
                  width: '100%'
                }}
                onChange={handleTextUpdate}
                value={elementData.text}
                aria-labelledby="text"
              />
            </React.Fragment>
          )}
          <h3
            sx={{
              fontWeight: 'normal',
              m: 0,
              pb: 2,
              pt: 4
            }}
          >
            Props
          </h3>
          {elementData.props.hasOwnProperty('to') && (
            <React.Fragment>
              <Label id="to">To</Label>
              <Input
                sx={{
                  display: 'block',
                  width: '100%'
                }}
                onChange={handlePropChange('to')}
                value={elementData.props.to || ''}
                aria-labelledby="to"
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
          {elementData.props.sx && (
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
          <React.Fragment>
            <Label>Background</Label>
            <Input
              sx={{
                display: 'block',
                width: '100%'
              }}
              onChange={handleChange('background')}
              value={
                elementData.props.sx && elementData.props.sx.backgroundColor
              }
            />
            <button onClick={handleRemove('background')}>Remove</button>
          </React.Fragment>
          <React.Fragment>
            <Label>Color</Label>
            <Input
              sx={{
                display: 'block',
                width: '100%'
              }}
              onChange={handleChange('color')}
              value={elementData.props.sx.color}
            />
            <button onClick={handleRemove('color')}>Remove</button>
          </React.Fragment>
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
  </div>
)
