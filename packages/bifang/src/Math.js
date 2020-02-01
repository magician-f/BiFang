/**
 * Math 拓展函数
 */

//随机数 2020.01.19
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
//角度转弧度 2020.01.19
Math.DegreeToRadian = function (degree) {
	return degree * Math.PI / 180
}

//弧度转角度 2020.01.19
Math.RadianToDegree = function (radian) {
	return radian * 180 / Math.PI
}

//向量转角度 2020.01.19
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