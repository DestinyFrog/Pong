//canvas settings
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
const WIDTH = 800;        canvas.width = WIDTH
const HEIGHT = 400;       canvas.height = HEIGHT
context.fillStyle = "black"; context.fillRect(0, 0, WIDTH + 100, HEIGHT + 100)

//block settings
const BlockSize = {x: 8, y: 42}
const ballRadius = 6
const BlockDistance = 35
const BlockSpeed = 5
const ballSpeed = 2

enemyScore = 0
playScore = 0

function Vector2 (x, y){
    return {x: x, y: y}
}
class Block {
    constructor (position, isPlayer, velocity){
        this.position = position
        this.isPlayer = isPlayer
        this.velocity = velocity
        this.draw()
    }
    draw (){
        context.fillStyle = "white"
        context.fillRect(this.position.x, this.position.y, BlockSize.x, BlockSize.y)
    }
    update (){
        if(this.position.y >= HEIGHT - BlockSize.y){
            this.velocity = BlockSpeed * -1
        }
        if(this.position.y <= 0){
            this.velocity = BlockSpeed
        }
        this.position.y += this.velocity
        this.draw()
    }
}

var accelerationX = 1
class Ball{
    constructor (position, velocity){
        this.position = position
        this.velocity = velocity
        this.draw()
    }
    draw (){
        context.fillStyle = "white"
        context.beginPath()
        //context.arc(this.position.x, this.position.y, ballRadius, 0, 2 * Math.PI)
        context.fillRect(this.position.x - ballRadius , this.position.y - ballRadius, ballRadius*2, ballRadius*2)
        context.fill()
    }
    update (){
        this.position.x += this.velocity.x * ballSpeed * accelerationX
        this.position.y += this.velocity.y * ballSpeed
        this.collision()
        this.draw()
    }
    collision (){
        if(this.position.y <= 0 + ballRadius){
            this.velocity.y = 1
        }
        if(this.position.y >= HEIGHT - ballRadius){
            this.velocity.y = -1
        }
        if(this.position.x >= WIDTH - ballRadius){
            this.position = Vector2(WIDTH/2, Math.random() * (HEIGHT - 0) + 0)
            playScore += 1
            accelerationX = 1
        }
        if(this.position.x <= 0 + ballRadius){
            this.position = Vector2(WIDTH/2, Math.random() * (HEIGHT - 0) + 0)
            enemyScore += 1
            accelerationX = 1
        }

        if(this.position.y + ballRadius > player.position.y && this.position.y < player.position.y + BlockSize.y){
            if(this.position.x - ballRadius <= player.position.x + BlockSize.x && this.position.x >= player.position.x + BlockSize.x){
                this.velocity.x = 1 //+ this.position.y
                accelerationX += 0.1
            }
        }

        if(this.position.y + ballRadius > enemie.position.y && this.position.y < enemie.position.y + BlockSize.y){
            if(this.position.x + ballRadius >= enemie.position.x && this.position.x <= enemie.position.x + BlockSize.x){
                this.velocity.x = -1 //- this.position.y
                accelerationX += 0.1
            }
        }
    }
} 

player = new Block(Vector2(BlockDistance, HEIGHT/2 - BlockSize.y/2), true, BlockSpeed)
enemie = new Block(Vector2(WIDTH - BlockDistance - BlockSize.x, HEIGHT/2 - BlockSize.y/2), false, BlockSpeed)
ball = new Ball(Vector2(WIDTH/2 - ballRadius/2, HEIGHT/2 - ballRadius/2), Vector2(-1, -1))

function loop(){
    context.fillStyle = "black"; context.fillRect(0, 0, WIDTH, HEIGHT)
    player.update()
    enemie.update()
    ball.update()

    context.font = "40px MS Sans Serif"
    context.fillText(playScore.toString(), WIDTH/2 - 85, 50)
    context.fillText(enemyScore.toString(), WIDTH/2 + 70, 50)

    squareX = 5
    squareY = 15
    for(var i = 0; i < 25; i++){
        context.fillStyle = "white"
        context.fillRect(WIDTH/2 - squareX/2, i * squareY * 2, squareX, squareY)
    }

    requestAnimationFrame(loop)
} loop()

document.addEventListener("keydown", function(ev){
    if(ev.keyCode == 87){
        player.velocity = BlockSpeed * -1
    }
    if(ev.keyCode == 38){
        enemie.velocity = BlockSpeed * -1
    }
    if(ev.keyCode == 83){
        player.velocity = BlockSpeed
    }
    if(ev.keyCode == 40){
        enemie.velocity = BlockSpeed
    }
});