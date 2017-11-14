import React from 'react';
import TodoHeader from './components/todo-header.js'
import Maincont from './components/maincont.js'
import TodoFooter from './components/todofooter.js'



// let n = list.length;
class App extends React.Component{
  constructor (props) {
      super(props);
      // 全局向App组件传进来了list数组，这里可以通过this.props.list拿到
      this.state = {
          list: this.props.list, // 
          isAllChecked: false,
          isEdit: false
      }
      console.log(this.state.list)
      
  }
  // App里定义函数getValueApp，传给TodoHeader，某个时刻在TodoHeader触发函数getValueApp，把要向App组件发送的数据通过函数getValueApp传参传进来，在这里用形参接收
  
  getValueApp(val){
      // 接收到子组件发来的数据之后，做一些事情（添加）
      // 改变list要通过state
      let arr = this.state.list;
      //   n++;
      arr.push({
          id:Date.now(),
          text: val,
          isChecked: false
      })
      // 用setState()方法修改list的值
      console.log(arr,'arr')
      this.setState({
          list: arr
      })
  }

  // 删除
  removeItemApp(id){          
      // 拿到Maincont组件传过来的id
      // 不能直接操作this.props.list，要操作this.state.list
      let arr = this.state.list; // 存一下list数组
      arr.forEach((item,index) => { // 根据id删除数据
          
          if(item.id === id){
              arr.splice(index,1)
          }
      })
      // 用setState()方法修改list的值
      this.setState({
          list: arr
      })
  }
  changeCheckedApp(isChecked){
      // App组件拿到传过来的全选按钮的状态之后，
      console.log(this.state.isAllChecked,'isAllChecked')
      // 修改list的isChecked的值
      let arr = this.state.list; // 存一下list数组
      arr.forEach((item,index) => { // 根据id删除数据
          item.isChecked = isChecked; // 其实在这里
      })
      // 必须改list状态才会重新渲染
      this.setState({
          list: arr
      })
  }
  SingleCheckedApp(id,c){
      let arr = this.state.list; // 存一下list数组
      arr.forEach((item,index) => {
          if(item.id === id){
              item.isChecked = c;
          }
      })
      this.setState({
          list: arr
      })
  }
  editKeyDownApp(id,val){
    console.log(id,val)
    let arr = this.state.list; // 存一下list数组
    arr.forEach((item) => {
        if(item.id === id){
            item.text = val;
        }
    })
    this.setState({
        list: arr
    })

  }

  render(){
    let content, footer;  // 要渲染的是undefined或null，那么会忽略不渲染
    if(this.props.list.length){
        let n=0;
        this.props.list.forEach((item) => {
            if(item.isChecked){
                n++;
            }
        })
        content =  <Maincont 
                        list={this.props.list} 
                        removeItemApp={this.removeItemApp.bind(this)} 
                        changeCheckedApp={this.changeCheckedApp.bind(this)} 
                        isAllChecked={this.state.isAllChecked}
                        n={n}
                        SingleCheckedApp={this.SingleCheckedApp.bind(this)}
                        editKeyDownApp={this.editKeyDownApp.bind(this)}
                    />
        footer=<TodoFooter list={this.props.list} n={n} />
    }
      return <section className="todoapp" id="todoapp">
              <TodoHeader getValueApp={this.getValueApp.bind(this)} />
              {content}
              {footer}                        
          </section>
  }
}

export default App;
