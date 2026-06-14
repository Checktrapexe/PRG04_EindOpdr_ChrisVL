import { Scene, Actor, Keys, Vector, Font, FontUnit, Color, Label } from "excalibur"




export class Gameover extends Scene {

    onInitialize(engine) {

    }

    onActivate(ctx) {
        const finalScore = this.engine.score

        const scores = JSON.parse(localStorage.getItem('scores') || '[]')
        scores.push(finalScore)
        localStorage.setItem('scores', JSON.stringify(scores))

        const scoreLabel = new Label({
            text: `Score: ${finalScore}`,
            pos: new Vector(540, 460),
            font: new Font({ size: 36, unit: FontUnit.Px, color: Color.White })
        })
        this.add(scoreLabel)


    }





}