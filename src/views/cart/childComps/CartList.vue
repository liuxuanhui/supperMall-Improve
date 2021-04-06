<template>
  <div>
      <CartListItem v-for="(item,index) in cartlist" :item-info="item" :key="index"/>
  </div>
</template>

<script>
  import CartListItem from './CartListItem.vue'
  export default{
    components:{
      CartListItem,
    },
    computed:{
      cartlist(){
        return this.$store.state.cartList
      }
    },
  }
</script>

<style scoped>

</style>