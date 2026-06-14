import { Actor, Vector } from "excalibur"
import { Resources } from "../../resources.js"
import { Yattira } from "../yattira.js"

export class Ammo extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.ammo.width, height: Resources.ammo.height })
        console.log("im a ammo star")
        this.graphics.use(Resources.ammo.toSprite())
        this.vel = new Vector(0, 0)
        this.scale = new Vector(.7, .7)
    }



    onCollisionStart(event, other) {
        if (other.owner instanceof Yattira) {
            this.kill()
            other.owner.ammo += 5

        }
    }
}