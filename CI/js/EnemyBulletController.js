class EnemyBulletController {
  constructor(){
  }

  checkType(pos, config){
  //  console.log('checkTypeEnemy :'+config.Type);
      if(config.Type == 1){
        return (new BulletsController(pos,{
          Type : config.Type,
          img : 'EnemyBulletType2.png',
          coolDown : 0.5,
          damage : 1,
          velocity : new Phaser.Point(0, 10).setMagnitude(400),
          width : config.width,
          height : config.height,
          multiplie : 2,
          scale : false,
          enemyHitable : false
        }));
      }else if (config.Type == 2) {
        return (new TrippleBullet(pos,{
          Type : config.Type,
          img : 'EnemyBulletType2.png',
          speed : 350,
          coolDown : 1,
          damage : 1,
          tir : 7,
          scale : false,
          enemyHitable : false,
          direction : -0.5
          })
        );
      }
      else{
       return null;
      }
  }
  //----------------------------------------------------------------------------
}
