class BotMovement{
  constructor(x,y,config){
    this.config = config;
    this.angle = Math.PI;
    this.angleY = Math.PI;
    this.speed = Math.PI*config.width;
    this.speedY = Math.PI*config.height;
  }

  update(){
    this.move();
  }

  move(){
      this.angleUp()
      return  new Phaser.Point(Math.cos(this.angle), Math.sin(this.angleY)*0.2).setMagnitude(this.config.speed);
  }

  angleUp(){
      this.angle= this.angle + this.speed;
      this.angleY= this.angleY + this.speedY;
  }
}
