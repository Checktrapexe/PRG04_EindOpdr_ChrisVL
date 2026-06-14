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



export class Wall1 extends Actor {
    constructor(x, y, width, height) {
        super({ x, y, width: Resources.Wall.width, height: Resources.Wall.height, offset: new Vector(20, 0) })
        this.body.collisionType = CollisionType.Fixed

    }

    onInitialize(engine, x, y) {
        this.graphics.use(Resources.Wall.toSprite())
        this.scale = new Vector(2, 2)


    }
}

export class Wall2 extends Actor {
    constructor(x, y, width, height) {
        super({ x, y, width: Resources.Wall.width, height: Resources.Wall.height, offset: new Vector(-20, 0) })
        this.body.collisionType = CollisionType.Fixed
        this.scale = new Vector(2, 2)

    }

    onInitialize(engine, x, y) {
        this.graphics.use(Resources.Wall.toSprite())

        this.graphics.flipHorizontal = true

    }
}

export class Wall3 extends Actor {
    constructor(x, y, width, height) {
        super({ x, y, width: Resources.Wall2.width, height: Resources.Wall2.height, offset: new Vector(0, 40) })
        this.body.collisionType = CollisionType.Fixed
        this.scale = new Vector(2, 2)
    }

    onInitialize(engine, x, y) {
        this.graphics.use(Resources.Wall2.toSprite())
    }
}

export class Wall4 extends Actor {
    constructor(x, y, width, height) {
        super({ x, y, width: Resources.Wall2.width, height: Resources.Wall2.height, offset: new Vector(0, -20) })
        this.body.collisionType = CollisionType.Fixed
        this.scale = new Vector(2, 2)

    }

    onInitialize(engine, x, y) {
        this.graphics.use(Resources.Wall2.toSprite())

        this.graphics.flipVertical = true

    }
}