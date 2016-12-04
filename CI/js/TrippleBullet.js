class TrippleBullet {
  constructor(pos, config) {
    this.config = config;
    this.anchor = new Phaser.Point(0.5, 0.5);
    this.pos = pos;
  }

  launch(){
    var midle = parseInt(this.config.tir / 2);
    var direc = this.config.direction;
    for(var i = 0; i < this.config.tir; i++) {
      new BulletsController(this.pos,{
        Type : this.config.Type,
        img : this.config.img,
        speed : this.config.speed,
        coolDown : this.config.coolDown,
        damage : this.config.damage,
        scale : this.config.scale,
        enemyHitable : this.config.enemyHitable,
        velocity : new Phaser.Point((i - midle) * 2, (direc * -20)).setMagnitude(this.config.speed)
      }).launch();
    }
  }

}
