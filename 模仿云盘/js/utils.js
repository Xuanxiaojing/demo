function $(selector,context){
	//拿到第一个字符
	selector = selector.trim();  // 去除前后空格

	if(!context){  // 如果context没有接受任何值，contex为document
		context = document;
	}

	if(selector.indexOf(" ") !== -1){  // 判断是有空格，交给querySelectorAll处理
		return context.querySelectorAll(selector);
	}

	var firstChar = selector.charAt(0);

	

	if(firstChar === '#'){  // id获取
		// 截取字符串一部分
		return document.getElementById(selector.slice(1));
	}else if(firstChar === '.'){  // className获取
		return context.getElementsByClassName(selector.slice(1))
	}else{ //tagName
		return context.getElementsByTagName(selector);
	}
}

function css(element,prop,value){
	// 判断argumnets的length
	if(arguments.length>2){
		// 设置
		element.style[prop] = value;
	}else{
		// 获取
		return parseFloat(getComputedStyle(element)[prop]);
	}
}

function addZero(n){
	return n < 10 ? "0"+ n : n;
}

function shake(element,attr,speed,callback){
	if(element.shakeTime){
		return;
	}
	var arr = [];
	for( var i = speed; i > 0 ; i-=3 ){
		arr.push(i,-i);
	}
	arr.push(0);
	var n = 0;
	var begin = parseFloat(getComputedStyle(element)[attr]);
	clearInterval(element.shakeTime);
	element.shakeTime = setInterval(function (){
		n++;
		element.style[attr] = begin + arr[n] + 'px';
		if(n >= arr.length-1){
			clearInterval(element.shakeTime);
			element.shakeTime = null;
			typeof callback === 'function' && callback();
		}
	},30)

}

/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
*
* 曲线方程
*
* http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html
* */

//Tween.linear();

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}

/*
	参数：
		element 要运动的元素    *
		attr 运动的属性			*
		target 目标位置			*
		duration 持续时间 ms    *

		fx 运动形式   默认值为"linear"  []
		callBack  调函数
*/
function mTween(element,attrObj,duration,fx,callback){
	// 要算出来每一个样式的起始位置和总距离
	// 循环对象attrObj，算出每一个用时的起始位置和总距离

	var beginObj = {}; // 每一个样式的起始位置
	var countObj = {}; // 每一个样式的总距离
	for(var attr in attrObj){
		beginObj[attr] = parseFloat(getComputedStyle(element)[attr]);
		// 每一个样式要运动的的总距离
		countObj[attr] = attrObj[attr] - beginObj[attr];
	}

	// 开始运动的时间
	var startTime = Date.now();

	fx = fx || 'linear';

	clearInterval(element.timer);
	element.timer = setInterval(function (){
		// 已过去时间
		var t = Date.now() - startTime;

		if(t >= duration){
			t = duration;
			clearInterval(element.timer);
		}

		// 循环传过来的对象,要运动的是对象的key值这个样式

		for(var prop in attrObj){

			//判断属性是不是改变透明读的样式名
			if(prop === 'opacity'){
				element.style[prop] = Tween[fx](t,beginObj[prop],countObj[prop],duration);
			}else{
				element.style[prop] = Tween[fx](t,beginObj[prop],countObj[prop],duration) + 'px';
			}
			
		}

		

		if(t === duration){
			typeof callback === 'function' && callback();
		}

	},4)


};



/*
 *  三个参数
	1. 元素（谁触发鼠标滚轮事件）
	2. 向上滚动做的事  function
	3. 向下滚动做的是 function
	
	//抛出一个错误
		throw new Error()
*/
function mousewheel(element,upFn,downFn){
	
	if(!element || element.nodeType !== 1){
		//console.log("element is not a node");
		throw new Error("element is not a node");
		return;
	}
	
	//事件绑定方式的兼容
	element.onmousewheel = fn;  //IE和chrome支持,火狐不支持
	
	//火狐支持    chrome  IE不支持
	if(element.addEventListener){  //因为IE低版本不支持addEventListener，会报错
		element.addEventListener("DOMMouseScroll",fn);
	}
	
	
	function fn(ev){
		var e = ev || event;   //事件对象的兼容：如果有第一个参数ev，e就等于ev（适用高版本浏览器），如果没有ev，e就等于event（适用所有IE，chrome ）
		var direction = true;  // 声明一个变量，定义如果为true则方向是向上
		
		/*
		 * 怎么能看出鼠标是上滚还是下滚？
		 * 		属性wheelDelta：IE和chrome支持    ff不支持；
		 * 		属性detail：ff支持；IE和chrome不支持：怎么滚e.detail都为0
		 */
		if(e.wheelDelta){  //从事件对象的wheelDelta看出是上滚还是下滚：wheelDelta为正，说明是上滚 令direction为true，为负，说明是下滚
			direction = e.wheelDelta > 0 ? true : false;
		}
		if(e.detail){  
			direction = e.detail < 0 ? true : false;
		}

		// 统一方向

		if(direction){  //direction为true，说明是上滚，就执行向上滚动要做的事情
			//因为使用者可能会用到事件对象（比如取消浏览器默认行为 ）
			// 当执行这个回调函数的时候，把事件对象作为参数传给这个函数，要不要用由使用者决定
			//upFn(e);  //这里不能写死，因为一个元素要做这些事情，另一个元素要做其他事情，所以具体做什么在这里不做规定，调用时传进来一个函数（内容自己定，我这里帮你执行）
			typeof upFn === 'function' && upFn.call(element,e);
		}else{  //否则执行向下滚动要做的事情
			//downFn(e);
			typeof downFn === 'function' && downFn.call(element,e);
		}

	};	
}


//------whoSelect函数作用是找出哪些input被选中了-------
function whoSelect(){
	var selectArr = [];
	for(var i=0; i<fileChecks.length; i++){
		if(fileChecks[i].classList.contains('check-active')){
			selectArr.push(fileChecks[i]);
		}
	}
	return selectArr;
}

// 给指定元素的指定事件绑定事件处理函数
function on(element,evName,fn){
	element.addEventListener(evName,fn);	
}
function off(element,evName,fn){
	element.removeEventListener(evName,fn);		
}
