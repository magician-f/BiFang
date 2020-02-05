// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {

    @property(cc.RigidBody)
    rigidBody: cc.RigidBody = null
    //移动速度
    @property(cc.Vec2)
    linearVelocity: cc.Vec2 = cc.v2(500, 500)
    //旋转速度
    @property
    angularVelocity: number = 300

    start(){
        if (this.angularVelocity) {
            this.rigidBody.angularVelocity = this.angularVelocity;
        }
    }
    /**
     * 给刚体施力，力的参数由组件属性控制
     * 写这个函数是方便cc.Button组件click属性调用
     */
    force() {
        let v2 = this.rigidBody.linearVelocity;
        v2.y = this.linearVelocity.y;
        v2.x = this.linearVelocity.x * (this.node.x > 0 ? 1 : -1);
        this.rigidBody.linearVelocity = v2;
        if (this.angularVelocity) {
            this.rigidBody.angularVelocity = this.angularVelocity;
        }
    }

    /**
    * 只在两个碰撞体开始接触时被调用一次
    */
    onBeginContact(contact, selfCollider, otherCollider) {
        
        if (otherCollider.node.name == "Block") {
            // otherCollider.node.destroy()
        }else if(otherCollider.node.name == "wall_controll"){
            let rigidbody = selfCollider.node.getComponent(cc.RigidBody) as cc.RigidBody
            // if(selfCollider.node.x > otherCollider.node.x){
            //     rigidbody.linearVelocity  = cc.v2((selfCollider.node.x - otherCollider.node.x)*5,1200)
            // }else if(selfCollider.node.x < otherCollider.node.x){
            //     rigidbody.linearVelocity  = cc.v2(-600,1200)
            // }else{
            //     rigidbody.linearVelocity  = cc.v2(0,1200)
            // }
            rigidbody.linearVelocity  = cc.v2((selfCollider.node.x - otherCollider.node.x)*10,1000)
        }
    }

    /**
     * 只在两个碰撞体结束接触时被调用一次
     */
    onEndContact(contact, selfCollider, otherCollider) {
        // cc.log("onEndContact", this._p1);
    }
}
