import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { ThemeProvider } from 'theme-ui'

import schema from '../lib/schema'
import { deserialize } from '@blocks/serializer'

import { Context } from './context'
import defaultTheme from './theme'
import defaultPlugins from '../plugins'
import defaultBlocks from './blocks'
//import Toolbar from './Toolbar'

const initialValue = '# Welcome to Blocks!'

class BlockEditor extends Component {
  constructor(props) {
    super(props)

    console.log(deserialize(props.initialValue || initialValue))

    this.state = {
      value: deserialize(props.initialValue || initialValue)
    }
  }

  emitChange = () => {
    const { value } = this.state
    this.props.onChange({ value })
  }

  // think this can be a renderEditor plugin
  handleChange = ({ value }) => {
    this.setState({ value }, this.emitChange)
  }

  render() {
    const { plugins, theme, components } = this.props
    const allComponents = {
      ...defaultBlocks,
      ...components
    }
    const context = {
      components: allComponents
    }

    return (
      <div style={{ minHeight: '100vh' }}>
        <Context.Provider value={context}>
          <Editor
            {...this.props}
            components={allComponents}
            theme={theme}
            schema={schema}
            placeholder="Write some MDX..."
            plugins={plugins}
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onPaste={this.handlePaste}
          />
        </Context.Provider>
      </div>
    )
  }
}

BlockEditor.defaultProps = {
  components: {},
  theme: defaultTheme,
  plugins: defaultPlugins,
  renderEditor: (props, editor, next) => {
    const children = next()
    return <ThemeProvider theme={props.theme}>{children}</ThemeProvider>
  }
}

export default BlockEditor
