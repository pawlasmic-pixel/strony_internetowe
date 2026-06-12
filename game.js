const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;

let startTime = Date.now();
let gameWon = false;

let player = {
    x: 500,
    y: 550,
    w: 40,
    h: 40
};

let bullets = [];
let enemies = [];

let cols = 10;
let rows = 5;

let high = localStorage.getItem("hs") || 0;

document.getElementById("hs").innerText = high;

// Dodaj licznik czasu jeśli nie istnieje
const ui = document.getElementById("ui");
ui.innerHTML += ` | Czas: <span id="time">0.0</span>s`;

for(let r = 0; r < rows; r++){
    for(let c = 0; c < cols; c++){

        enemies.push({
            x: 100 + c * 70,
            y: 50 + r * 60,
            hp: 2
        });

    }
}

document.addEventListener("mousemove",(e)=>{

    player.x = e.offsetX;

    if(player.x < 0) player.x = 0;
    if(player.x > 960) player.x = 960;

});

document.addEventListener("click",()=>{

    if(gameWon) return;

    bullets.push({
        x: player.x + 20,
        y: player.y,
        v: 7
    });

});

function update(){

    bullets.forEach(b=>{
        b.y -= b.v;
    });

    bullets = bullets.filter(b => b.y > -20);

    for(let i = enemies.length - 1; i >= 0; i--){

        for(let j = bullets.length - 1; j >= 0; j--){

            let e = enemies[i];
            let b = bullets[j];

            if(
                b.x > e.x &&
                b.x < e.x + 40 &&
                b.y > e.y &&
                b.y < e.y + 40
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

        localStorage.setItem("hs", high);
    }

    document.getElementById("score").innerText = score;
    document.getElementById("hs").innerText = high;
    document.getElementById("lives").innerText = lives;

    if(!gameWon){

        let time =
        ((Date.now() - startTime) / 1000).toFixed(1);

        document.getElementById("time").innerText = time;
    }

    // WYGRANA
    if(enemies.length === 0 && !gameWon){

        gameWon = true;

        let finalTime =
        ((Date.now() - startTime) / 1000).toFixed(1);

        setTimeout(()=>{

            document.body.innerHTML = `
            <div style="
                color:white;
                text-align:center;
                margin-top:100px;
                font-family:Arial;
            ">
                <h1>🏆 WYGRAŁEŚ!</h1>

                <h2>⏱️ Czas: ${finalTime}s</h2>

                <h2>⭐ Wynik: ${score}</h2>

                <button
                onclick="location.reload()"
                style="
                    padding:15px 30px;
                    font-size:24px;
                    cursor:pointer;
                    border:none;
                    border-radius:10px;
                ">
                    🔄 Restart
                </button>
            </div>
            `;

        },100);
    }
}

function draw(){

    ctx.clearRect(0,0,1000,600);

    // Gracz
    ctx.fillStyle = "cyan";
    ctx.fillRect(
        player.x,
        player.y,
        player.w,
        player.h
    );

    // Pociski
    ctx.fillStyle = "yellow";

    bullets.forEach(b=>{

        ctx.fillRect(
            b.x,
            b.y,
            4,
            10
        );

    });

    // Przeciwnicy
    enemies.forEach(e=>{

        ctx.fillStyle =
        e.hp === 2 ? "red" : "orange";

        ctx.fillRect(
            e.x,
            e.y,
            40,
            40
        );

    });
}

function loop(){

    if(gameWon) return;

    update();
    draw();

    requestAnimationFrame(loop);
}

loop();
