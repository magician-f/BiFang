import BFActionMore, { Action70, ActionRound } from "./BFActionMore";

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
            switch(Math.floor(Math.random()*3)){
                case 1:
                    config.Action = new ActionRound()
                break;
                case 2:
                    config.Action = new Action70()
                break;
            }
            BFActionMore.Run(30,event.getLocation(), this.endNode,{
                progressFunc:(progress,count)=>{
                console.log("progress",progress,count)
            },
                finishFunc:()=>{
                console.log("finishFunc")
            },
                config:config
            })
        }.bind(this))
    }

}
