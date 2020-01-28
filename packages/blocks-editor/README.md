# property-controls

## Installation

```sh
yarn add property-controls
```

## Usage

```js
import { ControlType, applyPropertyControls } from 'property-controls'

export const Component = ({ isTomato, ...props }) => (
  <h1
    {...props}
    style={{
      color: isTomato ? 'tomato' : 'inherit'
    }}
  />
)

applyPropertyControls(Component, {
  isTomato: {
    type: ControlType.Boolean,
    title: 'Tomato'
  }
})
```

## Related

- [Blocks controls](https://blocks-ui.com/docs/controls/)
- [Framer controls](https://www.framer.com/api/property-controls/)
