class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = Math.round(random(8, 16));
        this.speed = 6;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    /////
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;

    }
    ///
    mult() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);//array
        var randomCell = random(emptyCells);//[x,y]
        if (this.multiply >= 16 && randomCell != undefined) {
            var x = randomCell[0];
            var y = randomCell[1];
            matrix[y][x] = 1;

            var gr = new Grass(x, y);
            grassArr.push(gr);
            this.multyply = 0;
        }
    }
}
////////////GRASSEATER/////////////////
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 60;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;

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
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = Math.round(random(30, 40));
        this.energy = 60;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;

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
class Person {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 30;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;

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


class Lightning {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 3, this.y - 3],
            [this.x + 4, this.y - 4],
            [this.x + 5, this.y - 5],
            [this.x + 6, this.y - 6],
            [this.x + 7, this.y - 7],
            [this.x + 8, this.y - 8],
            [this.x + 9, this.y - 9]
        ];

    }

    getNewCoordinates() {
        this.directions = [
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 3, this.y - 3],
            [this.x + 4, this.y - 4],
            [this.x + 5, this.y - 5],
            [this.x + 6, this.y - 6],
            [this.x + 7, this.y - 7],
            [this.x + 8, this.y - 8],
            [this.x + 9, this.y - 9]
        ];
    }

    xpel() {
        for (var i in this.directions) {

            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (this.directions[0] != undefined && this.directions[1] != undefined) {

                    if (matrix[y][x] == 1) {
                        for (var i in grassArr) {
                            if (x == grassArr[i].x && y == grassArr[i].y) {
                                grassArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[y][x] == 2) {
                        for (var i in grassEaterArr) {
                            if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                                grassEaterArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[y][x] == 3) {
                        for (var i in PredatorArr) {
                            if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
                                PredatorArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[y][x] == 4) {
                        for (var i in PersonArr) {
                            if (x == PersonArr[i].x && y == PersonArr[i].y) {
                                PersonArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    matrix[y][x] = 5;
                }
            }
        }
    }
}