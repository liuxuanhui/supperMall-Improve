<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :is-checked="isSelectAll" @click.native="allClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{getNum}})</span>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'

	export default {
    components:{
      CheckButton
    },
    methods:{
      allClick(){ //点击全选出现什么变化
        if(this.isSelectAll){ //全选的情况下
          this.$store.state.cartList.forEach(item => item.checked = false)  
        }else{  //部分选中或全部没选的情况下
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
         //购物车没有打对号的商品时显示 '请选择购买的商品'   
        if( !(this.$store.state.cartList.filter(item => item.checked).length) ){
          this.$toast.show('请选择购买的商品',2000);
        }else{
          this.$toast.show('您还未登录',2000);
        }
      }
    },
    computed:{
      totalPrice(){ //总价格
        //filter是数组的一个方法 参数传函数 满足条件的组成一个新数组  
        var a = this.$store.state.cartList.filter(item => item.checked);
        var price = 0;
        for(var i of a){
          price += i.count * i.price
        }
        return price.toFixed(2);
      },
      getNum(){ //商品的数量
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){    //全选
        return !(this.$store.state.cartList.filter(item => !item.checked).length) 
        //数字0的!是true 其他数字的！是false  
      }
    },
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
