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
export default class Box2d extends cc.Component {

    @property(cc.Node)
    //初始化地图
    layoutMap: cc.Node = null

    @property([cc.Prefab])
    prefabBlocks: cc.Prefab[] = []

    start() {
        // this.block.parent = null
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 20; y++) {
                let node = cc.instantiate(this.prefabBlocks[0])
                // console.log(node.getComponent(cc.RigidBody))
                // console.log(node.getComponent(cc.PhysicsBoxCollider))
                let rigid = node.getComponent(cc.RigidBody) as cc.RigidBody
                this.layoutMap.addChild(node)
                if(x%5 == 0){
                    continue
                }
                node.x = (x + 0.5) * 60
                node.y = (y + 0.5) * 30
            }
        }
    }


}
