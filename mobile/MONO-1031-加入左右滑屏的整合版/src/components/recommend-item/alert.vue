<template>
  <div>
    <x-header></x-header>    
    <div v-transfer-dom>
      <actionsheet  v-model="showMenus" show-cancel></actionsheet>
    </div>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet
  },
  data () {
    return {      
      showMenus: false
    }
  }
}
</script>

<style>
#app .vux-header{
  height: 140px!important;
  background: #ffffff;
}
#app .vux-header-left{
  height: 140px;
  line-height: 140px;
  font-size: 50px;
  padding-left: 50px;
}
/* #app .vux-header-left .left-arrow{
  
} */
.overwrite-title-demo {
  margin-top: 5px;
}
</style>