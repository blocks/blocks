# @blocks/editor

WYSIWYG editor for the Blocks ecosystem.

[Read the full docs](https://github.com/blocks/blocks)

## Installation

```sh
yarn add @blocks/editor
```

## Usage

```js
import React from 'react'
import { Editor } from '@blocks/editor'

export default () => (
  <Editor
    initialValue={'# Hello, world!'}
    onChange={value => console.log(value)}
  />
)
```
