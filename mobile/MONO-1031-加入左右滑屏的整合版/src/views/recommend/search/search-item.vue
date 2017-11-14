<template>
  <div>
    <section class="searchList">
      <ul id = 'movielist'>
         <li class = 'clearfix'>
          <div>
            <a :href = "item.alt" class = "fl"></a><h3>{{item.title}}</h3>
          </div>
          <div class="listMian books clearfix">
            <a :href = "item.alt"><img :src="item.image" :alt="item.alt" class = "fl"></a> 
            <div class = "fl text">
              <p class="smallT">{{item.author[0]}}/{{item.publisher}}/{{item.pubdate}}</p>
              <p class = "desc">{{item.summary}}</p>
            </div>	          
          </div> 
        </li>
      </ul>
    </section>  
   </div>
</template>
<script>
  export default {
    props:["item","index"]
  }

</script>
