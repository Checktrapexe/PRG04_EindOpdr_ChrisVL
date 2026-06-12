import { Actor, Engine, Keys, Vector, DisplayMode, randomIntInRange, Label, Font, FontUnit, Color, Scene } from "excalibur"
import { main } from "./main"



export class start extends Scene {



    onInitialize(engine) {
        const Start = new Label({
            text: `Press Space To Start`,
            pos: new Vector(440, 360),
            font: new Font({ size: 36, unit: FontUnit.Px, color: Color.White })
        })
        this.add(Start)
    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            // Space pressed this frame
            console.log('space pressed — start the game')
            this.engine.goToScene('main')
        }
    }
}