<template>
  <div id="tab-control-category">
    <div class="tab-control-category-item" v-for="item in showgoods">
      <img :src="item.image" alt="">
      <div class="title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      showgoods:{
        type:Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>
#tab-control-category{
  display: flex;
  flex-wrap: wrap;
}
.tab-control-category-item{
  /*margin-top: 15px;
  margin-left: 20px;*/
  margin: 15px 10px 0 15px;
  width: 65px;
  height: 105px;
  text-align: center;
}
img{
  width: 60px;
  height: 60px;
}
.title{
  margin-top: 15px;
  font-size: 12px;
  word-wrap: break-word;
  word-break: break-all;
}
</style>