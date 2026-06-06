# AGENTS.md

## Project Notes

This is an older Lerna monorepo for `rl-js`. The browser app lives in `packages/apps/react` and uses `react-scripts@1.1.4`, so use an older Node runtime for local development.

## Runtime

Use Node 16:

```bash
source ~/.nvm/nvm.sh
nvm use
```

The repo includes `.nvmrc` with `16`. In this workspace, `nvm` is installed at `~/.nvm`, but it may not be sourced automatically by non-interactive shells.

## Install

From the repo root:

```bash
npm install --legacy-peer-deps
npx lerna bootstrap -- --legacy-peer-deps
```

The legacy peer dependency flag is needed because the dependency tree is old and npm's modern peer resolution is stricter than the tooling this repo was built with.

## Run The React App

From `packages/apps/react`:

```bash
BROWSER=none HOST=0.0.0.0 PORT=3000 npm start
```

The app should compile and serve at:

```text
http://localhost:3000/
```

Expected successful output includes `Compiled successfully!`. A quick smoke check is:

```bash
curl -I http://localhost:3000/
```

## Known Caveats

- `npm run build` in `packages/apps/react` currently fails with CRA 1's minifier because linked local `@rl-js/*` packages contain modern JavaScript syntax that is not transpiled by the production build.
- `npm test -- --runInBand` at the repo root currently fails because the root package declares a `test` script that calls `jest`, but `jest` is not listed as a root dependency.
- `npm install` with modern npm may rewrite old `package-lock.json` files to a newer lockfile format. Avoid committing lockfile rewrites unless dependency updates are intentional.
- The app can run locally without changing application source code when using Node 16 and the commands above.
