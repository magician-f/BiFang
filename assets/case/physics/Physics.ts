// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
let count = 1
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ball: cc.Node = null;

    start () {
        this.schedule(()=>{
            if(count>100){
                return
            }
            let n = cc.instantiate(this.ball)
            n.parent = this.ball.parent
            count ++
            console.log(count)
        },0.01,cc.macro.REPEAT_FOREVER,1)
    }
}
