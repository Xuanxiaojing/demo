/*

整一个开关state，记录是否发生点击事件，初始为未点击（false）

鼠标移入时：
	给当前移入的星星之前（包括自身）的样式改为相应的颜色
	显示相应的评分结果（评分结果存在数组arr2里,星星的下标和数组的下标一一对应，所以给每个星星加索引值，来匹配星星和评分结果）
鼠标移出时：
	如果未发生点击事件(state为false){
		把星星全部清空
		把评分结果隐藏
	}
	如果已发生点击事件(state为true){
		1.留下被点击的星星之前（包括其自身）的星星
		其实就是：
		把星星全部清空，然后给 被点击的星星（用n记录其下标）之前（包括其自身）加相应颜色的星星（用for循环加）
			判断星星的下标
				前两个星星(i<=1时)加紫色的
				后三个星星(i>1时)加红色的
		2.留下评分结果
	}

鼠标点击时：
	用n记住所点击的星星的下标；
	把state改为true；
	
	
注意：不管点击不点击，移入效果一直都是那样；

*/





var oStar = document.getElementById('star');
var aImg = oStar.getElementsByTagName('img');
var oBtn = document.getElementById('btn');

var arr1 = ['./images/star2.png','./images/star2.png','./images/star3.png','./images/star3.png','./images/star3.png'];
var arr2 = ['极差','一般','不错','推荐','力推']

for(var i = 0; i <arr1.length; i++){
	aImg[i].index = i;  //给星星自定义一个属性，存一下星星的下标

	var state = false;//记录评分结果的状态,false为隐藏状态，true为显示状态
	var n = -1;  //依次取数组的值的下标
	//n如果等于0，那么还未做点击事件时，鼠标移出的时候，满足onmouseout里的for循环条件，会进入循环，把第一个星星改为紫色的星星，不符合要求
	aImg[i].onclick = function(){
		n = this.index;
		state = true;//把评分结果改为显示状态，这样的话点击之后，鼠标移出，评分结果就不会消失了
	}
	
	//鼠标移入时：
	aImg[i].onmouseover = function(){
		oBtn.innerHTML = arr2[this.index];  //修改相应的评分结果内容
		//先全部初始化为白色的星星
		for(j = 0;j < arr1.length; j++){
			aImg[j].src = './images/star1.png';  
		}
		for(var j=0;j<=this.index;j++){
			aImg[j].src = arr1[this.index];//再把当前移入的星星之前（包括自身）的样式改为相应的颜色
			oBtn.style.display = 'block';  //使评分结果显示
		}
	}
	
	//鼠标移出时
	aImg[i].onmouseout = function(){
		oBtn.innerHTML = arr2[n];   //评分结果保持在点击时候的状态
		//先全部初始化为白色的星星
		for(j = 0;j < arr1.length; j++){
			aImg[j].src = './images/star1.png';
		}
		//如果当前没有点击任何星星，那么n为初始值-1，不会进入以下for循环，鼠标移出时全部为白色星星
		//一旦某个星星发生了点击事件，n就会记录当前所点击星星的下标，n一定>=0,会进入以下for循环
		for(var i = 0;i <= n; i++){
			if(n < 2){//如果n < 2(说明点击的是前两个星星中的某一个），那么鼠标移出时保持紫色星星
				aImg[i].src = arr1[0];
			}else{//否则说明点击的是后三个星星中的某一个，那么鼠标移出时保持红色星星
				aImg[i].src = arr1[2];
			}
		}
		//判断state状态
		if(state){//如果评分结果是显示状态
			oBtn.style.display = 'block';
		}else{//如果评分结果是隐藏状态
			oBtn.style.display = 'none';
		}
		//如果星星没有发生点击事件，那么state一直是true,鼠标移出时会把评分结果隐藏
	}
}	

	
