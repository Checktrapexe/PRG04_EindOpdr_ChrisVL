import { Actor, Engine, Vector, DisplayMode, randomIntInRange, Scene } from "excalibur"
import { Background, Wall } from "../background"
import { Slime } from "../slime"
import { Yattira } from "../yattira"
import { Gameover } from "./gameover"
import { FastSlime } from "../fast_slime"

export class main extends Scene {

    onInitialize(engine) {
        this.spawnTimer = 0
    }

    onActivate() {
        this.StartGame()
    }

    StartGame() {
        console.log("game has started")
        const bg = new Background()
        this.add(bg)



        const player = new Yattira(640, 360)
        this.player = player
        this.add(player)

        // let enemies find the player
        if (this.engine) this.engine.player = player

        const s = new Slime()
        this.add(s)

        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        if (cam && cam.strategy) cam.strategy.elasticToActor(player, 0.2, 0.6)
    }

    onPostUpdate(engine, delta) {
        this.spawnTimer += delta
        // console.log(this.spawnTimer)
        if (this.spawnTimer > 2000) {
            this.spawnTimer = 0
            const s = new Slime()
            const fs = new FastSlime()
            this.add(s)
            this.add(s)
            this.add(fs)
        }
    }
}