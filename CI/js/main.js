var Nakama = {}
Nakama.config = {
  shipSpeed : 200
}
window.onload = function () {
  Nakama.game = new Phaser.Game(
    640,
    960,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    },
    false,
    false
  );
}

var preload = function() {
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.atlasJSONHash('explosion', 'Assets/explode.png','Assets/explode.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
  Nakama.game.time.advancedTiming = true;
}

var create = function() {
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
  Nakama.background = Nakama.game.add.tileSprite(0,0,640,960,'background');

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.bulletGroup.setAll('outOfBoundsKill', true);
  Nakama.bulletGroup.setAll('checkWorldBounds', true);
  Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyBulletGroup.setAll('outOfBoundsKill', true);
  Nakama.enemyBulletGroup.setAll('checkWorldBounds', true);
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.explo = Nakama.game.add.physicsGroup();
  Nakama.playersGroup = Nakama.game.add.physicsGroup();
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  Nakama.shipControllers = [];
  Nakama.botControllers = [];
  // player1 = new ShipController(200,700, "Spaceship1-Player.png", {
  //   up: Phaser.Keyboard.UP,
  //   down: Phaser.Keyboard.DOWN,
  //   left: Phaser.Keyboard.LEFT,
  //   right: Phaser.Keyboard.RIGHT,
  //   fire: Phaser.Keyboard.SPACEBAR,
  //   bulletType : 1,
  //   basicCoolDown : 0.15,
  //   shipSpeed: 200
  // });
  player2 = new ShipController(400,700, "Spaceship2-Player.png", {
    up: Phaser.Keyboard.W,
    down: Phaser.Keyboard.S,
    left: Phaser.Keyboard.A,
    right: Phaser.Keyboard.D,
    fire: Phaser.Keyboard.SPACEBAR,
    bulletType : 3,
    basicCoolDown : 0.15,
    shipSpeed: 200
  });
  // Nakama.shipControllers.push(player1);
  Nakama.shipControllers.push(player2);

  // bot1 = new EnemyController(
  //   320,
  //   100,
  //   {
  //     img : 'EnemyType1.png',
  //     health : 1000,
  //     Type : 2
  //   }
  // );
  Nakama.botControllers.push(new EnemyController(
    320,
    100,
    {
      img : 'EnemyType1.png',
      health : 1000,
      Type : 2,
      width : 0.01,
      height: 0.008
    }
    )
  );
  Nakama.botControllers.push(new EnemyController(
    320,
    300,
    {
      img : 'EnemyType1.png',
      health : 1000,
      Type : 1,
      width : 0.005,
      height: 0.003
    }
    )
  );
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
}

var update = function() {
  Nakama.background.tilePosition.y += 10;
  for (var i = 0; i < Nakama.shipControllers.length; i++)
  {
    //  console.log(Nakama.shipControllers[i]);
    Nakama.shipControllers[i].update();
  }
  for (var i = 0; i < Nakama.botControllers.length; i++)
  {
    //  console.log(Nakama.shipControllers[i]);
    Nakama.botControllers[i].update();
  }
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, onBulletHit);
}

function onBulletHit(bullets, enemy){
  enemy.damage(bullets.health);
  // console.log('enemy :'+enemy.health+' hp');
  bullets.damage(1);

  var explosion = Nakama.game.add.sprite(enemy.body.x,enemy.body.y,'explosion');
  var randomValue = Nakama.game.rnd.integerInRange(-20, 50)/100;
  var randomValue2 = Nakama.game.rnd.integerInRange(-20,50)/100;
  explosion.anchor = new Phaser.Point(randomValue, randomValue2);
  explosion.animations.add('ex');
  explosion.scale.x = (0.5);
  explosion.scale.y = (0.5);
  explosion.play('ex',8,false,true);
  // console.log('enemy x:'+enemy.body.x);
  // console.log('enemy y:'+enemy.body.y);
  // console.log('enemy r1:'+randomValue)
  // console.log('enemy r2:'+randomValue2)
}

var render = function() {}
