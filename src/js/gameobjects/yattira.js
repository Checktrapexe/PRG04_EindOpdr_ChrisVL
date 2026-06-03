import { Vector, Color, Keys } from "excalibur"
import { Resources } from "../resources.js"
import { Player } from "./player.js"
import { Undead } from "./undead.js"
import { Gameover } from './scenes/gameover.js'
import { Star } from "./items/star.js"

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

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot()
        }

    }

    shoot() {
        const dirMap = {
            idle: new Vector(0, -1),
            up: new Vector(0, -1),
            down: new Vector(0, 1),
            left: new Vector(-1, 0),
            right: new Vector(1, 0),
            upLeft: new Vector(-1, -1),
            upRight: new Vector(1, -1),
            downLeft: new Vector(-1, 1),
            downRight: new Vector(1, 1)
        }
        const rawDir = dirMap[this.currentDirection] || new Vector(0, -1)
        const dir = rawDir.normalize()
        const speed = 800
        const spawnOffset = dir.scale(30)
        let s = new Star(this.pos.x, this.pos.y, this.pos.x + spawnOffset.x, this.pos.y + spawnOffset.y)
        s.vel = dir.scale(speed)
        this.scene.add(s)
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
            if (this.health <= 0) {
                this.scene.engine.goToScene('gameover')
            }
        }
    }




}
