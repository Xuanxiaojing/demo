<template>
    <div class="find findWrapper">
        <!-- <div> -->
        <search class="seek" @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="absolute" auto-scroll-to-top top="46px" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search">
        </search>
        <div style="padding:15px;">
            <router-link to="/search">
                <x-button @click.native="setFocus" type="primary">搜索</x-button>
            </router-link>
        </div>
        <div class="slideshow">
            <slide-show></slide-show>
        </div>

        <div class="subject-term">
            <h2>分类查看主题站</h2>
            <div class="theme clearfix">
                <div v-for="item in this.$store.state.findData.Theme" @click="showPosition('middle')">
                    <img :src="item" />
                    <!-- <ul>
                                <li>设计</li>
                                <li>Design</li>
                            </ul> -->
                </div>
            </div>
            <toast v-model="showPositionValue" type="text" :time="800" text="2012，您要访问的页面已上船！" :position="position"></toast>
        </div>
        <div class="recommend-edit">
            <h2 class="clearfix more">
                <span class="fl">编辑推荐</span>
                <span class="fr">
                    <router-link tag="b" to="/Un">更多</router-link>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </span>
            </h2>
            <ul class="list">
                <li class="border" v-for="item,index in this.$store.state.findData.Recommend">
                    <h3 class="clearfix">
                        <span class="fl" @click="showPosition('middle')">{{item.title}}</span>
                        <strong class="fr" :style="{background:!item.attentioned ? '#16a5af' : '#d7d7d7' }">
                            <i :class="[{'fa fa-plus':!item.attentioned,'fa fa-check':item.attentioned}]" aria-hidden="true" @click="changeIco(item)"></i>
                        </strong>
                    </h3>
                    <dl @click="showPosition('middle')">
                        <dt class="fl">
                            <img :src="item.src" />
                            <span class="v">V</span>
                        </dt>
                        <dd class="fr">
                            <p>{{item.describe}}</p>
                            <div>
                                <span>{{item.flow}}</span>/
                                <i>{{item.type}}</i>
                            </div>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div class="ranking-list">
            <h2>排行榜与反馈</h2>
            <div class="theme clearfix">
                <div v-for="item in this.$store.state.findData.rankingTheme" @click="showPosition('top')">
                    <img :src="item" />
                    <!-- <p class="same-title">排行榜</p> -->
                </div>
            </div>
        </div>

        <div class="slideshow show2">
            <slide-show></slide-show>
        </div>

        <div class="special">
            <h2 class="clearfix more">
                <span class="fl">编辑推荐</span>
                <span class="fr">
                    <!-- <b></b> -->
                    <router-link tag="b" to="/Un">更多</router-link>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </span>
            </h2>
            <div class="theme clearfix">
                <div v-for="item in this.$store.state.findData.specialTheme" @click="showPosition('middle')">
                    <img :src="item" />
                    <!-- <p class="same-title">24小时电影院</p> -->
                </div>
            </div>
        </div>
        <div class="recommend-edit more-theme">
            <h2 class="clearfix more">
                <span class="fl">更多主题站</span>
            </h2>
            <ul class="list">
                <li class="border" v-for="item in this.$store.state.findData.MoreTheme">
                    <h3 class="clearfix">
                        <span class="fl" @click="showPosition('middle')">{{item.title}}</span>
                        <strong class="fr" :style="{background:!item.attentioned ? '#16a5af' : '#d7d7d7' }">
                            <i :class="[{'fa fa-plus':!item.attentioned,'fa fa-check':item.attentioned}]" aria-hidden="true" @click="changeIco(item)"></i>
                        </strong>
                    </h3>
                    <dl @click="showPosition('middle')">
                        <dt class="fl">
                            <img :src="item.src" />
                            <span class="v">V</span>
                        </dt>
                        <dd class="fr">
                            <p>{{item.describe}}</p>
                            <div>
                                <span>{{item.flow}}</span>/
                                <i>{{item.type}}</i>
                            </div>
                        </dd>
                    </dl>
                </li>
            </ul>
            <p class="show-all">已显示全部内容</p>
        </div>
        <!-- </div> -->
        <Footer-nav></Footer-nav>
    </div>
</template>

<script>
import FooterNav from '@/components/footer/footer'
import SlideShow from '@/components/slide-show/slide-show'
import Bscroll from 'better-scroll'
import Axios from 'axios'
import api from '@/api/api.js' // 请求数据的文件
import {Toast, Search, Group, Cell, XButton } from 'vux'
export default {
    data() {
        return {
            position: 'default',
            showPositionValue: false,
             results: [],
            value: ''
        }
    },
    components: {
        FooterNav,
        SlideShow,
        Toast,
        Search,
        Group,
        Cell,
        XButton
    },
    methods: {
          //发现搜索功能
        setFocus() {
            this.$refs.search.setFocus()
        },
        resultClick(item) {
            window.alert('you click the result item: ' + JSON.stringify(item))
        },
        getResult(val) {
            this.results = val ? getResult(this.value) : []
        },
        onSubmit() {
            this.$refs.search.setBlur()
            this.$vux.toast.show({
                type: 'text',
                position: 'top',
                text: 'on submit'
            })
        },
        onFocus() {
            console.log('on focus')
            if (this.value !== "") {
                console.log(this.value);
                this.$store.commit("changeSearchVal", this.value);
            }
        },
        showPosition(position) {
            this.position = position
            this.showPositionValue = true
        },
        getSubjectTerm() {
            api.getSubjectTerm().then((data) => {
                this.$store.commit('changeFindData', data.data.data.list)
            })
        },
        changeIco(item) {
            this.$store.commit('changeIco', item)
        }
    },
    mounted() {
        this.getSubjectTerm()
    }
}
function getResult(val) {
    let rs = []
    for (let i = 0; i < 20; i++) {
        rs.push({
            title: val,
            other: i
        })
    }
    return rs
}
</script>
<style>
.vux-search_show {
    display: none;
}
</style>