/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Box, Label, Input, Select, Field, Radio } from '@theme-ui/components'
import { ControlType } from 'property-controls'

import { FieldGroup } from '../field-group'
import { Sx } from '../theme-editor'
import { useThemeEditor } from '../providers/theme-editor'

export default ({
  propertyControls = {},
  elementData,
  onStyleChange,
  onPropChange,
  onTextChange
}) => {
  const hasPropertyControls = Object.keys(propertyControls).length > 0
  const hasStyles = !!propertyControls.sx
  const { update, ...theme } = useThemeEditor()

  return (
    <form onSubmit={e => e.preventDefault()}>
      {hasPropertyControls ? (
        <FieldGroup title="props">
          {Object.entries(propertyControls).map(([key, value]) => {
            const title = value.title || key
            let fieldValue = elementData.props[key] || value.defaultValue
            if (fieldValue === undefined) {
              fieldValue = null
            }
            if (value.type === ControlType.String && key === 'children') {
              return (
                <div key={key}>
                  <Label htmlFor={title}>{title}</Label>
                  <Input
                    sx={{ backgroundColor: 'white' }}
                    value={elementData.text}
                    onChange={onTextChange}
                    id={title}
                  />
                </div>
              )
            } else if (value.type === ControlType.String) {
              return (
                <div key={key}>
                  <Label htmlFor={title}>{title}</Label>
                  <Input
                    sx={{ backgroundColor: 'white' }}
                    value={fieldValue}
                    onChange={e => onPropChange(key, e)}
                    id={title}
                  />
                </div>
              )
            } else if (value.type === ControlType.Number) {
              return (
                <div key={key}>
                  <Label htmlFor={title}>{title}</Label>
                  <Input
                    sx={{ backgroundColor: 'white' }}
                    type="number"
                    value={fieldValue}
                    onChange={e => onPropChange(key, e, ControlType.Number)}
                    id={title}
                  />
                </div>
              )
            } else if (value.type === ControlType.Enum) {
              return (
                <Field
                  key={key}
                  label={title}
                  value={fieldValue}
                  onChange={e => onPropChange(key, e)}
                  as={Select}
                >
                  {value.options.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </Field>
              )
            } else if (value.type === ControlType.Boolean) {
              return (
                <div key={key}>
                  <Label>{title}</Label>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Label sx={{ alignItems: 'center' }}>
                      <Radio
                        name={key}
                        value={true}
                        defaultChecked={fieldValue === true}
                        onChange={e =>
                          onPropChange(key, e, ControlType.Boolean)
                        }
                      />{' '}
                      {value.enabledTitle || 'True'}
                    </Label>
                    <Label sx={{ alignItems: 'center' }}>
                      <Radio
                        name={key}
                        value={false}
                        defaultChecked={fieldValue === false}
                        onChange={e =>
                          onPropChange(key, e, ControlType.Boolean)
                        }
                      />{' '}
                      {value.disabledTitle || 'False'}
                    </Label>
                  </Box>
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
          <FieldGroup title="Padding">
            <Sx.Padding
              value={elementData.props.sx}
              onChange={onStyleChange}
              theme={theme}
            />
          </FieldGroup>
          <FieldGroup title="Colors">
            <Sx.Colors
              value={elementData.props.sx}
              onChange={onStyleChange}
              theme={theme}
            />
          </FieldGroup>
          <FieldGroup title="Typography">
            <Sx.Typography
              value={elementData.props.sx}
              onChange={onStyleChange}
              theme={theme}
            />
          </FieldGroup>
          <FieldGroup title="Margin">
            <Sx.Margin
              value={elementData.props.sx}
              onChange={onStyleChange}
              theme={theme}
            />
          </FieldGroup>
        </React.Fragment>
      ) : null}
    </form>
  )
}
