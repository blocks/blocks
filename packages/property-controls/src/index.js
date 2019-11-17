const BOOLEAN = 'boolean'
const ENUM = 'enum'
const NUMBER = 'number'
const STRING = 'string'
const FUSED_NUMBER = 'fusednumber'
const COLOR = 'color'
const IMAGE = 'image'
const FILE = 'file'
const COMPONENT_INSTANCE = 'componentinstance'
const ARRAY = 'array'
const EVENT_HANDLER = 'eventhandler'
const STYLE = 'style'
const OBJECT = 'object'

export const ControlType = {
  Boolean: BOOLEAN,
  Enum: ENUM,
  Number: NUMBER,
  String: STRING,
  FusedNumber: FUSED_NUMBER,
  Color: COLOR,
  Image: IMAGE,
  File: FILE,
  ComponentInstance: COMPONENT_INSTANCE,
  Array: ARRAY,
  EventHandler: EVENT_HANDLER,
  Style: STYLE,
  Object: OBJECT
}

export const ControlMap = Object.entries(ControlType).reduce(
  (acc, [key, val]) => {
    acc[val] = key
    return acc
  },
  {}
)

export const applyPropertyControls = (Component, controls) => {
  if (Component.propertyControls) {
    Component.propertyControls = {
      ...Component.propertyControls,
      ...controls
    }
  } else {
    Component.propertyControls = controls
  }
}

export const is = val => ControlMap[val]
