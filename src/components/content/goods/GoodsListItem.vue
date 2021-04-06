<template>
  <div class="goods-item" >
    <a>
      <img v-lazy="showImg" @load="imgLoad" @click="itemClick">
    </a>
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      goodsitem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imgLoad() {
        this.$bus.$emit('itemImgLoad')    //事件总线 我在Home.vue  mounted中接收了
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsitem.iid)  //动态路由
      }
    },
    computed:{
      showImg(){
        return this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img
        /*一个是首页显示的  一个是详情页中的推荐  
        注意上面的先后顺序，先把this.goodsitem.show.img放前面会出错  想不出来为什么报错
        */
      }
    },
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>