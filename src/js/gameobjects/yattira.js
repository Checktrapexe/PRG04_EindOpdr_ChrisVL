import { Vector, Color, Keys, CollisionType, Rectangle } from "excalibur"
import { Resources } from "../resources.js"
import { Player } from "./player.js"
import { Slime } from "./slime.js"
import { Gameover } from './scenes/gameover.js'
import { Star } from "./items/star.js"





const PLAYER_HITBOX_SCALE = 1
const ammo = 20
const DirectionSprites = {
    idle: Resources.YattiraIdle,
    up: Resources.YattiraUp,
    down: Resources.YattiraDown,
    left: Resources.YattiraLeft,
    right: Resources.YattiraRight,
    upLeft: Resources.YattiraUpLeft,
    upRight: Resources.YattiraUpRight,
    downLeft: Resources.YattiraDownLeft,
    downRight: Resources.YattiraDownRight
}

export class Yattira extends Player {
    constructor(x, y) {
        const width = Resources.YattiraIdle.width * PLAYER_HITBOX_SCALE
        const height = Resources.YattiraIdle.height * PLAYER_HITBOX_SCALE
        super({ x, y, width, height })
        this.sprites = DirectionSprites
        this.currentDirection = "idle"
        this._gifScale = PLAYER_HITBOX_SCALE
        this.scale = new Vector(this._gifScale, this._gifScale)
        this.ammo = ammo
    }

    onInitialize(engine) {
        this.graphics.use(this.sprites.idle.toSprite())
        this.body.collisionType = CollisionType.Active

        // Create DOM overlay images so animated GIFs play in the browser
        try {
            const canvas = engine.canvas
            this._domContainer = document.createElement('div')
            this._domContainer.style.position = 'absolute'
            this._domContainer.style.left = '0'
            this._domContainer.style.top = '0'
            this._domContainer.style.width = '100%'
            this._domContainer.style.height = '100%'
            this._domContainer.style.pointerEvents = 'none'
            this._domContainer.style.zIndex = 999
            // attach overlay to same parent as canvas so it aligns
            const parent = canvas && canvas.parentElement ? canvas.parentElement : document.body
            parent.appendChild(this._domContainer)

            this._domImages = {}
            for (const [dir, imgSrc] of Object.entries(this.sprites)) {
                const img = document.createElement('img')
                img.src = imgSrc.path || (imgSrc.data && imgSrc.data.src) || imgSrc
                img.style.position = 'absolute'
                img.style.transform = 'translate(-50%,-50%)'
                img.style.pointerEvents = 'none'
                img.style.display = 'none'
                this._domContainer.appendChild(img)
                this._domImages[dir] = img
            }
        } catch (e) {
            console.warn('Failed creating DOM overlay for GIFs', e)
        }

    }

    onPostUpdate(engine) {
        super.onPostUpdate(engine)
        this.updateDirectionSprite()

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot()
        }

    }

    shoot() {
        if (this.ammo > 0) {
            const dirMap = {
                idle: new Vector(0, -1),
                up: new Vector(0, -1),
                down: new Vector(0, 1),
                left: new Vector(-1, 0),
                right: new Vector(1, 0),
                upLeft: new Vector(-1, -1),
                upRight: new Vector(1, -1),
                downLeft: new Vector(-1, 1),
                downRight: new Vector(1, 1)
            }
            const rawDir = dirMap[this.currentDirection] || new Vector(0, -1)
            const dir = rawDir.normalize()
            const speed = 800
            const spawnOffset = dir.scale(30)
            let s = new Star(this.pos.x, this.pos.y, this.pos.x + spawnOffset.x, this.pos.y + spawnOffset.y)
            s.vel = dir.scale(speed)
            this.ammo = this.ammo - 1
            this.scene.add(s)
        }
    }

    updateDirectionSprite() {
        const dx = Math.sign(this.vel.x)
        const dy = Math.sign(this.vel.y)
        let direction = "idle"
        //dx = direction on x
        //dy = direstion on y 
        if (dx === 0 && dy === -1) direction = "up"
        else if (dx === 0 && dy === 1) direction = "down"
        else if (dx === -1 && dy === 0) direction = "left"
        else if (dx === 1 && dy === 0) direction = "right"
        else if (dx === -1 && dy === -1) direction = "upLeft"
        else if (dx === 1 && dy === -1) direction = "upRight"
        else if (dx === -1 && dy === 1) direction = "downLeft"
        else if (dx === 1 && dy === 1) direction = "downRight"

        if (direction !== this.currentDirection) {
            this.currentDirection = direction
            this.graphics.use(this.sprites[direction].toSprite())
            this.scale = new Vector(this._gifScale, this._gifScale)
        }
        this._updateDomOverlay()
    }

    _updateDomOverlay() {
        if (!this._domImages || !this.scene || !this.scene.engine) return
        const engine = this.scene.engine
        const canvas = engine.canvas
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const cam = this.scene.camera || engine.camera
        const scaleX = rect.width / 1280
        const scaleY = rect.height / 720

        let showingAny = false
        // If overlay is suppressed (e.g., during flash), keep DOM GIFs hidden
        if (this._suppressDomOverlay) {
            for (const img of Object.values(this._domImages)) {
                img.style.display = 'none'
            }
            showingAny = false
        } else {
            for (const [dir, img] of Object.entries(this._domImages)) {
                const shouldShow = dir === this.currentDirection
                img.style.display = shouldShow ? 'block' : 'none'
                if (shouldShow) {
                    showingAny = true
                    const overlayScale = this._gifScale || 1
                    const imgW = (this.width || (this.sprites.idle.width || 64)) * scaleX * overlayScale
                    const imgH = (this.height || (this.sprites.idle.height || 64)) * scaleY * overlayScale
                    img.style.width = imgW + 'px'
                    img.style.height = imgH + 'px'
                    const screenX = rect.left + rect.width / 2 + (this.pos.x - (cam.pos?.x || 0)) * scaleX
                    const screenY = rect.top + rect.height / 2 + (this.pos.y - (cam.pos?.y || 0)) * scaleY
                    img.style.left = screenX + 'px'
                    img.style.top = screenY + 'px'
                }
            }
        }

        // Hide the canvas-drawn sprite when the GIF overlay is visible
        try {
            // Swap the canvas-drawn graphic with a transparent rectangle while GIF overlay is visible.
            if (showingAny) {
                if (!this._savedGraphic) {
                    this._savedGraphic = this.graphics?.current || null
                }
                if (!this._blankGraphic) {
                    const scaledWidth = (this.width || 32) * (this._gifScale || 1)
                    const scaledHeight = (this.height || 32) * (this._gifScale || 1)
                    this._blankGraphic = new Rectangle({ width: scaledWidth, height: scaledHeight, color: Color.Transparent })
                }
                this.graphics.use(this._blankGraphic)
            } else {
                if (this._savedGraphic) {
                    try {
                        this.graphics.use(this._savedGraphic)
                        this.scale = new Vector(this._gifScale, this._gifScale)
                    } catch (e) {
                        // fallback: restore visibility
                        this.isVisible = true
                    }
                    this._savedGraphic = null
                }
            }
        } catch (e) {
            // ignore
        }
    }



    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async flashOnHit() {
        // Temporarily suppress DOM GIF overlay and show canvas actor for flashing
        const prevDomDisplay = {}
        if (this._domImages) {
            for (const [dir, img] of Object.entries(this._domImages)) {
                prevDomDisplay[dir] = img.style.display
            }
        }
        const prevVisible = this.isVisible
        this._suppressDomOverlay = true
        try {
            this.isVisible = true
            // flash several times with pauses
            for (let i = 0; i < 5; i++) {
                this.actions.flash(Color.White, 100)
                await this.wait(100)
            }
        } finally {
            // restore DOM overlay and visibility
            this._suppressDomOverlay = false
            if (this._domImages) {
                for (const [dir, img] of Object.entries(this._domImages)) {
                    img.style.display = prevDomDisplay[dir] || 'none'
                }
            }
            this.isVisible = prevVisible
        }
    }

    cleanupDomOverlay() {
        if (this._domContainer && this._domContainer.parentElement) {
            this._domContainer.parentElement.removeChild(this._domContainer)
        }
        this._domContainer = null
        this._domImages = null
    }

    onCollisionStart(event, other) {

        console.log("im colliding")

        if (other.owner instanceof Slime) {
            other.owner.kill
            this.health = this.health - 10
            this.scene.ui.updateHP(this.health)
            this.flashOnHit()
            console.log(`my health is ${this.health}`)
            if (this.health <= 0) {
                this.cleanupDomOverlay()
                this.kill()
                this.scene.engine.goToScene('gameover')
            }
        }


    }






}
