import { Actor, Vector, Keys, ScreenElement, Label, Color, Font } from "excalibur"
import { Resources } from "../resources.js"


export class UI extends ScreenElement {

    constructor() {
        super()
        this.labelOne = null
        this.labelTwo = null
    }

    onInitialize(engine) {

        console.log(`UI loaded`)


        this.labelOne = new Label({
            text: 'HP: 100',
            pos: new Vector(100, 50),
            color: Color.Red,
            font: new Font({ size: 48 })
        })
        this.addChild(this.labelOne)

        this.labelTwo = new Label({
            text: 'Score: 0',
            pos: new Vector(1000, 50),
            color: Color.Black,
            font: new Font({ size: 48 })
        })
        this.addChild(this.labelTwo)
    }

    updateHP(hp) {
        this.labelOne.text = `Hp: ${hp}`
    }

    updateScore(score) {
        this.labelTwo.text = `Score: ${score}`
    }

}

