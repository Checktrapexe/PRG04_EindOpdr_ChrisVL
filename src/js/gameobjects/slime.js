import { Vector, CollisionType, } from "excalibur"
import { Resources } from "../resources.js"
import { Enemy } from "./enemy.js"

export class Slime extends Enemy {
    constructor() {
        super({ width: Resources.Slime.width - 80, height: Resources.Slime.height - 90, offset: new Vector(0, -20) })
        this.chaseSpeed = 80
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Slime.toSprite())

        // Spawn around player, outside view
        const target = engine.player || (this.scene && this.scene.player)
        if (target) {
            // Random angle 0-360 degrees
            const angle = Math.random() * Math.PI * 2
            const spawnDistance = 800 // pixels away from player

            this.pos = new Vector(
                target.pos.x + Math.cos(angle) * spawnDistance,
                target.pos.y + Math.sin(angle) * spawnDistance
            )
        } else {
            // Fallback if no player yet
            this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        }

        this.vel = new Vector(0, 0)
        this.body.collisionType = CollisionType.Active
    }

    onPreUpdate(engine) {
        const target = engine.player || (this.scene && this.scene.player)
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
