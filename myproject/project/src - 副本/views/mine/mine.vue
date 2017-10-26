<template>
  <div class="mine">
        <div class="name">
            企鹅
            <span class="tools">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <i class="fa fa-cog fa-spin fa-fw"></i>
            </span>			 		
        </div>
        <div class="user">
            <div class="head-img">
                <img src="/static/img/head-portrait.png" />
            </div>
            <p class="attention">
                <span>0</span> 你关注 <em>/</em> <span>0</span> 关注你
            </p>
            <p class="nodec">暂无描述</p>
            <p class="phone">
                <i class="fa fa-tablet fr" aria-hidden="true"></i>
                <span></span>
            </p>			 		
        </div>
        <ul class="toolbar clearfix">
            <li>
                <i class="fa fa-heart-o" aria-hidden="true"></i>
                <span>收藏</span>
            </li>
            <li>
                <i class="fa fa-picture-o" aria-hidden="true"></i>
                <span>相册</span>
            </li>
            <li>
                <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                <span>猫信</span>
            </li>
            <li>
                <i class="fa fa-bell-o" aria-hidden="true"></i>
                <span>提醒</span>
            </li>
        </ul>
        <div class="mine-tool">
            <i class="fa fa-align-left blue fl" aria-hidden="true"></i>
            <span class="fl">我关注的全部主题站</span>
            <b class="fl">3</b>
            <i class="fa fa-angle-right fr" aria-hidden="true"></i>
        </div>
        <div class="mine-tool">
            <i class="fa fa-shopping-cart fl" aria-hidden="true"></i>
            <span class="fl">我的订单</span>
            <i class="fa fa-angle-right fr" aria-hidden="true"></i>
        </div>        
        <div class="dynamic">
            <h2>你关注的朋友动态</h2>
            <div class="clearfix post">
                <div class="head_me fl">
                    <img src="/static/img/head-portrait.png" />
                </div>
                <div class="message fl">
                    <input type="text" value="说点什么，发个猫贴吧" />
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </div>
            </div>
            <div class="nomessage">
                <img src="/static/img/nomessage.png"/>
            </div>
            <div class="matter" v-for="item in this.$store.state.dynamicState">
                <div class="head_me fl">
                    <div class="head_me fl">
                        <img src="/static/img/head-portrait.png" />
                    </div>
                </div>
                <div class="fl attention-message">
                    <div class="clearfix">
                        <p class="fl">企鹅<span>赞了猫贴</span></p>
                        <em class="fr">2017.09.18 18:07</em>
                    </div>
                    <div class="transmit">
                        <div class="fl">
                            <img :src="item.src"/>
                        </div>
                        <p>{{item.img_title}}</p>
                    </div>
                    <div class="handel clearfix">
                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <i class="fa fa-commenting-o" aria-hidden="true"></i>
                        <a href="javascript:;" class="fr">删除</a>
                    </div>
                </div>			 			
            </div>
        </div>	
        <Footer-nav></Footer-nav>	 	
    </div>
</template>

<script>
    import FooterNav from '@/components/footer/footer'
    export default {
        components:{
            FooterNav
        }
    }
</script>

<style>
    .transmit p{
        line-height: 70px;
    }
    .nomessage{
        width: 100%;
        height: 540px;
        position: relative;
        background: #ffffff;
    }
    .nomessage img{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -205px;
    }
</style>
