
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const ToItem = function(name,scene){
    return {
        name:name,
        scene:scene
    }
}
const {ccclass, property} = cc._decorator;
@ccclass
export default class Launch extends cc.Component {

    @property(cc.Node)
    nodeContainer: cc.Node = null

    @property(cc.Node)
    btnTemplate: cc.Node = null

    onLoad () {
        this.btnTemplate.parent = null
        let arr = [
            ToItem("CoinAction","CoinAction"),
            ToItem("Action","Action"),
            ToItem("Physics","Physics"),
        ]
        for(let i=0;i<arr.length;i++){
            let bean = arr[i]
            let btnTemplate = cc.instantiate(this.btnTemplate)
            this.nodeContainer.addChild(btnTemplate)
            btnTemplate.name = bean["scene"]
            cc.find("Background/Label",btnTemplate).getComponent(cc.Label).string = bean["name"]
        }
    }

    clickTemplate(event){
        let name = event.target.name
        cc.director.loadScene(name)
    }

}
