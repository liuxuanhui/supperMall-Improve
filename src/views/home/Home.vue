<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" 
    class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
    :pull-up-load="true" @pullUpLoad="loadMore">
      <HomeSwiper :banners="banners" @swiperImgLoad="swiperImgLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView/>
      <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" v-show="!isTabFixed"/>
      <GoodsList :goods="goods[currentType].list"/>
    </scroll>
    <BackTop @click.native="topClick" v-show="isShowBackTop"/>
    
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'  
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabcontrol/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  
  import {getHomeMultidata,getHomeGoods} from "network/home.js";

  import {debounce} from '@/common/utils.js'
  import {backTopMixin} from '@/common/mixin.js'

  export default{
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[backTopMixin],
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0,list:[]},
          'new':{page: 0,list:[]},
          'sell':{page: 0,list:[]},
        },
        currentType:'pop',
        isTabFixed:false,
        saveY:0,
      }
    },
    created(){  //生命周期函数
      this.getHomeMultidata()    //请求多个数据

      this.getHomeGoods('pop')   //请求商品数据
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() { //生命周期函数
      const reFresh = debounce(this.$refs.scroll.refresh,50) 
      //把scroll.refresh方法传给防抖动函数之后返回给reFresh函数
      this.$bus.$on('itemImgLoad',() => { 
        reFresh()
        //禁忌在created函数中使用$refs与document拿某个元素 因为有时拿不到
      })  
    },
    activated(){    //Home活跃时调用    
      this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0,this.saveY)   //进Home时直接跳转到离开时的页面
    },
    deactivated(){  //Home不活跃时调用
      this.saveY = this.$refs.scroll.scroll.y   //获取离开时的Y值
    },      
    methods: {
      /* 事件监听相关方法 */
      tabClick(index) { //控制tabControl显示哪一个
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index;  //狸猫换太子
        this.$refs.tabControl2.currentIndex = index;  //要换的精致
      },
      contentScroll(position) { //记录滚动位置的函数
        this.listenShowBackTop(position)  //是否显示back-top按钮
        this.isTabFixed = (-position.y +44) > this.tabOffSetTop //是否狸猫换太子
      },
      loadMore() {    //上拉加载更多数据
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.scroll.refresh()  
        //计算重新可滚动高度 因为图片加载是异步的，他可能在图片未加载完就已经计算好了  详见P170后半段
      },
      swiperImgLoad() { //做tabControl停留的函数
        this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop  
        //offsetTop是原生的属性 数组件没法拿到 但所有组件都有一个属性$el 用于获取组件中的元素 通过元素获取offsetTop
        //值得注意的是offsetTop在轮播图图片未加载之前拿到的话 是没有算上轮播图的高度的
      },

      /*网络请求的相关方法*/
      getHomeMultidata() {
        getHomeMultidata().then(res => {  //请求多个数据
        this.banners = res.data.banner.list;
        //把数据里的banner中的list数据保存才data中的banners里面 可在vue控制台中查看
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list); //( ...一个个从res.data.list取 塞到goods[type].list里)
          this.goods[type].page += 1;

          this.$refs.scroll.scroll.finishPullUp()
      })  
      },
    },
  }
</script>

<style scoped>
  #home{
    height:100vh;     /*视口高度  vw是视口宽度 */
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);   /*在base.css里定义的变量*/
    color: #fff;
    font-weight: 700;
    position:fixed; 
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 9;
  }
  /*.tab-fixed{   //之前简易的固定了tabControl 现在使用了better-scroll
    position: sticky;
    top: 44px;
    z-index: 9;
  }*/
  .content{
    height: calc(100% - 49px);    /*100%是相对父元素的 而父元素我们设置的是100vh 也就是视口(vh代表屏幕的百分之几)*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
