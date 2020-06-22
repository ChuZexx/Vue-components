<template>
  <div class="curtain-wrap">
    <div class="curtain-container" ref="parent" :style="{width:bgWidth+'px',height:bgHeight+'px'}">
      <div ref="left" class="left curtain"></div>
      <div ref="right" class="right curtain"></div>
    </div>
    <div class="control" :style="{width:bgWidth+'px'}">
      <div class="open btn" @click="animate('open',bgWidth/2)">打开</div>
      <div class="stop btn" @click="stop">暂停</div>
      <div class="close btn" @click="animate('close',0)">关闭</div>
    </div>
  </div>
</template>
<script>
import anime from 'animejs'
export default {
  name: 'j-curtain',
  data () {
    return {
      leftAnime: '',
      rightAnime: '',
      timeCount: 0,
      bgWidth: 420,
      bgHeight: 361
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 暂停操作
    stop () {
      this.leftAnime.pause()
      this.rightAnime.pause()
    },
    // 开关动画
    animate (action, position) {
      const that = this
      const totalTime = 10000
      // const border = 1
      const curtainWidth = this.bgWidth / 2
      const distance = that.$refs.parent.getBoundingClientRect().left - that.$refs.left.getBoundingClientRect().left
      that.timeCount = totalTime * (action === 'open' ? ((curtainWidth - distance) / curtainWidth) : (distance / curtainWidth))
      this.leftAnime = anime({
        targets: '.left',
        translateX: -position,
        duration: that.timeCount,
        easing: 'linear',
        loop: false,
        autoplay: false,
        update: function (anim) {
          console.log(that.$refs.parent.getBoundingClientRect().left - that.$refs.left.getBoundingClientRect().left)
        }
      })
      this.rightAnime = anime({
        targets: '.right',
        translateX: position,
        duration: that.timeCount,
        easing: 'linear',
        loop: false,
        autoplay: false
      })
      this.leftAnime.play()
      this.rightAnime.play()
    },
    // 控制初始位置
    initialPosition (value) {
      const that = this
      this.leftAnime = anime({
        targets: '.left',
        translateX: -that.bgWidth / 2,
        // duration: 20000,
        easing: 'linear',
        loop: false,
        autoplay: false
      })
      this.rightAnime = anime({
        targets: '.right',
        translateX: that.bgWidth / 2,
        // duration: 20000,
        easing: 'linear',
        loop: false,
        autoplay: false
      })
      this.leftAnime.seek(this.leftAnime.duration * value / 100)
      this.rightAnime.seek(this.leftAnime.duration * value / 100)
      // 新加
    }
  },
  mounted () {
    // 传入值为打开的百分比值
    this.initialPosition(72)
  }
}
</script>
<style lang='less' scoped>
.curtain-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.curtain-container {
  box-sizing: border-box;
  /* border: 1px solid black; */
  display: flex;
  overflow: hidden;
  background-color: pink;
  // background-image: url("../../assets/images/curtain/餐厅窗帘_bg.png");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
}
.curtain {
  flex: 1;
  /* background: blue; */
  box-sizing: border-box;
  background-image: url("../../assets/布帘条.png");
  background-position: 0 50%;
  background-size: 18px 95%;
  background-repeat: repeat-x;
}
.left {
  /* transform: translateX(-300px); */
}
.right {
  /* transform: translateX(300px); */
}
.control {
  height: 30px;
  /* width: 600px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.control .btn {
  height: 30px;
  width: 80px;
  text-align: center;
  line-height: 30px;
  box-sizing: border-box;
  background: gray;
}
</style>
