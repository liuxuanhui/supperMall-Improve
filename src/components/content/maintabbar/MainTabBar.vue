<template>
    <TabBar>
      <TabBarItem link="/home" activeColor="deeppink">     <!-- to属性是router-link的  这里我们自定义一个link传到子组件TabBarItem里 -->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg">       <!-- ./竟然不能省略 以后还是不省的好 -->
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg"> 
        <p slot="item-text">首页</p>
      </TabBarItem>
      <TabBarItem link="/category" activeColor="deeppink">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
        <p slot="item-text">分类</p>
      </TabBarItem>
      <TabBarItem link="/cart" activeColor="deeppink">
        <img slot="item-icon" src="~assets/img/tabbar/cart.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg">
        <p slot="item-text">购物车</p>
      </TabBarItem>
      <TabBarItem link="/profile" activeColor="deeppink">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
        <p slot="item-text">我的</p>
      </TabBarItem>
    </TabBar>
</template>

<script>
  import TabBar from 'common/tabbar/TabBar.vue'
  import TabBarItem from 'common/tabbar/TabBarItem.vue'
  export default{
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
