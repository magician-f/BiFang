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

@ccclass
export default class BLayoutWechatApp extends cc.Component {

    @property(cc.Node)
    itemTemplate: cc.Node = null;

    @property(cc.Node)
    layoutContainer: cc.Node = null;

    @property(cc.JsonAsset)
    json:cc.JsonAsset = null

    @property
    resourcesFolder:string = ""

    onLoad () {
        this.itemTemplate.parent = null
        this.initView(this.layoutContainer,this.itemTemplate,this.json.json)
        //重新裁剪尺寸
        let childrenCount = this.layoutContainer.childrenCount
        this.layoutContainer.width = this.itemTemplate.width*childrenCount + 20
        if(this.node.width > this.layoutContainer.width){
            this.node.width = this.layoutContainer.width
            this.layoutContainer.x = -this.node.width/2
        }else{
            this.layoutContainer.x = -this.node.width/2
            //播放动画
            let width = this.layoutContainer.width - this.node.width
            let a1 = cc.moveBy(width/50,-width,0).easing(cc.easeBackOut())
            let a2 = cc.delayTime(0.8)
            let a3 = cc.moveBy(width/50,width,0).easing(cc.easeBackOut())
            let a4 = cc.delayTime(0.8)
            let spawn = cc.sequence(a1,a2,a3,a4).repeatForever()
            this.layoutContainer.runAction(spawn)
        }
    }

    initView(layout:cc.Node,item:cc.Node,arr:string[]){
        for(let i=0;i<arr.length;i++){
            let bean = arr[i]
            let node = cc.instantiate(item)
            layout.addChild(node)
            node.on("click",this.onClickItem)
            node.getChildByName("Name").getComponent(cc.Label).string = ``
            node.name = bean["appid"]
            cc.loader.loadRes(`${this.resourcesFolder}/${bean["appid"]}`,cc.SpriteFrame,(err,res)=>{
                !err && (cc.find("MaskIcon/ImgIcon",node).getComponent(cc.Sprite).spriteFrame = res )
                node.getChildByName("Name").getComponent(cc.Label).string = bean["name"]
            })
        }
    }

    onClickItem(event){
        let appid = event.node.name
        //跳转到微信小游戏
        window["wx"] && window["wx"].navigateToMiniProgram({
            appId: appid,
            path: '',
            extraData: {
            },
            envVersion: 'release',
            success(res) {
              // 打开成功
            }
        })
    }

    update (dt) {

    }
}
