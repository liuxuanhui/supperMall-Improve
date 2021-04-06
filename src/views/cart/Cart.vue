<template>
  <div id="cart">
    <CartNavBar/>

    <Scroll  class="cart-scroll" ref="scroll">
      <CartList/>
    </Scroll>

    <CartBottomBar/>
  </div>
</template>

<script>
  import CartNavBar from './childComps/CartNavBar'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll.vue' 
  export default{
    components:{
      CartNavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    activated(){
      this.$refs.scroll.scroll.refresh()  //让购物车页面活跃时重新计算scroll的scrollHeight
    }
  }
</script>

<style scoped>
#cart{
  height: 100vh;
}
.cart-scroll{
  height:calc(100% - 44px - 49px - 44px);  
  overflow: hidden;   /*数据代码量太大 横向撑开 导致底部MainTabBar不能正常显示 */
}
</style>
