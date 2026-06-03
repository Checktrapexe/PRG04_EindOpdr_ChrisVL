import { Actor, Vector, Keys } from "excalibur"
import { Resources } from "../resources.js"


export class Player extends Actor {

    constructor(x, y) {
        super(x, y)
        this.health = 100
        this.speed = 350
        console.log("Player_Spawn")
    }

    onInitialize(engine) {
        this.health = 100
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        //this.vel = new Vector()
    }

    onPreUpdate(engine) {


        if (this.health <= 0) {


        }
    }

    onPostUpdate(engine) {
        super.onPostUpdate(engine)

        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -this.speed
        }


        if (engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = this.speed
        }


        if (engine.input.keyboard.isHeld(Keys.W)) {
            yspeed = -this.speed
        }


        if (engine.input.keyboard.isHeld(Keys.S)) {
            yspeed = this.speed
        }


        this.vel = new Vector(xspeed, yspeed)

        if (engine.input.keyboard.wasPressed(Keys.Space)) {

        }


    }

}