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
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.player)

    this.game.physics.arcade.enable(this.player)
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 300
    this.player.body.collideWorldBounds = true

    this.platforms = this.add.group()
    this.platforms.enableBody = true

    var ground = this.platforms.create(0, this.world.height - 32, 'platform')
    ground.scale.setTo(24, 1)
    ground.body.immovable = true
  }

  update () {
    const hitPlatform = this.physics.arcade.collide(this.player, this.platforms)

    this.player.body.velocity.x = 0

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
    }

    if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
      this.player.body.velocity.y = -350
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
