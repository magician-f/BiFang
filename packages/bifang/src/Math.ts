interface Math {
	/**
	 * 随机数
	 *  不传参数、不合法的参数，效果等同于[Math.random()]
	 *  如果[min][max]中有小数，[isDecimal]自动为true
	 * @param min 		最小数
	 * @param max 		最大数
	 * @param isDecimal 是否有小数
	   Test Code
	   console.log(Math.Random()) 			//0-1
	   console.log(Math.Random("11","22"))	//0-1
	   console.log(Math.Random("aa","bb"))	//0-1
	   console.log(Math.Random(1,3))		//1-3
	   console.log(Math.Random(1,3,true))	//1.0-3.0
	   console.log(Math.Random(1.5,2.5))	//1.5-2.5
	   console.log(Math.Random(1.5,2.5,true))//1.5-2.5
	 */
	Random(min, max, isDecimal)
	/**
     * 角度转弧度
     * @param degree 角度
       Test Code
       console.log(0,Math.DegreeToRadian(0))	//0
       console.log(45,Math.DegreeToRadian(45))	//0.25π
       console.log(90,Math.DegreeToRadian(90))	//0.5π
	   console.log(180,Math.DegreeToRadian(180))//1π
       console.log(270,Math.DegreeToRadian(270))//1.5π
       console.log(360,Math.DegreeToRadian(360))//2π
     */
	DegreeToRadian(degree)
	/**
     * 弧度转角度
     * @param radian 弧度
       Test Code
       console.log("0",Math.RadianToDegree(0))
       console.log("0.25*Math.PI",Math.RadianToDegree(0.25*Math.PI))
       console.log("0.5*Math.PI",Math.RadianToDegree(0.5*Math.PI))
       console.log("1*Math.PI",Math.RadianToDegree(1*Math.PI))
       console.log("1.5*Math.PI",Math.RadianToDegree(1.5*Math.PI))
       console.log("2*Math.PI",Math.RadianToDegree(2*Math.PI))
     */
	RadianToDegree(radian)
	/**
     * 向量转角度
     * @param vec 
       Test Code
       console.log({x:1,y:0},Math.Vec2Angle({x:1,y:0}))
       console.log({x:1,y:0.5},Math.Vec2Angle({x:1,y:0.5}))
       console.log({x:1,y:1},Math.Vec2Angle({x:1,y:1}))
       console.log({x:1,y:2},Math.Vec2Angle({x:1,y:2}))
       console.log({x:0,y:1},Math.Vec2Angle({x:0,y:1}))
       console.log({x:-1,y:1},Math.Vec2Angle({x:-1,y:1}))
       console.log({x:-1,y:0},Math.Vec2Angle({x:-1,y:0}))
       console.log({x:-1,y:-1},Math.Vec2Angle({x:-1,y:-1}))
       console.log({x:0,y:-1},Math.Vec2Angle({x:0,y:-1}))
       console.log({x:1,y:-1},Math.Vec2Angle({x:1,y:-1}))
     */
	Vec2Angle(vec)
}
Math.Random = function (min, max, isDecimal) {
	typeof min !== "number" && (min = 0)
	typeof max !== "number" && (max = min + 1)
	typeof isDecimal !== "boolean" && (isDecimal = false)
	min >= max && (min = 0, max = 1)
	min === 0 && max === 1 && (isDecimal = true);
	!isDecimal && (min !== Math.floor(min) || max !== Math.floor(max)) && (isDecimal = true)
	var random = Math.random() * (max - min)
	return min + (isDecimal ? random : Math.floor(random))
}
Math.DegreeToRadian = function (degree) {
	return degree * Math.PI / 180
}
Math.RadianToDegree = function (radian) {
	return radian * 180 / Math.PI
}
Math.Vec2Angle = function (vec) {
	var len = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2))
	if (len == 0) {
		return 0;
	}
	var cos = vec.x / len;
	var radian = Math.acos(cos);
	if (radian == 0) {
		return 0;
	}
	var angle = 180 / (Math.PI / radian);
	if (vec.y < 0) {
		angle = 360 - angle;
	} else if (vec.y == 0 && vec.x < 0) {
		angle = 180
	}
	return angle
}