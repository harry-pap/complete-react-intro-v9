# NPM
This is the package manager. It installs stuff in the project.

* To initialize the repo with npm:
  `npm init -y`

* `npm audit`
Reports vulnerabilities in our dependencies

# Prettier
This is the formatter
* Install prettier in the project:
`npm i -D prettier`

* To run prettier locally:
  * Add the format line in `../package.json`
  * run `npm run format`
There are more stuff to prettier, but I moved forward fast as I don't
want to spend time about it at this point, revisit later(maybe claude can help)

# ESLint
This is the linter
Install in the project:
`npm install -D eslint@latest eslint-config-prettier@latest globals@latest`

* Create `../eslint.config.mjs`
* See the chapter for more info, giving up on it as this is a monorepo

* Add eslint.config.mjs


# Vite
This is the build tool.
The bundler it's using is `Rollup`

Install:
`npm install -D vite@latest @vitejs/plugin-react@latest`

`npm i react@latest react-dom@latest`
Normally we want to use explicit versions and not latest


# Package.json
Scripts:
* dev: run locally
* build: would do so in a Github Action or so
* preview: build it for production