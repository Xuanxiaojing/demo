<template>
  <div class="item">
    <div>
      <div class="item-img">
        <img 
         :alt="items.title" 
         :src="items.ali_image" style="opacity: 1;">
      </div>
      <!-- <h6>{{itemData.sku_info[index].title}}</h6> -->
      <h6>{{items.title}}</h6>
      <h3 >{{items.sub_title}}</h3>
      <div class="params-colors">
        <ul class="colors-list">
          <li v-for="icon,i in icons" @mouseenter="index=i">
            <a href="javascript:;" :class="{active: i === index}">
              <!-- 哪个小按钮高亮和index挂钩，index默认是0，所以默认是第一个小按钮高亮 -->
              <img :src="'http://img01.smartisanos.cn/'+icon+'20X20.jpg'">
            </a>
          </li>
        </ul>
      </div>
      <div class="item-btns clearfix">
        <span class="item-gray-btn"><a href="javascript:;" target="_blank">查看详情</a> </span>
        <span class="item-blue-btn" v-show="items.direct_to_cart" @click="addToShopCar">加入购物车 </span>
        <!-- 是否有加入购物车的按钮？控制加入购物车按钮的显示隐藏 
            判断的依据：后端的数据"direct_to_cart": false隐藏,true显示
        -->
      </div>
      <div class="item-price clearfix">
        <i>¥</i><span>{{itemData.price}}.00</span>
      </div>
      <div class="discount-icon">false</div>
      <div class="item-cover">
        <a href="javascript:;" target="_blank"></a>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios' // 引入axios
export default {
  props: ['itemData'],
  data () {
    return {
      index: 0
    }
  },
  computed: {
    items () { // items是一个对象，是sku_info数组里的某一项，对应着某个商品的某个详细商品
      return this.itemData.sku_info[this.index]
    },
    icons () { // icons是一个数组，存放着每一个小圆圈的图片 
      // 要根据每个详细商品的信息渲染小圆圈（不同的详细商品对应不同的小圆圈颜色），循环this.itemData.sku_info
      // 想要的是数组sku_info的每个对象里spec_json数组的第一项
      let arr = [];
      this.itemData.sku_info.forEach((item) => {
        arr.push(item.spec_json[0].image)
      })
      return arr
    }
  },
  methods: {
    addToShopCar () {
      Axios.post(
        'http://localhost:3100/api/setShopCarList', // 第一个参数是请求的地址
        {  // 第二个参数是一个对象,key值是前后端约定好的，前后端发送的是json字符串
          carList: JSON.stringify(this.items)
        }
      ) // 返回全部的已加入购物车的所有商品的数据
      .then((data) => {
        console.log(this)
        console.log(data) // 发现data.data.car_list是想要的商品信息
        // 拿到要小购物车的商品信息之后，调用$store.commit方法 提交（触发）一个类型为 changeSmallCarList 的 mutation
        this.$store.commit('changeSmallCarList', data.data)
        // 可以向 $store.commit() 传入额外的参数，即 mutation 的 载荷（payload）
        // 因为要把拿到的所点击的商品信息放入smallCarList数组里，所以提交修改请求的同时，要把要加入的商品信息告诉mutation的回调函数
      })
    }
  }
}
</script>

