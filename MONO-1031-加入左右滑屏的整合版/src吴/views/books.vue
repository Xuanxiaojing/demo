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
    import FooterNav from '@/components/footer'
    import PubNav from '@/components/pub-nav'
    import BooksItem from '@/components/books-item'
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
					Axios.get(
						"http://localhost:3100/api/books"
						)
						.then((data)=>{
							//console.log(data.data.data.list.subjects,'movie');
							//console.log(data.data.data.list.subjects[0],'123');
							console.log(data.data,"图书")
							_this.$store.commit("changeNavData",data.data)
							//console.log(this.$store.state.navData)//测试打印次数
						}
					)
        }
      }
    }
</script>

