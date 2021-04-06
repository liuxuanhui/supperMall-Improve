<template>
  <div class="cart-nav">
    <NavBar>
      <div  slot="center">购物车({{cartLength}})</div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  export default{
    components:{
      NavBar
    },
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      }
    }
  }
</script>

<style scoped>
  .cart-nav{
    background-color:var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>