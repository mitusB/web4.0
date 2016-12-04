class EnemyController {
  constructor(x,y, config) {
    this.config = config;
    this.coolDown=0.2;
    this.sprite = Nakama.enemyGroup.create(
      x,
      y,
      'assets',
      this.config.img
    );

    this.move = new BotMovement(this.sprite.body.x,this.sprite.body.y,{
      speed : 150,
      width : this.config.width,
      height: this.config.height
    });
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.health = this.config.health;
    Nakama.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.timeSinceLastShoot = 0;
    this.checker = new EnemyBulletController();

  }

  update(){
    this.timeSinceLastShoot += Nakama.game.time.physicsElapsed;
    if (this.timeSinceLastShoot >= this.coolDown) {
      this.fire();
      this.timeSinceLastShoot =0;
    }
    this.sprite.body.velocity = this.move.move();
  }

  fire(){
    var enemyWeapon = this.checker.checkType(this.sprite.position,{
      Type : this.config.Type,
      width : this.sprite.width,
      height : this.sprite.height
    });
    this.coolDown = enemyWeapon.config.coolDown;
    enemyWeapon.launch();
  }
}
