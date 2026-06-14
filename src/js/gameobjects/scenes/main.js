import { Actor, Engine, Vector, DisplayMode, randomIntInRange, Scene } from "excalibur"
import { Background, Wall1, Wall2, Wall3, Wall4 } from "../background"
import { Slime } from "../slime"
import { Yattira } from "../yattira"
import { Gameover } from "./gameover"
import { FastSlime } from "../fast_slime"
import { UI } from "../gui"
import { Ammo } from "../items/ammo"

export class main extends Scene {

    onInitialize(engine) {

        this.spawnTimer = 0
        this.ammoSpawnTimer = 0
    }

    onActivate() {
        this.StartGame()
    }

    StartGame() {
        console.log("game has started")
        const bg = new Background()
        this.add(bg)

        const w1 = new Wall1(-2900, 360)
        this.add(w1)
        const w2 = new Wall2(2900, 360)
        this.add(w2)
        const w3 = new Wall3(640, -2900)
        this.add(w3)
        const w4 = new Wall4(640, 2900)
        this.add(w4)

        const w5 = new Wall1(3000, 360)
        this.add(w5)
        const w6 = new Wall2(-3000, 360)
        this.add(w6)
        const w7 = new Wall3(640, 2950)
        this.add(w7)
        const w8 = new Wall4(640, -2950)
        this.add(w8)

        const player = new Yattira(640, 360)
        this.player = player
        this.add(player)

        // let enemies find the player
        if (this.engine) this.engine.player = player

        const s = new Slime()
        this.add(s)

        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        if (cam && cam.strategy) cam.strategy.elasticToActor(player, 0.2, 0.6)


        this.ui = new UI()
        this.add(this.ui)
    }

    onPostUpdate(engine, delta) {
        this.ammoSpawnTimer += delta
        if (this.ammoSpawnTimer > 3000) {
            this.ammoSpawnTimer = 0
            const minX = 50, maxX = 1230
            const minY = 50, maxY = 670

            const a = new Ammo(randomIntInRange(-2800, 2800), randomIntInRange(-2800, 2800))
            this.add(a)
        }

        this.spawnTimer += delta
        if (this.spawnTimer > 2000) {
            this.spawnTimer = 0
            const s = new Slime()
            const fs = new FastSlime()
            this.add(s)
            this.add(fs)
        }
    }


}