
/*
	检测两个元素是否碰上
		1. 拖拽的元素  obj1
		2. 被碰撞的元素 obj2
*/
function collision(obj1,obj2){  
	
	var obj1Rect = obj1.getBoundingClientRect();
	var obj2Rect = obj2.getBoundingClientRect();
	
	if(obj1Rect.right < obj2Rect.left || obj1Rect.bottom < obj2Rect.top || obj1Rect.left > obj2Rect.right || obj1Rect.top > obj2Rect.bottom){
		return false;  //如果没碰上，返回false
	}else{
		return true;  //如果碰上，返回true；
	}
}

//-------------判断有没有这个类名--------------------
function containsClass(element,isClass){
	var classNames = element.className.split(" ");	
	if(classNames.indexOf(isClass) !== -1){
		return true;
	}

	return false;
}


// 通过指定的id和一个值，判断这个值在不在指定id的子数据中
// 在的话，返回true，否则返回false
function isExistNameById(id,value){
	var childs = getChildsById(id);
	for( var i = 0; i < childs.length; i++ ){
		if(childs[i].title === value){
			return true;
		}
	}

	return false;
}