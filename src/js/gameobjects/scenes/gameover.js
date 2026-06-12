import { Scene, Actor, Vector, Font, FontUnit, Color, Label } from "excalibur"



export class Gameover extends Scene {



    onInitialize(engine) {


    }

    onActivate(ctx) {
        const finalScore = this.engine.score
        const scoreLabel = new Label({
            text: `Score: ${finalScore}`,
            pos: new Vector(540, 360),
            font: new Font({ size: 36, unit: FontUnit.Px, color: Color.White })
        })
        this.add(scoreLabel)
    }
}