<template>
  <div class="carousel-wrap">
    <span>空气质量</span>
    <div class="textBox">
      <transition name="slide">
        <p class="text" :key="text.id">{{text.val}}</p>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'j-carousel',
  components: {},
  data () {
    return {
      number: 0,
      timer: 0
    }
  },
  props: {
    dataList: Array
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.dataList[this.number]
      }
    }
  },
  watch: {},
  methods: {
    startMove () {
      // eslint-disable-next-line
      this.timer = setTimeout(() => {
        if (this.number === this.dataList.length - 1) {
          this.number = 0
        } else {
          this.number += 1
        }
        this.startMove()
      }, 4000) // 滚动不需要停顿则将2000改成动画持续时间
    }
  },
  mounted () {
    this.startMove()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>
<style lang='less' scoped>
.carousel-wrap {
  height: 78px;
  width: 160px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // padding-left: 47px;
  span {
    flex: 1;
    font-size: 20px;
    // &:nth-child(2) {
    //   margin-top: 12px;
    //   color: #59be79;
    // }
  }
  .textBox {
    width: 100%;
    height: 40px;
    overflow: hidden;
    position: relative;
    .text {
      z-index: 2000;
      font-size: 20px;
      width: 100%;
      height: 25px;
      position: absolute;
      color: #59be79;
      // top: 0;
      bottom: 0;
    }
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s linear;
  }
  .slide-enter {
    transform: translateY(20px) scale(1);
    opacity: 1;
  }
  .slide-leave-to {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
  }
}
</style>
