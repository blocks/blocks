/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Label, Input, Select, Grid } from '@theme-ui/components'
import { Theme, Sx } from '@theme-ui/editor'
import { ControlType } from 'property-controls'

const FieldGroup = ({ children, title, ...props }) => (
  <div
    {...props}
    sx={{ p: 3, borderBottom: '1px solid', borderColor: 'border' }}
  >
    <h3
      sx={{
        fontSize: 0,
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: 3,
        mt: 0,
        mb: 3,
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
          <FieldGroup title="Colors">
            <Sx.Colors value={elementData.props.sx} onChange={onStyleChange} />
          </FieldGroup>
          <FieldGroup title="Typography">
            <Sx.Typography
              value={elementData.props.sx}
              onChange={onStyleChange}
            />
          </FieldGroup>
          <FieldGroup title="Padding">
            <Sx.Padding value={elementData.props.sx} onChange={onStyleChange} />
          </FieldGroup>
          <FieldGroup title="Margin">
            <Sx.Margin value={elementData.props.sx} onChange={onStyleChange} />
          </FieldGroup>
        </React.Fragment>
      ) : null}
    </form>
  )
}
