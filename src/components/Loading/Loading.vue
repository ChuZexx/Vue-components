
<template>
  <div class="box">
    <img src="../../../public/loading.gif" alt />
    <span>{{title}}</span>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {

    }
  },
  props: {
    title: {
      default: '',
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  position: fixed;
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  /* pointer-events: none; */
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  span {
    color: #2C68C9;
    font-size: 18px;
    margin-left: 8px;
  }
}
</style>
