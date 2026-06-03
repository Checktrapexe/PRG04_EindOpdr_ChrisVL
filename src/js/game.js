import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomIntInRange, ParallaxComponent, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './gameobjects/player.js'
import { Yattira } from './gameobjects/yattira.js'
import { Background } from './gameobjects/background.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => {
            this.startGame()
            const canvas = document.querySelector('canvas')
            if (canvas) {
                canvas.style.imageRendering = 'pixelated'
                const ctx = canvas.getContext('2d')
                if (ctx && 'imageSmoothingEnabled' in ctx) ctx.imageSmoothingEnabled = false
            }
        })
    }

    startGame() {
        console.log("game has started")
        const bg = new Background()
        this.add(bg)

        const player = new Yattira(640, 360)
        this.add(player)

        // camera is available after the engine/scene has started
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        if (cam && cam.strategy) cam.strategy.elasticToActor(player, 0.2, 0.6)
    }





}

new Game()
