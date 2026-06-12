import { Vector, CollisionType } from "excalibur"
import { Resources } from "../resources.js"
import { Enemy } from "./enemy.js"
import { Slime } from "./slime.js"

export class FastSlime extends Slime {
    constructor() {
        super({ width: Resources.SlimeFast.width, height: Resources.SlimeFast.height })
        this.chaseSpeed = 200
    }

    onInitialize(engine) {
        this.graphics.use(Resources.SlimeFast.toSprite())
        this.pos = new Vector(100, 100)
        this.vel = new Vector(0, 0)
        this.body.collisionType = CollisionType.Active

    }
}
