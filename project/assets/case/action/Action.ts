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
export default class NewClass extends cc.Component {

    @property(cc.Node)
    nodeAction:cc.Node = null

    @property(cc.Node)
    layoutEasing:cc.Node = null

    @property(cc.Node)
    button:cc.Node = null

    onLoad () {
        
    }

    start () {
        var self = this

        let arr = [
            {name:"一次函数\nease",         action:null},
            //由慢到快
            {name:"In",action:cc.easeIn(3.0)},
            //由快到慢
            {name:"Out",action:cc.easeOut(3.0)},
            //慢到快，然后慢
            {name:"InOut",action:cc.easeInOut(3.0)},

            {name:"二次函数\nQuadratic",    action:null},
            //按二次函数缓动进入的动作
            {name:"QuadraticActionIn",action:cc.easeQuadraticActionIn()},
            //按二次函数缓动退出的动作
            {name:"QuadraticActionOut",action:cc.easeQuadraticActionOut()},
            //按二次函数缓动进入并退出的动作
            {name:"QuadraticActionInOut",action:cc.easeQuadraticActionInOut()},

            {name:"三次函数\nCubic",        action:null},
            //按三次函数缓动进入的动作
            {name:"CubicActionIn",action:cc.easeCubicActionIn()},
            //按三次函数缓动退出的动作
            {name:"CubicActionOut",action:cc.easeCubicActionOut()},
            //按三次函数缓动进入并退出的动作
            {name:"CubicActionInOut",action:cc.easeCubicActionInOut()},

            {name:"四次函数\nQuartic",      action:null},
            //按四次函数缓动进入的动作
            {name:"QuarticActionIn",action:cc.easeQuarticActionIn()},
            //按四次函数缓动退出的动作
            {name:"QuarticActionOut",action:cc.easeQuarticActionOut()},
            //按四次函数缓动进入并退出的动作
            {name:"QuarticActionInOut",action:cc.easeQuarticActionInOut()},

            {name:"五次函数\nQuintic",      action:null},
            //按五次函数缓动进入的动作
            {name:"QuinticActionIn",action:cc.easeQuinticActionIn()},
            //按五次函数缓动退出的动作
            {name:"QuinticActionOut",action:cc.easeQuinticActionOut()},
            //按五次函数缓动进入并退出的动作
            {name:"QuinticActionInOut",action:cc.easeQuinticActionInOut()},
           
            {name:"指数函数\nExponential",  action:null},
            //按指数函数缓动进入的动作
            {name:"ExponentialIn",action:cc.easeExponentialIn()},
            //按指数函数缓动退出的动作
            {name:"ExponentialOut",action:cc.easeExponentialOut()},
            //按指数函数缓动进入并退出的动作
            {name:"ExponentialInOut",action:cc.easeExponentialInOut()},
            
            {name:"正选函数\nSine",         action:null},
            //按正弦函数缓动进入的动作
            {name:"SineIn",action:cc.easeSineIn()},
            //按正弦函数缓动退出的动作
            {name:"SineOut",action:cc.easeSineOut()},
            //按正弦函数缓动进入并退出的动作
            {name:"SineInOut",action:cc.easeSineInOut()},
            
            {name:"弹性曲线\nElastic",      action:null},
            //按弹性曲线缓动进入的动作
            {name:"ElasticIn",action:cc.easeElasticIn(3.0)},
            //按弹性曲线缓动退出的动作
            {name:"ElasticOut",action:cc.easeElasticOut(3.0)},
            //按弹性曲线缓动进入并退出的动作
            {name:"ElasticInOut",action:cc.easeElasticInOut(3.0)},
            
            {name:"弹跳跳动\nBounce",       action:null},
            //按弹跳动作缓动进入的动作
            {name:"BounceIn",action:cc.easeBounceIn()},
            //按弹跳动作缓动退出的动作
            {name:"BounceOut",action:cc.easeBounceOut()},
            //按弹跳动作缓动进入并退出的动作
            {name:"BounceInOut",action:cc.easeBounceInOut()},
            
            {name:"圆形曲线\nCircle",       action:null},
            //按圆形曲线缓动进入的动作
            {name:"CircleActionIn",action:cc.easeCircleActionIn()},
            //按圆形曲线缓动退出的动作
            {name:"CircleActionOut",action:cc.easeCircleActionOut()},
            //按圆形曲线缓动进入并退出的动作
            {name:"CircleActionInOut",action:cc.easeCircleActionInOut()},

            {name:"回退惯性\nBack",         action:null},
            //是在相反的方向缓慢移动，然后加速到正确的方向
            {name:"BackIn",action:cc.easeBackIn()},
            //快速移动超出目标，然后慢慢回到目标点
            {name:"BackOut",action:cc.easeBackOut()},
            //缓动对象
            {name:"BackInOut",action:cc.easeBackInOut()},

        ]
        console.log(arr.length)
        //初始化类型
        arr.forEach(element =>{
            let node = cc.instantiate(self.button)
            let name = element.name
            if(element.action){
                // node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = name
                self.layoutEasing.addChild(node)
                node.on(cc.Node.EventType.TOUCH_END,function(){
                    self.runActionSasing(element.action)
                    console.log(`cc.ease${name}()`)
                })
            }else{
                self.addLabel(name)
            }
        })
    }

    addLabel(name:string){
        let node = new cc.Node()
        node.width = 60
        node.height = 80
        let label = node.addComponent(cc.Label) as cc.Label
        label.overflow = cc.Label.Overflow.SHRINK
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER
        label.verticalAlign = cc.Label.VerticalAlign.CENTER
        label.fontSize = 20
        label.string = name
        this.layoutEasing.addChild(node)
    }

    runActionSasing(easing){
        this.nodeAction.stopAllActions()
        let pos1 = cc.v2(-280,-200)
        let pos2 = cc.v2(280,400)
        this.nodeAction.x = Math.round(this.nodeAction.x)
        this.nodeAction.y = Math.round(this.nodeAction.y)
        let pos
        if(this.nodeAction.position.equals(pos1)){
            pos = pos2
        }else if(this.nodeAction.position.equals(pos2)){
            pos = pos1
        }else{
            this.nodeAction.position = pos1
            pos = pos2
        }
        let action = cc.moveTo(0.6,pos).easing(easing)
        this.nodeAction.runAction(action)
    }

}
