/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Label, Input, Select, Grid } from '@theme-ui/components'
import { Theme } from '@theme-ui/editor'
import { ControlType } from 'property-controls'

const FieldGroup = ({ children, title, ...props }) => (
  <div
    {...props}
    sx={{
      p: 3,
      borderBottom: '1px solid',
      borderColor: 'border'
      // label: {
      // },
      // '.fieldset label': {
      //   width: '30%'
      // },
      // [['input', 'select']]: {
      // },
      // 'input[type="checkbox"]': {
      //   height: 'auto',
      //   mr: 2,
      //   width: 'auto'
      // },
      // '.fieldset': {
      //   display: 'flex',
      //   alignItems: 'center',
      //   border: 0,
      //   p: 0
      // },
      // '.fieldset + .fieldset': {
      //   mt: 3
      // },
      // // TODO: Fix this on Select in @theme-ui/components
      // '.fieldset > div': {
      //   width: '100%'
      // },
    }}
  >
    <h3
      sx={{
        fontSize: 0,
        fontWeight: 500,
        letterSpacing: 3,
        mt: 0,
        mb: 2,
        textTransform: 'uppercase'
      }}
    >
      {title}
    </h3>
    <Grid gap={2} columns={1}>
      {children}
    </Grid>
  </div>
)

export default ({
  propertyControls = {},
  elementData,
  onStyleChange,
  onPropChange,
  onTextChange
}) => {
  const hasPropertyControls = Object.keys(propertyControls).length > 0
  const hasStyles = !!propertyControls.sx

  return (
    <form onSubmit={e => e.preventDefault()}>
      {hasPropertyControls ? (
        <FieldGroup title="Props">
          {Object.entries(propertyControls).map(([key, value]) => {
            const title = value.title || key
            const fieldValue =
              elementData.props[key] || value.defaultValue || null

            if (value.type === ControlType.String && key === 'children') {
              return (
                <div key={key}>
                  <Label>{title}</Label>
                  <Input value={elementData.text} onChange={onTextChange} />
                </div>
              )
            } else if (value.type === ControlType.String) {
              return (
                <div key={key}>
                  <Label>{title}</Label>
                  <Input
                    value={fieldValue}
                    onChange={e => onPropChange(key, e)}
                  />
                </div>
              )
            } else if (value.type === ControlType.Number) {
              return (
                <div key={key}>
                  <Label>{title}</Label>
                  <Input
                    type="number"
                    value={fieldValue}
                    onChange={e => onPropChange(key, e)}
                  />
                </div>
              )
            } else if (value.type === ControlType.Enum) {
              return (
                <div key={key}>
                  <Label>{title}</Label>
                  <Select
                    value={fieldValue}
                    onChange={e => onPropChange(key, e)}
                  >
                    {value.options.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </Select>
                </div>
              )
            } else {
              return null
            }
          })}
        </FieldGroup>
      ) : null}
      {hasStyles ? (
        <React.Fragment>
          <FieldGroup
            title="Colors"
            sx={{
              // TODO: Fix this in @theme-ui/editor
              'div div div': {
                fontSize: 0,
                fontWeight: 400
              }
            }}
          >
            {/* <Colors value={elementData.props.sx} onChange={onStyleChange} />
          </FieldGroup>
          <FieldGroup title="Typography">
            <Typography value={elementData.props.sx} onChange={onStyleChange} />
          </FieldGroup>
          <FieldGroup title="Padding">
            <Padding value={elementData.props.sx} onChange={onStyleChange} />
          </FieldGroup>
          <FieldGroup title="Margin">
            <Margin value={elementData.props.sx} onChange={onStyleChange} />
          </FieldGroup> */}
            <Theme.Fonts />
            <Theme.FontSizes />
            <Theme.FontWeights />
            <Theme.LineHeights />
            <Theme.Colors />
            <Theme.Space />
          </FieldGroup>
        </React.Fragment>
      ) : null}
    </form>
  )
}
