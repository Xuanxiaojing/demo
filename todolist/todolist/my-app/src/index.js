import React from 'react';
import ReactDOM from 'react-dom';
import './css/base.css';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* 
            设计一套数据来渲染结构:
                把数据传给根组件=> 传给Maincont组件 => 传给
        */
        let list = [
            {
                'id':1,
                'text': '写作业',
                'isChecked': true
            },
            {
                'id':2,
                'text': '出去玩',
                'isChecked': false
            },
            {
                'id':3,
                'text': '睡觉',
                'isChecked': false
            }
        ]
        
        /*
            添加内容（在TodoHeader组件的输入框按下enter键，把内容作为留言添加到列表组件列，涉及兄弟组件间的通信）**通过父级通信**
                在输入框keyDown时，把要添加的内容传给父级，父级拿到数据 通过setState改变state里的list的值，然后因为子组件用的list是父组件传过去的，所以子组件的list自然也变了
        */

        /*
            删除：删除按钮在Item组件里，把id传给父级，通过id删除
                回调函数：App => Maincont => Item
                id ：Item => Maincont => App
        */

        /*
            全选：
                点击全选按钮时，把全选按钮的checked属性值传给单选框
                    Maincont => App，App通过setState改变state里的isAllChecked的值， => 传给Maincont => Item
        */

ReactDOM.render(<App list={list} />, document.getElementById('root'));
registerServiceWorker();
