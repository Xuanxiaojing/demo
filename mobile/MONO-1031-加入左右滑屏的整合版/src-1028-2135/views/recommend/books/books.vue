<template>
	<div>
		<PubNav :nav_data = "nav_data"></PubNav>
    <div class = "content">
			<div>
				<section class="searchList">
					<ul id = 'movielist'>
						<BooksItem 
							v-for = "item,index in this.$store.state.navData.data.list.books" 
							:key = "index" 
							:item = "item" :index = "index">								
						</BooksItem> 
					</ul>
				</section>  
			</div> 
		</div>
		<Footer-nav></Footer-nav> 
	</div>
</template>

<script>
    import Axios from 'axios'
		import FooterNav from '@/components/footer/footer'
		import PubNav from '@/views/recommend/pub-nav/pub-nav'
		import BooksItem from '@/views/recommend/books/books-item'
		import api from '@/api/api.js' // 请求数据的文件

    export default {
			props:["nav_data"],
      components:{
          FooterNav,
          PubNav,
          BooksItem
      },
      mounted(){
        this.getBooksData()
      },
      methods:{
        getBooksData(){
          let _this = this;
					// Axios.get(
					// 	"http://localhost:3200/api/books"
					// 	)
					// 	.then((data)=>{
					// 		//console.log(data.data.data.list.subjects,'movie');
					// 		//console.log(data.data.data.list.subjects[0],'123');
					// 		//console.log(data.data,"图书")
					// 		_this.$store.commit("changeNavData",data.data)
					// 		//console.log(this.$store.state.navData)//测试打印次数
					// 	}
					// )
					api.getBooksData().then((data)=>{
							console.log(data.data,"图书")
							_this.$store.commit("changeNavData",data.data)
						})
        }
      }
    }
</script>

