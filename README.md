# 📚 Blocks

> Empowering authors to write dynamic, engaging, and immersive content without leaving
their editor

Blocks is a rich text editor with all the capabilities of components thanks to [MDX][mdx].
It's a powerful WYSIWYG (what you see is what you get) built for the content web. You can
choose a block from an ever-expanding library or even install your own from [npm][].

## What is a block?

A block refers to a piece of content or a component. It's a section of your content while
a document is a collection of blocks.

Blocks can be simple like a paragraph of text or even a box with a tomato background color.
Blocks can be complex like an embedded spreadsheet or a chart that fetches live data.

### See it in action

EMBED A GIF HERE WHEN THE MVP IS DONE

## Features

- 📸**Customizable**: Render your own components, or choose your favorite theme
- 📨**Open and authorable**: Underneath it's [MDX][mdx], not a JSON schema or HTML
- 🔐**Zero lock in**: You own your content, Blocks just makes it nicer to edit
- 🖼**WYSIWYG**: See what will be published in real time

### Blocks

The default editor offers an extensive library of pre-made blocks:

- [ ] checklist
- [ ] link unfurl
- [ ] tables
- [ ] spreadsheet
- [ ] image gallery
- [ ] twitter card
- [ ] instagram card
- [ ] syntax highlighting
- [ ] live editor playground
- [ ] github issue
- [ ] github gist
- [ ] github interlinking (between documents in the same repo)
- [ ] text highlighting
- [ ] text coloring
- [ ] bar chart
- [ ] area chart
- [ ] donut chart
- [ ] progress bar

## How does it work?

Technically speaking, it is a block-based editor backed by [MDX][mdx] and the
[React][react] ecosystem. The editor is embedded into a GitHub compatible CMS
powered by [Netlify Identity][netlify-identity] and [Gatsby][gatsby]. When you
edit a document it's automatically synced to GitHub as a commit giving you a
full history of all edits.

Blocks maintains no server side element and never sees your data. You own your content.

[mdx]: https://mdxjs.com/
[npm]: https://npmjs.com/
[react]: https://reactjs.org/
[gatsby]: https://www.gatsbyjs.org/
[netlify-identity]: https://www.netlify.com/docs/identity/
