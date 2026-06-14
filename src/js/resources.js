import { Gif, ImageSource, Sound, Resource, Loader, SpriteSheet, Sprite } from 'excalibur'
import { Background } from './gameobjects/background'
import { Enemy } from './gameobjects/enemy'

// voeg hier jouw eigen resources toe
const Resources = {
    Slime: new ImageSource('images/enemy/slime/slime.gif'),
    SlimeFast: new ImageSource('images/enemy/fastSlime/slime_2.gif'),
    Background: new ImageSource('images/background/snowy_background.png'),
    Wall: new ImageSource('images/background/wall.png'),
    Wall2: new ImageSource('images/background/wall2.png'),
    YattiraIdle: new ImageSource('images/yattira/idle/yattira_idle.gif'),
    YattiraUp: new ImageSource('images/yattira/up/Yattira_up.gif'),
    YattiraDown: new ImageSource('images/yattira/down/Yattira_down.gif'),
    YattiraLeft: new ImageSource('images/yattira/left/Yattira_left.gif'),
    YattiraRight: new ImageSource('images/yattira/right/Yattira_right.gif'),
    YattiraUpLeft: new ImageSource('images/yattira/upLeft/Yattira_up_left.gif'),
    YattiraUpRight: new ImageSource('images/yattira/upRight/Yattira_up_right.gif'),
    YattiraDownLeft: new ImageSource('images/yattira/downLeft/Yattira_down_left.gif'),
    YattiraDownRight: new ImageSource('images/yattira/downRight/Yattira_down_right.gif'),
    Star: new ImageSource('images/items/star/star1.gif'),
    ammo: new ImageSource('images/items/ammo/star2.gif')
}



const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }