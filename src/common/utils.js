export function debounce(func,delay){   //防抖动函数  优化性能
  let timer = null
  return function (...args){
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)   //apply改变this指向  不然this指向window  args是参数
    },delay)
  }
}

export function formatDate(date, fmt) {     //时间展示样式
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
