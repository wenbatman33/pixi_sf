import sound from 'pixi-sound'

export default class Sound {
  constructor() {}
  play(name, loop) {
    if (typeof loop !== 'boolean') {
      loop = false
    }
    console.log(name)
    console.log(app.res)
    let sound = app.res[name].sound
    sound.loop = loop
    sound.volume = 1
    return sound.play()
    // return sound.stop()
  }

  stop(name) {
    app.res[name].sound.stop()
  }
  toggleMuteAll() {
    sound.toggleMuteAll()
  }
}