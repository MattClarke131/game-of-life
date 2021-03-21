
export class LifeGrid { 
  static readonly TURN_ALIVE = [3]
  static readonly STAY_ALIVE = [2,3]

  private lifeGrid: Cell[][]
  private tempGrid: Cell[][]
  private xSize: number
  private ySize: number

  constructor(xSize: number, ySize: number) {
    this.xSize = xSize
    this.ySize = xSize

    const grids = this.populateGrids(xSize, ySize)
    this.lifeGrid = grids.lifeGrid
    this.tempGrid = grids.tempGrid
  }

  private populateGrids(xSize: number, ySize: number) {
    const newLifeGrid: Cell[][] = []
    const newTempGrid: Cell[][] = []

    for (let x=0; x<xSize; x++) {
      newLifeGrid[x] = []
      newTempGrid[x] = []
      for (let y=0; y<ySize; y++) {
        newLifeGrid[x][y] = new Cell()
        newTempGrid[x][y] = new Cell()
      }
    }

    return {
      lifeGrid: newLifeGrid,
      tempGrid: newTempGrid,
    }
  }

  get grid(): Cell[][] {
    return this.lifeGrid
  }

  public setCell(x: number, y: number, isAlive: boolean) : void {
    if (x >= 0 && x < this.xSize && y >= 0 && y < this.ySize) {
      this.lifeGrid[x][y].isAlive = isAlive
    } else {
      throw('Attempted to set a nonexistant cell')
    }
  }

  public iterate() : void {
    for (let x=0; x<this.xSize; x++) {
      for (let  y=0; y<this.ySize; y++) {
          this.applyRulesToCell(x,y)
      }
    }

    this.applyTempGridToLifeGrid()
  }

  private applyRulesToCell(x: number, y: number) {
    const cell: Cell = this.lifeGrid[x][y]
    const numberOfLivingNeighbors: number = this.getNumberOfLivingNeighbors(x, y)

    if (cell.isAlive) {
      this.tempGrid[x][y].isAlive = LifeGrid.STAY_ALIVE.includes(numberOfLivingNeighbors)
    } else {
      this.tempGrid[x][y].isAlive = LifeGrid.TURN_ALIVE.includes(numberOfLivingNeighbors)
    }

  }

  private getNumberOfLivingNeighbors(x: number, y:number) : number {
    const neighborCells = [
      this.lifeGrid[x-1]?.[y-1],
      this.lifeGrid[x-1]?.[y],
      this.lifeGrid[x-1]?.[y+1],
      this.lifeGrid[x]?.  [y-1],
      this.lifeGrid[x]?.  [y+1],
      this.lifeGrid[x+1]?.[y-1],
      this.lifeGrid[x+1]?.[y],
      this.lifeGrid[x+1]?.[y+1],
    ].filter( c => c !== undefined )
    const livingNeighbors: Cell[] = neighborCells.filter( (c: Cell) => c.isAlive )

    return livingNeighbors.length
  }

  private applyTempGridToLifeGrid() : void {
    for (let x=0; x<this.xSize; x++) {
      for (let y=0; y<this.ySize; y++) {
        this.lifeGrid[x][y].isAlive = this.tempGrid[x][y].isAlive
      }
    }
  }

}

class Cell {
  public isAlive: boolean

  constructor (isAlive: boolean = false) {
    this.isAlive = isAlive
  }
}
