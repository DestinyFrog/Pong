const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const WIDTH = document.body.clientWidth < 800 ? document.body.clientWidth - 20 : 800;
const HEIGHT = document.body.clientHeight < 340 ? document.body.clientHeight - 20 : 340;
const MIDDLE = { x: WIDTH / 2, y: HEIGHT / 2 };
const DELAY = 10;
class Bola {
    static position = { x: MIDDLE.x, y: MIDDLE.y };
    static speed = 2.5;
    static radius = 4;
    static direction = { x: -1, y: 1 };
    static reset() {
        Bola.position.x = MIDDLE.x;
    }
    static update() {
        Bola.position.x += Bola.direction.x * Bola.speed;
        Bola.position.y += Bola.direction.y * Bola.speed;
        if (Bola.position.y - Bola.radius <= 0 || Bola.position.y + Bola.radius >= HEIGHT)
            this.direction.y *= -1;
        if (Bola.position.x - Bola.radius <= 0) {
            player2.points++;
            Bola.reset();
        }
        if (Bola.position.x + Bola.radius >= WIDTH) {
            player1.points++;
            Bola.reset();
        }
        if (Bola.position.x + Bola.radius > player2.position.x &&
            Bola.position.x - Bola.radius < player2.position.x + player2.size.x) {
            if (Bola.position.y + Bola.radius > player2.position.y &&
                Bola.position.y - Bola.radius < player2.position.y + player2.size.y) {
                Bola.direction.x = -1;
            }
        }
        if (Bola.position.x - Bola.radius < player1.position.x + player1.size.x &&
            Bola.position.x + Bola.radius > player1.position.x) {
            if (Bola.position.y + Bola.radius > player1.position.y &&
                Bola.position.y - Bola.radius < player1.position.y + player1.size.y) {
                Bola.direction.x = 1;
            }
        }
    }
    static draw(ctx) {
        ctx.beginPath();
        ctx.arc(Bola.position.x, Bola.position.y, Bola.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
class Player {
    offSet = 20;
    position;
    size = { x: 2, y: 40 };
    YDirection;
    speed = 3;
    points = 0;
    constructor(Side) {
        this.position = {
            x: (Side == 'left' ? this.offSet : WIDTH - this.offSet),
            y: HEIGHT / 2
        };
        this.YDirection = (Side == 'left' ? 1 : -1);
    }
    update() {
        this.position.y += this.YDirection * this.speed;
        if (this.position.y + this.size.y >= HEIGHT || this.position.y < 0)
            this.YDirection *= -1;
    }
    draw(ctx) {
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}
const player1 = new Player('left');
const player2 = new Player('right');
function start() {
    requestAnimationFrame(main);
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "48px Courier New";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
}
function draw() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#FFFFFF";
    Bola.update();
    player1.update();
    player2.update();
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.closePath();
    player1.draw(ctx);
    player2.draw(ctx);
    Bola.draw(ctx);
    ctx.fillText(player1.points.toString(), WIDTH / 4, 25);
    ctx.fillText(player2.points.toString(), (WIDTH / 4) * 3, 25);
}
function main() {
    draw();
    setTimeout(() => requestAnimationFrame(main), DELAY);
}
start();
function keyboard(ev) {
    switch (ev.key) {
        case 'w':
            player1.YDirection = -1;
            break;
        case 's':
            player1.YDirection = 1;
            break;
        case 'ArrowUp':
            player2.YDirection = -1;
            break;
        case 'ArrowDown':
            player2.YDirection = 1;
            break;
    }
}
function mouse(ev) {
    if (ev.clientX < document.body.clientWidth / 2)
        player1.YDirection *= -1;
    else
        player2.YDirection *= -1;
}
document.addEventListener('keydown', keyboard);
document.addEventListener('click', mouse);
