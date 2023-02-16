import { _decorator, Component, Node, v3, Collider2D, ICollisionEvent, Contact2DType } from 'cc';
import { EnemyControl } from './EnemyControl';
import { PlayerControl } from './PlayerControl';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {
    @property
    private Speed:number = 800;
    
    start() {        
        let coll = this.node.getComponent(Collider2D);
        coll.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        
    }
    

    update(deltaTime: number) { 
        this.node.setWorldPosition(
            v3(this.node.getWorldPosition().x,
            this.node.getWorldPosition().y + this.Speed * deltaTime)
            );
            
        if (this.node.position.y > 820) {
            this.node.destroy();    // 子弹超出边框，自动销毁
        }

    }
    // 碰到敌人子弹销毁
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        // selfCollider.destroy();
        this.node.destroy()
        // otherCollider.getComponent(EnemyControl).onBeginContact;
        // console.log("击中敌机，子弹销毁");
        
        
    }

}


