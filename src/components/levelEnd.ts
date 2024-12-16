import { TilesConfig } from '../types/types';

export default class LevelEnd extends Phaser.Physics.Arcade.Sprite {
  private _loadNextLevel: boolean = false
  constructor(scene: Phaser.Scene, tilesConfig: TilesConfig) {
    super(scene, tilesConfig.x - 30, tilesConfig.y - 60, 'end')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setImmovable(true)
    // @ts-ignore
    this.body.setAllowGravity(false)
    this.setOrigin(0, 0.5)
  }

  get loadNextLevel() {
    return this._loadNextLevel
  }

  nextLevel(scene: Phaser.Scene, level: number) {
    if (this._loadNextLevel) return
    this._loadNextLevel = true

    scene.cameras.main.fadeOut()
    scene.time.addEvent({
      delay: 2000,
      callback: () => {
        scene.scene.restart({ level: level += 1 })
      }
    })
  }
}
