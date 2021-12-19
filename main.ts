'use strict';

import Player from './player';
import Ball from './ball';

class Pong {
  player1: Player;
  player2: Player;
  ball: Ball;
  root: HTMLElement;
  moveVelocity: number;
  constructor(
    moveVelocity: number = 20,
    startGame: boolean = true,
    bgColor: string = 'black'
  ) {
    // const initialY = window.innerHeight / 2
    this.moveVelocity = moveVelocity;
    this.player1 = new Player('white', true, moveVelocity); // color red, and is player 1
    this.player2 = new Player('white', false, moveVelocity); // color black, and is not player 1 so it will be player 2
    this.ball = new Ball('white');

    this.root = document.querySelector('.root') as HTMLDivElement;
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

  set setBackgroundColor(color: string) {
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

  useKeyboard(player: Player) {
    document.addEventListener('keydown', e => {
      player.startMoving(e);
    });
    document.addEventListener('keyup', e => {
      player.stopMoving(e);
    });
  }

  useMouse(player: Player) {
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
