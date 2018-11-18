class Grass extends Base {
    constructor(x,y,index){
        super(x,y,index);
        this.energy = 20;
        this.multiply = 60;
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