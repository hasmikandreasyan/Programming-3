////////////GRASSEATER/////////////////
class GrassEater extends Base{
    constructor(x,y,index){
        super(x,y,index)
        this.multiply = Math.round(random(30, 40));
        this.energy = 20;
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

            matrix[y][x] = 2;

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            if (this.energy <= 0) {
                this.die();
            }
            if (this.energy <= 4) {
                this.eat();
            }
        }

    }
    eat() {
        this.getNewCoordinates();
        var filledCells = this.chooseCell(1);
        if (filledCells.length != 0) {
            var randomCell = random(filledCells)

            var x = randomCell[0];
            var y = randomCell[1];

            matrix[y][x] = 2;

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy++;
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 10) {
                this.multiply();
            }


            return true;
        }

    }
    multiply() {
        var filledCells = random(this.chooseCell(0));
        if (filledCells) {
            var newGrassEater = new GrassEater(filledCells[0], filledCells[1]);
            grassEaterArr.push(newGrassEater);
            matrix[filledCells[1]][filledCells[0]] = 2;
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }



    }

}///////GRASSEATER END