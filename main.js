'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = __importDefault(require("./player"));
const ball_1 = __importDefault(require("./ball"));
class Pong {
    constructor(moveVelocity = 20, startGame = true, bgColor = 'black') {
        // const initialY = window.innerHeight / 2
        this.moveVelocity = moveVelocity;
        this.player1 = new player_1.default('white', true, moveVelocity); // color red, and is player 1
        this.player2 = new player_1.default('white', false, moveVelocity); // color black, and is not player 1 so it will be player 2
        this.ball = new ball_1.default('white');
        this.root = document.querySelector('.root');
        console.log(this.root);
        this.root.style.backgroundColor = bgColor;
        if (startGame) {
            this.startGame();
        }
    }
    startGame() {
        this.keyPressed();
        this.appendToRoot();
        this.play();
    }
    set setBackgroundColor(color) {
        this.root.style.backgroundColor = color;
    }
    keyPressed() {
        this.useMouse(this.player1);
        this.useKeyboard(this.player2);
    }
    appendToRoot() {
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
        this.player1.move();
        this.player2.move();
        this.ball.move();
    }
}
const pong = new Pong();
