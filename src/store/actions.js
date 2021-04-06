export default{
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
      let abc = context.state.cartList.find(item => item.iid === payload.iid)
      //find()是数组的一个方法  每次从数组里拿到一个item 一旦发现item.iid === payload.iid 就把item返回给abc
      if(abc) {
        context.commit('addCounter',abc);      //count属性+1
        resolve('商品数量+1');
      } else {
        payload.count = 1;   //没该商品 给它一个count属性 并且为1(表示数量)
        payload.checked = false;   //添加checked属性 表示在购物车是否被选中(默认没被选中)
        context.commit('addToCart',payload);
        resolve('添加商品成功');
      }
    })
  }
}
//由于JS文件里拿不到this.$toast/$router/$store 所以不能直接使用toast.show() 但是外面的dispatch可以返回一个promise