<template>
  <!-- <div class="slideshow"> -->
	<div class="slide_wrap" @touchstart="preventDefaultFn" @touchmove="preventDefaultFn">
		<div class="tagClient" @touchstart="fnStart" @touchend="fnEnd" @touchmove="fnMove">
			<ul class="list" ref="list">
				<li v-for="item,index in listData">
					<img :src="item.image"/>
				</li>
				<li>
					<img src="../../static/img/1.png" />
				</li>
				
				<!-- <img src="../assets/img/2.png" />
				<img src="../assets/img/3.png" />
				<img src="../assets/img/4.png" />
				<img src="../assets/img/5.png" />
				<img src="../assets/img/1.png" /> -->
			</ul>
		</div>
		
		<div class="circle" ref="circle">
			<div class="white" v-for="item,index in listData"></div>
			<!-- <div></div>
			<div></div>
			<div></div>
			<div></div> -->
		</div>
	</div>
	<!-- </div> -->
</template>
<script>
// 获取当前屏幕的宽高
import Utils from "@/assets/js/utils.js"
function view(){
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	}
}
let data = [
	{
		image: "../../static/img/1.png"
	},
	{
		image: "../../static/img/2.png"
	},
	{
		image: "../../static/img/3.png"
	},
	{
		image: "../../static/img/4.png"
	},
	{
		image: "../../static/img/5.png"
	}
]


export default {
	data () {
		return {
			listData:data,
			timer1:null,
			iStartTouchX:0,
			iStartX: 0,
			target: 0,
			iW:null,
			iNow:0,
			list:null,
			imgs:null
		}
	},
	mounted(){
		this.autoPlay();
		this.list = this.$refs.list;
		// console.log(this.list,'list')
		this.imgs = this.list.getElementsByTagName('img');
		this.iW = this.imgs[0].offsetWidth;
		this.circle = this.$refs.circle;
		
		this.circles = this.circle.getElementsByTagName('div');
		// console.log(this.circles,'cie')
	},
	methods: {
		autoPlay(){
			let that = this;
			this.timer1 = setInterval(function(){
				that.iNow++;
				// console.log(that) // 指向window
				that.fnTab();
			},2000)
		},
		fnStart(ev){
			// console.log('触屏事件')
			ev = ev.changedTouches[0]; // 触发当前事件的手指列表，取第一个即可
			this.iStartTouchX = ev.pageX; // 手指按下的坐标
			this.iStartX = this.target;
			clearInterval(this.timer1);			
		},
		fnMove(ev){
			ev = ev.changedTouches[0];
			
			let disI = ev.pageX - this.iStartTouchX;	 // 手指在屏幕上移动的距离
			
			this.target = this.iStartX + disI; // 图片移动的距离等于起始位置加上手指在屏幕上移动的距离
			// console.log(this.target,'disI')
			Utils.mTween(this.list,"left",this.target,2,"linear");
			// console.log(this.list,'this.list')
		},
		fnEnd(ev){
			this.iNow = Math.abs(this.target/this.iW); // 手指拖动的距离除以屏幕的宽度，来判断松开手指之后，如果拖动距离比较大，就显示下一张，否则显示当前这张
			this.iNow = Math.round(this.iNow);
			console.log(this.iNow);
			if(this.iNow < 0){
				this.iNow = 0;
			}
			if(this.iNow > this.imgs.length - 1){
				this.list.style.left = '0px';  //瞬间移回第一张
				this.iNow = 0;  //把下标设置为0，重新开始 
			}
			this.fnTab();
			this.autoPlay();
		},
		fnTab(){
			// iNow = iNow%circles.length; // 过界处理
			// 0,1,2,3
			this.target = -this.iW * this.iNow;  //按照下标的值移动图片
			let that = this;
			// console.log(this.target,'this.target')
			Utils.mTween(that.list,"left",this.target,500,"linear",function (){
				// console.log('yidong')
				// 判断this.iNow的值是否等于最后一张图片的下标，如果等于，最后一张图片运动结束
				if(that.iNow == that.imgs.length - 1){ //如果n的值等于最后一张图片的下标，说明到了最后一张
					that.list.style.left = '0px';  //瞬间移回第一张
					that.iNow = 0;  //把下标设置为0，重新开始
					// console.log('zoudaozhelile')
				}
				
				//当每张图片运动结束之后，再控制相应下标的小按钮切换
				
				for(var i = 0; i < that.circles.length; i++){
					that.circles[i].classList.remove('active');  //清空所有小按钮的样式
				}
				that.circles[that.iNow].classList.add('active');  //给小按钮添加相应的样式
			})	
		},
		preventDefaultFn(ev){
			ev.preventDefault();
		}
	}
}
</script>
<style>
	.slide_wrap{
		height: 100%;
	}
	.slide_wrap .list {
		list-style: none;
		margin: 0px;
		padding: 0;
		width: 600%;
		height: 100%;
		-overflow: hidden;
		position: absolute;
		left: 0;
		top:0;
	}
	.slide_wrap .list li{
		height:100%;
		float: left;
		width:46rem;
	}
	.slide_wrap .list img {
		width:46rem;
	}
	.slide_wrap .tagClient {
		width: 100%;
		height:100%;
		position: relative;
		overflow: hidden;
	}
	.slide_wrap .circle div.active{
		background-color: skyblue;
	}
</style>


