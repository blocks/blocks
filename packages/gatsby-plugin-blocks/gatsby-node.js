const fs = require('fs')
const path = require('path')
const util = require('util')

const mkdirp = require('mkdirp')
const bodyParser = require('body-parser')
const globby = require('globby')
const { queries } = require('blocks-ui')

const PagesTemplate = require.resolve('./src/templates/pages')
const EditorTemplate = require.resolve('./src/templates/editor')

const DocTemplate = require.resolve('./src/templates/editor')

const write = util.promisify(fs.writeFile)
const read = util.promisify(fs.readFile)

exports.onCreateDevServer = ({ app, store, reporter }) => {
  const state = store.getState()
  const dirname = path.join(state.program.directory, 'src', 'pages')

  const getFileContents = async page => {
    const filename = path.join(dirname, page)
    const contents = await read(filename, 'utf8')
    return contents
  }

  const relativizePagePath = pagePath => {
    return pagePath.replace(dirname + path.sep, '')
  }

  app.use(bodyParser.json())

  app.post('/___blocks', async (req, res) => {
    const { code, page } = req.body

    if (!code || !page) {
      return res.status(500).send({
        error: 'Did not receive code'
      })
    }

    const filename = path.join(dirname, page)

    try {
      const currentCode = await getFileContents(page)

      if (code !== currentCode) {
        reporter.info(`Updating ${page}`)
        await write(filename, code)
        reporter.success(`Updated ${page}`)
      }
    } catch (e) {
      if (filename && code) {
        reporter.info(`Creating ${page}`)
        await write(filename, code)
        reporter.success(`Created ${page}`)
      }
    }

    res.send('success')
  })

  app.post('/___blocks/src', async (req, res) => {
    const { page } = req.body

    if (!page) {
      return res.status(500).send({
        error: 'Did not receive page'
      })
    }

    const code = await getFileContents(page)
    res.send(code)
  })

  app.get('/___blocks/pages', async (_, res) => {
    const globPattern = dirname + '/**/*.js'
    const pages = globby.sync(globPattern, { nodir: true })

    const blocksPromises = pages.map(async page => {
      const src = await read(page)

      try {
        const blocks = queries.getBlocks(src)
        if (blocks.length) {
          return page
        }
      } catch (e) {
        console.error(e)
      }
    }, [])

    const allBlocksPages = await Promise.all(blocksPromises)
    const blocksPages = allBlocksPages.filter(Boolean).map(relativizePagePath)
    res.send(blocksPages)
  })
}

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '___blocks',
    component: DocTemplate
  })
}

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '___blocks',
    component: PagesTemplate
  })
  createPage({
    path: '___blocks/edit',
    component: EditorTemplate
  })
}

exports.onPreBootstrap = ({ store }) => {
  const { program } = store.getState()

  const dirs = [path.join(program.directory, 'src', 'pages')]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
}
