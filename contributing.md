# Contributing

> This project has a [Code of Conduct](./code-of-conduct.md).
> By interacting with this repository, organization, or community you agree to
> abide by its terms.

Hi! 👋
We’re excited that you’re interested in contributing!
Take a moment to read the following guidelines.
And thanks for contributing to **Blocks**! 👏👌✨

## Getting started

Clone the repo and install the dependencies.

```sh
git clone https://github.com/blocks/blocks
cd blocks
yarn
```

Then, run the docs site:

```sh
yarn start
```

The docs site includes a demo page which is a great way to get
started making changes to the editor itself.

Docs pages themselves are located in `src/pages`. All types of
docs contributions are very welcome!

## How to contribute?

Before undergoing a substantial to docs or the codebase, please
open up an issue to make sure it's a desired change. We don't want
you to put in lots of time for something that isn't part of this
project's goals.

We're working on formalizing the roadmap for **Blocks**, to make
the path to contributing a little bit clearer.

For now, good places to look at are the
[issues](https://github.com/blocks/blocks/issues) and the
[roadmap](https://github.com/orgs/blocks/projects/1).

Reporting bugs that have not been issued yet also helps!

## Version management

Keystone uses @noviny's [@changesets/cli](https://github.com/noviny/changesets) to track package versions and publish packages.
This tool allows each PR to indicate which packages need a version bump along with a changelog snippet.
This information is then collated when performing a release to update package versions and `CHANGELOG.md` files.

#### What all contributors need to do

- Make your changes (as per usual)
- Before you make a Pull Request, run the `yarn changeset` command and answer the questions that are asked. It will want to know:
  - which packages you want to publish
  - what version you are releasing them at
  - a message to summarise the changes (this message will be written to the changelog of bumped packages)
- Before you accept the changeset, it will display all the data that will be written to the changeset. If this looks fine, agree, and a changeset will be generated in the `.changeset` directory.

After this, a new changeset will be added which is a markdown file with YAML front matter.

```
-| .changeset/
-|-| UNIQUE_ID.md
```

The message you typed can be found in the markdown file. If you want to expand on it, you can write as much markdown as you want, which will all be added to the changelog on publish. If you want to add more packages or change the bump types of any packages, that's also fine.

While not every changeset is going to need a huge amount of detail, a good idea of what should be in a changeset is:

- WHAT the change is
- WHY the change was made
- HOW a consumer should update their code

You can have multiple changesets in a single PR. This will give you more granular changelogs, and is encouraged.

## Related

- [How it works](https://blocks-ui.com/docs/advanced/how-it-works/): Summary of the editor's architecture.
