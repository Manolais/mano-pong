'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = __importDefault(require("./player"));
class Pong {
    constructor(moveVelocity = 20, startGame = true, bgColor = 'black') {
        // const initialY = window.innerHeight / 2
        this.moveVelocity = moveVelocity;
        this.player1 = new player_1.default('white', true, moveVelocity); // color red, and is player 1
        this.player2 = new player_1.default('white', false, moveVelocity); // color black, and is not player 1 so it will be player 2
        this.ball = new Ball('white');
        this.root = document.querySelector('.root');
        console.log(this.root);
        this.root.style.backgroundColor = bgColor;
        if (startGame) {
            this.startGame();
        }
    }
    startGame() {
        this.keyPressed();
        this.appendPlayersToRoot();
        this.play();
    }
    set setBackgroundColor(color) {
        this.root.style.backgroundColor = color;
    }
    keyPressed() {
        this.useMouse(this.player1);
        this.useKeyboard(this.player2);
    }
    appendPlayersToRoot() {
        this.root.appendChild(this.player1.getPlayerObject);
        this.root.appendChild(this.player2.getPlayerObject);
        this.root.appendChild(this.ball.getBallObject);
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
    play() {
        console.log('play');
        this.player1.move();
        this.player2.move();
        this.ball.move();
    }
}
class Ball {
    constructor(color, objectVelocity = 5) {
        this.color = color;
        this.objectVelocity = objectVelocity;
        this.currentX = window.innerWidth / 2;
        this.currentY = window.innerHeight / 2;
        this.intervalId = 0;
        this.object = document.createElement('div');
        this.initBallObject();
    }
    initBallObject() {
        this.object.style.width = '15px';
        this.object.style.height = '15px';
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
    set setPostion({ x, y }) {
        this.currentX = parseFloat(x);
        this.currentY = parseFloat(y);
        this.object.style.left = x;
        this.object.style.top = y;
    }
    moveUp() { }
    moveDown() {
        this.currentY += this.objectVelocity;
        this.object.style.top = this.currentY + 'px';
    }
    move() {
        this.intervalId = setInterval(() => {
            this.currentX += -this.objectVelocity;
            this.currentY += this.objectVelocity;
            this.setPostion = { x: this.currentX + 'px', y: this.currentY + 'px' };
        }, 1000 / 60);
    }
}
const pong = new Pong();
