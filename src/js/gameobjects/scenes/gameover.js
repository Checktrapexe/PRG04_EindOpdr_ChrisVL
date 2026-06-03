import { Actor, Engine, Vector, DisplayMode, randomIntInRange, Scene } from "excalibur"



export class Gameover extends Scene {



    onInitialize(engine) {


    }

    onActivate(ctx) {
        console.log("---------------------------")
        console.log("Game Over")
        console.log("---------------------------")
    }

}