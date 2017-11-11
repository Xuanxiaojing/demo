import React from 'react';
// 留言列表的每一个li也拆成组件：Item
class Item extends React.Component{
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
    render(){
        return <li className={this.props.isChecked?'completed':''}>
                <div className="view">
                    <input className="toggle" type="checkbox" onChange={this.SingleCheckedItem.bind(this)} checked={this.props.isChecked?'checked':''} />
                    <label>{this.props.text}</label>
                    <button className="destroy" onClick={this.removeItem.bind(this)}></button>
                </div>
                <input className="edit"/>
            </li>
    }
}
export default Item;
