<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Axios from 'axios'
  export default {
    name: 'app',
    data(){
      return {
        recommendList:[]
      }
    },
    mounted(){
      Axios.get('http://localhost:3200/api/users')
      .then((data)=>{
        // console.log(data.data.data.list)
        this.recommendList.push(data.data.data.list)
        this.$store.commit('recommendListHandle',this.recommendList)
      })
    }
  }
</script>
