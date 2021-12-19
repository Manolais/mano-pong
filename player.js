'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(color, isPlayer1 = true, moveVelocity = 20) {
        this.isMoving = false;
        this.playerWidth = 15;
        this.playerHeight = 150;
        this.currentY = window.innerHeight / 2 - this.playerHeight / 2;
        this.keyPress = '';
        this.intervalId = 0;
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
        this.isPlayer1 ? (this.object.style.left = '20%') : (this.object.style.right = '20%');
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
        ;
        this.setPosition = newPosition;
    }
    moveDown(position) {
        let newPosition = this.currentY + position + 'px';
        if (this.currentY + position > window.innerHeight - this.playerHeight) {
            newPosition = window.innerHeight - this.playerHeight + 'px';
        }
        ;
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
            this.followMouse(event);
            return;
        }
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
exports.default = Player;
