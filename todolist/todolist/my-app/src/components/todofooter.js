import React from 'react';


class TodoFooter extends React.Component{
    render(){
        // 判断几条未选中：在App的render()里，把计算的选中的条数 n 传入TodoFooter组件这里，数据的总条数减去选中的条数n就是未选中的条数
        return <footer className="footer">
            <span className="todo-count">
                <strong>{this.props.list.length - this.props.n}</strong>
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
    }
}
export default TodoFooter;
