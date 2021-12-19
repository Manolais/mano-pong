class Player {
  private isMoving: boolean;
  private currentY: number;
  private playerColor: string;
  private keyPress: string;
  object: HTMLElement;
  isPlayer1: boolean;
  playerWidth: number;
  playerHeight: number;
  moveVelocity: number;
  intervalId: number;

  constructor(
    color: string,
    isPlayer1: boolean = true,
    moveVelocity: number = 20,
  ) {
    this.isMoving = false;
    this.playerWidth = 15;
    this.playerHeight = 150;
    this.currentY = window.innerHeight / 2 - this.playerHeight / 2 ;
    this.keyPress = '';
    this.intervalId = 0;

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

  set setColor(color: string) {
    this.playerColor = color;
    this.object.style.backgroundColor = this.playerColor;
  }

  set setPosition(position: string) {
    this.currentY = parseFloat(position);
    this.object.style.top = position;
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
    }
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

export default Player;