/*
    todo:[
        {
            id:,
            txt:,
            isChecked:
        }
    ]
*/

/*
     如果单选框被选中，那么toggle这个input框行间有属性checked=""；
*/

let textIput =  document.querySelector('.new-todo');
let todoList = document.querySelector('.todo-list');
let inputs = todoList.getElementsByClassName('toggle');

//封装函数，作用是渲染todoList的结构
function render(dataArr){
    let html = dataArr.map((item)=>{
        console.log(item.isChecked?'111':'222')
        return `<li data-id="${item.id}" class="${item.isChecked?'completed':''}" >
                    <div class="view">
                        <input class="toggle" type="checkbox" ${item.isChecked?'checked':''}/>
                        <label>${item.txt}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${item.txt}">
                </li>`;
    }).join('');
    return html;
};

//封装一个函数，判断哪些选框被选中了
function whoSelect(){
    let arr = [];
    for(var i=0; i<inputs.length; i++){
        if(inputs[i].checked){
            arr.push(inputs[i]);
        }
    }
    return arr;
}

//封装函数，判断是否全选
function checkedAllOrNot(){
    let checkAll = document.querySelector('.toggle-all');
    if(whoSelect().length == inputs.length && inputs.length != 0){
        checkAll.checked = true;
    }else{
        checkAll.checked = false;
    }
}

//封装函数，判断当前有几条未选中
let notCheckedNum = ()=>{
    let todoCheckedNum = document.querySelector('.todo-count strong');
    todoCheckedNum.innerHTML = inputs.length - whoSelect().length;
}
//封装一个函数，根据id删除数据
function deleteDataById(id){
    dataArr.forEach(function(item,index){
        if(item.id == id){
            dataArr.splice(index,1);
        }
    })
}
//封装一个函数，根据id找数据
function getDataById(id){
    /* dataArr.forEach(function(item){
        if(item.id == id){
            console.log(item.id == id)
            return item;
        }
    }); */
    for(var i=0; i<dataArr.length; i++){
        if(dataArr[i].id == id){
            return dataArr[i];
        }
    }
}


//一上来从localStorage里拿数据，渲染结构
let dataStr = localStorage.getItem('todo');
console.log(dataStr);
let dataArr = [];
let dataObj = {};
let n=0;
if(dataStr){
    dataArr = JSON.parse(dataStr);
    console.log(dataArr,'data');
    todoList.innerHTML = render(dataArr);
    //判断是否全选
    checkedAllOrNot();
    //判断几条未选中
    notCheckedNum();
    if(dataArr.length>0){
        n = dataArr[dataArr.length-1].id;
    }else{
        n=0;
    }
}
let checkAll = document.querySelector('.toggle-all');
let footer = document.querySelector('footer');
if(!dataArr || !dataArr.length){
    checkAll.style.display = 'none';
    footer.style.display = 'none';
}

/* 添加：
    输入内容，按enter键，自动添加一条
    添加结构，
    添加数据到localStorage 的'todo':每条数据的形式：{id:,txt:,isChecked: }
    只要添加，就一定不是全选
    每添加一条，未选中的条数就增加一条
*/



textIput.addEventListener('keydown',function(ev){   
    if(ev.keyCode == 13){
        n++;
        //如果按下enter键
        let textVal = textIput.value;
        dataObj = {
            'id':n,
            'txt':textVal,
            'isChecked':false
        } 
        dataArr.push(dataObj);
        todoList.innerHTML = render(dataArr);
        //添加数据到localStorage 
        localStorage.setItem('todo',JSON.stringify(dataArr));
        textIput.value = '';
        checkAll.style.display = 'block';
        footer.style.display = 'block';
        checkAll.checked = false;
        //判断几条未选中
        notCheckedNum();
    };
});

//-----------------------------全选--------------------------
/* 全选：
    如果全选按钮被选中，所有留言都被选中，内容划上横线
    否则 */

checkAll.addEventListener('click',function(){
    if(this.checked){
        Array.from(inputs).forEach(function(item) {
            item.checked = true;
        });
    }else{
        Array.from(inputs).forEach(function(item) {
            item.checked = false;
        });
    }
});

//--------------------------单选--------------------------
/* 单选：
    点击每条留言，被选中，内容划上横线 */


todoList.addEventListener('click',function(ev){
    let target = ev.target;
    if(target.classList.contains('toggle')){
        //如果已经选中
        let id = target.parentNode.parentNode.dataset.id;
        if(target.checked == false){
            target.parentNode.parentNode.classList.remove('completed');
            //把数据里相应的isChecked属性的值改为True，并且更新localStorage里的数据
            dataArr.forEach(function(item){
                if(item.id == id){
                    item.isChecked = false;
                }
            });
            localStorage.setItem('todo',JSON.stringify(dataArr));
        }else{
            target.parentNode.parentNode.classList.add('completed');
            //把数据里相应的isChecked属性的值改为True，并且更新localStorage里的数据
            dataArr.forEach(function(item){
                if(item.id == id){
                    item.isChecked = true;
                }
            });
            localStorage.setItem('todo',JSON.stringify(dataArr));
        }
        //判断是否全选
        checkedAllOrNot();
        //判断几条未选中
        notCheckedNum();
    }
});

//-----------------------删除--------------------------

/* 删除：
    点击destroy叉叉，删除结构，删除数据 */

//封装函数，删除结构和数据
function deleteFn(element){
    //删除结构
    element.parentNode.parentNode.remove();
    //删除数据
    let id = element.parentNode.parentNode.dataset.id;
    deleteDataById(id);
    //更新localStorage里的数据
    localStorage.setItem('todo',JSON.stringify(dataArr));
    //判断是否全选
    checkedAllOrNot();
    //判断几条未选中
    notCheckedNum();
}
let deleteBtns = document.getElementsByClassName('destroy');

todoList.addEventListener('click',function(ev){
    let target = ev.target;
    if(target.classList.contains('destroy')){
        deleteFn(target);
        if(dataArr.length == 0){
            checkAll.style.display = 'none';
            footer.style.display = 'none';
        }
    }
});


//------------------------删除选中-------------------------
/*  let clearCompleted = document.querySelector('.clear-completed');
clearCompleted.addEventListener('click',function(){
    let checkedInput = whoSelect();
    checkedInput.forEach(function(item){
        deleteFn(item);
    })
});  */

//-----------------------重命名--------------------------
/* 重命名：
    双击留言，出来编辑框，输入内容，
    按enter键重命名成功，
    按esc键重命名失败


    不管成功与否，都回到原来的状态
            如果是选中状态，灰色字体加横线
            未选中状态，黑色字体不加横线 */

let labels = todoList.getElementsByTagName('label');



todoList.ondblclick = function(ev){
    let target = ev.target;
    if(target.nodeName == 'LABEL'){
        let li = target.parentNode.parentNode
        let edit = li.querySelector('.edit');
        edit.style.display = 'block';
        li.classList.add('editing');
        //在edit上按下enter键
        edit.onkeydown = function(ev){
            if(ev.keyCode == 13){//如果按下enter键
                //拿到edit输入框里的value值，赋给target
                rename();
            }
            if(ev.keyCode == 27){
                edit.style.display = 'none';
                li.classList.remove('editing');
            }
        };
        edit.onblur = function(){
            rename();
        };
        let rename = ()=>{
            target.innerHTML = edit.value;
            edit.style.display = 'none';
            li.classList.remove('editing');
            //修改数据dataArr里的txt，并把新的dataArr存到本地
            getDataById(2).txt = target.innerHTML;
            localStorage.setItem('todo',JSON.stringify(dataArr));
        }
    }
};


