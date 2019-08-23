
export class Config{

    //纹理
    private spriteFrame     : cc.SpriteFrame = null
    //最大动画数
    private maxCount        : number = 999
    //是否旋转
    private isRotate        : boolean = false

    //动作进度回调
    private progressFunc    : Function = null
    //动作结束回调
    private finishFunc      : Function = null
    //执行完自动销毁
    private isAutoDestroy   : boolean = true

    private action          : ActionI = null
    private width           : number = 0
    private height          : number = 0


    constructor(){
        this.action = new Action()
    }

    GSpriteFrame(){
        return this.spriteFrame
    }
    SSpriteFrame(spriteFrame: cc.SpriteFrame,width?:number,height?:number):Config  {
        this.spriteFrame = spriteFrame
        if(width && height){
            this.width = width
            this.height = height
        }else if(spriteFrame){
            this.width = spriteFrame.getRect().width
            this.height = spriteFrame.getRect().height
        }
        return this
    }

    GMaxCount(){
        return this.maxCount
    }
    SMaxCount(maxCount: number) :Config {
        this.maxCount = maxCount
        return this
    }

    GRotate(){
        return this.isRotate
    }
    SRotate(isRotate: boolean):Config {
        this.isRotate = isRotate
        return this
    }

    GProgressFunc(){
        return this.progressFunc
    }
    SProgressFunc(func:Function):Config{
        this.progressFunc = func
        return this
    }

    GFinishFunc(){
        return this.finishFunc
    }
    SFinishFunc(func:Function):Config{
        this.finishFunc = func
        return this
    }

    GAutoDestory(){
        return this.isAutoDestroy
    }
    SAutoDestory(is){
        this.isAutoDestroy = is
    }

    GAction(){
        return this.action
    }
    SAction(action){
        this.action = action
    }

    GWidth(){
        return this.width
    }

    GHeight(){
        return this.height
    }

    Clone():Config{
        let config = new Config()
        config.SSpriteFrame(this.spriteFrame)
        config.SMaxCount(this.maxCount)
        config.SRotate(this.isRotate)
        return config
    }
}
export interface ActionI{
    actionCreate():cc.FiniteTimeAction
    actionMove(startPos:cc.Vec2,endPos:cc.Vec2):cc.FiniteTimeAction
    actionEnd():cc.FiniteTimeAction
}
export class Action implements ActionI{
    actionCreate():cc.FiniteTimeAction{
        let moveX = Math.random() * 200
        let moveY = Math.random() * 50
        let height = Math.random() * 100
        let duration = 0.3 + Math.random()
        let action = cc.jumpBy(duration, Math.random() > 0.5 ? moveX : -moveX, Math.random() > 0.5 ? moveY : -moveY, height, 1)
        return cc.spawn(action,this._getActionRotate(duration))
    }
    actionMove(startPos:cc.Vec2,endPos:cc.Vec2):cc.FiniteTimeAction{
        let posVec = endPos.sub(startPos)
        let dis = posVec.mag()
        let duration = dis/1000
        let action = cc.moveTo(duration, endPos).easing(cc.easeSineInOut())
        return cc.spawn(action,this._getActionRotate(duration))
    }
    actionEnd():cc.FiniteTimeAction{
        return null
    }
    private _getActionRotate(duration:number):cc.FiniteTimeAction{
        let rotate = duration * 360
        rotate *= Math.random()>0.5?1:-1
        let action = cc.rotateTo(duration,rotate)
        return action
    }
}
export default class BFActionMore{

    //=========== 配置 ===========

    private static DConfig:Config = new Config()

    static GDefaultConfig():Config{
        return this.DConfig
    }

    static CloneConfig():Config{
        return this.DConfig.Clone()
    }

    //=========== 使用 ============

    /**
    * @param {cc.Node|cc.Vec2}  start   开始的节点或位置 (世界坐标
    * @param {cc.Node|cc.Vec2}  end     结束的节点或位置 (世界坐标
    * @param {number}           count   数量
    * @param {Config}           config  配置
    */
    static Run(count: number,start: cc.Vec2 | cc.Node, end: cc.Vec2 | cc.Node,config?:Config) {
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
            if(end instanceof cc.Node){
                if(!config.GSpriteFrame()){
                    //没有纹理，要去取目标节点的纹理
                    config.SSpriteFrame(end.getComponent(cc.Sprite).spriteFrame,end.width,end.height)
                }
            }
            if(!config.GSpriteFrame()){
                console.log("没有找到纹理")
            }
            new BFActionMore(config).run(count,startPos, endPos,)
        } else {
            console.error("参数有误")
        }
    }

    /**
     * isUpdateAction 是否在帧同步中执行
     * 
     * 出生 >= 并行
     * 移动 >= 并行
     * 消失 >= 并行
     * 坐标
     *  开始
     *  结束
     * 
     */

    private config:Config = null

    private constructor(config:Config){
        this.config = config || BFActionMore.CloneConfig()
    }

    //=========== 细节 ===========

    run(total: number,startPos: cc.Vec2, endPos: cc.Vec2, ) {
        // console.log("startPos", startPos, "endPos", endPos, "total", total)
        if (total > this.config.GMaxCount()) {
            total = this.config.GMaxCount()
        }
        let progress = 0
        for (let i = 0; i < total; i++) {
            let node = this._createNode(startPos)
            let actionCreate = this.config.GAction().actionCreate()
            let actionMove = this.config.GAction().actionMove(node.position,endPos)
            let callBack = cc.callFunc( ()=> {
                progress ++
                this.config.GProgressFunc() && this.config.GProgressFunc()(progress,total,node)
                if(progress >= total){
                    //所有动作已经到达目标点
                    this.config.GFinishFunc() && this.config.GFinishFunc()()
                }
                this.config.GAutoDestory() && node.destroy()
            })
            let action = cc.sequence(actionCreate, actionMove, callBack)
            node.runAction(action)
        }
    }

    private _createNode(pos: cc.Vec2): cc.Node {
        let node = new cc.Node()
        node.parent = cc.find("Canvas").parent
        node.setPosition(pos)
        let spe = node.addComponent(cc.Sprite)
        spe.spriteFrame = this.config.GSpriteFrame()
        node.width = this.config.GWidth()
        node.height = this.config.GHeight()
        return node
    }

    /**
    * @name 求圆周上等分点的坐标
    * @param {number}   ox      圆心坐标
    * @param {number}   oy
    * @param {number}   r       半径
    * @param {number}   count   等分个数
    */
    private _getPoint(r, ox, oy, count) {
        var point = []
        var radians = (Math.PI / 180) * Math.round(360 / count); //弧度
        for (var i = 0; i < count; i++) {
            var x = ox + r * Math.sin(radians * i)
            var y = oy + r * Math.cos(radians * i)
            //为保持数据顺时针
            point.push({x: x, y: y}); 
        }
        return point;
    }

}
