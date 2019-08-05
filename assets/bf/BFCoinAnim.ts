/**
 * 金币添加动画事件监听
 * @author  磨刀石 https://github.com/KnifeStone
 * @date    2019.08.05
 * 
 * 使用：
 * 1.配置
 *      必须设置金币动画的纹理：
 *          1. BFCoinAnim.SetCoinTexture(cc.SpriteFrame)
 *          2. BFCoinAnim.SetCoinResources(string) //动态加载路径
 *      其它设置：(非必填)
 *          1.SetAnimCountMax(number)
 *          2.setAnimRotate(boolean)
 * 2.调用
 *      方法1：
 *          new BFCoinAnim().ReadPlay(start: cc.Vec2 | cc.Node,end: cc.Vec2 | cc.Node,count)
 *      方法2：(推荐)
 *          cc.game.emit("bf-coin-add-anim",start: cc.Vec2 | cc.Node,end: cc.Vec2 | cc.Node,count)
 */
export default class BFCoinAnim {

    //=========== 配置 ===========

    //金币纹理 ！必须设置纹理，否则无法正常使用
    private static coinTexture: cc.SpriteFrame = null
    //金币宽高 不设置就用贴图宽高
    private static coinSize: cc.Vec2 = cc.Vec2.ONE
    //最大动画数
    private static animCountMax: number = 999
    //是否开启旋转
    private static animRotate: boolean = false

    //直接设置纹理
    static SetCoinTexture(coinTexture: cc.SpriteFrame) {
        this.coinTexture = coinTexture
        this.coinSize.x = this.coinTexture.getRect().width
        this.coinSize.y = this.coinTexture.getRect().height
    }

    //动态加载
    static SetCoinResources(path: string) {
        cc.loader.loadRes(path, cc.SpriteFrame, (error: Error, res: cc.SpriteFrame) => {
            if (error) {
                console.log("SetCoinPath:加载纹理有误:" + path)
            } else {
                this.coinTexture = res
                this.coinSize.x = this.coinTexture.getRect().width
                this.coinSize.y = this.coinTexture.getRect().height
            }
        })
    }

    //动画最大数量
    static SetAnimCountMax(animCountMax: number) {
        this.animCountMax = animCountMax
    }

    //动画是否旋转
    static SetAnimRotate(animRotate: boolean) {
        this.animRotate = animRotate
    }

    //=========== 使用 ===========

    /**
    * 方法1
    * @param   start 动画开始的节点或位置 cc.Node 或 cc.Vec2 (世界坐标
    * @param   end   动画结束的节点或位置 cc.Node 或 cc.Vec2 (世界坐标
    * @param   count 参与的动画数量
    */
    ReadPlay(start: cc.Vec2 | cc.Node, end: cc.Vec2 | cc.Node, count: number) {
        let startPos, endPos
        if (start instanceof cc.Node) {
            //节点转世界坐标
            startPos = start.convertToWorldSpaceAR(cc.Vec2.ONE)
        } else if (start instanceof cc.Vec2) {
            //世界坐标
            startPos = start
        }
        if (end instanceof cc.Node) {
            endPos = end.convertToWorldSpaceAR(cc.Vec2.ONE)
        } else if (end instanceof cc.Vec2) {
            endPos = end
        }
        if (startPos && endPos && count) {
            this.play(startPos, endPos, count)
        } else {
            console.error("事件 bf-coin-add-anim 参数有误")
        }
    }

    //=========== 细节 ===========

    //开始
    private play(startPos: cc.Vec2, endPos: cc.Vec2, count: number) {
        // console.log("startPos", startPos, "endPos", endPos, "count", count)
        if (count > BFCoinAnim.animCountMax) {
            count = BFCoinAnim.animCountMax
        }
        //生成
        let nodesNew: cc.Node[] = []
        let node: cc.Node = null
        for (let i = 0; i < count; i++) {
            node = this.createNode(startPos)
            nodesNew.push(node)
        }
        //动画
        this.actionAnim(nodesNew, endPos)
    }

    //创建节点
    private createNode(pos: cc.Vec2): cc.Node {
        let node = new cc.Node()
        let nodeChild = new cc.Node()
        let spe = nodeChild.addComponent(cc.Sprite)
        spe.spriteFrame = BFCoinAnim.coinTexture

        if (BFCoinAnim.animRotate) {
            //自旋转
            let sc0 = cc.scaleTo(0.3, 1, 1)
            let sc1 = cc.scaleTo(Math.random(), 0, 1)
            let sc2 = cc.scaleTo(Math.random(), 1, 1)
            let seq = cc.sequence(sc0, sc1, sc2)
            nodeChild.runAction(seq)
        }
        nodeChild.parent = node
        node.parent = cc.find("Canvas").parent
        node.setPosition(pos)

        node.width = BFCoinAnim.coinSize.x
        node.height = BFCoinAnim.coinSize.y
        nodeChild.width = node.width
        nodeChild.height = node.height
        return node
    }


    //执行动画
    private actionAnim(nodes: Array<cc.Node>, endPos: cc.Vec2) {
        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i]
            //1.散开 且始终自旋转
            let moveX = Math.random() * 200
            let moveY = Math.random() * 50
            let height = Math.random() * 100
            let action1 = cc.jumpBy(0.3 + Math.random(), Math.random() > 0.5 ? moveX : -moveX, Math.random() > 0.5 ? moveY : -moveY, height, 1)
            //2.回归
            let posVec = endPos.sub(element.position)
            let dis = Math.sqrt(Math.pow(Math.abs(posVec.x), 0.5) + Math.pow(Math.abs(posVec.y), 0.5))
            let action2 = cc.moveTo(dis * 0.1, endPos).easing(cc.easeSineInOut())
            let ac = cc.sequence(action1, action2, cc.callFunc(function () {
                //3.销毁
                element.destroy()
            }))
            element.runAction(ac)
        }
    }

}
//方法2
cc.game.on("bf-coin-add-anim", function (start: cc.Vec2 | cc.Node, end: cc.Vec2 | cc.Node, count: number) {
    new BFCoinAnim().ReadPlay(start, end, count)
})
