import { Actor, Vector, Keys } from "excalibur"
import { Resources } from "../resources.js"


export class Enemy extends Actor {

    constructor(x, y) {
        super(x, y)
        this.health = 100
        this.speed = 250
        console.log("Enemy_Spawn")
    }

    onInitialize(engine) {
        this.health = 100
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)

    }

    onPreUpdate(engine) {


        if (this.health <= 0) {


        }
    }

    onPostUpdate(engine) {



    }

}