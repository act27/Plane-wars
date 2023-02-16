import { _decorator, Component, Node, Prefab, instantiate, director, Collider2D, ICollisionEvent, Contact2DType } from 'cc';
import { EnemyControl } from './EnemyControl';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Prefab)
    bulletPer: Prefab = null;
    @property(Prefab)
    enemyPer: Prefab = null;
    private bulletspeed: number = 0.5;

    start() {
        let bpos = this.node.position;
        let by: number;
        this.node.on(Node.EventType.TOUCH_MOVE, (event) => {
            let p = event.getUILocation()
            this.node.setWorldPosition(p.x, p.y, 0);
        });

        for (let i of [-1, 0, 1]) {     // 遍历生成子弹
            this.schedule(() => {       // 攻击 计时器
                let bullet: Node = instantiate(this.bulletPer); // 创建子弹
                bullet.parent = this.node.parent;               // 设置父物体
                bullet.setPosition(                             // 设置子弹位置
                    bpos.x + 35 * i,
                    bpos.y + 100 - 25 * Math.abs(i)
                );
            }, this.bulletspeed);
        }

        this.schedule(() => {
            let enemyPer: Node = instantiate(this.enemyPer);
            let num = 175 * Math.random() + 1
            let xpos: number = Math.floor(num);
            let ypos: number = 420 - 100 * Math.random();
            if (Math.random() > 0.5 && xpos) {
                xpos = -xpos
            }
            enemyPer.parent = this.node.parent;
            enemyPer.setPosition(xpos, ypos);
        }, 0.5)

        // 开启碰撞检测功能
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }
    onBeginContact<BulletControl extends Component>(BEGIN_CONTACT: string, onBeginConcat: any, arg2: this) {
        console.log("我被击中了！");
        this.node.destroy();
    }

    update(deltaTime: number) {
    }
}