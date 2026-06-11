const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let money = 500;   // 🔥 START
let total = 0;
let speed = 1;

const machines = [];
const items = [];

const types = {
    basic: { color:"#22c55e", rate:180, value:5 },
    iron:  { color:"#60a5fa", rate:120, value:15 },
    gold:  { color:"#facc15", rate:80, value:40 }
};

// 🏭 maszyna
class Machine{
    constructor(x,y,type){
        this.x = x;
        this.y = y;
        this.type = type;
        this.timer = 0;
    }

    update(){
        this.timer++;

        if(this.timer > types[this.type].rate / speed){
            this.timer = 0;

            items.push({
                x:this.x+25,
                y:this.y+25,
                vx:3,
                value:types[this.type].value,
                color:types[this.type].color
            });
        }
    }

    draw(){
        ctx.fillStyle = types[this.type].color;
        ctx.fillRect(this.x,this.y,60,60);
    }
}

// ➕ start 2 maszyny
machines.push(new Machine(200,200,"basic"));
machines.push(new Machine(300,200,"iron"));

// 💰 kupno
function buyMachine(type){

    let cost =
        type==="basic"?100:
        type==="iron"?300:800;

    if(money >= cost){

        money -= cost;

        machines.push(
            new Machine(200 + machines.length*70,200,type)
        );
    }
}

// ⚡ speed
function upgradeSpeed(){
    if(money >= 200){
        money -= 200;
        speed += 0.5;
    }
}

// klik = kasa
canvas.addEventListener("click",()=>{
    money += 2;
});

function update(){

    machines.forEach(m=>m.update());

    for(let i=0;i<items.length;i++){

        items[i].x += items[i].vx;

        if(items[i].x > 1050){

            money += items[i].value;
            total += items[i].value;

            items.splice(i,1);
            i--;
        }
    }

    document.getElementById("money").innerText =
        Math.floor(money);

    document.getElementById("total").innerText =
        Math.floor(total);
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // taśma
    ctx.fillStyle="#1f2937";
    ctx.fillRect(50,250,1000,60);

    // ruch
    ctx.fillStyle="#334155";
    for(let x=60;x<1000;x+=40){
        ctx.fillRect(x,275,20,10);
    }

    // maszyny
    machines.forEach(m=>m.draw());

    // itemy (DUŻE I WIDOCZNE)
    items.forEach(it=>{
        ctx.fillStyle = it.color;
        ctx.beginPath();
        ctx.arc(it.x,it.y,10,0,Math.PI*2);
        ctx.fill();
    });
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();