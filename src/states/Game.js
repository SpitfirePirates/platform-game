/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.player = new Player({
      game: this,
      x: 40,
      y: this.world.height - 42,
      asset: 'mushroom'
    })

    this.game.add.existing(this.player)

    this.game.physics.arcade.enable(this.player)
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 600

      this.score = 0

    this.scoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });


    this.blocks = this.add.group()
    this.blocks.enableBody = true
    this.platforms = this.add.group()
    this.platforms.enableBody = true

        setInterval(function () {
            var block = this.blocks.create(Math.random() * this.world.width, Math.random() * (this.world.height - 20), 'platform')
            block.scale.setTo(0.5, 0.5)
            block.body.immovable = false
            block.body.gravity.y = 300
            block.body.velocity.x = (Math.random() - 0.5) * 100
            block.body.bounce.y = 0.7
        }.bind(this), 800)


      this.movingPlatforms = this.add.group()
      this.movingPlatforms.enableBody = true
      let moving = this.movingPlatforms.create(0, 255, 'platform')
          moving.scale.setTo(3, 0.5)
      let moving2 = this.movingPlatforms.create(200, 500, 'platform')
          moving2.scale.setTo(7, 0.5)
      let moving3 = this.movingPlatforms.create(15, 620, 'platform')
          moving3.scale.setTo(8, 0.5)
      let moving4 = this.movingPlatforms.create(150, 355, 'platform')
          moving4.scale.setTo(5, 0.5)


      this.movingPlatforms.setAll('body.allowGravity', false);
      this.movingPlatforms.setAll('body.immovable', true);
      this.movingPlatforms.setAll('body.velocity.x', 100);

      setInterval(function () {
          moving.body.velocity.x = 0-moving.body.velocity.x;
      }, 5000)

      setInterval(function () {
          moving2.body.velocity.x = 0-moving2.body.velocity.x;
      }, 4000)

      setInterval(function () {
          moving3.body.velocity.x = 0-moving3.body.velocity.x;
      }, 3000)

      setInterval(function () {
          moving4.body.velocity.x = 0-moving4.body.velocity.x;
      }, 2000)

      setInterval(function () {
          this.score -= 1;
      }.bind(this), 600)


    var ground = this.platforms.create(0, this.world.height - 13, 'platform')
    ground.scale.setTo(5, 1)
    ground.body.immovable = true

    var ground2 = this.platforms.create(860, this.world.height - 13, 'platform')
    ground2.scale.setTo(5, 1)
    ground2.body.immovable = true

    this.game.physics.arcade.enable(this.platforms)

      this.player.events.onOutOfBounds.add(function() {
          this.score = Math.max((this.score - 500), 0)
          this.player.reset(this.player.x, 40);
          this.player.reset(this.player.y, this.world.height - 42);
          console.log('OOB', this.score)
      }, this)
      this.player.checkWorldBounds = true
  }

  update () {
    this.physics.arcade.collide(this.player, this.platforms)
    this.physics.arcade.collide(this.player, this.movingPlatforms);
    this.physics.arcade.collide(this.blocks, this.movingPlatforms);
    this.physics.arcade.collide(this.blocks, this.blocks);

      this.physics.arcade.overlap(this.player, this.blocks, function(player, block) {
          this.score += 10
          block.kill()
      }.bind(this))

      this.score = Math.max(this.score, 0);

      let scale = Math.max((this.score+20)/80,0.2);
      this.player.scale.setTo(scale, scale)

      this.scoreText.text = 'score: ' + this.score

    this.player.body.velocity.x = 0

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -500
    }
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
