'use strict';
// import Player from './player';
// import Ball from './ball';
class Pong {
    constructor(moveVelocity = 20, startGame = true, bgColor = 'black') {
        this.moveVelocity = moveVelocity;
        this.player1 = new Player(this, 'white', true, moveVelocity); // color red, and is player 1
        this.player2 = new Player(this, 'white', false, moveVelocity); // color black, and is not player 1 so it will be player 2
        this.ball = new Ball(this, 'white');
        this.root = document.querySelector('.root');
        this.root.style.backgroundColor = bgColor;
        this.initRootObject();
        if (startGame) {
            this.startGame();
        }
    }
    set setBackgroundColor(color) {
        this.root.style.backgroundColor = color;
    }
    startGame() {
        this.keyPressed();
        this.appendToRoot([this.player1, this.player2, this.ball]);
        this.play();
    }
    play() {
        this.player1.move();
        this.player2.move();
        this.detectPlayerCollision(this.player1);
        this.detectPlayerCollision(this.player2);
        this.ball.startMoving();
    }
    keyPressed() {
        this.useMouse(this.player1);
        this.useMouse(this.player1);
        // this.useKeyboard(this.player2);
    }
    appendToRoot(childs) {
        childs.forEach(child => {
            if (child instanceof Player) {
                this.root.appendChild(child.getPlayerObject);
            }
            else {
                this.root.appendChild(child.getBallObject);
            }
        });
    }
    initRootObject() {
        this.root.style.width = '100vw';
        this.root.style.height = '100vh';
    }
    useKeyboard(player) {
        document.addEventListener('keydown', e => {
            player.startMoving(e);
        });
        document.addEventListener('keyup', e => {
            player.stopMoving(e);
        });
    }
    useMouse(player) {
        document.addEventListener('mousemove', e => {
            player.startMoving(e);
        });
    }
    loss() {
        clearInterval(this.ball.intervalId);
        const player = this.ball.currentX < window.innerWidth / 2 ? '2' : '1';
        confirm(`Player ${player} wins, Try again?`);
    }
    detectPlayerCollision(player) {
        setInterval(() => {
            const playerPosition = player.getPlayerObject.getBoundingClientRect();
            if (this.ball.currentX + this.ball.center >= playerPosition.left &&
                this.ball.currentX - this.ball.center <= playerPosition.right) {
                if (this.ball.currentY >= playerPosition.top &&
                    this.ball.currentY <= playerPosition.bottom) {
                    this.ball.reverseDirectionX();
                    // this.reverseDirectionY();
                }
            }
        }, 1000 / 60);
    }
}
class Player {
    constructor(parent, color, isPlayer1 = true, moveVelocity = 20) {
        this.isMoving = false;
        this.playerWidth = 15;
        this.playerHeight = 150;
        this.currentY = window.innerHeight / 2 - this.playerHeight / 2;
        this.keyPress = '';
        this.intervalId = 0;
        this.parent = parent;
        this.playerColor = color;
        this.isPlayer1 = isPlayer1;
        this.moveVelocity = moveVelocity;
        this.object = document.createElement('div');
        this.initPlayerObject();
    }
    get getPlayerObject() {
        return this.object;
    }
    set setPlayerObject(object) {
        this.object = object;
        this.initPlayerObject();
    }
    set setColor(color) {
        this.playerColor = color;
        this.object.style.backgroundColor = this.playerColor;
    }
    set setPosition(position) {
        this.currentY = parseFloat(position);
        this.object.style.top = position;
    }
    initPlayerObject() {
        this.object.style.top = this.currentY + 'px';
        this.object.style.height = this.playerHeight + 'px';
        this.object.style.width = this.playerWidth + 'px';
        this.object.style.backgroundColor = this.playerColor;
        this.object.style.position = 'absolute';
        const prop = this.isPlayer1 ? 'left' : 'right';
        this.object.style[prop] = '20%';
    }
    followMouse(event) {
        let position = event.clientY - this.playerHeight / 2;
        if (position > window.innerHeight - this.playerHeight) {
            position = window.innerHeight - this.playerHeight;
        }
        else if (position < 0) {
            position = 0;
        }
        this.setPosition = position + 'px';
    }
    moveUp(position) {
        let newPosition = this.currentY - position + 'px';
        if (this.currentY - position < 0) {
            newPosition = '0px';
        }
        this.setPosition = newPosition;
    }
    moveDown(position) {
        let newPosition = this.currentY + position + 'px';
        if (this.currentY + position > window.innerHeight - this.playerHeight) {
            newPosition = window.innerHeight - this.playerHeight + 'px';
        }
        this.setPosition = newPosition;
    }
    stopMoving(event) {
        const keyUp = this.isPlayer1 ? 'w' : 'ArrowUp';
        const keyDown = this.isPlayer1 ? 's' : 'ArrowDown';
        if (event.key === keyUp || event.key === keyDown) {
            this.isMoving = false;
        }
    }
    startMoving(event) {
        if (event instanceof MouseEvent) {
            // console.log(this.object.getBoundingClientRect());
            this.followMouse(event);
            return;
        }
        // const keyUp = this.isPlayer1 ? 'w' : 'ArrowUp';
        // const keyDown = this.isPlayer1 ? 's' : 'ArrowDown';
        // if (event.key === keyUp ){
        //   this.moveUp(this.moveVelocity);
        // }
        // if (event.key === keyDown ){
        //   this.moveDown(this.moveVelocity);
        // }
        this.isMoving = true;
        this.keyPress = event.key;
    }
    move() {
        const keyUp = this.isPlayer1 ? 'w' : 'ArrowUp';
        const keyDown = this.isPlayer1 ? 's' : 'ArrowDown';
        this.intervalId = setInterval(() => {
            if (this.isMoving) {
                if (this.keyPress === keyUp) {
                    this.moveUp(this.moveVelocity);
                }
                else if (this.keyPress === keyDown) {
                    this.moveDown(this.moveVelocity);
                }
            }
        }, 1000 / 60);
    }
}
class Ball {
    constructor(parent, color, moveVelocity = 5) {
        this.color = color;
        this.moveVelocity = moveVelocity;
        this.randomVelocityX = moveVelocity;
        this.randomVelocityY = moveVelocity;
        this.parent = parent;
        this.directionY = '';
        this.directionX = '';
        this.currentX = window.innerWidth / 2;
        this.currentY = window.innerHeight / 2;
        this.intervalId = 0;
        this.size = 20;
        this.center = this.size / 2;
        this.object = document.createElement('div');
        this.initBallObject();
    }
    initBallObject() {
        this.object.style.width = this.size + 'px';
        this.object.style.height = this.size + 'px';
        this.object.style.backgroundColor = this.color;
        this.object.style.position = 'absolute';
        this.object.style.left = this.currentX + 'px';
        this.object.style.top = this.currentY + 'px';
        this.object.style.transform = 'translate(-50%, -50%)';
        this.object.style.borderRadius = '50%';
    }
    get getBallObject() {
        return this.object;
    }
    set setY(y) {
        this.currentY = parseFloat(y);
        this.object.style.top = y;
    }
    set setX(x) {
        this.currentX = parseFloat(x);
        this.object.style.left = x;
    }
    set setPostion({ x, y }) {
        this.setX = x;
        this.setY = y;
    }
    reverseDirectionY() {
        this.directionY = this.directionY === 'up' ? 'down' : 'up';
    }
    reverseDirectionX() {
        this.directionX = this.directionX === 'left' ? 'right' : 'left';
    }
    moveUp(position) {
        let y = this.currentY - position + 'px';
        const x = this.currentX + 'px';
        if (this.currentY - position - this.center <= 0) {
            this.reverseDirectionY();
            return;
        }
        this.setPostion = { x, y };
    }
    moveDown(position) {
        let y = this.currentY + position + 'px';
        const x = this.currentX + 'px';
        if (this.currentY + position + this.center >= window.innerHeight) {
            this.reverseDirectionY();
            return;
        }
        this.setPostion = { x, y };
    }
    moveLeft(position) {
        let x = this.currentX - position + 'px';
        const y = this.currentY + 'px';
        if (this.currentX - position - this.center <= 0) {
            this.parent.loss();
            return;
        }
        this.setPostion = { x, y };
    }
    moveRight(position) {
        let x = this.currentX + position + 'px';
        const y = this.currentY + 'px';
        if (this.currentX + position + this.center >= window.innerWidth) {
            this.parent.loss();
            return;
        }
        this.setPostion = { x, y };
    }
    move() {
        this.intervalId = setInterval(() => {
            if (this.directionY === 'up')
                this.moveUp(this.randomVelocityY);
            if (this.directionX === 'left')
                this.moveLeft(this.randomVelocityX);
            if (this.directionY === 'down')
                this.moveDown(this.randomVelocityY);
            if (this.directionX === 'right')
                this.moveRight(this.randomVelocityX);
            this.setPostion = { x: this.currentX + 'px', y: this.currentY + 'px' };
        }, 1000 / 60);
        this.detectChangeDirection();
    }
    detectChangeDirection() {
        let lastDirectionY = '';
        let lastDirectionX = '';
        const multiplier = 1.5;
        setInterval(() => {
            if (this.directionY !== lastDirectionY) {
                this.randomVelocityY = this.randomVelocityY + multiplier;
                this.randomVelocityY = randomNum(this.moveVelocity, this.moveVelocity * multiplier);
                // console.log('new y', this.randomVelocityY);
            }
            if (this.directionX !== lastDirectionX) {
                // this.randomVelocityX = this.randomVelocityX + multiplier
                this.randomVelocityX = randomNum(this.moveVelocity, this.moveVelocity * multiplier);
                // console.log('new x', this.randomVelocityX);
            }
            lastDirectionY = this.directionY;
            lastDirectionX = this.directionX;
        }, 1000 / 60);
    }
    startMoving() {
        const startX = randomNum(0, 1, true) ? 'left' : 'right';
        const startY = randomNum(0, 1, true) ? 'up' : 'down';
        console.log(startX, startY);
        this.directionX = startX;
        this.directionY = startY;
        ;
        this.move();
    }
}
const pong = new Pong(20, false);
pong.startGame();
function randomNum(min, max, isInt = false) {
    const result = Math.random() * (max - min) + min;
    console.log(result);
    if (isInt)
        return Math.round(result);
    return parseFloat(result.toFixed(3));
}
