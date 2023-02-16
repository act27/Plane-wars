import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    start() {
        
    }

    update(deltaTime: number) {
        for(let bgNode of this.node.children){
            bgNode.setPosition(bgNode.position.x,bgNode.position.y -50 * deltaTime);
            if(bgNode.getPosition().y < - 850){
                bgNode.setPosition(bgNode.position.x,bgNode.position.y +850 * 2);

            }
        }
    }
}


