'use strict';

class Pong {
  player1: Player;
  player2: Player;
  ball: Ball;
  root: HTMLElement;
  moveVelocity: number;
  constructor(
    moveVelocity: number = 5,
    startGame: boolean = true,
    bgColor: string = 'black'
  ) {
    // const initialY = window.innerHeight / 2
    this.moveVelocity = moveVelocity;
    this.player1 = new Player('white', true, moveVelocity); // color red, and is player 1
    this.player2 = new Player('white', false, moveVelocity); // color black, and is not player 1 so it will be player 2
    this.ball = new Ball('#0095DD');

    this.root = document.querySelector('.root') as HTMLDivElement;
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

  set setBackgroundColor(color: string) {
    this.root.style.backgroundColor = color;
  }

  keyPressed() {
    this.useMouse(this.player1);
    this.useKeyboard(this.player2);
  }

  appendPlayersToRoot() {
    this.root.appendChild(this.player1.getPlayerObject);
    this.root.appendChild(this.player2.getPlayerObject);
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
    console.log('play');

    this.player1.move();
    this.player2.move();
  }
}

class Player {
  private playerColor: string;
  private currentY: number;
  private isMoving: boolean;
  private keyPress: string;
  playerWidth: number;
  playerHeight: number;
  isPlayer1: boolean;
  object: HTMLElement;
  moveVelocity: number;
  intervalId: number;

  constructor(
    color: string,
    isPlayer1: boolean = true,
    moveVelocity: number = 5
  ) {
    this.playerHeight = 150;
    this.playerWidth = 15;
    this.currentY = window.innerHeight / 2 - this.playerHeight / 2 ;
    this.isMoving = false;
    this.intervalId = 0;
    this.keyPress = '';

    this.playerColor = color;
    this.isPlayer1 = isPlayer1;
    this.moveVelocity = moveVelocity;
    this.object = document.createElement('div');
    this.initPlayerObject()
  }

  get getPlayerObject() {
    return this.object;
  }

  set setPlayerObject(object: HTMLElement) {
    this.object = object;
    this.initPlayerObject()
  }

  initPlayerObject() {
    this.object.style.top = this.currentY + 'px';
    this.object.style.height = this.playerHeight + 'px';
    this.object.style.width = this.playerWidth + 'px';
    this.object.style.backgroundColor = this.playerColor;
    this.object.style.position = 'absolute';

    this.isPlayer1 ? (
      this.object.style.left = '20%'
    ) : (
      this.object.style.right = '20%'
    );
  }

  set setColor(color: string) {
    this.playerColor = color;
    this.object.style.backgroundColor = this.playerColor;
  }

  set setPosition(position: string) {
    this.currentY = parseFloat(position);
    this.object.style.top = position;
  }

  followMouse(event: MouseEvent) {
    let position = event.clientY - this.playerHeight / 2;
    if (position > window.innerHeight - this.playerHeight) {
      position = window.innerHeight - this.playerHeight;
    } else if (position < 0) {
      position = 0;
    }
    this.setPosition = position + 'px';
  }

  moveUp(position: number) {
    let newPosition = this.currentY - position + 'px';
    if (this.currentY - position < 0) {
      newPosition = '0px';
    };
    this.setPosition = newPosition;
  }
  moveDown(position: number) {
    let  newPosition = this.currentY + position + 'px';
    if (this.currentY + position > window.innerHeight - this.playerHeight) {
      newPosition = window.innerHeight - this.playerHeight + 'px';
    };
    this.setPosition = newPosition;
  }

  stopMoving(event: KeyboardEvent) {
    const keyUp = this.isPlayer1 ? 'w' : 'ArrowUp';
    const keyDown = this.isPlayer1 ? 's' : 'ArrowDown';
    if (event.key === keyUp || event.key === keyDown) {
      this.isMoving = false;
      // clearInterval(this.intervalId);
    }
    // this.isMoving = false
  }

  startMoving(event: KeyboardEvent | MouseEvent) {
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
        } else if (this.keyPress === keyDown) {
          this.moveDown(this.moveVelocity);
        }
      }
    },1000 / 60);
  }
}

class Ball {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
}

const pong = new Pong(20);
