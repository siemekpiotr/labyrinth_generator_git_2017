function initMatrix(x) {
    this.c = document.getElementById("myCanvas");
    this.ctx = c.getContext("2d");
    this.tabKier = [1, 1, 1, 1];
    this.xGlob = 0;
    this.yGlob = 0;
    this.size = x*2+1;
    this.matrix = Array(this.size);
    for (var i = 0; i < this.size; i++) {
        this.matrix[i] = Array(this.size);
    }
    for (var i = 0; i < this.size; i++){
        for (var j = 0; j < this.size; j++){
            if (((i+1)%2) == 1){
                this.matrix[i][j] = 1;
            } else {
                this.matrix[i][j] = ((j)%2)+1;
            }
        }
    }
    this.c.width = x * 40;
    this.c.height = x * 40;
}

function mainFunc(){
    document.getElementById("DLbutton").disabled = true;
    var usrSize = document.getElementById("GETsize").value;
    initMatrix(usrSize);
    findRand();
    setInterval(function(){ //for "animation"
        this.ctx.clearRect(0, 0, this.c.width, this.c.height); //czyszczenie na kazda petle
        drawMatrix();
        makeLabirynth();
        //await sleep(1);
        if(makeLabirynth() == 0){
            if(finishGeneration() == 0){ return 0; } //jak nie ma wincej klockow przerwij
            randLine();
        }
    }, 10);
    document.getElementById("DLbutton").disabled = false;
}

function drawMatrix() {
    for (var i = 0; i < this.size; i++){
        for (var j = 0; j < this.size; j++){
            if((i+1)%2 == 1 && (j+2)%2 == 1){ //wsp y
                if(this.matrix[i][j] == 1){
                    this.ctx.beginPath();
                    this.ctx.moveTo(i*20, (j-1)*20);
                    this.ctx.lineTo(i*20, j*20+20);
                    this.ctx.stroke();
                }
            }
            if((i+2)%2 == 1 && (j+1)%2 == 1){ //wsp x
                if(this.matrix[i][j] == 1){
                    this.ctx.beginPath();
                    this.ctx.moveTo((i-1)*20, j*20);
                    this.ctx.lineTo(i*20+20, j*20);
                    this.ctx.stroke();
                }
            }
            if(this.matrix[i][j] == 2){
                this.ctx.beginPath();
                this.ctx.rect(i*20-17,j*20-17,34,34);
                this.ctx.stroke();
            }
        }
    }
}

function makeLabirynth(){
        var dir = Math.floor(Math.random() * 4)
        var x = this.xGlob;
        var y = this.yGlob;
        //looking around rand
        if (dir == 0 && this.tabKier[0] == true && x + 2 < this.size && this.matrix[x + 2][y] != 3) {//prawo
            if (this.matrix[x + 1][y] == 1) {
                this.matrix[x + 1][y] = 0;
                this.matrix[x + 2][y] = 3;
                this.xGlob = x + 2;
                this.tabKier = [1,1,1,1];
            }
        }
        else if (dir == 1 && this.tabKier[1] == true && x - 2 > 0 && this.matrix[x - 2][y] != 3) {//lewo
            if (this.matrix[x - 1][y] == 1) {
                this.matrix[x - 1][y] = 0;
                this.matrix[x - 2][y] = 3;
                this.xGlob = x - 2;
                this.tabKier = [1,1,1,1];
            }
        }
        else if (dir == 2 && this.tabKier[2] == true && y + 2 < this.size && this.matrix[x][y + 2] != 3) {//dol
            if (this.matrix[x][y + 1] == 1) {
                this.matrix[x][y + 1] = 0;
                this.matrix[x][y + 2] = 3;
                this.yGlob = y + 2;
                this.tabKier = [1,1,1,1];
            }
        }
        else if (dir == 3 && this.tabKier[3] == true && y - 2 > 0 && this.matrix[x][y - 2] != 3) {//gora
            if (this.matrix[x][y - 1] == 1) {
                this.matrix[x][y - 1] = 0;
                this.matrix[x][y - 2] = 3;
                this.yGlob = y - 2;
                this.tabKier = [1,1,1,1];
            }
        } else {  //dir zero rand stop
            this.tabKier[dir] = 0;
            if((this.tabKier[0]+this.tabKier[1]+this.tabKier[2]+this.tabKier[3]) == 0){ return 0; }
        }
}

function findRand(){
    for(;;){
        var x = Math.floor((Math.random() * this.size) );
        var y = Math.floor((Math.random() * this.size) );
        if(this.matrix[x][y] == 2){
            this.ctx.beginPath();
            this.ctx.rect(x*20-5,y*20-5,10,10);
            this.ctx.stroke();
            this.matrix[x][y] = 3;
            break;
        }
        if(finishGeneration() == 0){break;}
    }
    this.xGlob=x;
    this.yGlob=y;
    this.tabKier = [1, 1, 1, 1];
}

function randLine(){
    for(var i = 0; i < this.size; i++){
        for(var j = 0; j < this.size; j++){
            this.xGlob = j;
            this.yGlob = i;
            if(this.matrix[j][i] == 2  && i+2 < this.size && this.matrix[j][i+2] == 3){
                this.matrix[j][i+1] = 0;
                this.tabKier = [1, 1, 1, 1];
                this.matrix[j][i] = 3;
                return 0;
            }
            if(this.matrix[j][i] == 2  && i-2 > 0 && this.matrix[j][i-2] == 3){
                this.matrix[j][i-1] = 0;
                this.tabKier = [1, 1, 1, 1];
                this.matrix[j][i] = 3;
                return 0;
            }
            if(this.matrix[j][i] == 2  && j+2 < this.size && this.matrix[j+2][i] == 3){
                this.matrix[j+1][i] = 0;
                this.tabKier = [1, 1, 1, 1];
                this.matrix[j][i] = 3;
                return 0;
            }
            if(this.matrix[j][i] == 2 && j-2 > 0 && this.matrix[j-2][i] == 3 ) {
                this.matrix[j-1][i] = 0;
                this.tabKier = [1, 1, 1, 1];
                this.matrix[j][i] = 3;
                return 0;
            }
        }
    }
}

function finishGeneration() {
    var licznik = 0;
    for(var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            if(this.matrix[j][i] == 2){
                licznik++;
            }
        }
    }
    if(licznik == 0) {
        return 0;
    }
}

function DLcanvas() { //download png image
    var DLlink = document.getElementById('link');
    DLlink.setAttribute('download', 'generated_labyrinth.png');
    DLlink.setAttribute('href', c.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}