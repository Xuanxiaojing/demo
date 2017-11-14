<template>
  <div>
    <load-more :tip="'loading'"></load-more>
    <!-- <load-more :show-loading="false" :tip="'no available data'" background-color="#fbf9fe"></load-more>
    <load-more :show-loading="false" background-color="#fbf9fe"></load-more> -->
  </div>
</template>



<script>
import { LoadMore } from 'vux'

export default {
  components: {
    LoadMore
  }
}
</script>