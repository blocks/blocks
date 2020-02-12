/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Label, Input, Select, Field } from '@theme-ui/components'
import { ControlType } from 'property-controls'
import contrast from 'get-contrast'

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

  const elementMetadata = {}
  try {
    if (typeof window !== 'undefined') {
      const el = document.querySelector(
        `[data-blocks-uuid="${elementData.id}"]`
      )
      const styles = window.getComputedStyle(el)
      elementMetadata.backgroundColor = styles['background-color']

      if (elementMetadata.backgroundColor === 'rgba(0, 0, 0, 0)') {
        let parent = el.parentElement
        while (parent) {
          const backgroundColor = window.getComputedStyle(parent)[
            'background-color'
          ]

          if (backgroundColor !== 'rgba(0, 0, 0, 0)') {
            elementMetadata.backgroundColor = backgroundColor
            break
          }

          parent = parent.parentElement
        }
      }
      elementMetadata.color = styles['color']
      elementMetadata.hasInaccessibleContrast = !contrast.isAccessible(
        elementMetadata.backgroundColor,
        elementMetadata.color,
        { ignoreAlpha: true }
      )
    }
  } catch (e) {}

  return (
    <form onSubmit={e => e.preventDefault()}>
      {hasPropertyControls ? (
        <FieldGroup title="props">
          {Object.entries(propertyControls).map(([key, value]) => {
            const title = value.title || key
            const fieldValue =
              elementData.props[key] || value.defaultValue || null
            if (value.type === ControlType.String && key === 'children') {
              return (
                <div key={key}>
                  <Label>{title}</Label>
                  <Input
                    sx={{ backgroundColor: 'white' }}
                    value={elementData.text}
                    onChange={onTextChange}
                  />
                </div>
              )
            } else if (value.type === ControlType.String) {
              return (
                <div key={key}>
                  <Label>{title}</Label>
                  <Input
                    sx={{ backgroundColor: 'white' }}
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
                    sx={{ backgroundColor: 'white' }}
                    type="number"
                    value={fieldValue}
                    onChange={e => onPropChange(key, e)}
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
          <FieldGroup title="Margin">
            <Sx.Margin
              value={elementData.props.sx}
              onChange={onStyleChange}
              theme={theme}
            />
          </FieldGroup>
          <FieldGroup title="Colors">
            {elementMetadata.hasInaccessibleContrast ? (
              <p
                sx={{
                  margin: 0,
                  mt: 2,
                  py: 2,
                  px: 3,
                  color: 'red.0',
                  backgroundColor: 'red.8',
                  border: 'thin solid',
                  borderColor: 'red.6',
                  borderRadius: 2
                }}
              >
                <span sx={{ fontWeight: 'bold', mr: 2 }}>
                  {contrast.score(
                    elementMetadata.backgroundColor,
                    elementMetadata.color,
                    { ignoreAlpha: true }
                  )}
                  :
                </span>
                This element's contrast is not accessible.
              </p>
            ) : null}
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
        </React.Fragment>
      ) : null}
    </form>
  )
}
