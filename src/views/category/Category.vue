<template>
  <div id="category">
    <GoryBar/>
    <div class="content">
      <Menu :categories="gorytype" @tabClick="menuClick"/>
      <Scroll class="scroll" ref="scroll">
        <TabControlCategory :showgoods="showsubcategories"/>
        <TabControl class="tab-control" :titles="['综合','新品','销量']" @tabClick="tabClick"/>
        <GoodsList :goods="showcategoryDetail"/>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import GoryBar from './childComps/CategoryNavBar.vue' 
  import Menu from './childComps/Menu.vue' 
  import TabControlCategory from './childComps/TabControlCategory.vue' 

  import Scroll from 'common/scroll/Scroll.vue'
  import TabControl from 'content/tabcontrol/TabControl.vue'
  import GoodsList from 'content/goods/GoodsList.vue'

  import {getCategory,getSubcategory,getCategoryDetail} from 'network/category.js'

  import {debounce} from '@/common/utils.js'

  export default{
    components:{
      GoryBar,
      Menu,
      TabControlCategory,
      TabControl,
      Scroll,
      GoodsList
    },
    created(){
      this.GetGoryData()    //请求数据
    },
    mounted() { 
      const reFresh = debounce(this.$refs.scroll.refresh,50);
      this.$bus.$on('itemImgLoad',() => { 
        reFresh()
      })  
    },
    activated(){
      this.$refs.scroll.scroll.refresh()
    },
    data(){
      return{
        gorytype:[],
        subtype:[],
        currentIndex:-1,
        currentType:'pop',
      }
    },
    methods:{
      GetGoryData(){
        getCategory().then(res => {
          //1.获取分类的数据
          this.gorytype = res.data.category.list;
          //2.初始化每个类别的子数据
          for (let i = 0; i < this.gorytype.length; i++) {
            this.subtype[i] = {
              subcategories: [],
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          //正在流行数据与菜单数据一起被请求
          this.GetSubcategory(0);
        })
      },
      GetSubcategory(index){    //请求各类别的数据
        const maitKey = this.gorytype[index].maitKey;
        this.currentIndex = index;
        getSubcategory(maitKey).then(res => {
          this.subtype[index].subcategories = res.data.list;
          
          this.subtype = [...this.subtype]
          this.GetCategoryDetail('pop',index);
          this.GetCategoryDetail('sell',index);
          this.GetCategoryDetail('new',index);
        })
      },
      GetCategoryDetail(type,index) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.gorytype[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          this.subtype[this.currentIndex].categoryDetail[type] = res;
          this.subtype = [...this.subtype]
          //console.log(this.subtype[this.currentIndex].categoryDetail['pop']);
        })
      },
      menuClick(index){
        this.GetSubcategory(index);
        this.$refs.scroll.scroll.scrollTo(0,0);
      },
      tabClick(index){
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      }
    },
    computed:{
      showsubcategories(){
        if (this.currentIndex === -1) return [];
        return this.subtype[this.currentIndex].subcategories;
      },
      showcategoryDetail(){
        //console.log(this.currentIndex);
        if (this.currentIndex === -1) return [];
        //console.log(this.currentIndex);
        //console.log(this.subtype[this.currentIndex].categoryDetail[this.currentType]);
        return this.subtype[this.currentIndex].categoryDetail[this.currentType];
      }
    },
  }
</script>

<style scoped>
.content{
  height: 100vh;
  overflow: hidden;
  display: flex;
}
.scroll{
  flex:1;
  height: calc( 100% - 49px - 44px);
}
.tab-control{
  margin-top: 15px;
  font-size: 18px;
}
</style>
