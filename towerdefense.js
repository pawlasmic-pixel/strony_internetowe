const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// UI
const goldText = document.getElementById("gold");
const hpText = document.getElementById("hp");
const waveText = document.getElementById("wave");
const killsText = document.getElementById("kills");

const towerName = document.getElementById("towerName");
const towerLevel = document.getElementById("towerLevel");
const towerDamage = document.getElementById("towerDamage");
const towerRange = document.getElementById("towerRange");

const recordWaveText = document.getElementById("recordWave");
const recordKillsText = document.getElementById("recordKills");

const startWaveBtn = document.getElementById("startWave");
const shopButtons = document.querySelectorAll(".shopBtn");

const upgradeBtn = document.getElementById("upgradeBtn");
const sellBtn = document.getElementById("sellBtn");

// STATS
let gold = 100;
let hp = 20;
let wave = 1;
let kills = 0;

// RECORD
let recordWave = Number(localStorage.getItem("recordWave") || 0);
let recordKills = Number(localStorage.getItem("recordKills") || 0);

recordWaveText.textContent = recordWave;
recordKillsText.textContent = recordKills;

// GAME STATE
let selectedType = null;
let selectedTower = null;

const enemies = [];
const towers = [];
const bullets = [];

// PATH
const path = [
    {x:0,y:300},
    {x:250,y:300},
    {x:250,y:120},
    {x:550,y:120},
    {x:550,y:500},
    {x:850,y:500},
    {x:850,y:250},
    {x:1000,y:250}
];

// ---------------- TOWERS ----------------

class Tower{
    constructor(x,y,type){

        this.x = x;
        this.y = y;
        this.type = type;

        this.level = 1;

        this.setStats(type);

        this.reload = 0;
    }

    setStats(type){

        if(type === "archer"){
            this.range = 150;
            this.damage = 15;
            this.cost = 50;
            this.color = "#3b82f6";
        }

        if(type === "cannon"){
            this.range = 170;
            this.damage = 40;
            this.cost = 120;
            this.color = "#f97316";
        }

        if(type === "ice"){
            this.range = 140;
            this.damage = 10;
            this.cost = 100;
            this.color = "#38bdf8";
        }

        if(type === "tesla"){
            this.range = 130;
            this.damage = 12;
            this.cost = 200;
            this.color = "#a855f7";
        }

        if(type === "fire"){
            this.range = 150;
            this.damage = 20;
            this.cost = 250;
            this.color = "#ef4444";
        }

        if(type === "poison"){
            this.range = 160;
            this.damage = 8;
            this.cost = 180;
            this.color = "#22c55e";
        }

        if(type === "mine"){
            this.range = 0;
            this.damage = 100;
            this.cost = 30;
            this.color = "#eab308";
        }
    }

    upgrade(){

        this.level++;

        this.damage *= 1.4;
        this.range *= 1.1;
    }

    update(){

        if(this.type === "mine") return;

        if(this.reload > 0) this.reload--;

        let target = null;
        let best = 99999;

        for(let e of enemies){

            let d = Math.hypot(e.x - this.x, e.y - this.y);

            if(d < this.range && d < best){
                best = d;
                target = e;
            }
        }

        if(target && this.reload <= 0){

            bullets.push(new Bullet(this.x,this.y,target,this.damage,this.type));

            this.reload = 35;
        }
    }

    draw(){

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x,this.y,18,0,Math.PI*2);
        ctx.fill();

        if(this === selectedTower){
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }
}

// ---------------- ENEMIES ----------------

class Enemy{
    constructor(){

        this.x = path[0].x;
        this.y = path[0].y;
        this.i = 0;

        this.type = Math.random();

        this.hp = 40 + wave * 10;
        this.maxHp = this.hp;

        this.speed = 1 + wave * 0.05;
    }

    update(){

        let target = path[this.i + 1];

        if(!target){

            hp--;
            updateUI();

            enemies.splice(enemies.indexOf(this),1);

            if(hp <= 0){
                saveRecords();
                alert("Przegrałeś!");
                location.reload();
            }

            return;
        }

        let dx = target.x - this.x;
        let dy = target.y - this.y;

        let dist = Math.hypot(dx,dy);

        if(dist < this.speed){
            this.i++;
        }else{
            this.x += dx/dist * this.speed;
            this.y += dy/dist * this.speed;
        }
    }

    draw(){

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x,this.y,14,0,Math.PI*2);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.fillRect(this.x-20,this.y-25,40,5);

        ctx.fillStyle = "lime";
        ctx.fillRect(this.x-20,this.y-25,40*(this.hp/this.maxHp),5);
    }
}

// ---------------- BULLET ----------------

class Bullet{
    constructor(x,y,target,damage,type){
        this.x=x;
        this.y=y;
        this.target=target;
        this.damage=damage;
        this.type=type;
        this.speed=6;
    }

    update(){

        if(!this.target) return true;

        let dx=this.target.x-this.x;
        let dy=this.target.y-this.y;
        let dist=Math.hypot(dx,dy);

        if(dist<8){

            this.target.hp -= this.damage;

            if(this.type === "ice"){
                this.target.speed *= 0.8;
            }

            if(this.type === "fire"){
                this.target.hp -= 5;
            }

            if(this.type === "poison"){
                this.target.hp -= 3;
            }

            if(this.target.hp <= 0){

                kills++;
                gold += 10;

                enemies.splice(enemies.indexOf(this.target),1);

                updateUI();
            }

            return true;
        }

        this.x += dx/dist * this.speed;
        this.y += dy/dist * this.speed;

        return false;
    }

    draw(){
        ctx.fillStyle="yellow";
        ctx.beginPath();
        ctx.arc(this.x,this.y,4,0,Math.PI*2);
        ctx.fill();
    }
}

// ---------------- GAME ----------------

function drawPath(){

    ctx.strokeStyle="#8b5a2b";
    ctx.lineWidth=60;

    ctx.beginPath();
    ctx.moveTo(path[0].x,path[0].y);

    for(let p of path){
        ctx.lineTo(p.x,p.y);
    }

    ctx.stroke();
}

// ---------------- UI ----------------

function updateUI(){

    goldText.textContent = gold;
    hpText.textContent = hp;
    waveText.textContent = wave;
    killsText.textContent = kills;
}

function saveRecords(){

    if(wave > recordWave){
        localStorage.setItem("recordWave", wave);
    }

    if(kills > recordKills){
        localStorage.setItem("recordKills", kills);
    }
}

// ---------------- WAVES ----------------

function startWave(){

    let count = 5 + wave * 2;

    for(let i=0;i<count;i++){

        setTimeout(()=>{

            enemies.push(new Enemy());

        },i*600);
    }

    wave++;
    updateUI();
}

// ---------------- SHOP ----------------

shopButtons.forEach(btn=>{

    btn.onclick = ()=>{

        selectedType = btn.dataset.type;
        selectedTower = null;
    };

});

// PLACE TOWER

canvas.onclick = (e)=>{

    const r = canvas.getBoundingClientRect();

    let x = e.clientX - r.left;
    let y = e.clientY - r.top;

    if(selectedType){

        let cost = {
            archer:50,
            cannon:120,
            ice:100,
            tesla:200,
            fire:250,
            poison:180,
            mine:30
        }[selectedType];

        if(gold >= cost){

            towers.push(new Tower(x,y,selectedType));

            gold -= cost;

            updateUI();
        }

        selectedType = null;
    }
    else{

        selectedTower = towers.find(t =>
            Math.hypot(t.x-x,t.y-y)<20
        );

        if(selectedTower){
            towerName.textContent = selectedTower.type;
            towerLevel.textContent = selectedTower.level;
            towerDamage.textContent = Math.round(selectedTower.damage);
            towerRange.textContent = Math.round(selectedTower.range);
        }
    }
};

// ---------------- BUTTONS ----------------

startWaveBtn.onclick = startWave;

upgradeBtn.onclick = ()=>{

    if(selectedTower && gold >= 50){

        gold -= 50;
        selectedTower.upgrade();

        updateUI();
    }
};

sellBtn.onclick = ()=>{

    if(selectedTower){

        gold += 25;

        towers.splice(towers.indexOf(selectedTower),1);

        selectedTower = null;

        updateUI();
    }
};

// ---------------- LOOP ----------------

function update(){

    enemies.forEach(e=>e.update());
    towers.forEach(t=>t.update());

    for(let i=bullets.length-1;i>=0;i--){

        if(bullets[i].update()){
            bullets.splice(i,1);
        }
    }
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawPath();

    towers.forEach(t=>t.draw());
    enemies.forEach(e=>e.draw());
    bullets.forEach(b=>b.draw());
}

function loop(){

    update();
    draw();

    requestAnimationFrame(loop);
}

updateUI();
loop();