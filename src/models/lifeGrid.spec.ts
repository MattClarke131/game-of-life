import { LifeGrid } from './lifeGrid'

describe('LifeGrid', () => {
  describe('get grid()', () => {
    test('get grid() returns a boolean', () => {
      const lifeGrid = new LifeGrid(5,5)
      const expected = false
      const actual = lifeGrid.lifeGrid[0][0].isAlive

      expect(actual).toBe(expected)
    })
  })

  describe('setCell(x, y, isAlive)', () => {
    test('setCell changes the value of a cell', () => {
      const lifeGrid = new LifeGrid(5,5)
      lifeGrid.setCell(0,0, true)
      const expected = true
      const actual = lifeGrid.lifeGrid[0][0].isAlive

      expect(actual).toBe(expected)
    })
  })

  describe('iterate', () => {
    test('A blinker iterates correctly', () => {
      // given
      const lifeGrid = new LifeGrid(3,3)
      lifeGrid.setCell(0,1, true)
      lifeGrid.setCell(1,1, true)
      lifeGrid.setCell(2,1, true)

      // when
      lifeGrid.iterate()

      //then
      const expected = 3
      const actual = lifeGrid.lifeGrid[1].filter( cell => cell.isAlive ).length
      expect(actual).toBe(expected)
    })
  })
})
