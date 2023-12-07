// what we will control from here?
// and how?

// Facing in the docs for
export type Direction = {
direction: string
}
// coordinates
export type Coordinates = {
y: number
x: number
}

// has a robot in it?
export type HasRobot = {
hasRobot: boolean
}

export type CoordinatesDirection = Direction & Coordinates

// which squares are Blocked by either walls
// or the robot/piece itself
export type BlockedSquares = {
BlockedSquares: Coordinates[]
}
