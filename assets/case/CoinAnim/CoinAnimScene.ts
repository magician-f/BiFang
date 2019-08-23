import BFActionMore from "../../bf/BFActionMore";

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
export default class CoinAnimScene extends cc.Component {

    @property(cc.SpriteFrame)
    coinTexture: cc.SpriteFrame = null

    @property(cc.Node)
    endNode: cc.Node = null

    onLoad() {
        //初始化
        this.node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            let config = BFActionMore.CloneConfig()
            BFActionMore.Run(50,event.getLocation(), this.endNode,null)
        }.bind(this))
    }

}
