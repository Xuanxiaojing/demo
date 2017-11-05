<template>
	<div>
		<BooksItem 
			v-if="bookList"
			v-for = "item,index in bookList"
			:key = "index"
			:item = "item" :index = "index">								
		</BooksItem> 
	</div>
</template>

<script>
		import BooksItem from '@/views/recommend/books/books-item'
		import api from '@/api/api.js' // 请求数据的文件

    export default {
      components:{
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
							_this.$store.commit("changeNavData",data.data)
					})
        }
			},
			computed: {
				bookList(){
						return this.$store.state.bookList									
				}
			}
    }
</script>

