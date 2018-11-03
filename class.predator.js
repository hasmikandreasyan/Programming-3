class Predator extends Base{
    constructor(x,y,index){
        super(x,y,index)
        this.multiply=60;
        this.energy = 60;
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

            matrix[y][x] = 3;

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            if (this.energy <= 0) {
                this.die();
            }
            else if (this.energy <= 5) {
                this.eat();
            }
        }

    }
    eat() {
        if (this.energy <= 10) {
            this.getNewCoordinates();
            var filledCells = this.chooseCell(2);
            if (filledCells.length != 0) {
                var randomCell = random(filledCells)

                var x = randomCell[0];
                var y = randomCell[1];

                matrix[y][x] = 3;

                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
                this.energy++;
                for (var i in grassEaterArr) {
                    if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                this.getNewCoordinates();
                var filledCells = this.chooseCell(4);
                if (filledCells.length != 0) {
                    var randomCell = random(filledCells)

                    var x = randomCell[0];
                    var y = randomCell[1];

                    matrix[y][x] = 3;

                    matrix[this.y][this.x] = 0;

                    this.x = x;
                    this.y = y;
                    this.energy++;
                    for (var i in PersonArr) {
                        if (this.x == PersonArr[i].x && this.y == PersonArr[i].y) {
                            PersonArr.splice(i, 1);
                            break;
                        }
                    }
                    if (this.energy >= 10) {
                        this.multiply();
                    }

                }
                return true;
            }
        }
    }
    multiply() {
        var filledCells = random(this.chooseCell(0));
        if (filledCells) {
            var newPredator = new Predator(filledCells[0], filledCells[1]);
            PredatorArr.push(newPredator);
            matrix[filledCells[1]][filledCells[0]] = 3;
        }
    }


    die() {

        matrix[this.y][this.x] = 0;
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

}
//////////////END OF Predator