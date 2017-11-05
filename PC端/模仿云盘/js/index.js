

//自适应宽高
var mainbody = document.querySelector('.mainbody');//主体部分
var head = document.querySelector('#head');
function resize(){
	var clientH = document.documentElement.clientHeight;//获取可视窗口的高度
	mainbody.style.height = clientH - head.offsetHeight+'px';//主体部分的高等于可视窗口的高度减去head头部的高度，随可视窗口的高度变化
}
window.onresize = resize;
resize();
//封装小提醒
var fullTip = document.querySelector(".full-tip-box");
var tipText = fullTip.querySelector(".tip-text");
var timer = null;
function tips(cls,title){
	fullTip.style.top = '-32px';//使其top值瞬间回到-32px
	fullTip.style.transition = 'none';//去掉transition，才会达到“瞬间”回到-32px的效果
	
	tipText.innerHTML = title;//提醒的内容
	fullTip.className = 'full-tip-box';//每一次进来，都先初始化提醒框的className
	// 用定时器延时，使之运动到0，而不是直接设置为0；
	setTimeout(function (){
		fullTip.classList.add(cls);
		fullTip.style.top = '0px';
		fullTip.style.transition = '.3s';	
	})

	clearTimeout(timer);//定时器先关后开
	timer = setTimeout(function (){//2000ms之后缓缓运动到-32px（transition是0.3s）
		fullTip.style.top = '-32px';
	},2000)		
}


//----------------------操作数据-----------------------
//获取对应id的数据
function getDataById(id){
	if(data[id]){
		return data[id]
	}
	return null;
}

//获取对应id下所有的子数据

function getChildsById(id){  // id 父id
	var arr = [];
	for(var attr in data){  //循环data，看data的每个key值
		if(data[attr].pid == id){  //如果data的某个key值对应的数据的pid等于传进来的id，该数据就是指定id的数据的子数据
			arr.push(data[attr]);  //就把符合条件的数据（该key值对应的那条数据）放入arr里
		}
	}
	return arr; //循环结束之后，该id对应的所有的子数据都存在arr里了
}
//----------------------操作数据-----------------------


//--------------------------------------------------渲染树形菜单结构-------------------------------------------------

// 先渲染第一级 先找数据

var level = -1;//记录层级

var initId = -1;  // 最顶层的父级id

// 通过父级id找子级数据 pid
// 循环数据，那些数据的pid为 指定的id，就是指定id的子数据

function createTreeHtml(id,leval){
	// 找到传过来参数id下所有的子级
	var dataChildrenArr = getChildsById(id);
	leval++;
	var treeHtml = '';
	if(dataChildrenArr.length){
		treeHtml += '<ul>';
		dataChildrenArr.forEach(function (item){
			// 如果没有下一级，createTreeHtml返回的结构为空
			var html = createTreeHtml(item.id,leval);
			treeHtml += `<li>
					<div data-id="${item.id}" style="padding-left: ${leval*15}px;" class="tree-title ${html !== '' ? 'tree-ico' : '' } close">
						<span><i></i>${item.title}</span>
					</div>
					`
			// createTreeHtml返回的是下一级的结构
			treeHtml += html
			treeHtml += `</li>`	
		})
		treeHtml += '</ul>'
	}	

	return treeHtml;
}
var tree = $('.tree')[0];
tree.innerHTML = createTreeHtml(initId,level);



//-------------------------------------定位到指定元素(根据元素身上的id定位)-------------------------
function positionElement(positionId){
	var treeTitles = tree.getElementsByTagName('div');  //找到树形菜单里所有的标题div
	//传进来一个id,给这个id对应的div添加样式
	for(var i=0; i<treeTitles.length; i++){
		treeTitles[i].classList.remove('active');//先暴力地把所有div上的样式清空
		if(treeTitles[i].dataset.id == positionId){  //循环所有div,如果某个div上的id和传进来的id一样(渲染结构时,在每个div上加了id),说明这个div就是要找的div
			treeTitles[i].classList.add('active'); //给这个div添加样式
		}
	}
}
positionElement(0);

//----------------------------------------渲染右边的文件区域---------------------------------------

var fileArea = $('.files')[0];//文件区域
var treeTitles = $('.tree-title');

function createFilesHtml(id){
	var dataChildrenArr = getChildsById(id);  //令dataParentArr装入这些子数据
	var fileHtml = '';
	if(dataChildrenArr.length){
		dataChildrenArr.forEach(function(item){
			fileHtml += `<div class="file" data-id="${item.id}">
							<div class="ico" data-id="${item.id}"></div>
							<span class="mod-input" data-id="${item.id}"></span>
							<span class="file-name" data-id="${item.id}">${item.title}</span>
							<input type="text" class="file-text" style="display: none;">
						</div>`
		});
	}
	return fileHtml;
}
fileArea.innerHTML = createFilesHtml(0);  //一开始默认是微云的内容



//------------------------------------------------面包屑导航----------------------------------
//找到指定id的父级的父级的父级……一直到微云
function getParentById(id){
	var arr = []; //arr用来存所要找的祖先们
	for(var attr in data){  //循环data,找到传进来的id对应的是哪条数据
		if(data[attr].id == id){
			arr.push(data[attr]);  //如果data里某条数据的id和传进来的id一样,说明这条数据是该id对应的数据,装进arr里
			arr = arr.concat(getParentById(data[attr].pid));
			//把该条数据的pid也就是父级的id传进去,得到该条数据的父级数据
			//用concat方法,把原来的arr和得到的新数据连起来
			//concat方法返回的是新数组，把新数组重新赋值给arr
		}
	}
	return arr;  //for循环结束后,arr里存放着传入的id对应的数据及其所有的祖先数据,把arr返回出去
}

//渲染面包屑导航区域
//传进去一个id,把该id对应的数据 以及 其所有的祖先数据渲染进结构
function createBreadNavHtml(id){
	var parents = getParentById(id).reverse();  //得到该id对应的数据 以及 其所有的祖先数据,颠倒位置后,存进parents里
	var navHtml = '';
	if(parents.length){//使用时可能传错id,所以要判断一下,该id有没有对应的数据及其父级
		//如果不是最后一个,就添加为a标签(a标签可以点击)
		for(var i=0; i<parents.length-1; i++){
			navHtml += `<a href="javascript:;" data-id="${parents[i].id}">${parents[i].title}</a>`;
		}
		navHtml += `<span data-id="${parents[parents.length-1].id}">${parents[parents.length-1].title}</span>`;
		//如果是最后一个,就添加为span标签(span标签不可以点击)
	}
	
	return navHtml;
}
var breadNav = $('.bread-nav')[0];
breadNav.innerHTML = createBreadNavHtml(0);

//---------------------------------------------1.树形菜单区域的交互--------------------------------------
//树形菜单的点击事件
var fileBlank= $('.file-blank')[0];
var fileArea = $('.files')[0];//文件区域
on(tree,'click',function(ev){
	//想要拿到treetitle上的id,用这个id渲染右边文件区域对应的结构,也用这个id定位到标题(添加样式)
	var target = ev.target;
	if(target == this){//如果事件源是菜单区域,不往下执行
		return;
	}
	if(target.parentNode.classList.contains('tree-title')){//如果事件源的父元素包含类名tree-title,就令事件源为该事件源的父级节点
		target = target.parentNode;
	}
	var treeTitleId = target.dataset.id;//找到该标题上的id
	fileArea.innerHTML = createFilesHtml2(treeTitleId);//根据该id渲染右边文件区域的内容
	breadNav.innerHTML = createBreadNavHtml(treeTitleId);//根据该id渲染面包屑导航的内容
	if(!fileArea.innerHTML){//如果文件区域是空的
		fileBlank.style.display = 'block';//显示提醒
	}else{//如果文件区域不是空的
		fileBlank.style.display = 'none';//隐藏提醒
	}
	positionElement(treeTitleId);//给相应的title渲染样式
	checkAll.classList.remove('checked'); //切换树形菜单时,取消全选
});


//---------------------------------------------2.面包屑导航的交互--------------------------------------
var fileArea = $('.files')[0];//文件区域
on(breadNav,'click',function(ev){
	var target = ev.target;
	if(target.nodeName == 'A'){
		var breadAId = target.dataset.id;
		fileArea.innerHTML = createFilesHtml2(breadAId);//根据该id渲染右边文件区域的内容
		if(!fileArea.innerHTML){//如果文件区域是空的
			fileBlank.style.display = 'block';//显示提醒
		}else{//如果文件区域不是空的
			fileBlank.style.display = 'none';//隐藏提醒
		}
		breadNav.innerHTML = createBreadNavHtml(breadAId);//根据该id渲染面包屑导航的内容
		positionElement(breadAId);
		checkAll.classList.remove('checked'); //切换文件夹时,取消全选
	}
});


//----------------------------------------------3.点击文件夹进到下一级------------------------------------------
var fileArea = $('.files')[0];//文件区域
var fileChecks = $('.mod-input',fileArea);//文件夹的单选框
var checkAll = $('.checkall')[0];//全选选框
//事件委托,委托给文件区域
on(fileArea,'click',function(ev){
	var target = ev.target;
	//判断事件源,点击文件夹的除选框之外的部分都能进到下一级,但是点击选框不能进到下一级
	if(target.classList.contains('files')){//事件源是文件区域的大盒子,不进去
		return;
	}
	if(target.classList.contains('mod-input')){//事件源是选框,不进去
		return;
	}
	if(target.parentNode.classList.contains('file')){//事件源的父级节点是文件夹,令事件源为该父级节点
		target = target.parentNode;
	}
	
	//如果事件源正好是文件夹file本身,就不做改变,直接执行下面代码
	var targetId = target.dataset.id;//拿到事件源的id
	fileArea.innerHTML = createFilesHtml(targetId);//根据该id渲染右边文件区域的内容
	if(!fileArea.innerHTML){//如果文件区域是空的
		fileBlank.style.display = 'block';//显示提醒
	}else{//如果文件区域不是空的
		fileBlank.style.display = 'none';//隐藏提醒
	}
	checkAll.classList.remove('checked'); //切换文件夹时,取消全选
	breadNav.innerHTML = createBreadNavHtml(targetId);//根据该id渲染面包屑导航的内容
	positionElement(targetId);//根据事件源的id 使树形菜单里对应的位置显示高亮
});




//-----------------------------------------------------4.单选-------------------------------------------
//事件委托
on(fileArea,'click',function(ev){
	var target = ev.target;
	if(target.classList.contains('mod-input')){//如果事件源是单选框
		var targetId = target.parentNode.dataset.id;//拿到事件源的id
		
		target.classList.toggle('check-active');//如果不是选中,就选中,如果是已经选中,就取消选中
		if(target.classList.contains('check-active')){//根据类名判断,如果选框是选中状态
			target.parentNode.classList.add('file-active');//给该选框的父级节点高亮
		}else{
			target.parentNode.classList.remove('file-active');//否则该选框的父级节点取消高亮
		}
		//判断是不是全选
		if(whoSelect().length == fileChecks.length && fileChecks.length){//选中的框和全部的选框的个数相等,并且都不为0,才是全选
			checkAll.classList.add('checked');
		}else{
			checkAll.classList.remove('checked');
		}
	}
});

//----------------------------------------------------------5.全选----------------------------------------
var checkAll = $('.checkall')[0];//全选选框
var checkAllClick = false;//初始为未点击
on(checkAll,'click',function(){
	if(!fileArea.innerHTML){//如果文件区域为空,不往下执行
		return;
	}
	
	this.classList.toggle('checked');//没有高亮,就高亮,已经高亮就取消高亮
	
	if(this.classList.contains('checked')){//如果现在是高亮状态
		for(var i=0; i<fileChecks.length; i++){//循环单选框,给所有单选框高亮
			fileChecks[i].classList.add('check-active');
			fileChecks[i].parentNode.classList.add('file-active');
		}
	}else{//如果现在不是高亮状态
		for(var i=0; i<fileChecks.length; i++){//给所有单选框取消高亮
			fileChecks[i].classList.remove('check-active');
			fileChecks[i].parentNode.classList.remove('file-active');
		}
	}
});



//--------------------------------------------6.框选----------------------------------
//找到所有的文件file
var fileGroup = $('.file',fileArea);

//1.鼠标按下 生成一个选框，放在body区域中
on(fileArea,'mousedown',function(ev){
	ev.preventDefault();
	//如果没有子级,不能框选
	console.log(!fileArea.innerHTML)
	if(!fileArea.innerHTML){//如果文件区域是空的
		fileBlank.style.display = 'block';//显示提醒
		return;
	}
	//如果点击的是单选框,就不生成自由选框
	if(ev.target.classList.contains('mod-input')){
		return;
	}
	var freeBox = document.createElement('div');//生成自由选框
	freeBox.className = 'freebox';
	disX = ev.pageX;  //记录鼠标按下时鼠标的位置
	disY = ev.pageY;
	
	
	freeBox.style.left = disX + 'px';
	freeBox.style.top = disY + 'px';

	freeBox.isAppend = false; // isAppend来记录是否把freeBox追加进body了,false代表是没有append

	on(document,"mousemove",documentMouseMove);
	on(document,'mouseup', documentMouseUp);
	
	function documentMouseMove(ev){//便于控制事件 是绑定还是解除绑定,把这段代码封一个函数
		// 在点击为中心的，移动了10个像素内，把框不放在body中
		if((Math.abs(ev.pageX - disX) > 10 || Math.abs(ev.pageY - disY) > 10)){
			// 已经append，不用多次append
			if(!freeBox.isAppend){
				document.body.appendChild(freeBox);
				freeBox.isAppend = true;//一旦追加进去,就使isAppend改为true
			}
			
			//宽高是当前鼠标的坐标减去鼠标按下时鼠标的坐标
			freeBox.style.width = Math.abs(ev.pageX - disX) + 'px';
			freeBox.style.height = Math.abs(ev.pageY - disY) + 'px';
			//定位值是当前鼠标的坐标 和 鼠标按下时鼠标的坐标 的最小值
			freeBox.style.left = Math.min(ev.pageX,disX) + 'px';
			freeBox.style.top = Math.min(ev.pageY,disY) + 'px';
			
			//移动过程中判断是否碰撞
			for(var i=0; i<fileGroup.length; i++){
				if(collision(freeBox,fileGroup[i])){  //调用collision函数，如果返回值是true，走到这里，说明newDiv和该div碰上了，
					fileGroup[i].classList.add('file-active');
					$('.mod-input',fileGroup[i])[0].classList.add('check-active');
					
				}else{
					fileGroup[i].classList.remove('file-active'); //走到这里说明newDiv和这个div没碰上，这个div还是绿色
					$('.mod-input',fileGroup[i])[0].classList.remove('check-active');
					
				}
			}
			checkAll.classList.remove("checked");
		}
		
	};
	
	//鼠标抬起的函数
	function documentMouseUp(){
		//鼠标抬起时,取消绑定mousemove的事件处理函数,取消mouseup的事件处理函数,判断是否全选
		off(document,"mousemove",documentMouseMove);
		off(document,'mouseup', documentMouseUp);
		if(freeBox.isAppend){//判断一下,如果已经追加了freeBox,再移除
			document.body.removeChild(freeBox);
		}
		
		var checkedFileChecks = $('.check-active',fileArea);
		if(checkedFileChecks.length === fileGroup.length && fileGroup.length){//注意要二者都不为零才全选
			checkAll.classList.add("checked");
		}
		
	}
});





//--------------------------------------------------8.新建文件夹------------------------------------------------------
//作用是根据传进来的id找到对应的子数据的id
//传进来一个id,找到该id下对应的子数据的id,存在childIdArr里,返回出去
function childId(id){ 
	var childIdArr = [];
	for(var attr in data){  //循环data，看data的每个key值
		if(data[attr].pid == id){  //如果data的某个key值对应的数据的pid等于传进来的id，该数据就是指定id的数据的子数据
			childIdArr.push(data[attr].id);  //就把符合条件的数据（该key值对应的那条数据）放入arr里
		}
	} 
	return childIdArr; //循环结束之后，child里的id都存在arr里了
	//比如传进来0(是微云),那么childIdArr里就是微云的子数据的id
}
//传入一个数组,该数组是获取child里的每个id对应的数据(数组是有顺序的),放入一个数组
function getChild(arr){//传进来一个数组(装有子数据的id)
	var childArr = [];
	arr.forEach(function(item){//循环装id的数组
		for(var attr in data){
			if(data[attr].id == item){
				childArr.push(data[attr]);
			}
		}
		
	});
	return childArr; //循环结束之后，该id对应的所有的子数据都存在arr里了
	//比如传进来的是[1,2],那么childArr里是id为1和2的数据
}
//在数据里添加一项名值对,child:[]
for(var attr in data){
	data[attr].child = childId(data[attr].id);
}
//传进来一个id,根据该id对应的数据的child生成对应的子html结构
function createFilesHtml2(id){
	if(!getDataById(id).child){//如果newFilePid对应的数据没有child,就加上.因为新建的数据里没有child,会报错,所以如果没有,在这里加上一个空数组
		getDataById(id).child = [];
	}
	var arr2 = getDataById(id).child;//获取该id对应的数据的child的value值(一个装着子数据id的数组),存在arr里
	var dataChildrenArr = getChild(arr2);  //令dataParentArr装入这些子数据
	var fileHtml = '';
	if(dataChildrenArr.length){
		dataChildrenArr.forEach(function(item){
			fileHtml += `<div class="file" data-id="${item.id}">
							<div class="ico" data-id="${item.id}"></div>
							<span class="mod-input" data-id="${item.id}"></span>
							<span class="file-name" data-id="${item.id}">${item.title}</span>
							<input type="text" class="file-text" style="display: none;">
						</div>`
		});
	}
	return fileHtml;
}



var create = $('#create');//新建按钮
//var tip = $('.full-tip-box')[0];//新建的提示信息
//var tipIfo = $('.tip-text',tip)[0];//新建的提示信息的内容
on(create,'mouseup',function(){
	create.isCreate = true;//进入新建状态
	var newFile = document.createElement('div');//创建文件夹
	newFile.className = 'file';
	if(!fileArea.innerHTML){//按下新建按钮时,如果当前文件区域是空
		fileBlank.style.display = 'none';//就先使提示隐藏
	}
	//生成新文件夹的结构
	newFile.innerHTML = `<div class="ico"></div>
						<span class="mod-input"></span>
						<span class="file-name"></span>
						<input type="text" class="file-text">`;
	fileArea.insertBefore(newFile,fileArea.firstElementChild);//没有名字的文件夹插入到files区域的最前面
	var fileText = newFile.getElementsByClassName('file-text')[0];//名字编辑区域
	var fileName = newFile.getElementsByClassName('file-name')[0];//文件夹名字
	fileText.style.display = 'block';//名字编辑区域
	fileText.focus();//自动获取焦点
	if(fileText.isOn){//如果绑定过事件,不再重复绑定
		return;
	}
	fileText.isOn = true;
	//在新建状态,点击编辑框,阻止冒泡,不让进入下一级
	on(fileText,'click',function(ev){
		ev.stopPropagation();
	});
	//在新建状态,在编辑框鼠标down下,阻止冒泡,不让不让冒到document的mousedown判断是否新建成功
	on(fileText,'mousedown',function(ev){
		ev.stopPropagation();
	});
});
//on(create,'mousedown',function(ev){
//	ev.stopPropagation();
//});

//------------新建文件夹的document的down事件----------------------------------
on(document,'mousedown',newFileMouseDown);
function newFileMouseDown(){
	console.log(create.isCreate,'create.isCreate');
	if(create.isCreate){//遇到bug,发现进不来,发现是之前写的点击新建按钮时阻止冒泡了
		var newFile = fileArea.firstElementChild;//找到新文件夹
		var fileText = newFile.getElementsByClassName('file-text')[0];//名字编辑区域
		var fileName = newFile.getElementsByClassName('file-name')[0];//文件夹名字
		var fileTextVal = fileText.value;//编辑框的value值
		//判断新建的文件夹有没有名字
		if(!fileTextVal){//没有名字
			fileArea.removeChild(newFile);//移除元素
			tips('err','没有输入名字,新建文件夹失败');
			//移除之后判断当前文件区域是不是空
			if(!fileArea.innerHTML){//如果是空
				fileBlank.style.display = 'block';//显示提醒
			}
		}else{//如果有名字
			var breadSpan = $('.bread-nav span')[0];//找到当前面包屑导航里的span,也就是当前文件区域里的文件的父级
			var newFilePid = breadSpan.dataset.id;//获取当前面包屑导航里的span上的id
			var childs = getChildsById(newFilePid);//找到当前文件区域所渲染的数据
			//找到同级的标题(也就是childs的每一项的title),判断新建文件夹的标题和同级的标题是否重复,如果重复就新建失败
			for(var i=0; i<childs.length; i++){
				if(fileTextVal == childs[i].title){//有相同的标题
					newFile.remove();//移除元素
					tips('err','有重名,新建文件夹失败');
					create.isCreate = false;
					return;
				}
			}
			//如果既有名字又没有重名,执行以下代码
			fileName.innerHTML = fileTextVal;//把编辑框里输入的内容作为新文件夹的名字
			fileText.style.display = 'none';//编辑框隐藏
			
			tips('ok','新建文件夹成功');
			
			
			//把data里的数据作相应的改变
			var id = Date.now();//用时间戳作为新文件夹的id
			
			if(!getDataById(newFilePid).child){//如果newFilePid对应的数据没有child,就加上.
				getDataById(newFilePid).child = [];
			}
			
			var arr = getDataById(newFilePid).child;//取出child的内容,是一个数组
			arr.unshift(id);//把新文件夹的id添加在该数组的开头
			
			data[newFilePid].child = arr;//把新数组赋给newFilePid的child属性
			//新数据添加到data里
			data[id] = {
				"id": id,
		        "pid": newFilePid,
		        "title": fileTextVal,
		        "type": "file"
			}
			
			console.log(arr);// 微云的child:[1502716853274, 1502716850984, 1,2]
			newFile.setAttribute('data-id', id);  //在新建的文件夹上设置data-id,把新文件夹的id放上去
			for(var i=0;i<newFile.children.length;i++){//在新文件夹的子节点上也都加上该新文件夹的id
				newFile.children[i].setAttribute('data-id', id);
			}
			
			fileArea.innerHTML = createFilesHtml2(newFilePid);//根据该id渲染右边文件区域的内容
			checkAll.classList.remove('checked');//如果新建成功,一定不是全选
			tree.innerHTML = createTreeHtml(initId,level);//根据新的数据重新渲染左边树形菜单的结构
			positionElement(newFilePid);//要使当前的栏目高亮
			fileText.style.display = 'none';//编辑框隐藏
		}
		
		create.isCreate = false;
	}	
	
}



//------------------------------------------------9.删除-----------------------------------

//找子孙数据
/*
function getChildsAllById( id ){
	var arr = [];
	for( var attr in data ){
		if( id == data[attr].pid ){
			arr.push(data[attr].id)
			for( var i = 0 ; i < arr.length ; i++ ){
				if( data[attr].id == arr[i] ){
					getChildsAllById(arr[i]);
				}
			}
		}
	}
	return arr;
}
*/

// 找到指定id下所有的子孙数据
function getChildsAllById(id){
	// 找到这个id的数据
	var dataItem = getDataById(id);
	var arr = [];
	// 把id对对应的数据push到数组中
	arr.push(dataItem);
	for(var attr in data){
		if(data[attr].pid == id){
			arr = arr.concat(getChildsAllById(data[attr].id))
		}
	}
	return arr;
}

//根据id删除数据
function deleteDataById(id){
	for(var attr in data){
		if(data[attr].id == id){
			delete data[attr];
		}
	}
}
// 删除指定id下所有的子孙数据
function deleteChildsData(id){
	var childsAll = getChildsAllById(id);
	for( var i = 0; i < childsAll.length; i++ ){
		if(data[childsAll[i].id]){
			delete data[childsAll[i].id];
		}
	}
}
//批量删除
function deleteAll(selectArr){
	for( var i = 0; i < selectArr.length; i++ ){
		selectArr[i].parentNode.remove();
		deleteChildsData(selectArr[i].parentNode.dataset.id)
	}
}


//思路:循环当前页面的文件夹,如果选中,就从结构里删除,并且删除对应的数据
var fileArea = $('.files')[0];//文件区域
var fileGroup = document.getElementsByClassName('file');//文件夹们
var deleteChecked = $('#del');//删除按钮
var deleteTanBox = $('.tanbox1')[0];//删除提醒的弹窗
var deleteConf = $('.conf',deleteTanBox)[0];//删除的弹框
on(deleteChecked,'click',function(ev){
	ev.stopPropagation();
	var inputChecked = whoSelect();//存一下当前选中的选框
	if(!inputChecked.length){//如果没有选中的文件
		tips('warn','请选择要删除的文件');
		return;
	}
	deleteTanBox.style.display = 'block';
	shake(deleteConf,'left',20)
});


//点击确定
var confBtns = $('.conf-btn a',deleteTanBox);
on(confBtns[0],'click',function(){
	var inputChecked = whoSelect();//存一下当前选中的选框
	//确定删除
	deleteTanBox.style.display = 'none';
	inputChecked.forEach(function(item){
		item.parentNode.remove();//在结构里删除
		deleteChildsData(item.parentNode.dataset.id);//删除数据以及子孙数据
	});
	//deleteAll(inputChecked);
	//把父数据的child里自己的id也删除?不用,直接用新的数据重新赋值一边child即可
	//删除完之后,修改数据里的child:[]
	for(var attr in data){
		data[attr].child = childId(data[attr].id);
	}
	
	//删除树形菜单里的结构?不用,根据新的data重新渲染即可
	tree.innerHTML = createTreeHtml(initId,level);//根据新数据渲染结构
	var breadSpan = $('.bread-nav span')[0];//找到当前面包屑导航里的span,也就是当前文件区域里的文件的父级
	positionElement(breadSpan.dataset.id);
	tips('ok','删除成功');
	//删除完毕,判断当前的文件区域是不是空
	if(!fileArea.innerHTML){//如果是空
		fileBlank.style.display = 'block';//显示提醒
		checkAll.classList.remove('checked');
	}
});
//点击取消
on(confBtns[1],'click',function(){
	deleteTanBox.style.display = 'none';
});
//点击关闭
var closIco = $('.close-ico')[0];//弹窗上的关闭按钮
on(closIco,'click',function(){
	deleteTanBox.style.display = 'none';
});


//---------------------------------------------------10.重命名--------------------------------------
var renameBtn = $('#rename');
//点击重命名
on(renameBtn,'click',function(){
	//判断有没有选中的文件夹
	var inputChecked = whoSelect();//存一下当前选中的选框,是一个数组
	if(!inputChecked.length){
		tips('warn','请选择要重命名的文件');
		return;
	}else if(inputChecked.length>1){
		tips('warn','不能选择多个文件,请重新选择');
		return;
	}
	//如果选中了并且只选中了一项,开始进行重命名
	var fileText = inputChecked[0].parentNode.getElementsByClassName('file-text')[0];
	var fileName = inputChecked[0].parentNode.getElementsByClassName('file-name')[0];
	fileText.style.display = 'block';//编辑框出现
	fileText.value = fileName.innerHTML;
	fileText.select();//自动选择文字
	rename.isRename = true;//进入重命名状态
	if(fileText.isOn){
		return;
	}
	fileText.isOn = true;
	on(fileText,'mousedown',function(ev){
		ev.stopPropagation();
	});
	on(fileText,'click',function(ev){
		ev.stopPropagation();
	});
});
var fileText = fileArea.firstElementChild.getElementsByClassName('file-text')[0];
on(fileText,'keydown',function(ev){
	ev.stopPropagation();
})

on(renameBtn,'mousedown',function(ev){
	ev.stopPropagation();
});
//----------------------------重命名的document的keydown事件(按下enter建时)------------------------------------
on(document,'keydown',function(ev){
	if(rename.isRename){
		if(ev.keyCode == 13){
			var inputChecked = whoSelect();//存一下当前选中的选框,只有一个
			rename(inputChecked[0]);
			rename.isRename = false;
		}
	}
});
//----------------------------重命名的document的mousedown事件------------------------------------
on(document,'mousedown',function(){
	console.log(rename.isRename,'rename.isRename');
	if(rename.isRename){
		var inputChecked = whoSelect();//存一下当前选中的选框,只有一个
		var fileText = inputChecked[0].parentNode.getElementsByClassName('file-text')[0];
		var fileTextVal = fileText.value;
		rename(inputChecked[0]);
	}
	rename.isRename = false;
});
//重命名函数,作用是 传进来需要重命名的元素  如果输入了新名字,重命名,并且重新渲染树形菜单,没有输入新名字,按原来的名字
function rename(element){//element是需要重命名的元素
	var fileText = element.parentNode.getElementsByClassName('file-text')[0];//编辑框
	var fileName = element.parentNode.getElementsByClassName('file-name')[0];//文件夹的名字
	var fileTextVal = fileText.value;//编辑框输入的内容
		
	//--------检测有没有重名--------
	var breadSpan = $('.bread-nav span')[0];//找到当前面包屑导航里的span,也就是当前文件区域里的文件的父级
	var id = breadSpan.dataset.id;//获取当前面包屑导航里的span上的id
	var childs = getChildsById(id);//找到当前文件区域所渲染的数据
	if(!fileTextVal){
		fileText.style.display = 'none';
		return;
	}
	//检测是否和同级的文件夹重名
	//找到同级的标题(也就是childs的每一项的title),判断新建文件夹的标题和同级的标题是否重复,如果重复就新建失败
	for(var i=0; i<childs.length; i++){
		if(fileTextVal == childs[i].title){//和同级的标题有相同
			//如果不是和自己相同,是和其他文件夹相同,提示命名冲突
			if(childs[i].id != fileText.parentNode.dataset.id){
				fileText.style.display = 'none';
				tips('err','命名冲突,重命名失败');
				return;
			}else{//如果是和自己相同,说明没有修改标题,直接隐藏编辑框,不继续往下执行
				fileText.style.display = 'none';
				return;
			}
			
		}
	}
	//如果没有重名,走到这里
	fileName.innerHTML = fileTextVal;//文件夹的名字等于输入的新名字
	fileText.style.display = 'none';
	//把data里的数据作相应的改变
	data[element.dataset.id].title = fileTextVal;
	tree.innerHTML = createTreeHtml(initId,level);
	//提示重命名成功
	tips('ok','重命名成功');
}


//-----------------------------------------11.移动到-------------------------------------------

var moveBtn = $('#move');//移动到按钮
var moveTanBox = $('#move-tanbox');//移动到的弹窗
var moveTanCof = $('#move-tanbox .move-conf')[0];//移动到的弹窗的内容
var moveTree = $('.tree')[1];//移动到的弹窗里的树形菜单
var moveTreeWrap = $('.conf-content',moveTanBox)[0];
var moveTreeT = $('div',moveTree);//移动到的弹窗里的树形菜单的标题
var tanBox2 = $('.tanbox2')[0];//提醒的模态框
var tanBoxConf = $('.conf',tanBox2)[0];//提醒的模态框的内容块
var confBtns = $('.conf-btn a',tanBox2);//提醒的模态框的按钮(确定)
var confContent = $('.conf-content',tanBox2)[0];//模态框的提示内容
on(confBtns[0],'click',function(){
	tanBox2.style.display = 'none';
});
//点击移动到
//不能移动到自己里面,不能移动到自己的子孙级里(如果这样选的话,确定按钮不能点击);
//如果目标文件夹里有重名,不能移动并提示有重名,部分文件移动失败
//获取到目标文件的子孙级数据,里面有没有移动文件的数据的名字
on(moveBtn,'click',function(ev){
	moveTree.innerHTML = createTreeHtml(initId,level);
	//判断是不是有选中文件
	//如果没有选中,显示提示信息
	var inputChecked = whoSelect();//存一下当前选中的选框
	if(!inputChecked.length){//如果没有选中的文件
		tips('warn','请选择要移动的文件');
		return;
	}
	
	moveTanBox.style.display = 'block';
	mTween(moveTanBox,{
		opacity:1
	},400,'elasticIn');
	moveTip.innerHTML = '';//初始化提醒的内容
	moveTreeT[0].classList.add('active');//默认微云高亮
	
});
var moveTip = $('.move-tip')[0];
//给弹窗里的树形菜单绑定点击事件,用事件委托
on(moveTreeWrap,'click',function(ev){
	var target = ev.target;
	if(target == this){
		return;
	}
	if(target.parentNode.classList.contains('tree-title')){//如果事件源的父元素包含类名tree-title,就令事件源为该事件源的父级节点
		target = target.parentNode;
	}
	var treeTitleId = target.dataset.id;//找到该标题上的id
	var breadSpan = $('.bread-nav span')[0];//找到当前面包屑导航里的span,也就是当前文件区域里的文件的父级
	for(var i=0; i<moveTreeT.length; i++){
		moveTreeT[i].classList.remove('active');
	}
	target.classList.add('active');
	//找出来菜单里哪个标题被选中了(要移动到的目标位置),获取其id
	var positionId = target.dataset.id;
	var inputChecked = whoSelect();//存一下当前选中的选框
	var moveAlowed = true;
	inputChecked.forEach(function(item){
		if(positionId == breadSpan.dataset.id){
			moveTip.innerHTML = '不能移动到当前目录';
			moveAlowed = false;
		}
		if(item.dataset.id == positionId){//如果目标位置的id和选中的文件的id相同,提示不能移动
			moveTip.innerHTML = '不能移动到自身和子元素下';
			moveAlowed = false;
		}
		//找到选中的文件的所有的子孙元素
		console.log(getChildsAllById(item.dataset.id));
		getChildsAllById(item.dataset.id).forEach(function(item){
			if(item.id == positionId){//如果目标位置的id和选中的文件的id相同,提示不能移动
				
				moveTip.innerHTML = '不能移动到自身和子元素下';
				moveAlowed = false;
			}
		});
	});
	off(sure,'click',sureClick);//先解绑,因为如果第一次选中的目标位置合法,就绑定上了事件,再选一个不合法的时,sure身上已经有click事件.所以每次点击菜单标题,先解绑事件,再看要不要绑定事件
	if(moveAlowed){//如果循环结束后还是true,说明目标位置是合法的
		moveTip.innerHTML = '';//取消提醒
		on(sure,'click',sureClick);
	}
});


//弹窗的点击确定按钮时
//找出来菜单里哪个标题被选中了(要移动到的目标位置),获取其id
//把文件区域里选中的文件夹  及其子文件 以及子文件的子文件……移动到目标位置
var sure = $('.move-conf .conf-btn a')[0];
/*
 *  只移动一个文件
 		有重名  提示有重名 移动失败
 		没有重名 移动
 	移动多个文件
 		有部分重名 
 		全部重名
 		没有重名
 */
function sureClick(ev){
	var inputChecked = whoSelect();//存一下当前选中的选框
	//找出来菜单里哪个标题被选中了(要移动到的目标父级),获取其id
	for(var i=0; i<moveTreeT.length; i++){
		if(moveTreeT[i].classList.contains('active')){
			var positionId = moveTreeT[i].dataset.id;
		}
	}
	//如果移动到目标父级中，和要移动的文件有重名，重名的文件移动不成功，并提示“部分文件移动失败”
	//找到要移动的文件对应的数据,和目标父级的子数据的title进行对比
	var positionChildsData = getChildsById(positionId);	//找到目标父级的子数据
	inputChecked.forEach(function(item1){//item是每个选中的选框
		var title = getDataById(item1.parentNode.dataset.id).title;
		if(isExistNameById(positionId,title)){
			tanBox2.style.display = 'block';
			confContent.innerHTML = '部分文件名有重复,部分文件移动失败';
		}else{
			item1.parentNode.remove();//从当前结构里移除选中的文件
			//找到目标位置对应的数据,把选中文件的数据的pid改为目标位置的数据的id
			getDataById(item1.dataset.id).pid = positionId;
		}
	});
	//根据新的id和pid重新设置所有数据的child
	for(var attr in data){
		data[attr].child = childId(data[attr].id);
	}
	
	
	tree.innerHTML = createTreeHtml(initId,level);
	//隐藏弹窗
	moveTanBox.style.display = 'none';
	if(getComputedStyle(tanBox2)['display'] == 'none'){//如果提示部分文件有重复的弹窗没有出现,提示移动成功
		tips('ok','移动成功');
	}
	console.log(getComputedStyle(tanBox2)['display']);
	//移动完毕之后判断当前的文件区域是否为空
	if(!fileArea.innerHTML){//如果是空
		fileBlank.style.display = 'block';//显示提醒
		checkAll.classList.remove('checked');
	}
	var breadSpan = $('.bread-nav span')[0];//找到当前面包屑导航里的span,也就是当前文件区域里的文件的父级
	positionElement(breadSpan.dataset.id);
	
}

var cancel = $('.move-conf .conf-btn a')[1];
//点击取消按钮
on(cancel,'click',function(){
	mTween(moveTanBox,{
		opacity:0
	},400,'linear',function(){
		moveTanBox.style.display = 'none';
	});
});


