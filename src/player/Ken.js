import { Sprite, utils, AnimatedSprite, Text, TextStyle } from 'pixi.js'
import { gsap, TweenMax } from "gsap";

export default class Ken extends Sprite {
  constructor() {
    super()
    utils.EventEmitter.call(this)
    this.moveList = []
    this.interactive = true
    this.y = 500
    this.scale.x = 5
    this.scale.y = 5
    this.isPlaying = false
    this.animationSpeed = 0.1
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.traceMsg = new Text('traceMsg')
    this.traceMsg.anchor.set(0.5)
    this.traceMsg.x = 0
    this.traceMsg.y = 0
    this.traceMsg.style = new TextStyle({
      fill: 0xffffff,
      fontSize: 40,
      fontFamily: 'Arial',
      fontStyle: 'bold',
    })
    this.addChild(this.traceMsg)
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.ken_idle = new AnimatedSprite(app.res.idle.spritesheet.animations.idle);
    this.ken_idle.animationSpeed = 0.1;
    this.ken_idle.anchor.set(0.5, 1);
    this.ken_idle.play();
    this.addChild(this.ken_idle)
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.ken_walking = new AnimatedSprite(app.res.walking.spritesheet.animations.walking);
    this.ken_walking.animationSpeed = 0.1;
    this.ken_walking.anchor.set(0.5, 1);
    this.ken_walking.visible = false
    this.ken_walking.play();
    this.addChild(this.ken_walking)
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.ken_crouch = new AnimatedSprite(app.res.crouch.spritesheet.animations.crouch);
    this.ken_crouch.animationSpeed = 0.1;
    this.ken_crouch.anchor.set(0.5, 1);
    this.ken_crouch.loop = false
    this.ken_crouch.visible = false
    this.addChild(this.ken_crouch)
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.ken_shouryuken = new AnimatedSprite(app.res.shouryuken.spritesheet.animations.shouryuken);
    this.ken_shouryuken.animationSpeed = 0.1;
    this.ken_shouryuken.anchor.set(0.5, 1);
    this.ken_shouryuken.visible = false
    this.ken_shouryuken.loop = false
    this.ken_shouryuken.onFrameChange = () => this.ken_idle_hide()
    this.ken_shouryuken.onComplete = () => this.ken_idle_show(this.ken_shouryuken)
    this.addChild(this.ken_shouryuken)
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.ken_hadoukan = new AnimatedSprite(app.res.hadoukan.spritesheet.animations.hadoukan);
    this.ken_hadoukan.animationSpeed = 0.1;
    this.ken_hadoukan.anchor.set(0.5, 1);
    this.ken_hadoukan.visible = false
    this.ken_hadoukan.loop = false
    this.ken_hadoukan.onFrameChange = () => this.ken_idle_hide()
    this.ken_hadoukan.onComplete = () => this.ken_idle_show(this.ken_hadoukan)
    this.addChild(this.ken_hadoukan)
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.ken_punch_L = new AnimatedSprite(app.res.punch_L.spritesheet.animations.punch_L);
    this.ken_punch_L.animationSpeed = 0.2;
    this.ken_punch_L.anchor.set(0.5, 1);
    this.ken_punch_L.visible = false
    this.ken_punch_L.loop = false
    this.ken_punch_L.onFrameChange = () => this.ken_idle_hide()
    this.ken_punch_L.onComplete = () => this.ken_idle_show(this.ken_punch_L)
    this.addChild(this.ken_punch_L)
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.ken_jump = new AnimatedSprite(app.res.jump.spritesheet.animations.jump);
    this.ken_jump.animationSpeed = 0.1;
    this.ken_jump.anchor.set(0.5, 1);
    this.ken_jump.visible = false
    this.ken_jump.loop = false
    this.ken_jump.onFrameChange = () => this.ken_idle_hide()
    this.ken_jump.onComplete = () => this.ken_idle_show(this.ken_jump)
    this.addChild(this.ken_jump)
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    this.kenMoveList = {
      jump: '87',
      hadoken: '83,68,80',
      shoyuken: '68,83,68,80',
    };
    window.addEventListener('keyup', (e) => this._keyupHandle(e));
    window.addEventListener('keydown', (e) => this._keydownHandle(e));
  }
  _keyupHandle(e) {
    const vm = this
    this.ken_walking.visible = false
    this.ken_crouch.visible = false
    this.moveList.push(e.keyCode)
    let controlString = this.moveList.toString()
    this.traceMsg.text = controlString
    if (!this.isPlaying) {
      this.ken_idle.visible = true
    }
    if (controlString.indexOf(this.kenMoveList.hadoken) > 0) {
      this.ken_hadoukan.visible = true;
      this.ken_idle.visible = 1;
      this.ken_hadoukan.gotoAndPlay(0)
    }
    if (controlString.indexOf(this.kenMoveList.shoyuken) > 0) {
      this.ken_shouryuken.visible = true;
      this.ken_idle.visible = false
      gsap.to(this, .5, { y: 400, ease: "easeOut" })
      gsap.to(this, .5, { y: 500, ease: "easeOut" }).delay(.5)
      this.ken_shouryuken.gotoAndPlay(0)
    }
    setTimeout(function() {
      vm.moveList.shift()
      controlString = vm.moveList.toString()
    }, 800);
  }
  _keydownHandle(e) {
    const vm = this
    console.log(e.keyCode)
    if (!this.isPlaying) {
      this.ken_idle.visible = false
      // 按鈕 w
      if (e.keyCode === 87) {

        gsap.to(vm, .5, {
          y: 300,
          ease: "easeOut",
          onComplete: function() {
            gsap.to(vm, .3, { y: 500, ease: "easeIn" })
          }
        });

        this.ken_jump.visible = true;
        this.ken_jump.gotoAndPlay(0)
      }
      // 按鈕 a
      if (e.keyCode === 65) {
        this.ken_idle.visible = false
        this.ken_walking.visible = true
        this.x -= 30
      }
      // 按鈕 d
      if (e.keyCode === 68) {
        this.ken_idle.visible = false
        this.ken_walking.visible = true
        this.x += 30
      }
      // 按鈕 s
      if (e.keyCode === 83) {
        this.ken_idle.visible = false
        this.ken_crouch.visible = true
        this.ken_crouch.play()
        // this.ken_crouch.gotoAndPlay(0);
      }
      // 按鈕 i
      if (e.keyCode === 73) {
        this.ken_idle.visible = false
        this.ken_punch_L.visible = true
        this.ken_punch_L.gotoAndPlay(0);
      }
    }
  }
  addMovieItem(movieItem) {
    // this.ken_walking = new AnimatedSprite(app.res.walking.spritesheet.animations.walking);
    // this.ken_walking.animationSpeed = 0.1;
    // this.ken_walking.anchor.set(0.5, 1);
    // this.ken_walking.play();
    // this.ken_walking.visible = false
  }
  ken_idle_hide() {
    this.isPlaying = true
    this.ken_idle.visible = false
  }
  ken_idle_show(movieItem) {
    this.isPlaying = false
    movieItem.visible = false;
    this.ken_idle.visible = true;
    this.ken_idle.gotoAndPlay(0)
  }
}

Object.assign(Ken.prototype, utils.EventEmitter.prototype)