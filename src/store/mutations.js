export default{
      /*
    addCart(state,payload) {
      let abc = state.cartList.find(item => item.iid === payload.iid)
      //find()是数组的一个方法(参数传函数)  每次从数组里拿到一个item 一旦发现item.iid === payload.iid 就把item返回给abc
      if(abc) {
        abc.count += 1      //count属性+1
      } else {
        payload.count = 1   //没该商品 给它一个count属性 并且为1
        state.cartList.push(payload)
      }
    }
    上边这段代码没有问题  但是mutations中一个函数最好干一件事  因为干一件事好跟踪数据  方便日后调试数据
    */
   addCounter(state,payload){
    payload.count++
  },
  addToCart(state,payload){
    state.cartList.push(payload)
  }
}