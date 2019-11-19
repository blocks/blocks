const transforms = require('blocks-ui/dist/transforms')
const BlockTemplate = require.resolve('./src/templates/block')

const toComponentName = name => name.charAt(0).toUpperCase() + name.slice(1)

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Block implements Node {
      displayName: String!
      slug: String!
      src: String!
      transformedSrc: String!
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  loadNodeContent,
  createContentDigest
}) => {
  const { createNode, createParentChildLink } = actions

  if (
    node.sourceInstanceName !== 'blocks' ||
    node.ext !== '.js' ||
    node.name === 'index'
  ) {
    return
  }

  const src = await loadNodeContent(node)
  const transformedSrc = transforms.toTransformedJSX(src)
  const displayName = [node.relativeDirectory.replace(/s$/, ''), node.name]
    .map(toComponentName)
    .join('')
  const nodeId = `${node.id}--${displayName}--Block`
  const contentDigest = createContentDigest(src)
  const slug = ['blocks', node.relativeDirectory, node.name].join('/')

  const blocksNode = {
    src,
    slug,
    transformedSrc,
    displayName,
    id: createNodeId(nodeId),
    children: [],
    internal: {
      contentDigest,
      type: 'Block'
    }
  }

  createParentChildLink({ parent: node, child: blocksNode })
  createNode(blocksNode)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      blocks: allBlock {
        nodes {
          id
          slug
        }
      }
    }
  `)

  result.data.blocks.nodes.forEach(block => {
    createPage({
      path: block.slug,
      component: BlockTemplate,
      context: block
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
}
