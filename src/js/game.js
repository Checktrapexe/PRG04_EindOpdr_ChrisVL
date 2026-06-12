import '../css/style.css'
import { Engine, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Yattira } from './gameobjects/yattira.js'
import { Background } from './gameobjects/background.js'
import { Slime } from './gameobjects/slime.js'
import { Gameover } from './gameobjects/scenes/gameover.js'
import { start } from './gameobjects/scenes/start.js'
import { main } from './gameobjects/scenes/main.js'

export class Game extends Engine {

    score = 0

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade

            }
        })
        this.start(ResourceLoader).then(() => this.startGame())





    }

    startGame() {



        this.add('start', new start())
        this.add('main', new main())
        this.add('gameover', new Gameover())

        this.goToScene('start')



    }






}
new Game()
