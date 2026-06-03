import { Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Enemy } from "./enemy.js"

export class Undead extends Enemy {
    constructor() {
        super({ width: Resources.EnemyIdle.width, height: Resources.EnemyIdle.height })
        this.chaseSpeed = 80
    }

    onInitialize(engine) {
        this.graphics.use(Resources.EnemyIdle.toSprite())
        this.pos = new Vector(100, 100)
        this.vel = new Vector(0, 0)
    }

    onPreUpdate(engine) {
        const target = engine.player
        if (!target) {
            return
        }

        const direction = target.pos.sub(this.pos)
        const distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
        if (distance > 10) {
            this.vel = direction.normalize().scale(this.chaseSpeed)
        } else {
            this.vel = new Vector(0, 0)
        }
    }
}
