import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Background extends Actor {
    constructor() {
        super()
        console.log("backgroundloaded")
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Background.toSprite())
        this.pos = new Vector(640, 360)
        this.vel = new Vector(0, 0)
    }
}

export class Backgroundtwo extends Actor {

}