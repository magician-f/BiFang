# Creator 快速开发组件：BFCoinAnim
## 
## 本期介绍的组件是：BFCoinAnim
金币增加的动画在很多项目中都是常见的需求，作者文章写的不好，直接看动图演示效果。
使用步骤步骤非常简单：
</br>
1.把 BFCoinAnim.ts复制放到你的项目目录中
</br>
2.设置动画的纹理：
```
BFCoinAnim.SetCoinTexture(cc.SpriteFrame)
```
</br>
3.在需要播放动画的时候调用

```
cc.game.emit("bf-coin-add-anim",start: cc.Vec2 | cc.Node,end: cc.Vec2 | cc.Node,count)
```
</br>

![](./coinanim.gif)

完整的使用API：
```
1.配置
     必须设置金币动画的纹理：
         1. BFCoinAnim.SetCoinTexture(cc.SpriteFrame)
         2. BFCoinAnim.SetCoinResources(string) //动态加载纹理，传入路径
     其它设置：(非必填)
         1.SetAnimCountMax(number)
         2.SetAnimRotate(boolean)
2.调用
     方法1：
         new BFCoinAnim().ReadPlay(start: cc.Vec2 | cc.Node,end: cc.Vec2 | cc.Node,count)
     方法2：(推荐)
         cc.game.emit("bf-coin-add-anim",start: cc.Vec2 | cc.Node,end: cc.Vec2 | cc.Node,count)
```
用例：
```
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
        this.node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            //方法1
            new BFCoinAnim().ReadPlay(event.getLocation(), this.endNode, 30)
            //方法2
            // cc.game.emit("bf-coin-add-anim", event.getLocation(), this.endNode, 30)
        }.bind(this))
    }

}
```

## 关于 [BiFang](https://github.com/KnifeStone/BiFang)
BiFang是专门为Cocos Creator快速开发而生的，专注于组件化的探索。
追求极简的使用方式，对原有系统最小的侵入

[https://github.com/KnifeStone/BiFang](https://github.com/KnifeStone/BiFang)
