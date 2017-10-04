import React from 'react';
import Item from './item.js'
// 中间留言列表组件
class Maincont extends React.Component{
    // Maincont组件定义函数removeItemMaincont，传给子组件Item（注意改变this的指向），某个时刻在Item组件里（点击删除按钮时）触发函数removeItemMaincont
    removeItemMaincont(id){
        
        // bind修改this指向为Maincont组件，这样在这里才可以通过this.props拿到父组件App传进来的函数removeItemApp
        // removeItemMaincont函数通过形参接收到子组件Item的removeItem函数传进来的id，再往App组件里传
        this.props.removeItemApp(id)
    }
    changeCheckedMaincont(ev){
        console.log('全选按钮被点击了');
        console.log(ev.target.checked,'全选按钮的选中状态')
        this.props.changeCheckedApp(ev.target.checked)
    }
    SingleCheckedMaincont(id,c){
        this.props.SingleCheckedApp(id,c)
    }
    editKeyDownMaincont(id,val){ // 接收Item组件传过来的编辑框的value值
        this.props.editKeyDownApp(id,val)
    }
    render(){
        /* let cssStyle = {}
        if(this.props.list.length === 0){
            cssStyle = {display:'none'}
        }   */              
        return <section className="main">
                <input className="toggle-all" type="checkbox" onChange={this.changeCheckedMaincont.bind(this)} checked={this.props.n === this.props.list.length} />
                <ul className="todo-list">
                    {
                        this.props.list.map((item,index) => {
                            console.log(this); // Maincont
                            console.log(item,'item')
                            return <Item 
                                key={index}
                                text={item.text}
                                id={item.id}
                                removeItemMaincont={this.removeItemMaincont.bind(this)}
                                isChecked={item.isChecked}
                                isAllChecked={this.props.isAllChecked}
                                SingleCheckedMaincont={this.SingleCheckedMaincont.bind(this)}
                                editKeyDownMaincont={this.editKeyDownMaincont.bind(this)}
                            />
                        })
                    }
                </ul>
            </section>
    }
}
export default Maincont;
