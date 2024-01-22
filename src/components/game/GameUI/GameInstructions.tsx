import Instruction from '../../ui/Instruction'

export default function GameInstructions() {
  return (
    <div className='game-controls-instructions'>
      <Instruction>
        <span style={{ textDecoration: 'underline' }}>
          Welcome to the <strong>toy robot game</strong>!
        </span>
      </Instruction>

      <Instruction>
        {' '}
        <span>
          In this game, you can place a robot anywhere at this 5x5 board. To do
          so, use the command <code>PLACE_ROBOT ROW,COL,FACING</code>
        </span>
      </Instruction>

      <Instruction>
        {' '}
        <span>
          <strong style={{ textDecoration: 'underline' }}>ROW and COL</strong>{' '}
          reference the coordinates in the y and x axis respectively (only using
          numbers from 1 to 5 for each). Any While <strong>FACING</strong>{' '}
          dictates the robot's direction. There are 4 available directions:{' '}
          <code>NORTH, SOUTH, EAST</code> and <code>WEST</code>.
        </span>
      </Instruction>

      <Instruction>
        {' '}
        <span>
          You can also place walls on this board using the command{' '}
          <code>PLACE_WALL ROW,COL</code>. To place a wall, use valid numeric
          coordinates. If the target location is occupied by a robot or another
          wall, this command will be ignored. NOTE: you can place as many walls
          as you want, but leave the robot at least a few free spaces to play
          with...
        </span>
      </Instruction>

      <Instruction>
        {' '}
        <span>
          <code>REPORT</code> prints out the current location and facing
          direction of the robot.
        </span>
      </Instruction>

      <Instruction>
        {' '}
        <span>
          <code>MOVE</code> command moves the robot one space forward in the
          direction it's currently facing. location and facing direction of the
          robot. Unless there's a wall in front of it!
        </span>
      </Instruction>

      <Instruction>
        {' '}
        <span>
          <code>LEFT/RIGHT</code>. To place a wall, use valid numeric
          coordinates. If the target location is occupied by a robot or another
          wall, this command will be ignored!
        </span>
      </Instruction>
    </div>
  )
}
