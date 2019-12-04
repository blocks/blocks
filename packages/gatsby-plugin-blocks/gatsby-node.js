const fs = require('fs')
const path = require('path')
const util = require('util')

const bodyParser = require('body-parser')

const write = util.promisify(fs.writeFile)
const read = util.promisify(fs.readFile)

exports.onCreateDevServer = ({ app, store }) => {
  const state = store.getState()
  const dirname = path.join(state.program.directory, 'src', 'pages')

  app.use(bodyParser.json())

  app.post('/___blocks', async (req, res) => {
    const { code, page } = req.body

    if (!code || !page) {
      return res.status(500).send({
        error: 'Did not receive code'
      })
    }

    const filename = path.join(dirname, page)
    const currentCode = await read(filename, 'utf8')

    if (code !== currentCode) {
      await write(filename, code)
    }

    res.send('ok beep')
  })
}
