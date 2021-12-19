class Ball {
  object: HTMLElement;
  color: string;
  currentX: number;
  currentY: number;
  intervalId: number;
  objectVelocity: number;
  constructor(color: string, objectVelocity: number = 5) {
    this.color = color;
    this.objectVelocity = objectVelocity;

    this.currentX = window.innerWidth / 2;
    this.currentY = window.innerHeight / 2;
    this.intervalId = 0
    this.object = document.createElement('div');
    this.initBallObject();
  }

  initBallObject () {
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

  set setPostion({x, y}: {x: string, y: string}) {
    this.currentX = parseFloat(x)
    this.currentY = parseFloat(y)
    this.object.style.left = x;
    this.object.style.top = y;
  }

  moveUp() {}

  moveDown() {
    this.currentY += this.objectVelocity;
    this.object.style.top = this.currentY + 'px';
  }

  move() {
    this.intervalId = setInterval(() => {
      this.currentX += -this.objectVelocity;
      this.currentY += this.objectVelocity;
      this.setPostion = {x: this.currentX + 'px', y: this.currentY + 'px'}
    }, 1000 / 60);
  }
}

export default Ball;