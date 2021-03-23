export class LifeGrid {
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = xSize;
        const grids = this.populateGrids(xSize, ySize);
        this.lifeGrid = grids.lifeGrid;
        this.tempGrid = grids.tempGrid;
    }
    populateGrids(xSize, ySize) {
        const newLifeGrid = [];
        const newTempGrid = [];
        for (let x = 0; x < xSize; x++) {
            newLifeGrid[x] = [];
            newTempGrid[x] = [];
            for (let y = 0; y < ySize; y++) {
                newLifeGrid[x][y] = new Cell();
                newTempGrid[x][y] = new Cell();
            }
        }
        return {
            lifeGrid: newLifeGrid,
            tempGrid: newTempGrid,
        };
    }
    get grid() {
        return this.lifeGrid;
    }
    setCell(x, y, isAlive) {
        if (x >= 0 && x < this.xSize && y >= 0 && y < this.ySize) {
            this.lifeGrid[x][y].isAlive = isAlive;
        }
        else {
            throw ('Attempted to set a nonexistant cell');
        }
    }
    iterate() {
        for (let x = 0; x < this.xSize; x++) {
            for (let y = 0; y < this.ySize; y++) {
                this.applyRulesToCell(x, y);
            }
        }
        this.applyTempGridToLifeGrid();
    }
    applyRulesToCell(x, y) {
        const cell = this.lifeGrid[x][y];
        const numberOfLivingNeighbors = this.getNumberOfLivingNeighbors(x, y);
        if (cell.isAlive) {
            this.tempGrid[x][y].isAlive = LifeGrid.STAY_ALIVE.includes(numberOfLivingNeighbors);
        }
        else {
            this.tempGrid[x][y].isAlive = LifeGrid.TURN_ALIVE.includes(numberOfLivingNeighbors);
        }
    }
    getNumberOfLivingNeighbors(x, y) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const neighborCells = [
            (_a = this.lifeGrid[x - 1]) === null || _a === void 0 ? void 0 : _a[y - 1],
            (_b = this.lifeGrid[x - 1]) === null || _b === void 0 ? void 0 : _b[y],
            (_c = this.lifeGrid[x - 1]) === null || _c === void 0 ? void 0 : _c[y + 1],
            (_d = this.lifeGrid[x]) === null || _d === void 0 ? void 0 : _d[y - 1],
            (_e = this.lifeGrid[x]) === null || _e === void 0 ? void 0 : _e[y + 1],
            (_f = this.lifeGrid[x + 1]) === null || _f === void 0 ? void 0 : _f[y - 1],
            (_g = this.lifeGrid[x + 1]) === null || _g === void 0 ? void 0 : _g[y],
            (_h = this.lifeGrid[x + 1]) === null || _h === void 0 ? void 0 : _h[y + 1],
        ].filter(c => c !== undefined);
        const livingNeighbors = neighborCells.filter((c) => c.isAlive);
        return livingNeighbors.length;
    }
    applyTempGridToLifeGrid() {
        for (let x = 0; x < this.xSize; x++) {
            for (let y = 0; y < this.ySize; y++) {
                this.lifeGrid[x][y].isAlive = this.tempGrid[x][y].isAlive;
            }
        }
    }
}
LifeGrid.TURN_ALIVE = [3];
LifeGrid.STAY_ALIVE = [2, 3];
class Cell {
    constructor(isAlive = false) {
        this.isAlive = isAlive;
    }
}
