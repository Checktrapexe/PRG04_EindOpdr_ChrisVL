import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Background } from './gameobjects/background'

// voeg hier jouw eigen resources toe
const Resources = {
    YattiraIdle: new ImageSource('images/yattira/idle/yattira_idle.svg'),
    YattiraUp: new ImageSource('images/yattira/up/yattira_up.svg'),
    YattiraDown: new ImageSource('images/yattira/down/yattira_down.svg'),
    YattiraLeft: new ImageSource('images/yattira/left/yattira_left.svg'),
    YattiraRight: new ImageSource('images/yattira/right/yattira_right.svg'),
    YattiraUpLeft: new ImageSource('images/yattira/upLeft/yattira_upLeft.svg'),
    YattiraUpRight: new ImageSource('images/yattira/upRight/yattira_upRight.svg'),
    YattiraDownLeft: new ImageSource('images/yattira/downLeft/yattira_downLeft.svg'),
    YattiraDownRight: new ImageSource('images/yattira/downRight/yattira_downRight.svg'),
    Background: new ImageSource('images/background/backtemp.png')
}



const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }