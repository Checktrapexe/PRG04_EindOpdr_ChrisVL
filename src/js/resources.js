import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Background } from './gameobjects/background'

// voeg hier jouw eigen resources toe
const Resources = {
    Yattira: new ImageSource('images/yattira/yattira_temp.png'),
    Background: new ImageSource('images/background/backtemp.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }