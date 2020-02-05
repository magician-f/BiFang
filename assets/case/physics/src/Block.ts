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
export default class Block extends cc.Component {

    @property(cc.Prefab)
    prefabClearParticle: cc.Prefab = null;

    /**
    * 只在两个碰撞体开始接触时被调用一次
    */
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "Ball") {
            let node = cc.instantiate(this.prefabClearParticle)
            this.node.parent.addChild(node)
            node.position = this.node.position
            this.node.destroy()
        }
        // cc.log("onBeginContact", otherCollider.node.name);
    }

}
