const GameInstructionsText: string = `
Welcome to the toy robot game!
\n
Here are some commands you can use: 

PLACE_ROBOT ROW,COL,FACING
Places the robot at a given coordinate
\n
welcome
Lorem ipsum dolor aliquid repellendus minima quis necessitatibus? Odio, aspernatur. Et ex aliquam minima odio excepturi sunt blanditiis vel perferendis, ipsum, atque sit laboriosam minus magnam quidem beatae dicta doloremque quo provident rem soluta aut vero incidunt nulla aliquid. Inventore optio, ratione neque, modi nesciunt similique quisquam, exercitationem distinctio assumenda velit suscipit. Dicta, perferendis.
`

export default function GameInstructions() {
  console.log(GameInstructionsText)
  return (
    <div className='game-controls-instructions'>
      <span style={{ fontSize: '1.2rem', textDecoration: 'underline' }}>
        Welcome to the <strong>toy robot game</strong>!
      </span>

      <span>
        In this game, you can place a robot anywhere at this 5x5 board. To do
        so, use the command <code>PLACE_ROBOT ROW,COL,FACING</code>
      </span>

      <span>
        <strong>ROW and COL</strong> reference the coordinates in the y and x
        axis respectively (only using numbers from 1 to 5 for each). Any While{' '}
        <strong>FACING</strong> dictates the robot's direction. There are 4
        available directions: <code>NORTH, SOUTH, EAST</code> and{' '}
        <code>WEST</code>.
      </span>

      <span>
        You can also place walls on this board using the command{' '}
        <code>PLACE_WALL ROW,COL</code>. To place a wall, use valid numeric
        coordinates. If the target location is occupied by a robot or another
        wall, this command will be ignored.
      </span>

      <span>
        You can also place walls on this board using the command{' '}
        <code>PLACE_WALL ROW,COL</code>. To place a wall, use valid numeric
        coordinates. If the target location is occupied by a robot or another
        wall, this command will be ignored.
      </span>

      <span>
        You can also place walls on this board using the command{' '}
        <code>PLACE_WALL ROW,COL</code>. To place a wall, use valid numeric
        coordinates. If the target location is occupied by a robot or another
        wall, this command will be ignored.
      </span>
    </div>
  )
}
