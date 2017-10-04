import React from 'react';
// 留言列表的每一个li也拆成组件：Item
class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isEdit: false,
            editText: this.props.text // 用了onChange之后变为受控元素，交互受react的控制，所以在触发onChange时要通过改变状态来改变输入框的内容
            // 如果不用这个状态，在编辑框输入内容会无法输入
        }
    }
    removeItem(){
        console.log(this);
        // 如果没有修改，那么这个函数里的this指向undefined，但是咱们想要的是使this指向当前的组件Item，所以在onClick绑定函数removeItem时修改this指向
        // 修改后this指向当前的组件Item，才可以通过this.props拿到父组件传进来的函数removeItemMaincont
        // 触发这个函数并把当前点击的按钮对应的数据的id传进去
        this.props.removeItemMaincont(this.props.id);

    }
    SingleCheckedItem(ev){
        // 提交单选按钮的状态，修改list的isChecked的值
        this.props.SingleCheckedMaincont(this.props.id,ev.target.checked)
    }
    // 开始编辑
    editTodo(){
        this.beforeText = this.state.editText; // 存一下现在输入框的值，以后取消编辑时要用
        // 改变状态isEdit，使进入编辑状态（编辑框的出现和隐藏是 通过改变状态来控制class名的添加与否 这样实现的）
        this.setState({
            isEdit:true
        },()=>{
            this.input.focus();
            // this.input.setSelectionRange(this.input.value.length,this.input.value.length)
        })
        // 自动获取焦点  什么时候获取？是在渲染之前还是之后？
        /*
            怎么获取元素？
                和vue相同，ref          ref={(input)=>{this.input=input}} 把input这个元素存储在react实例上  可以直接this.input去找该元素
            什么时候获取？是在渲染之前还是之后？
                因为setState是异步的，渲染是需要时间的，会先执行下面的代码，
                怎么知道什么时候渲染完毕了？
                    答：生命周期   不同的周期会触发不同的钩子函数
                    双击编辑，用setState()使isEdit:true，更新了状态会触发render重新渲染视图，也就走一遍生命周期
                    方法2：setState()的第二个参数是一个回调函数，状态更新完毕之后会执行回调函数
            直接用focus()，输入框的光标默认在文字最前面，怎么使光标定位在文字的最后面？（有些电脑默认就是在文字的最后面，不用特意设置）
                定位光标的方法setSelectionRange()   是input的方法

            改变输入框的值 

            按esc取消编辑
                设置为之前的只 
                按esc改变isEdit状态，先触发esc，后触发blur

                当在编辑框输入内容时告诉父级新内容


            setState()是异步的
        */
    }

    // 在编辑框输入时
    editTodoText(ev){

        // 在编辑框出入内容时，会触发onChange事件，执行这个函数
        // 改变输入框的值要通过改状态来控制
        this.setState({
            editText: ev.target.value
        })
        console.log(this.state.editText,'this.state.editText'); // 发现和输入的内容不同步，每次打出来的是上一次输入时输入框的value
        
        // this.props.editKeyDownMaincont(this.props.id,this.state.editText); // 如果把设置完毕新的this.state.editText传给App，那么会发现少一位，因为setState()是异步的，
        this.props.editKeyDownMaincont(this.props.id,ev.target.value); // 所以要把当前输入框的value值传给App根组件
        
    }
    // 编辑框失去焦点时
    editBlur(ev){
        // 拿到编辑框的value值，告诉父级，一直到App根组件，在App根组件里拿到值之后，修改数据
        //this.props.editKeyDownMaincont(this.props.id,ev.target.value); 
        /* 如果这样写，那么当按下esc键时，发现也编辑成功了，因为按esc也会触发onblur事件，因为把isEdit改为 false后编辑框失去焦点
         （先触发esc键盘事件，后触发blur，因为按下esc的瞬间就触发了键盘事件，而在失去焦点时才会触发onblur）
         所以改为当在编辑框输入内容时告诉父级新内容，因为是onChange双向绑定，注意
         */

        this.setState({
            isEdit: false
        })
    }

    // 按下键时
    editKeyDone(ev){
        if(ev.keyCode ===13){ // 在编辑框按下enter键时
            console.log(ev.target.value); 
            // 拿到编辑框的value值，告诉父级，一直到App根组件，在App根组件里拿到值之后，修改数据
            this.props.editKeyDownMaincont(this.props.id,ev.target.value);
            this.setState({
                isEdit: false
            })
        }else if(ev.keyCode === 27){ // 按esc键取消编辑
            // 告诉App组件把数据里的text改为编辑之前的内容，所以在开始编辑时要事先存一下原来的内容
            this.props.editKeyDownMaincont(this.props.id,this.beforeText);
            this.beforeText = '';
            this.setState({
                isEdit: false
            })
        }
    }
    render(){
        // 编辑框出现是class名控制的
        // 添加多个class名，也可以用数组，数组用join(' ')
        // 第三种方法（需要插件）：  <li className={}>

        let clsName1 = this.props.isChecked?'completed':'';
        let clsName2 =  this.state.isEdit?'editing':'';
        console.log(clsName1,clsName2)
        return <li className={clsName1+' '+clsName2}>
                <div className="view">
                    <input className="toggle" type="checkbox" onChange={this.SingleCheckedItem.bind(this)} checked={this.props.isChecked?'checked':''} />
                    <label onDoubleClick={this.editTodo.bind(this)} style={{display:this.state.isEdit?"none":"block"}}>{this.props.text}</label>
                    <button className="destroy" onClick={this.removeItem.bind(this)}></button>
                </div>
                <input 
                    ref={(input)=>{this.input=input}}
                    className="edit"
                    onKeyDown={this.editKeyDone.bind(this)}
                    value={this.state.editText}
                    onChange={this.editTodoText.bind(this)}
                    onBlur={this.editBlur.bind(this)}
                />
            </li>
    }
}
export default Item;
