<template>
  <div>
    <section class="searchList">
      <li class = 'clearfix'>
        <div>
          <a :href = "item.casts.alt" class = "fl"><h3>{{item.title}}</h3></a>
        </div>  
        <div class="listMian clearfix">
            <img :src="item.images.large" :alt="item.casts.alt" class = "fl">   
          <div class="fl">
            <p class="smallT">{{item.casts[0].name}}/{{item.year}}</p>
            <h4>别名：{{item.original_title}}</h4>
            <p class = "text">类型：
              <b v-for = "item1,index1 in item.genres" :key = "index1">{{item1}}</b>
              <br/>
              <b >评分：{{item.rating.average}}</b>
            </p>
          </div>            
        </div>
      </li>
    </section>  
   </div>
</template>
<script>
  export default {
    props:["item"]
  }

</script>
<style>

</style>