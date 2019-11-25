// default built-in plugins
import ListsPlugin from '@convertkit/slate-lists'
import DeepTable from 'slate-deep-table'
import SoftBreak from 'slate-soft-break'
import MarkdownPlugin from './markdown'
import CodePlugin from './code'
import LiveJSXPlugin from './live-jsx'
import JSXBlocksPlugin from './jsx-blocks'
import TablePlugin from './table'
import ImagePlugin from './image'
import LinkPlugin from './link'
import MarkdownShortcutsPlugin from './markdown-shortcuts'
import ThemeEditorPlugin from '../plugins/theme-editor'

export default [
  ThemeEditorPlugin(),
  SoftBreak({ shift: true }),
  MarkdownPlugin(),
  CodePlugin(),
  JSXBlocksPlugin(),
  LiveJSXPlugin(),
  TablePlugin(),
  DeepTable(),
  ImagePlugin(),
  LinkPlugin(),
  ListsPlugin({
    blocks: {
      ordered_list: 'numbered-list',
      unordered_list: 'bulleted-list',
      list_item: 'list-item'
    }
  }),
  MarkdownShortcutsPlugin()
]
