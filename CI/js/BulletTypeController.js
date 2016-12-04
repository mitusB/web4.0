class BulletTypeController {
  constructor(){
  }

  checkType(pos, config){
      if(config.Type == 1){
        return (new BulletsController(pos,{
          Type : config.Type,
          img : 'BulletType1Upgraded.png',
          coolDown : 0.4,
          damage : 10,
          velocity : new Phaser.Point(0, -10).setMagnitude(1000),
          width : config.width,
          height : config.height,
          multiplie : 2,
          scale : true
        }));

      }else if (config.Type == 2) {
        return (new BulletsController(pos,{
          Type : config.Type,
          img : 'BulletType2.png',
          speed : 600,
          coolDown : 0.3,
          damage : 2,
          scale : false,
          velocity : new Phaser.Point(0, -10).setMagnitude(600)
          })
        );
      }else if (config.Type == 3) {
        return (new TrippleBullet(pos,{
          Type : config.Type,
          // img : 'BulletType2Propulsory.png',
          img : 'BulletType2Propulsory.png',
          speed : 800,
          coolDown : 0.1,
          damage : 1,
          tir : 7,
          scale : false,
          direction : 2,
          velocity : new Phaser.Point(0, -10).setMagnitude(600)
          })
        );
      }else if(config.Type == 4){
        console.log('on bullet'+pos.x+'---------'+pos.y);
        return (new HommingBullets(pos,{
          Type : config.Type,
          img : 'BulletType2Propulsory.png',
          speed : 300,
          coolDown : 1,
          damage : 15,
          tir : 7,
          scale : false,
          direction : 2,
          velocity : new Phaser.Point(0, -10).setMagnitude(600)
          })
        );
      }else{
       return null;
     }
  }
  //----------------------------------------------------------------------------
}
