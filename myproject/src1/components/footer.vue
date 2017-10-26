<template>
  <div class="footer_nav">
        <ul class="clearfix">            
            <router-link tag="li" class="trans blue" to="/recommend">
                <a>M</a>
                <span>推荐</span>
            </router-link> 
            <router-link tag="li" class="trans" to="/find">
                <a>O</a>
                <span>发现</span>
            </router-link>
            <router-link tag="li" class="trans" to="/community">
                <a>N</a>
                <span>社区</span>
            </router-link>
            <router-link tag="li" style="margin: 0;" class="trans" to="/mine">
                <a>O</a>
                <span>我的</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    
    export default {
        
    }
</script>

<style>
    .footer_nav .router-link-active,.footer_nav .blue{
        color: #16a5af;
    }
</style>
