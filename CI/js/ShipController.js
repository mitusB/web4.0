class ShipController {
  constructor(x, y, spriteName, config) {
    this.config = config;
    this.coolDown=0.2;
    this.sprite = Nakama.playersGroup.create(
      x,
      y,
      'assets',
      spriteName
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    Nakama.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.timeSinceLastShoot = 0;
    this.checker = new BulletTypeController();
  }

  update() {
    this.timeSinceLastShoot += Nakama.game.time.physicsElapsed;
    //--------------------------------------------------------------------------
    if (Nakama.keyboard.isDown(this.config.up)) {
      this.sprite.body.velocity.y = -1 * this.config.shipSpeed;
    } else if (Nakama.keyboard.isDown(this.config.down)) {
      this.sprite.body.velocity.y = this.config.shipSpeed;
    } else {
      this.sprite.body.velocity.y = 0;
    }
    if (Nakama.keyboard.isDown(this.config.left)) {
      this.sprite.body.velocity.x = -1 * this.config.shipSpeed;
    }  else if (Nakama.keyboard.isDown(this.config.right)) {
      this.sprite.body.velocity.x = this.config.shipSpeed;
    } else {
      this.sprite.body.velocity.x = 0;
    }
    //--------------------------------------------------------------------------
    if (Nakama.keyboard.isDown(this.config.fire) && (this.timeSinceLastShoot >= this.coolDown)) {
      this.fire();
      this.timeSinceLastShoot =0;
    }
    //--------------------------------------------------------------------------
  }

  fire(){
    // console.log(this.sprite.width);
    console.log('pre type-4');
    var shipWeapon = this.checker.checkType(this.sprite.position,{
      Type : this.config.bulletType,
      width : this.sprite.width,
      height : this.sprite.height
    });
    console.log('done type-4');
    this.coolDown = shipWeapon.config.coolDown;
    shipWeapon.launch();
  }
}
