/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Label, Input, Select } from '@theme-ui/components'
import { SxColors, SxTypography } from '@theme-ui/editor'
import { ControlType } from 'property-controls'

const FieldGroup = props => (
  <div
    sx={{
      p: 3,
      label: {
        fontSize: 0,
        fontWeight: 'normal'
      },
      '.fieldset label': {
        width: '30%'
      },
      [['input', 'select']]: {
        height: 32,
        fontSize: 0,
        border: 'thin solid #b6bcc2',
        width: '100%',
        borderRadius: 0,
        '&:hover': {
          border: 'thin solid #83898f'
        }
      },
      '.fieldset': {
        display: 'flex',
        alignItems: 'center',
        border: 0,
        p: 0
      },
      '.fieldset + .fieldset': {
        mt: 3
      },
      // TODO: Fix this on Select in @theme-ui/components
      '.fieldset > div': {
        width: '100%'
      },
      h4: {
        fontSize: 0,
        fontWeight: 500,
        mt: 0,
        mb: 2
      },
      borderBottom: 'thin solid #e1e6eb'
    }}
    {...props}
  />
)

export default ({
  propertyControls,
  elementData,
  onChange,
  onPropChange,
  onTextChange
}) => {
  const hasPropertyControls = Object.keys(propertyControls).length > 0
  const hasStyles = !!propertyControls.sx

  return (
    <form onSubmit={e => e.preventDefault()}>
      {hasPropertyControls ? (
        <FieldGroup>
          <h4>Props</h4>
          {Object.entries(propertyControls).map(([key, value]) => {
            const title = value.title || key
            const fieldValue =
              elementData.props[key] || value.defaultValue || null

            if (value.type === ControlType.String && key === 'children') {
              return (
                <div className="fieldset" key={key}>
                  <Label>{title}</Label>
                  <Input value={elementData.text} onChange={onTextChange} />
                </div>
              )
            } else if (value.type === ControlType.String) {
              return (
                <div className="fieldset" key={key}>
                  <Label>{title}</Label>
                  <Input value={fieldValue} onChange={onPropChange(key)} />
                </div>
              )
            } else if (value.type === ControlType.Number) {
              return (
                <div className="fieldset" key={key}>
                  <Label>{title}</Label>
                  <Input
                    type="number"
                    value={fieldValue}
                    onChange={onPropChange(key)}
                  />
                </div>
              )
            } else if (value.type === ControlType.Enum) {
              return (
                <div className="fieldset" key={key}>
                  <Label>{title}</Label>
                  <Select value={fieldValue} onChange={onPropChange(key)}>
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
          <FieldGroup>
            <h4>Color</h4>
            <SxColors value={elementData.props.sx} onChange={console.log} />
          </FieldGroup>
          <FieldGroup>
            <h4>Typography</h4>
            <SxTypography value={elementData.props.sx} onChange={console.log} />
          </FieldGroup>
        </React.Fragment>
      ) : null}
    </form>
  )
}
