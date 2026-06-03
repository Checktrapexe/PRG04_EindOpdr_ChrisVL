import { Actor, Vector, Keys } from "excalibur"
import { Resources } from "../resources.js"
import { Player } from "./player.js"

export class Yattira extends Player {
    constructor(x, y) {
        super({ x, y, width: Resources.Yattira.width, height: Resources.Yattira.height })

    }

    onInitialize() {
        this.graphics.use(Resources.Yattira.toSprite())
        //this.scale = new Vector(4, 4)

    }
    //onPostUpdate(engine) {

    // }

}