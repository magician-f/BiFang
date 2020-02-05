declare namespace bfCoinAction {
  export class Config {
    SpriteFrame: cc.SpriteFrame = null
    MaxCount: number = 999
    Action: T<ActionI> = null
    Size: cc.Size = new cc.Size(0, 0)
    SSpriteFrame(SpriteFrame: cc.SpriteFrame, Width?: number, Height?: number): Config
  }
  /**
  * @param {number}           count   数量
  * @param {cc.Node|cc.Vec2}  start   开始的节点或位置 (世界坐标
  * @param {cc.Node|cc.Vec2}  end     结束的节点或位置 (世界坐标
  * @param {config}           config   配置
  * @param {Function}         progressFunc   进度回调
  * @param {Function}         finishFunc   完成回调
  */
  function Run(param: {
    count: number,
    start: cc.Node | cc.Vec2,
    end: cc.Node | cc.Vec2,
    config?: Config,
    progressFunc?: Function
    finishFunc?: Function
  })
  function GDefaultConfig(): Config
  function SDefaultConfig(config: Config)
  function CloneConfig(): Config
  interface ActionI {
    actionCreate(index: number, total: number, startPos: cc.Vec2, endPos: cc.Vec2, size: cc.Size): cc.FiniteTimeAction
    actionMove(index: number, total: number, startPos: cc.Vec2, endPos: cc.Vec2, size: cc.Size): cc.FiniteTimeAction
  }
  class ActionDispersal implements ActionI { }
  class ActionRound implements ActionI { }
}
declare namespace bf {

}
interface Window {
  bf: bf,
  bfCoinAction: bfCoinAction
}