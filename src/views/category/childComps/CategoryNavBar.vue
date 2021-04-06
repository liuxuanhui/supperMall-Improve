<template>
  <div>
    <CategoryBar class="bar"><div slot="center">商品分类</div></CategoryBar>
  </div>
</template>

<script>
  import CategoryBar from 'components/common/navbar/NavBar.vue'
  export default{
    components:{
      CategoryBar,
    },
  }
</script>

<style scoped>
.bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>