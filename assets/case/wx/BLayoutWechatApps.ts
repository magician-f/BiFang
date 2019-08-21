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
export default class BLayoutWechatApps extends cc.Component {

    @property(cc.Node)
    itemTemplate: cc.Node = null;

    @property(cc.Node)
    layoutContainer: cc.Node = null;

    @property([cc.String])
    names:string[] = []

    @property([cc.SpriteFrame])
    icons:cc.SpriteFrame[] = []

    @property([cc.SpriteFrame])
    appids:cc.SpriteFrame[] = []

    onLoad () {
        this.itemTemplate.parent = null
        this.initView(this.layoutContainer,this.itemTemplate,this.names,this.icons)
        //重新裁剪尺寸
        let childrenCount = this.layoutContainer.childrenCount
        if(childrenCount<5){
            this.layoutContainer.width = (this.itemTemplate.width+10)*childrenCount + 10
            
        }
        if(this.node.width > this.layoutContainer.width){
            this.node.width = this.layoutContainer.width
            this.layoutContainer.x = -this.node.width/2
        }else{
            //播放动画
            let width = this.layoutContainer.width - this.node.width
            let a1 = cc.moveBy(width/100,-width,0)
            let a2 = cc.delayTime(0.2)
            let a3 = cc.moveBy(width/100,width,0)
            let a4 = cc.delayTime(0.2)
            let spawn = cc.sequence(a1,a2,a3,a4).repeatForever()
            this.layoutContainer.runAction(spawn)
        }
    }

    initView(layout:cc.Node,item:cc.Node,names:string[],icons:cc.SpriteFrame[]){
        for(let i=0;i<names.length;i++){
            if(i >= icons.length){
                return
            }
            let node = cc.instantiate(item)
            layout.addChild(node)
            cc.find("MaskIcon/ImgIcon",node).getComponent(cc.Sprite).spriteFrame = icons[i]
            node.getChildByName("Name").getComponent(cc.Label).string = names[i]
        }
    }

    onClickItem(){
        //跳转到微信小游戏
        
        // window["wx"] && window["wx"].navigateToMiniProgram({
        //     appId: this.appid,
        //     path: '',
        //     extraData: {
        //     },
        //     envVersion: 'release',
        //     success(res) {
        //       // 打开成功
        //     }
        //   })
    }

    update (dt) {

    }
}
