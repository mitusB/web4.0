class HommingBullets{
  constructor(pos,config){
    this.config = config;
    console.log('on-homming-'+pos.x+' '+pos.y);
    this.sprite = Nakama.enemyBulletGroup.create(
      pos.x,
      pos.y,
      'assets',
      'BulletType2Upgraded.png');
    console.log('on-homming-step2-'+pos.x+' '+pos.y);
    this.x = this.config.x;
    this.y = this.config.y;
    // Set the pivot point for this sprite to the center
    this.sprite.anchor.setTo(0.5, 0.5);

    // Enable physics on the missile
    Nakama.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.SPEED = 300; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    this.WOBBLE_LIMIT = 15; // degrees
    this.WOBBLE_SPEED = 250; // milliseconds
    this.SMOKE_LIFETIME = 3000; // milliseconds

    // Create a variable called wobble that tweens back and forth between
    // -this.WOBBLE_LIMIT and +this.WOBBLE_LIMIT forever
    this.wobble = this.WOBBLE_LIMIT;

    Nakama.game.add.tween(this.sprite)
        .to(
            { wobble: -this.WOBBLE_LIMIT },
            this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
            Number.POSITIVE_INFINITY, true
        );

    // Add a smoke emitter with 100 particles positioned relative to the
    // bottom center of this missile
    this.smokeEmitter = this.game.add.emitter(0, 0, 100);

    // Set motion paramters for the emitted particles
    this.smokeEmitter.gravity = 0;
    this.smokeEmitter.setXSpeed(0, 0);
    this.smokeEmitter.setYSpeed(-80, -50); // make smoke drift upwards

    // Make particles fade out after 1000ms
    this.smokeEmitter.setAlpha(1, 0, this.SMOKE_LIFETIME,
        Phaser.Easing.Linear.InOut);

    // Create the actual particles
    this.smokeEmitter.makeParticles('smoke');

    // Start emitting smoke particles one at a time (explode=false) with a
    // lifespan of this.SMOKE_LIFETIME at 50ms intervals
    this.smokeEmitter.start(false, this.SMOKE_LIFETIME, 50);

  }

  update(){
    chase();
  }

  chase(){
    this.x = this.config.targetx;
    this.y = this.config.targety;

    // Position the smoke emitter at the center of the missile
    this.smokeEmitter.x = this.sprite.body.x;
    this.smokeEmitter.y = this.sprite.body.y;

    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    var targetAngle = this.game.math.angleBetween(
        this.sprite.x, this.sprite.y,
        this.config.x, this.config.y
    );
    // Add our "wobble" factor to the targetAngle to make the missile wobble
    // Remember that this.wobble is tweening (above)
    targetAngle += this.game.math.degToRad(this.wobble);
    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (this.sprite.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.sprite.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            this.sprite.angle += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.sprite.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < Nakama.game.math.degToRad(this.TURN_RATE)) {
            this.sprite.rotation = targetAngle;
        }

        // Calculate velocity vector based on this.rotation and this.SPEED
        this.sprite.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
        this.sprite.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
    }
  }

}
