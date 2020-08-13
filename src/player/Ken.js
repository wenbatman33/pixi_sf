import { Sprite, utils, AnimatedSprite } from 'pixi.js'
import { TweenMax } from "gsap";

export default class Ken extends Sprite {
  constructor() {
    super()
    utils.EventEmitter.call(this)
    this.moveList = []
    this.interactive = true
    this.y = 500
    this.scale.x = 5
    this.scale.y = 5

    this.ken_idle = new AnimatedSprite(app.res.idle.spritesheet.animations.idle);
    this.ken_idle.animationSpeed = 0.1;
    this.ken_idle.anchor.set(0.5, 1);
    this.ken_idle.play();
    this.addChild(this.ken_idle)

    this.ken_walking = new AnimatedSprite(app.res.walking.spritesheet.animations.walking);
    this.ken_walking.animationSpeed = 0.1;
    this.ken_walking.anchor.set(0.5, 1);
    this.ken_walking.play();
    this.ken_walking.visible = false
    this.addChild(this.ken_walking)

    this.ken_shouryuken = new AnimatedSprite(app.res.shouryuken.spritesheet.animations.shouryuken);
    this.ken_shouryuken.animationSpeed = 0.1;
    this.ken_shouryuken.anchor.set(0.5, 1);
    this.ken_shouryuken.play();
    this.ken_shouryuken.visible = false
    this.ken_shouryuken.loop = false
    this.ken_shouryuken.onComplete = () => {
      this.ken_shouryuken.visible = false;
      this.ken_idle.visible = true;
    };
    this.addChild(this.ken_shouryuken)

    this.ken_hadoukan = new AnimatedSprite(app.res.hadoukan.spritesheet.animations.hadoukan);
    this.ken_hadoukan.animationSpeed = 0.1;
    this.ken_hadoukan.anchor.set(0.5, 1);
    this.ken_hadoukan.play();
    this.ken_hadoukan.visible = false
    this.ken_hadoukan.loop = false
    this.ken_hadoukan.onComplete = () => {
      this.ken_hadoukan.visible = false;
      this.ken_idle.visible = true;
    };
    this.addChild(this.ken_hadoukan)

    this.kenMoveList = {
      hadoken: '83,68,80',
      shoyuken: '68,83,68,80',
    };
    window.addEventListener('keyup', (e) => this._keyupHandle(e));
    window.addEventListener('keydown', (e) => this._keydownHandle(e));
  }
  _keyupHandle(e) {
    const vm = this
    this.ken_idle.visible = true
    this.ken_walking.visible = false
    this.moveList.push(e.keyCode)

    let controlString = this.moveList.toString()
    if (controlString.indexOf(this.kenMoveList.shoyuken) > 0) {
      this.ken_shouryuken.visible = true;
      this.ken_idle.visible = false
      this.ken_shouryuken.gotoAndPlay(0)
    }
    if (controlString.indexOf(this.kenMoveList.hadoken) > 0) {
      this.ken_hadoukan.visible = true;
      this.ken_idle.visible = false
      this.ken_hadoukan.gotoAndPlay(0)
    }
    setTimeout(function() {
      vm.moveList.shift()
      controlString = vm.moveList.toString()
    }, 800);
  }
  _keydownHandle(e) {
    console.log(e.keyCode)
    this.ken_idle.visible = false
    this.ken_walking.visible = true
    if (e.keyCode === 87) {
      TweenMax.to(this, 1, {
        y: 450,
        onComplete: function() {
          console.log('onComplete')
        }
      })
    }
    if (e.keyCode === 65) {
      this.x -= 20
    }
    if (e.keyCode === 68) {
      this.x += 20
    }
  }
}

Object.assign(Ken.prototype, utils.EventEmitter.prototype)