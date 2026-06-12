import { Actor, Vector } from "excalibur"
import { Resources } from "../../resources.js"
import { Slime } from "../slime.js"

export class Star extends Actor {
    constructor(x, y, vx, vy) {
        super({ x, y, width: Resources.Star.width, height: Resources.Star.height })
        console.log("im a star")
        this.graphics.use(Resources.Star.toSprite())
        this.vel = new Vector(0, 0)
        this.scale = new Vector(.7, .7)
    }

    onInitialize(engine) {
        this.events.on("exitviewport", () => this.kill())
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Slime) {
            other.owner.kill()
            this.kill()
            const engine = this.scene?.engine
            if (engine) {
                engine.score += 1
            }
        }
    }
}