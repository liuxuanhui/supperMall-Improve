<template>
  <div>
    <Swiper>
      <SwiperItem v-for="item in banners">
        <!--<a :href="item.link">-->
          <img :src="item.image" alt="" @load="imgLoad">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper/index.js";
  export default{
    data(){
      return{
        isLoad:false
      }
    },
    props: {
      banners: {
        type:Array,
        default() {   
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imgLoad(){
        if (!this.isLoad){
          this.$emit('swiperImgLoad');
          this.isLoad = true
        }
      },
    }
  }
</script>

<style scoped>
 
</style>
