import { Vector, Color } from "excalibur"
import { Resources } from "../resources.js"
import { Player } from "./player.js"
import { Undead } from "./undead.js"

const DirectionSprites = {
    idle: Resources.YattiraIdle,
    up: Resources.YattiraUp,
    down: Resources.YattiraDown,
    left: Resources.YattiraLeft,
    right: Resources.YattiraRight,
    upLeft: Resources.YattiraUpLeft,
    upRight: Resources.YattiraUpRight,
    downLeft: Resources.YattiraDownLeft,
    downRight: Resources.YattiraDownRight
}

export class Yattira extends Player {
    constructor(x, y) {
        super({ x, y, width: Resources.YattiraIdle.width, height: Resources.YattiraIdle.height })
        this.sprites = DirectionSprites
        this.currentDirection = "idle"
    }

    onInitialize() {
        this.graphics.use(this.sprites.idle.toSprite())
    }

    onPostUpdate(engine) {
        super.onPostUpdate(engine)
        this.updateDirectionSprite()
    }

    updateDirectionSprite() {
        const dx = Math.sign(this.vel.x)
        const dy = Math.sign(this.vel.y)
        let direction = "idle"
        //dx = direction on x
        //dy = direstion on y 
        if (dx === 0 && dy === -1) direction = "up"
        else if (dx === 0 && dy === 1) direction = "down"
        else if (dx === -1 && dy === 0) direction = "left"
        else if (dx === 1 && dy === 0) direction = "right"
        else if (dx === -1 && dy === -1) direction = "upLeft"
        else if (dx === 1 && dy === -1) direction = "upRight"
        else if (dx === -1 && dy === 1) direction = "downLeft"
        else if (dx === 1 && dy === 1) direction = "downRight"

        if (direction !== this.currentDirection) {
            this.currentDirection = direction
            this.graphics.use(this.sprites[direction].toSprite())
        }
    }



    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    flashOnHit() {
        this.actions.flash(Color.White, 100);
        this.wait(100)
        this.actions.flash(Color.White, 100);
        this.wait(100)
        this.actions.flash(Color.White, 100);
        this.wait(100)
        this.actions.flash(Color.White, 100);
        this.wait(100)
        this.actions.flash(Color.White, 100);
        this.wait(100)
    }



    onCollisionStart(event, other) {

        console.log("im colliding")
        if (other.owner instanceof Undead) {
            other.owner.kill
            this.health = this.health - 10
            this.flashOnHit()
            console.log(`my health is ${this.health}`)
        }
    }




}
