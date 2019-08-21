import BFCoinAnim from "../../bf/BFCoinAnim";

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
        BFCoinAnim.SetCoinTexture(this.coinTexture)
        BFCoinAnim.SetAnimRotate(true)
        this.node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            //方法1
            new BFCoinAnim().ReadPlay(event.getLocation(), this.endNode, 30)
            //方法2
            // cc.game.emit("bf-coin-add-anim", event.getLocation(), this.endNode, 30)
        }.bind(this))
    }

}
