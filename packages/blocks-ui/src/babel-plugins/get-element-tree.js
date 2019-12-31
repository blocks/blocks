import { declare } from '@babel/helper-plugin-utils'

import { getElementName, getUuid } from '../util'

// This plugin generates a tree of JSX elements from an AST.
// The generated `Tree` is an object with the following structure:
// { id: string, name: string, children: [Tree] }

class BabelPluginGetTree {
  constructor() {
    this.state = { tree: null }

    // When we enter a JSX element, we create a tree node and push it onto the
    // stack. When Babel finishes traversing the element's children, we pop
    // the node from the stack and add it to the `children` array of the node
    // that is now on the top of the stack.
    const stack = []

    this.plugin = declare(api => {
      api.assertVersion(7)

      return {
        visitor: {
          Program: {
            // We use `Program` as an arbitrary entrypoint to create the
            // root of our tree because:
            // - Babel enters `Program` before visiting any JSX elements.
            // - Babel exits `Program` after visiting all JSX elements.
            //
            // One problem with using `Program` as an entrypoint is that our
            // tree will include all JSX elements in the code, not just JSX
            // elements in the default export.
            //
            // For example, if the code looked like this:
            //   const App = () => <Foo />
            //   const OtherComponent = () => <Bar />
            //   export default App
            //
            // ...the generated tree will look like this:
            //   root
            //   ├── Foo
            //   └── Bar
            //
            // We probably want the tree to look like this instead:
            //   root
            //   └── Foo
            enter: path => {
              stack.push({ id: 'root', name: 'root', children: [] })
            },
            exit: path => {
              this.state.tree = stack.pop()
            }
          },
          JSXElement: {
            enter: path => {
              const id = getUuid(path.node.openingElement)
              const name = getElementName(path.node.openingElement)

              // If the element doesn't have a uuid attribute, we don't include
              // it in the tree. This allows to exclude blocks elements from the
              // tree because they don't have uuids.
              if (!id) {
                return
              }

              stack.push({ id, name, children: [] })
            },
            exit: path => {
              const id = getUuid(path.node.openingElement)

              // Since we don't push elements that don't have uuids on the stack
              // when we enter, we need to make sure that we don't pop from the
              // stack when we exit. Otherwise, we'll end up popping more times
              // than we push.
              if (!id) {
                return
              }

              const element = stack.pop()
              if (stack.length > 0) {
                const parent = stack[stack.length - 1]
                parent.children.push(element)
              }
            }
          }
        }
      }
    })
  }
}

export default BabelPluginGetTree
