/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Label, Input, Select } from '@theme-ui/components'
import { Sx } from '@theme-ui/editor'
import { ControlType } from 'property-controls'

import { PanelGroup } from '../panel-group'

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
        <PanelGroup title="Props">
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
        </PanelGroup>
      ) : null}
      {hasStyles ? (
        <React.Fragment>
          <PanelGroup title="Colors">
            <Sx.Colors value={elementData.props.sx} onChange={onStyleChange} />
          </PanelGroup>
          <PanelGroup title="Typography">
            <Sx.Typography
              value={elementData.props.sx}
              onChange={onStyleChange}
            />
          </PanelGroup>
          <PanelGroup title="Padding">
            <Sx.Padding value={elementData.props.sx} onChange={onStyleChange} />
          </PanelGroup>
          <PanelGroup title="Margin">
            <Sx.Margin value={elementData.props.sx} onChange={onStyleChange} />
          </PanelGroup>
        </React.Fragment>
      ) : null}
    </form>
  )
}
