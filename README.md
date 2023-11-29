# Toy robot game

DESCRIPTION: This is a classic coding challenge that uses react.js and typescript.

## Folder Structure

```
app/
  node_modules/
  src/
    App.tsx
    index.css
    main.tsx
    vite-end.d.ts
  public/
    <!-- placeholder content for this project -->
  .eslintrc.cjs
  .gitignore
  index.html
  package-lock.json
  package.json
  README.md
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
```

## Available Scripts

In the app directory, you can run these scripts:

### npm run dev

Runs app in development mode.
Access [http://localhost:3000](http://localhost:3000) to view it in the browser.

Given the current eslint config using [vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint), any future edits that produce errors will be shown in the browser too.

### npm run build

Builds the app for production.
Uses the `dist` folder.

### npm run lint

Executes eslint with the following commands:

```sh
eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0
```

### npm run preview

Boots up a local static web server that serves the files from `dist`at [http://localhost:8080](http://localhost:8080).
For local use, not meant as a production server.
