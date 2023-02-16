import { _decorator, Component, Node, Collider2D, Contact2DType, v3, resources, SpriteAtlas, Sprite, SpriteFrame, assetManager } from 'cc';
const { ccclass, property } = _decorator;
let uuidlist: Array<string> = ['acefd', 'e1e7c', 'efb97', '5c515',];
let gamescore: number = 0;
@ccclass('EnemyControl')
export class EnemyControl extends Component {
    @property
    private Speed: number = 400;
    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    update(deltaTime: number) {
        this.node.setWorldPosition(
            v3(this.node.getWorldPosition().x,
                this.node.getWorldPosition().y - this.Speed * deltaTime)
        );

        if (this.node.position.y < -400) {
            this.node.destroy();    // 敌机超出边框，自动销毁
            gamescore--;
            console.log("敌机逃离分数-1 得分：" + gamescore);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        selfCollider.destroy();             // 只销毁碰撞体
        let sprite = this.getComponent(Sprite);
        this.Speed = 0;                     // 死亡动画结束前，停留在原地
        gamescore++;                   // 击毁敌机加分
        let str0, str: string;
        console.log("敌机坠毁   " + "目前得分：" + gamescore);

        // 遍历加载爆炸图片
        for (let i of [0, 1, 2, 3]) {
            setTimeout(() => {
                assetManager.loadAny({ uuid: 'a1d6bcb7-a7f3-466a-a9b9-48cc509f5092@' + uuidlist[i], type: SpriteAtlas }, (err, res) => {
                    sprite.spriteFrame = res;
                })
            }, i * 75);
        }

        // 延时销毁
        setTimeout(() => {
            this.die();
        }, 300);
    }

    die() {
        try {
            this.node.destroy();
        } catch (err) {
            console.log(err);
        }
    }
}