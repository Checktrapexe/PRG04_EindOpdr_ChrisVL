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
        // scores from localStorage
        const scores = JSON.parse(localStorage.getItem('scores') || '[]')
        const recent = scores.slice(-5).reverse()
        if (recent.length === 0) {
            const none = new Label({
                text: `No previous scores`,
                pos: new Vector(440, 420),
                font: new Font({ size: 20, unit: FontUnit.Px, color: Color.White })
            })
            this.add(none)
        } else {
            const header = new Label({
                text: `Previous Scores:`,
                pos: new Vector(300, 400),
                font: new Font({ size: 22, unit: FontUnit.Px, color: Color.White })
            })
            this.add(header)
            recent.forEach((s, i) => {
                const lbl = new Label({
                    text: `${i + 1}. ${s}`,
                    pos: new Vector(300, 430 + i * 28),
                    font: new Font({ size: 20, unit: FontUnit.Px, color: Color.White })
                })
                this.add(lbl)
            })
        }
    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            // Space pressed this frame
            console.log('space pressed — start the game')
            this.engine.goToScene('main')
        }
    }
}