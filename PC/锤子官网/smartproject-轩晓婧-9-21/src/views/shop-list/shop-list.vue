<template>
  <div>
    <header-nav></header-nav>
    <div id="main">
			<div class="sku-box store-content">
				<div class="sort-option">
					<ul class="line clear">
						<li><a href="javascript:;" class="active">综合排序</a></li>
						<li><a href="javascript:;" class="">销量排序</a></li>
						<li><a href="javascript:;" class="">价格低到高</a></li>
						<li><a href="javascript:;" class="">价格高到低</a></li>
					</ul>
				</div>
				<div class="gray-box">
					<div class="item-box">
						<shop-item
              v-for="item in shopList"
              key="index"
              :item-data="item"
            ></shop-item>
					</div>
				</div>
			</div>
		</div>
  </div>
  

</template>

<script>
import HeaderNav from '@/components/header-nav'
import shopItem from '@/views/shop-list/shop-item'

import Axios from 'axios'

export default {
  data () {
    return {
      shopList: []
    }
  },
  components: {
      HeaderNav,
      shopItem
  },
  mounted () {
    // 拿数据
    Axios.get(
      'http://localhost:3100/api/list'
    )
    .then((data) => {
      // data就是后端返回的数据，
      console.log(data,'data'); // 发现 data.data.list才是我们想要的数据
      this.shopList = data.data.list
    })
  }
}
</script>

