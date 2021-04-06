<template>
  <div id="detail">
    <DetailNavBar class="detail-navbar" @titleClick="titleClick" ref="nav"/>
    
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <DetailSwiper :top-images="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamInfo :param-info="paramInfo" ref="param"/>
      <DetailCommentInfo :comment-info="commentInfo" ref="comment"/>
      <GoodsList :goods="recommends" ref="recommend"/>
    </Scroll>
    <DetailBottomBar @addCart="addToCart"/>
    <BackTop @click.native="topClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import {debounce} from '@/common/utils.js'
  import {backTopMixin} from '@/common/mixin.js'

  export default{
    name:"Detail",
    mixins:[backTopMixin],
    data() {
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
      }
    },
    created(){
      this.iid = this.$route.params.iid //保存传入的iid

      getDetail(this.iid).then(res => { //根据iid请求详细数据
        this.topImages = res.result.itemInfo.topImages  //获取轮播图图片保存在topImages里

        //在detail.js里创建了对象 把不同地方的数据放在一个对象里 方便这里拿数据
        this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)//商品信息的数据
        this.shop = new Shop(res.result.shopInfo) //商店的数据
        this.detailInfo = res.result.detailInfo   //商品详情图片
        this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)  //参数信息
        if (res.result.rate.Crate !==0){    //评论信息   有的没评论信息所以判断一下
          this.commentInfo = res.result.rate.list[0]
        }
        getRecommend().then(res => {
          this.recommends = res.data.list    //推荐信息        
        })
        this.getThemeTopY = debounce(() => {  //商品参数评论推荐的联动
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
          //console.log(this.themeTopYs)
        },200)
      })
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.scroll.refresh();

        this.getThemeTopY()
      },
      titleClick(index){    //点击导航栏滚动到相应位置
        this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){  //滚动到某位置就联动导航栏
        const positionY = -position.y;
        const length = this.themeTopYs.length
        for(let i=0; i<length; i++){
          if( (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || 
          (i==length-1) && positionY > this.themeTopYs[i]){
            this.$refs.nav.currentIndex = i
          }
        }
        this.listenShowBackTop(position)  //是否显示back-top按钮
      },
      addToCart(){
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //将商品添加到购物车里
        //this.$store.commit('addCart',product)   //传给mutations
        this.$store.dispatch('addCart',product).then(res => {    //传给actions
          this.$toast.show(res,2000)      
          //由于JS文件拿不到this.$toast/$router/$store 所以不能直接使用toast.show() 但dispatch可以返回一个promise
        })   
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    background-color:#fff ;
    z-index: 11;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 49px);  /* 上下两导航栏的px */
  }
  .detail-navbar{
    position: relative;
    background-color:#fff;
    z-index: 11;
  }
</style>