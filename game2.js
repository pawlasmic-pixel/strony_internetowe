const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;

let player = {x:500,y:550,w:40,h:40};

let bullets = [];
let enemies = [];

let cols = 10;
let rows = 5;

let high = localStorage.getItem("hs") || 0;

document.getElementById("hs").innerText = high;

for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
        enemies.push({
            x:100 + c*70,
            y:50 + r*60,
            hp:2
        });
    }
}

document.addEventListener("mousemove",(e)=>{
    player.x = e.offsetX;
});

document.addEventListener("click",()=>{
    bullets.push({x:player.x,y:player.y,v:7});
});

function update(){

    bullets.forEach(b=>{
        b.y -= b.v;
    });

    for(let i=0;i<enemies.length;i++){
        for(let j=0;j<bullets.length;j++){

            let e = enemies[i];
            let b = bullets[j];

            if(
                b.x > e.x &&
                b.x < e.x+40 &&
                b.y > e.y &&
                b.y < e.y+40
            ){

                e.hp--;
                bullets.splice(j,1);

                if(e.hp <= 0){
                    enemies.splice(i,1);
                    score += 10;
                }

                break;
            }
        }
    }

    if(score > high){
        high = score;
        localStorage.setItem("hs",high);
    }

    document.getElementById("score").innerText = score;
    document.getElementById("hs").innerText = high;
    document.getElementById("lives").innerText = lives;
}

function draw(){

    ctx.clearRect(0,0,1000,600);

    ctx.fillStyle="cyan";
    ctx.fillRect(player.x,player.y,40,40);

    ctx.fillStyle="yellow";
    bullets.forEach(b=>{
        ctx.fillRect(b.x,b.y,4,10);
    });

    enemies.forEach(e=>{

        ctx.fillStyle = e.hp==2 ? "red" : "orange";

        ctx.fillRect(e.x,e.y,40,40);
    });
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();