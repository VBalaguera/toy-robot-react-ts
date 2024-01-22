# Toy robot game

DESCRIPTION: This is a classic coding challenge that uses vite, react, typescript, jest and react-testing.

LIVE version available [here](https://toy-robot-react-ts.vercel.app/).

## Project Folder Structure

```
app/
  node_modules/
  src/
    __test__/
      App.test.tsx
      FormOne.test.tsx
      FormTwo.test.tsx
    components/
      board/
        Board.tsx
        Piece.tsx
        Square.tsx
      game/
        GameBoard/
          GameBoard.tsx
        GameControls/
          GameControls.tsx
          GameControlsCommands.tsx
          GameControlsInput.tsx
          GameControlsPanel.tsx
        GameUI/
          GameError.tsx
          GameHeading.tsx
          GameInstructions.tsx
          GameReport.tsx
        Game.tsx
      ui/
        Button.tsx
        Command.tsx
        CommandsLog.tsx
        Container.tsx
        Input.tsx
        Instruction.tsx
        Log.tsx
        Select.tsx
        Text.tsx
    store/
      game-slice.ts
      hooks.ts
      reducers.ts
      store.ts
    utils/
      index.ts
      test-utils.ts
    App.tsx
    index.css
    main.tsx
    vite-end.d.ts
  public/
  .eslintrc.cjs
  .gitignore
  AssignmentSpecs.pdf
  babel.config.js
  index.html
  jest.config.js
  jest.setup.js
  package-lock.json
  package.json
  README.md
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
```

## Available Scripts

In the app directory, you can run these scripts:

### npm run dev

Runs app in development mode.
Access [http://localhost:3000](http://localhost:3000) to view it in the browser.

Given the current eslint config using [vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint), any future edits that produce errors will be shown in the browser too.

### npm run build

Builds the app for production.
Uses the `dist` folder.

### npm run lint

Executes eslint with the following commands:

```sh
eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0
```

### npm run test

Executes jest with the following commands:

```sh
"jest --watchAll=false --coverage --CI=true"
```

Thus, running local tests using Jest and react-testing. Generates `coverage` folder.

### npm run preview

Boots up a local static web server that serves the files from `dist`at [http://localhost:8080](http://localhost:8080).
For local use, not meant as a production server.

## How to play this game

Welcome to the toy robot game!

In this game, you can place a robot anywhere at this 5x5 board. To do so, use the command **PLACE_ROBOT ROW,COL,FACING**. **ROW and COL** reference the coordinates in the y and x axis respectively (only using numbers from 1 to 5 for each). Any While **FACING** dictates the robot's direction. There are 4 available directions: **NORTH, SOUTH, EAST, and WEST**.

Example:

```
PLACE_ROBOT 1,1,EAST
```

You can also place walls on this board using the command **PLACE_WALL ROW,COL**. To place a wall, use valid numeric coordinates. If the target location is occupied by a robot or another wall, this command will be ignored. **NOTE**: you can place as many walls as you want, but leave the robot at least a few free spaces to play with...

Example:

```
PLACE_WALL 1,1
```

Typing **REPORT**: prints out the current location and facing direction of the robot.

Typing **MOVE**: command moves the robot one space forward in the direction it's currently facing. location and facing direction of the robot. Unless there's a wall in front of it!

Typing **LEFT/RIGHT**: To place a wall, use valid numeric coordinates. If the target location is occupied by a robot or another wall, this command will be ignored!

## Image links

[Robot](https://www.svgrepo.com/svg/21117/robot).
