<template>
  <div>
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num cart-num">
        <i>0</i>
    </span>
    <div class="nav-cart-wrapper">
        <div class="nav-cart-list">
            <div class="empty" v-show="!smallCarList.length">
              <!-- smallCarList是加入购物车的商品的列表，根据smallCarList的长度来判断展示“空”还是商品 -->
                <h3>购物车为空</h3>
                <p>您还没有选购任何商品，现在前往商城选购吧!</p>
            </div>
            <div class="full" v-show="smallCarList.length">
             <!-- smallCarList是加入购物车的商品的列表，根据smallCarList的长度来判断展示“空”还是商品 -->
                <div class="nav-cart-items">
                    <ul>
                        <li class="clear" v-for="item in smallCarList">
                          <!-- smallCarList是存着商品信息的数组 -->
                            <div class="cart-item js-cart-item cart-item-sell">
                                <div class="cart-item-inner">
                                    <div class="item-thumb">
                                        <img :src="item.ali_image">
                                    </div>
                                    <div class="item-desc">
                                        <div class="cart-cell">
                                            <h4>
                                                <a href="#/item/100027401">{{item.title}}</a>
                                            </h4>
                                            <p class="attrs">
                                                <span>透明</span>
                                            </p>
                                            <h6>
                                                <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.sku_num}}</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="del-btn" @click="deleteGoods(item.sku_id)">删除</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="nav-cart-total">
                    <p>共 <strong class="ng-binding">{{smallCarGoodsTotalNum}}</strong> 件商品</p>
                    <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{smallCarGoodsTotalPrice}}</span></h5>
                    <h6>
                        <a ng-href="http://www.smartisan.com/shop/#/cart" class="nav-cart-btn" href="http://www.smartisan.com/shop/#/cart">去购物车</a>
                    </h6>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      // smallCarList: [] // smallCarList不能在data里写死，如果在这里赋值为[]，那么修改state.smallCarList时，这个组件里的smallCarList仍然为[]，不能响应变化
      // 要随着添加而改变，所以用计算属性，定义smallCar，把store里的state里的smallCarList赋给smallCar
    }
  },
  // 要把smallCarList放入store里，注意之前一定要先定义，否则会报错："smallCarList" is not defined 
  // 注意：computed里的属性名和data里的不能重名，否则会报错，可以改个其他名字，也可以不在data里定义，直接在computed里定义
  // 在结构里渲染的时候注意
  computed: {
    /* smallCar () {
      return this.$store.state.smallCarList
    } */
    smallCarList () {
      return this.$store.state.smallCarList
    },
    // 商品总数
    smallCarGoodsTotalNum () {
      let n = 0;
      this.smallCarList.forEach((item) => {
        n += item.sku_num
      })
      return n
    },
    // 商品价格
    smallCarGoodsTotalPrice () {
      let p = 0;
      this.smallCarList.forEach((item) => {
        p += item.price*item.sku_num
      })
      return p
    }
  },
  mounted () {
    //发送请求，拿到小购物车的数据
    Axios.get('http://localhost:3100/api/getShopCarList')
    .then((data) => {
      /*提交修改请求，修改smallCarList的属性值；因为state里存的初始smallCarList: []，
      所以一刷新就给state里的smallCarList赋购物车里的商品数据，从而导致这里的计算属性smallCarList变化，使结构渲染*/
      this.$store.commit('changeSmallCarList',data.data)
    })
  },
  methods: {
    // 点击删除按钮，执行deleteGoods函数(接收id)，通过改变smallCarList的值来实现删除
    deleteGoods (id) {
      console.log(id,'id')
      // 1.向后端发送请求，请求参数：{removeId： 删除商品的id}
      Axios.post(
        'http://localhost:3100/api/removeCarShopById',
        {
          removeId:id
        }
      )// 2.拿到后端的返回信息，后端返回的是：****删除后 小购物车所有的数据****
      .then((data) => {
        console.log(data)
        // 提交（触发）一个类型为 changeSmallCarList 的 mutation，把新的数据传进去；changeSmallCarList对应的函数就会执行，修改smallCarList的值
        this.$store.commit('changeSmallCarList',data.data)
      })
    }
  }
}
</script>

