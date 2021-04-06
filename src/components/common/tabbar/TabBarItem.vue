<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>   
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!--slot会被替换 所以v-if、v-else、v-bind放在slot内会不起作用-->
  </div>
</template>

<script>
  export default{
    props: {
      link:String,
      activeColor:{
        type:String,
        default:'blue',
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.link);
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.link) !== -1   
        /*indexOf是path里面的方法 在link里找到了相同的path就不会返回-1 */
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;            /*每个子元素都占一份 */
    text-align:center;
    height:49px;  /*测试过的 不占屏幕，操作也方便 */
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top:3px;
    vertical-align: middle;  /*img下面会有3px 用这个方法可以去掉 */
  }

</style>
