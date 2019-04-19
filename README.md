# 📚 Blocks

> Empowering authors to write dynamic, engaging, and immersive content without leaving
their editor

Blocks is a rich text editor with all the capabilities of components thanks to [MDX][mdx].
It's a powerful WYSIWYG (what you see is what you get) built for the content web. You can
choose a Block from an ever-expanding library or even install your own from [npm][].

## What is a Block?

A Block refers to a piece of content or a component. It's a section of your content while
a document is a collection of blocks.

Blocks can be simple like a paragraph of text or even a box with a tomato background color.
Blocks can be complex like an embedded spreadsheet or a chart that fetches live data.

Blocks provides a UI for you to drop in and modify a Block. However, underneath the covers
it's JSX:

```md
# Below is a YouTube video

<Youtube id="1234" />

And a GitHub Gist:

<Gist id="5678" />
```

## Features

- 📸**Customizable**: Render your own components, or choose your favorite theme
- 📨**Open and [authorable][]**: Underneath it's [MDX][mdx], not a JSON schema or HTML
- 🔐**Zero lock-in**: You own your content, Blocks just makes it nicer to edit
- 🖼**WYSIWYG**: See what will be published as you edit

[mdx]: https://mdxjs.com/
[npm]: https://npmjs.com/
[authorable]: https://johno.com/authorable
