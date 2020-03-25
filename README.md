# BiFang (毕方)

![](./res/BiFang.jpg)

## 关于
BiFang是专门为Cocos Creator快速开发而生的，专注于组件化的探索。
追求极简的使用方式，对原有系统最小的侵入

同时毕方也在收集Cocos Creator周边插件，项目，以及游戏开发提高效率的相关工具

## 正文

##### 组件-金币动画：[BFCoinAnim.ts](./assets/bf/BFCoinAnim.ts)
![](./res/coinanim.gif)

使用：
```
1.配置
     必须设置金币动画的纹理：
         1. BFCoinAnim.SetCoinTexture(cc.SpriteFrame)
         2. BFCoinAnim.SetCoinResources(string) //动态加载纹理，传入路径
     其它设置：(非必填)
         1.SetAnimCountMax(number)
         2.setAnimRotate(boolean)
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
### Cocos Creator 学习资源
+ 插件
  + [查找资源引用插件](https://forum.cocos.org/t/topic/90565)
  + [场景编辑器右键菜单插件](https://github.com/caogtaa/CCSceneMenu/tree/master)  ![](https://img.shields.io/badge/v2.2.2-lightgrey.svg)
+ 项目
  + [贝塞尔路径编辑器](https://github.com/csdjk/BezierCurvePathCreater) ![](https://img.shields.io/badge/v2.2.2-lightgrey.svg)
  + [Shader Effect Demo](https://github.com/zhitaocai/CocosCreatorShaderEffectDemo) ![](https://img.shields.io/badge/v2.2.1-lightgrey.svg)
  + [模仿微博下拉刷新控件](https://github.com/baiguo/cocos-pull-to-refresh)
+ 工具
  + [TypeScript脚本解释器，微信热更新方案](https://gitee.com/jianyumofa/qyscript)
  + [字蛛是一个中文字体压缩器](http://font-spider.org/)

  
