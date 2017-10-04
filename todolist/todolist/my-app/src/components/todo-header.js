import React from 'react';
class TodoHeader extends React.Component{
    getValueHeader(ev){
        console.log(this);
        // 如果没有修改，那么这个函数里的this指向undefined，但是咱们想要的是使this指向当前的组件TodoHeader，所以在onKeyDown绑定函数时，修改this指向（用bind）
        // 修改后this指向当前的组件TodoHeader，才可以通过this.props拿到父组件传进来的函数getValueApp
        if(ev.keyCode === 13){
            this.props.getValueApp(ev.target.value);
            ev.target.value = '';
        }
    }
    render(){
        return <header className="header" >
                <h1>todos</h1>
                <input className="new-todo" placeholder="请输入内容" onKeyDown={this.getValueHeader.bind(this)}/>
            </header>
    }
}
export default TodoHeader;
