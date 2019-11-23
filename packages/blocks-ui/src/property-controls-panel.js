/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Label, Input } from '@theme-ui/components'
import { ControlType, is } from 'property-controls'

export default ({ propertyControls, elementData, onChange }) => {
  console.log(propertyControls)

  return (
    <form onSubmit={e => e.preventDefault()}>
      {Object.entries(propertyControls).forEach(([key, value]) => {
        console.log(is(value))
        if (is(value) === ControlType.String) {
          const title = value.title || key
          return (
            <fieldset>
              <Label>{title}</Label>
              <Input
                value={elementData.props[key] || value.defaultValue || ''}
                onChange={console.log}
              />
            </fieldset>
          )
        } else {
          console.log(value)
          return null
        }
      })}
    </form>
  )
}
