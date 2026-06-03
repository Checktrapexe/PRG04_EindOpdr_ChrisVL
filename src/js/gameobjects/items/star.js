import { Actor, Vector } from "excalibur"
import { Resources } from "../../resources.js"

import { Undead } from "../undead.js"

export class Star extends Actor {
    constructor(x, y, vx, vy) {
        super({ x, y, width: Resources.Star.width, height: Resources.Star.height })
        console.log("im a star")
        this.graphics.use(Resources.Star.toSprite())
        this.vel = new Vector(0, 0)
        this.scale = new Vector(0.2, 0.2)
    }

    onInitialize(engine) {
        this.events.on("exitviewport", () => this.kill())
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Undead) {
            other.owner.kill()
            this.kill()


        }
    }
}