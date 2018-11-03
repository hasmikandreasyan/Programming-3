class Person extends Base{
    constructor(x,y,index){
        super(x,y,index)
        this.multiply = Math.round(random(30, 40));
        this.energy=20;
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
 
    move() {

        var emptyCells = this.chooseCell(0);
        if (emptyCells.length != 0) {
            this.energy--;
            var randomCell = random(emptyCells)

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 4;

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }



    }
    hndzel() {
        this.getNewCoordinates();
        var filledCells = this.chooseCell(1);
        if (filledCells.length != 0) {
            var randomCell = random(filledCells);
            var x = randomCell[0];
            var y = randomCell[1];
            for (var i in this.directions) {
                var ix = this.directions[i][0], iy = this.directions[i][1];
                if (matrix[ix] != undefined && matrix[iy] != undefined) {
                    matrix[iy][ix] = 0;
                    for (var i in grassArr) {
                        if (ix == grassArr[i].x && iy == grassArr[i].y) {
                            grassArr.splice(i, 8);
                            break;
                        }
                    }
                    this.energy--;
                }
            }
            return true;
        }

    }

}
