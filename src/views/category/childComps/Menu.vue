<template>
  <Scroll class="tab-menu">
      <div class="menu-list" 
      v-for="(item,index) in categories" 
      :class="{active:index === currentIndex}"
      @click="menuClick(index)">
        {{item.title}}
      </div>
  </Scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll.vue'
  export default{
    props:{
      categories:{
        type:Array,
        default() {
          return []
        }
      }
    },
    components:{
      Scroll
    },
    data(){
      return{
        currentIndex: 0,
      }
    },
    methods:{
      menuClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index);
      },
    },
  }
</script>

<style scoped>
.tab-menu{
  height:calc(100% - 44px - 49px);
  background-color: #f6f6f6;
  width: 100px;
  box-sizing: border-box;
  overflow: hidden;
}
.menu-list{
    height: 55px;
    line-height: 55px;
    text-align: center;
    font-size: 16px;
}
.active{
  font-weight: 800;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>