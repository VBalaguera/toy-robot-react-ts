# NOTES ABOUT REQUIREMENTS

## Requirements
You are tasked to implement a simple Toy Robot game.
The game initialises with an empty 5 x 5 board with its own coordinate system:
the bottom left of the board is (1, 1) (row 1, column 1), and the top right corner of the board is (5, 5).

<!-- which means rotating -->

When the game starts, it responds to the following user commands:

### PLACE_ROBOT ROW,COL,FACING
This command places a robot at a given coordinate with an initial Facing direction
• If there are no robots on the board, the PLACE_ROBOT adds one to the coordinate specified.

<!-- considering this: I know a few people, myself included, who would just fill the
entire board with walls before putting the robot just because it's a viable option
only to see what would happen, therefore:

// pseudocode here:

initialState = {
    BlockedSquares: []
    hasRobot: false
    coordinates: []
    error: ''
    Log: []
}

Since you CANNOT remove walls, the only coordinates that will come and go to/from BlockedSquares will be the ones
for PLACE_ROBOT action

And it would be fun if given that you can fill the entire board with walls before
you place the robot, after checking if the entire board is finally full of walls
(which is a simple boolean in a comparisson between a, pseudocode here,
EntireBoardCoordinates and BlockedCoordinates AND hasRobot as false),
then giving a message saying something like:
"the robot wanted to play today, but you didn't allowed it to!"

This, of course, is another error message.
 -->

• If there is already a robot, a new PLACE_ROBOT command moves the existing robot to the new
location.
• If the coordinate or facing value is invalid, then the game ignores it and does nothing.
Accepted Facing values are: NORTH, SOUTH, EAST, WEST

Example

 <!-- This places a robot at row 2, column 3, facing North. -->

PLACE_ROBOT 2,3,NORTH

<!-- NOTE HOW THERE ARE ONLY SPACES BETWEEN args[0]
and commas between the other three -->
<!-- 4 args -->

<!-- args[0] = PLACE_ROBOT

valid numbers for coordinates: 1, 2, 3, 4, 5 -->

<!-- for each method,
extract always 1
from the command -->
<!--
type Coordinates = {
y: number
x: number
}

args[1] = y
args[2] = x
args[3] = direction

type Direction = {
direction: string
}

valid directions: "NORTH" | "EAST" | "SOUTH" | "WEST"

args[0] as an action.type
action.type = 'PLACE_ROBOT'

args[1, 3] as the action.payload

coordinates will be added to BlockedSquares

type BlockedSquares = {
blockedSquares: Coordinates[]
} -->

<!-- This command is ignored because facing direction is invalid -->

PLACE_ROBOT 2,3,CENTER

<!-- This command is ignored because the COL coordinate is invalid -->

PLACE_ROBOT 2,6,EAST

### PLACE_WALL ROW,COL

<!-- args[0] = PLACE_WALL
action.type = 'PLACE_WALL'
args[1] = y
args[2] = x

This command places a wall at the given coordinate.
• If the target location is empty, then it adds a wall to it. -->

<!-- check BlockedSquares -->

<!-- action dispatched checks if the existent BlockedSquares array contains the
given coordinates; if false, adds a wall to it

walls are visually shown by using a different color scheme
in this case, crimson -->

• The user can add as many walls as they like until the board is filled.

<!-- again, checking BlockedSquares -->
<!-- also, adding to the notes above about filling the board,
but in this case hasRobot is true,
a new message will pop up saying something like:
"So many walls, so much fun. Let's play again!"
  -->

• If the target location is occupied (by the robot, or another wall), then this command is ignored.

<!-- check BlockedSquares -->

• Invalid coordinates are ignored.

<!-- valid numbers for coordinates: 1, 2, 3, 4, 5 -->

Example

# This places a wall at row 2, column 3.

PLACE_WALL 2,3

<!--
args[0] = 'PLACE_WALL'
action.type = 'PLACE_ROBOT'
args[1] = y
args[2] = x

 -->

### REPORT
The game prints out the current location and facing direction of the robot.
• If there are no robots on the board, this command is ignored.
Example
PLACE_ROBOT 2,3,WEST
REPORT

```
-> app prints: 2,3,WEST
```

<!-- action.type = 'REPORT' -->

<!--
Checks out current Coordinates and Direction
Prints them
Add that message to the log message
-->

### MOVE
The MOVE command moves the robot 1 space forward in the direction it is currently facing.
• If there are no robots on the board, this command is ignored.
• If there is a wall in front of the robot, this command is ignored.
• If the robot has already reached the edge of the board, a MOVE command towards the edge warps
the robot to the opposite side of the board.

<!-- action.type = 'MOVE' -->

Examples:

<!--
Coordinates: [1, 2]
Direction: north

pseucode here:
if (d === 'north') {
    Coordinates: [1, 3]
}


Coordinates: [4, 3]
Direction: west

pseucode here:
if (d === 'west') {
    Coordinates: [3, 3]
}


Coordinates: [4, 4]
Direction: north

this will return a error
 -->

Example

# robot starts at 1,1 facing North

PLACE_ROBOT 1,1,NORTH

# a single move

MOVE

# report location

REPORT

# -> app prints: 1,2,NORTH

# robot starts at 1,1 facing SOUTH

PLACE_ROBOT 1,1,SOUTH

# a single move towards the edge

MOVE

# report location

REPORT

# -> app prints: 1,5,SOUTH

# The robot is moved to the opposite side, facing the same direction.

### LEFT / RIGHT
The turn commands LEFT and RIGHT, turns the robot 90 degrees to its current left or right.
• If there are no robots on the board, this command is ignored.

<!-- check hasRobot, if true:  -->

<!-- action.type = 'LEFT' -->
<!-- action.type = 'RIGHT' -->

Example
PLACE_ROBOT 1,1,NORTH
LEFT
REPORT

# -> app prints: 1,1,WEST

<!--  -->

RIGHT
REPORT

# -> app prints: 1,1,NORTH

Test Data
Here are some examples of test data to help your development:
PLACE_ROBOT 3,3,NORTH
PLACE_WALL 3,5
MOVE
MOVE
RIGHT
MOVE
MOVE
MOVE
REPORT

# the app should print: 1,4,EAST

PLACE_ROBOT 2,2,WEST
PLACE_WALL 1,1
PLACE_WALL 2,2
PLACE_WALL 1,3
LEFT
LEFT
MOVE
REPORT

# the app should print: 3,2,EAST
