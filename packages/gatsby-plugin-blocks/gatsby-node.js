const fs = require('fs')
const path = require('path')
const util = require('util')

const bodyParser = require('body-parser')

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

  app.use(bodyParser.json())

  app.post('/___blocks', async (req, res) => {
    const { code, page } = req.body

    if (!code || !page) {
      return res.status(500).send({
        error: 'Did not receive code'
      })
    }

    const filename = path.join(dirname, page)
    const currentCode = await getFileContents(page)

    if (code !== currentCode) {
      reporter.info(`Updating ${page}`)
      await write(filename, code)
      reporter.success(`Updated ${page}`)
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
}

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '___blocks',
    component: DocTemplate
  })
}
