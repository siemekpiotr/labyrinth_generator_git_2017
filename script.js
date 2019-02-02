var size = 0;
var matrix = Array(size);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var xglob = 0;
var yglob = 0;
var tabkier = [1,1,1,1];
var usrsize = 20;

function initmatrix(x) {
    size = setsize(x);
    for (var i = 0; i < size; i++) {
        matrix[i] = Array(size);
    }
    for (var i = 0;i<size;i++){
        for (var j=0;j<size;j++){
            if(((i+1)%2)==1){
                matrix[i][j] = 1;
            }
            else{
                matrix[i][j] = ((j)%2)+1;
            }

        }
    }
    // console.log(matrix);
    c.width = x*40;
    c.height = x*40;
}

async function mainfunc(){
    document.getElementById("DLbutton").disabled = true;
    usrsize = document.getElementById("GETsize").value;
    initmatrix(usrsize);
    findrand();
    for(;;) {
        ctx.clearRect(0, 0, c.width, c.height); //czyszczenie na kazda petle
        drawmatrix();
        labirynth();
        await sleep(1);
        if(labirynth()==0){
            if(finish()==0){break;} //jak nie ma wincej klockow przerwij
            randline();
        }
    }
    // console.log("jestem");
    document.getElementById("DLbutton").disabled = false;
    usrsize++;
}

function setsize(x){
    x = x*2+1;
    return x;
}

function drawmatrix() {
    for (var i = 0;i<size;i++){
        for (var j=0;j<size;j++){
            if((i+1)%2==1 && (j+2)%2==1){ //wsp y
                if(matrix[i][j] == 1){
                    ctx.beginPath();
                    ctx.moveTo(i*20, (j-1)*20);
                    ctx.lineTo(i*20, j*20+20);
                    ctx.stroke();
                    //console.log(i,j)
                }
            }
            if((i+2)%2==1 && (j+1)%2==1){ //wsp x
                if(matrix[i][j] == 1){
                    ctx.beginPath();
                    ctx.moveTo((i-1)*20, j*20);
                    ctx.lineTo(i*20+20, j*20);
                    ctx.stroke();
                    //console.log(i,j)
                }
            }
            if(matrix[i][j]==2){
                ctx.beginPath();
                ctx.rect(i*20-17,j*20-17,34,34);
                ctx.stroke();
            }
            // if(matrix[i][j]==3){
            //     ctx.beginPath();
            //     ctx.rect(i*20-10,j*20-10,20,20);
            //     ctx.stroke();
            // }
            // if(matrix[i][j] == 1){
            //     ctx.beginPath();
            //     ctx.moveTo(i*20, j*20);
            //     ctx.lineTo((i+1)*20, (j+1)*20);
            //     ctx.stroke();
            // }
            }
        }
        //console.log(matrix);
}

function labirynth(){
        var dir = Math.floor(Math.random() * 4)
        var x = xglob;
        var y = yglob;
        // if(matrix[x][y]==0){
        //     console.log(x,y);
        //     console.log("znalazłem");
        //     ctx.beginPath();
        //     ctx.rect(x*20-5,y*20-5,10,10);
        //     ctx.stroke();
        //     matrix[x][y]=1;
        // }
    //console.log(xglob, yglob);
    //console.log('kier: ' + dir)
        //rozgladam sie wokolo rand
        if (dir==0 && tabkier[0] == true && x + 2 < size && matrix[x + 2][y] != 3) {//prawo
            if (matrix[x + 1][y] == 1) {
                matrix[x + 1][y] = 0;
                matrix[x + 2][y] = 3;
                xglob = x + 2;
                tabkier = [1,1,1,1];
            }
        }
        else if (dir==1 && tabkier[1] == true && x - 2 > 0 && matrix[x - 2][y] != 3) {//lewo
            if (matrix[x - 1][y] == 1) {
                matrix[x - 1][y] = 0;
                matrix[x - 2][y] = 3;
                xglob = x - 2;
                tabkier = [1,1,1,1];
            }
        }
        else if (dir==2 && tabkier[2] == true && y + 2 < size && matrix[x][y + 2] != 3) {//dol
            if (matrix[x][y + 1] == 1) {
                matrix[x][y + 1] = 0;
                matrix[x][y + 2] = 3;
                yglob = y + 2;
                tabkier = [1,1,1,1];
            }
        }
        else if (dir==3 && tabkier[3] == true && y - 2 > 0 && matrix[x][y - 2] != 3) {//gora
            if (matrix[x][y - 1] == 1) {
                matrix[x][y - 1] = 0;
                matrix[x][y - 2] = 3;
                yglob = y - 2;
                tabkier = [1,1,1,1];
            }
        }
        else{
            //kierunek zerowanie zeby rand nie szedl po wszystkim
            tabkier[dir]=0;
            if((tabkier[0]+tabkier[1]+tabkier[2]+tabkier[3])==0){ return 0;}
        }
}

function findrand(){

    for(;;){
        var x = Math.floor((Math.random() * size) );
        var y = Math.floor((Math.random() * size) );
        if(matrix[x][y]==2){
            //console.log(x,y);
            //console.log("znalazłem");
            //console.log(matrix);
            ctx.beginPath();
            ctx.rect(x*20-5,y*20-5,10,10);
            ctx.stroke();
            matrix[x][y]=3;
            break;
        }
        if(finish()==0){break;}
    }
    xglob=x;
    yglob=y;
    tabkier=[1,1,1,1]
}

function randline(){
    for(var i = 0;i<size;i++){
        for(var j=0;j<size;j++){
            if(matrix[j][i]==2  && i+2<size && matrix[j][i+2]==3){
                matrix[j][i+1]=0;
                // console.log(j,i);
                xglob=j;
                yglob=i;
                tabkier=[1,1,1,1]
                matrix[j][i]=3;
                return 0;
            }
            if(matrix[j][i]==2  && i-2>0 && matrix[j][i-2]==3){
                matrix[j][i-1]=0;
                // console.log(j,i);
                xglob=j;
                yglob=i;
                tabkier=[1,1,1,1]
                matrix[j][i]=3;
                return 0;
            }
            if(matrix[j][i]==2  && j+2<size && matrix[j+2][i]==3){
                matrix[j+1][i]=0;
                // console.log(j,i);
                xglob=j;
                yglob=i;
                tabkier=[1,1,1,1]
                matrix[j][i]=3;
                return 0;
            }
            if(matrix[j][i]==2 && j-2>0 && matrix[j-2][i]==3 ) {
                matrix[j - 1][i] = 0;
                // console.log(j, i);
                xglob = j;
                yglob = i;
                tabkier = [1, 1, 1, 1]
                matrix[j][i] = 3;
                return 0;
            }
        }
    }
}


function finish() {
    var licznik = 0;
    for(var i = 0;i<size;i++) {
        for (var j = 0; j < size; j++) {
            if(matrix[j][i]==2){
                licznik++;
            }
        }
    }
    if(licznik==0) {
        //console.log("konec");
        return 0;
    }
}

function randdir(){
    var dir = Math.floor(Math.random()*4)
    return dir; //zwraca liczbe od 0 do 3 z kierunkiem
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function DLcanvas() { //downloand png image
    var DLlink = document.getElementById('link');
    DLlink.setAttribute('download', 'generated_labyrinth.png');
    DLlink.setAttribute('href', c.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}