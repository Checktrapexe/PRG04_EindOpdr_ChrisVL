import { Actor, Vector, CollisionType } from "excalibur"
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
        this.scale = new Vector(2, 2)
    }
}



export class Wall extends Actor {
    constructor(x, y, width = 40, height = 720) {
        super({ x, y, width, height })
        this.body.collisionType = CollisionType.Fixed
    }

    onInitialize(engine) {
        const rect = new Rectangle({
            width: this.width,
            height: this.height,
            color: Color.Gray
        })
        this.graphics.use(rect)
    }
}

