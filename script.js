var matrix = [];
var row = 40, column = 40;
var side = 24;
var grassArr = [], grassEaterArr = [], PersonArr = [], PredatorArr = [];
var matrix = [];
var weather = 0;

function setup() {
    for (var y = 0; y < row; y++) {
        matrix[y] = [];
        for (var x = 0; x < column; x++) {
            var r = random(400);
            if (r < 20) r = 0;
            else if (r < 280) r = 1;
            else if (r < 325) r = 2;
            else if (r < 393) r = 3;
            else if (r < 400) r = 4;
            matrix[y][x] = r;
        }
    }

    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y);
                grassEaterArr.push(gr);
            }
            else if (matrix[y][x] == 3) {
                var gr = new Predator(x, y);
                PredatorArr.push(gr);
            }
            else if (matrix[y][x] == 4) {
                var gr = new Person(x, y);
                PersonArr.push(gr);
            }
        }
    }

   setInterval(function () {

        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        var lightning = new Lightning(x, y);
        lightning.xpel();

    }, 5000);





}
var count = 0;
function draw() {
    count++; 
    if (count <= 10) {
        weather = 1;
    }
    else if (count > 10 && count <= 20) {
        weather = 2;
    }
    else if (count > 20 && count <= 30) {
        weather = 3;
    }
    else if (count > 30 && count <= 40) {
        weather = 4;
    }
    else{
        count =0;
    }
    drawMatrix();
    for (var i in grassArr) {
        grassArr[i].mult();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
    }
    for (var i in PredatorArr) {
        PredatorArr[i].move();
    }
    for (var i in PersonArr) {
        PersonArr[i].move();  
        PersonArr[i].hndzel();
    }
   
      

}
function drawMatrix() {
    if(grassArr.length == 0){
        location.reload();
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                if (weather == 1) {
                    fill("green");
                    console.log(count);

                }
                else if (weather == 2) {
                    console.log(weather);
                    fill("yellow");
                }
                else if (weather == 3) {
                    console.log(weather);
                    fill("white");
                }
                else if (weather == 4) {
                    console.log(weather);
                    fill("lightgreen");
                }
                rect(x * side, y * side, side, side);
            }
            
            else if (matrix[y][x] == 2) {
                fill("red");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 3) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#85C1E9");
                rect(x * side, y * side, side, side);
            }
        }
    }
}





