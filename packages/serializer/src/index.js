import unified from 'unified'
import mdx from 'remark-mdx'
import parse from 'remark-parse'
import stringify from 'remark-stringify'
import squeezeParagraphs from 'remark-squeeze-paragraphs'
import visit from 'unist-util-visit'
import { Data, Value } from 'slate'

import slateCompiler from './remark-slate'
import interleave from './remark-interleave'
import { getComponentName, toJS } from './util'
import { parseJSXBlock, applyProps } from './parse-jsx'
import { Visitor } from 'handlebars'

const parser = unified()
  .use(parse, {
    commonmark: true,
    position: false
  })
  .use(squeezeParagraphs)
  .use(interleave)
  .use(mdx)

export const parseMDX = md => parser.runSync(parser.parse(md))

const stringifier = unified()
  .use(stringify, {
    bullet: '*',
    fences: true
  })
  .use(squeezeParagraphs)
  .use(mdx)

export const stringifyMDX = mdxast =>
  stringifier.stringify(stringifier.runSync(mdxast))

// Turn an MDX string into Slate schema
export const deserialize = mdx => {
  const result = parser.use(slateCompiler).processSync(mdx)

  return Value.fromJSON(result.contents)
}
