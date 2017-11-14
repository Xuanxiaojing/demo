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
                <img src="img/img2.png" />
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
                    <img src="img/img2.png" />
                </div>
                <div class="message fl">
                    <input type="text" value="说点什么，发个猫贴吧" />
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </div>
            </div>
            <div class="matter">
                <div class="head_me fl">
                    <div class="head_me fl">
                        <img src="img/img2.png" />
                    </div>
                </div>
                <div class="fl attention-message">
                    <div class="clearfix">
                        <p class="fl">关注了造物主<span>单读</span></p>
                        <em class="fr">2017.09.18 18:07</em>
                    </div>
                    <div class="transmit">
                        <div class="fl">
                            <img src="img/img1.png"/>
                        </div>
                        <p>单读</p>
                    </div>
                    <div class="handel clearfix">
                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <i class="fa fa-commenting-o" aria-hidden="true"></i>
                        <a href="javascript:;" class="fr">删除</a>
                    </div>
                </div>			 			
            </div>
            <div class="matter">
                <div class="head_me fl">
                    <div class="head_me fl">
                        <img src="img/img2.png" />
                    </div>
                </div>
                <div class="fl attention-message">
                    <div class="clearfix">
                        <p class="fl">关注了造物主<span>单读</span></p>
                        <em class="fr">2017.09.18 18:07</em>
                    </div>
                    <div class="transmit">
                        <div class="fl">
                            <img src="img/img1.png"/>
                        </div>
                        <p>单读</p>
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
    import FooterNav from '@/components/footer'
    export default {
        components:{
            FooterNav
        }
    }
</script>
