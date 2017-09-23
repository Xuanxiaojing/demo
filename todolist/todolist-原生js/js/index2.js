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
    console.log(dataArr,'dataArr')
    let html = dataArr.map((item)=>{
        return `<li>
                    <div class="view">
                        <input class="toggle" type="checkbox" data-id="${item.id}" ${item.isChecked?'checked':''}/>
                        <label>${item.txt}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${item.txt}">
                </li>`
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



//一上来从localStorage里拿数据，渲染结构
let dataStr = localStorage.getItem('todo');
let dataArr = [];
let dataObj = {};
if(dataStr){
    dataArr = JSON.parse(dataStr);
    todoList.innerHTML = render(dataArr);
    //判断是否全选
    checkedAllOrNot();
}

/* 添加：
    输入内容，按enter键，自动添加一条
    添加结构，
    添加数据到localStorage 的'todo':每条数据的形式：{id:,txt:,isChecked: }
    只要添加，就一定不是全选
*/

let n=0;
document.addEventListener('keydown',function(ev){   
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
        checkAll.checked = false;
    };
});

//-----------------------------全选--------------------------
/* 全选：
    如果全选按钮被选中，所有留言都被选中，内容划上横线
    否则 */
let checkAll = document.querySelector('.toggle-all');
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
        if(target.checked == false){
            //把数据里相应的isChecked属性的值改为True，并且更新localStorage里的数据
            dataArr.forEach(function(item){
                if(item.id == target.dataset.id){
                    item.isChecked = false;
                }
            });
            localStorage.setItem('todo',JSON.stringify(dataArr));
        }else{
            console.log('che')
            //把数据里相应的isChecked属性的值改为True，并且更新localStorage里的数据
            dataArr.forEach(function(item){
                if(item.id == target.dataset.id){
                    item.isChecked = true;
                }
            });
            localStorage.setItem('todo',JSON.stringify(dataArr));
        }
        //判断是否全选
        checkedAllOrNot();
        notCheckedNum();
    }
});

//-----------------------删除--------------------------


