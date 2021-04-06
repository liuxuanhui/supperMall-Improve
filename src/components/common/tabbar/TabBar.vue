<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
  export default{
  }
</script>

<style scoped>
  #tab-bar {
    display:flex;           /*伸缩盒子 */
    background-color:#f6f6f6;

    position:fixed;
    left:0;         /*这三个缺一个都不行 不信你试试 */ 
    right:0;
    bottom:0;
    z-index:10;
    box-shadow:0 -1px 1px rgba(100,100,100,0.2);
  }
</style>
