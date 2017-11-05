import React from 'react';

class TodoFooter extends React.Component{
    render(){
        if(this.props.list.length !==0 ){ // 如果list数组不为空，显示footer
            return <footer className="footer">
                <span className="todo-count">
                    <strong>0</strong>
                    <span>条未选中</span>
                </span>
                <ul className="filters">
                    <li>
                        <a href="#all">
                         All
                        </a>
                    </li>
                    <li>
                        <a href="#active" >
                         Active
                        </a>
                    </li>
                    <li>
                        <a href="#completed">
                         Completed
                        </a>
                    </li>
                </ul>
                <button className="clear-completed">
                    Clear completed
                </button>
            </footer>
        }else{ // 如果list数组为空，footer不渲染
            return ''
        }     
    }
}
export default TodoFooter;
