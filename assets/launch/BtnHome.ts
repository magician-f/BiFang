// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(String)
    scene: string = ""

    orgY: number
    targetY : number

    onLoad() {
        this.node.parent = null
        cc.game.addPersistRootNode(this.node)
        this.node.on("click",()=>{
            cc.director.loadScene(this.scene)
        })
        this.orgY = cc.winSize.height - this.node.height / 2 - 8
        this.targetY = this.orgY + 8 + this.node.height

        this.node.x = 0 + this.node.width / 2 + 8
        this.node.y = this.targetY
        "asdas".Clamp()
        Math.Random()
    }

    update(dt) {
        if (!this.scene) {
            return
        }
        if (!cc.director.getScene()) {
            return
        }
        if (cc.director.getScene().name == this.scene) {
            //隐藏
            if (this.node.y < this.targetY) {
                this.node.y += 3
            }
        } else {
            //显示
            if (this.node.y > this.orgY) {
                this.node.y -= 3
            }
        }
    }
}

