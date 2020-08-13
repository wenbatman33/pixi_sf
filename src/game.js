import { Texture, Container, Rectangle, AnimatedSprite } from 'pixi.js'
import Ken from './player/Ken'

const GAP_SIZE = 2
export default class Game extends Container {
  constructor() {
    super()
    const ken = new Ken()
    this.addChild(ken);
  }
}