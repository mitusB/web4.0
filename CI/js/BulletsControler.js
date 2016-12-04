class BulletsController {
  constructor(pos, config) {
    this.config = config;
    this.pos = pos;
    if(this.config.enemyHitable != false){
      this.sprite = Nakama.bulletGroup.create(
        this.pos.x,
        this.pos.y,
        'assets',
        this.config.img
      );
    }else{
      this.sprite = Nakama.enemyBulletGroup.create(
        pos.x,
        pos.y,
        'assets',
        this.config.img
      );
    }
    this.sprite.outOfBoundsKill = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.health = this.config.damage;
    if (this.config.scale == true){
      this.sprite.scale.x = ((this.config.width*this.config.multiplie)/this.sprite.width);
    }
    Nakama.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }

  launch(){
    this.sprite.body.velocity = this.config.velocity;
  }
}
