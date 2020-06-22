
<template>
  <div class="slider" ref="slider" :class="{is_vertical:vertical===true}">
    <div
      class="process"
      ref="process"
      :style="vertical===true?{height}:{width}"
      :class="{full:scale===1}"
    ></div>
    <div class="thunk" ref="trunk" :style="vertical===true?{bottom}:{left}"></div>
    <!-- <div class="icon" :class="{full:scale>0.95}"></div> -->
  </div>
</template>
<script>
export default {
  name: 'j-light',
  model: {
    prop: 'progress',
    event: 'change'
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    progress: Number,
    vertical: Boolean
  },
  data () {
    return {
      slider: null, // 滚动条DOM元素
      thunk: null, // 拖拽DOM元素
      per: 0, // 当前值
      process: null
    }
  },
  computed: {
    // 设置一个百分比，提供计算slider进度宽度和trunk的left值
    // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
    // trunk left =  slider进度width + trunk宽度/2
    scale () {
      return (this.per - this.min) / (this.max - this.min)
    },
    width () {
      // console.log(this.slider)
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + 'px'
        // return 450 * this.scale + 'px'
      } else {
        return 0 + 'px'
      }
    },
    height () {
      if (this.slider) {
        return this.slider.offsetHeight * this.scale + 'px'
      } else {
        return 0 + 'px'
      }
    },
    left () {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale - this.thunk.offsetWidth / 2 + 'px'
        // return 450 * this.scale - 45 / 2 + 'px'
      } else {
        return 0 + 'px'
      }
    },
    bottom () {
      if (this.slider) {
        return this.slider.offsetHeight * this.scale - this.thunk.offsetHeight / 2 + 'px'
      } else {
        return 0 + 'px'
      }
    }
  },
  watch: {
    per (newValue) {
      this.$emit('change', Math.abs(newValue))
    },
    progress: {
      handler (newValue) {
        // 根据属性值实时变化
        this.per = newValue
      },
      immediate: true
    }
  },
  methods: {
    verticalDrag () {
      this.slider = this.$refs.slider
      this.thunk = this.$refs.trunk
      this.process = this.$refs.process
      var _this = this
      this.thunk.onmousedown = function (e) {
        e.stopPropagation()
        console.log('开始拖拉')
        _this.$emit('dragStart')
        // 禁用动画
        console.log(_this.process)
        _this.process.style.transition = 'none'
        var height = parseInt(_this.height)
        var disY = e.targetTouches[0].clientY
        document.onmousemove = function (e) {
          // 拖拽的时候获取的新width
          var newHeight = disY - e.targetTouches[0].clientY + height
          // 拖拽的时候得到新的百分比
          var scale = newHeight / _this.slider.offsetHeight
          _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min)
          _this.per = Math.max(_this.per, _this.min)
          _this.per = Math.min(_this.per, _this.max)
        }
        document.onmouseup = function () {
          console.log('松手')
          _this.$emit('dragEnd')
          document.onmousemove = document.onmouseup = null
          _this.process.style.transition = 'height 0.2s linear'
          console.log(_this.process)
        }
        return false
      }
      // 点击跳动进度
      this.slider.onmousedown = function (e) {
        // 得到点击的在进度条上的位置
        // 拖拽的时候获取的新width
        var newHeight = e.targetTouches[0].clientY - _this.slider.getBoundingClientRect().top
        console.log(e.targetTouches[0].clientY)
        console.log(_this.slider.getBoundingClientRect())
        // 拖拽的时候得到新的百分比
        var scale = (_this.slider.offsetHeight - newHeight) / _this.slider.offsetHeight
        console.log(newHeight)
        console.log(_this.slider.offsetHeight)
        console.log(scale)
        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min)
        _this.per = Math.max(_this.per, _this.min)
        _this.per = Math.min(_this.per, _this.max)

        document.onmouseup = function () {
          _this.$emit('dragStart', 'click')
          _this.$emit('dragEnd', 'click')
          document.onmouseup = null
        }
        return false
      }
    },
    horizontalDrag () {
      this.slider = this.$refs.slider
      this.thunk = this.$refs.trunk
      this.process = this.$refs.process
      var _this = this
      this.thunk.onmousedown = function (e) {
        e.stopPropagation()
        console.log('开始拖拉')
        _this.$emit('dragStart')
        _this.process.style.transition = 'none'
        var width = parseInt(_this.width)
        var disX = e.clientX
        document.onmousemove = function (e) {
          // value, left, width
          // 当value变化的时候，会通过计算属性修改left，width

          // 拖拽的时候获取的新width
          var newWidth = e.clientX - disX + width
          // 拖拽的时候得到新的百分比
          var scale = newWidth / _this.slider.offsetWidth
          _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min)
          _this.per = Math.max(_this.per, _this.min)
          _this.per = Math.min(_this.per, _this.max)
        }
        document.onmouseup = function () {
          console.log('松手')
          _this.$emit('dragEnd')
          document.onmousemove = document.onmousemove = null
          _this.process.style.transition = 'width 0.2s linear'
        }
        return false
      }
      // 点击跳动进度
      this.slider.onmousedown = function (e) {
        // 得到点击的在进度条上的位置
        console.log(e)
        console.log(e.clientX)
        console.log(_this.slider.getBoundingClientRect().left)
        // 拖拽的时候获取的新width
        var newWidth = e.clientX - _this.slider.getBoundingClientRect().left
        // 拖拽的时候得到新的百分比
        var scale = newWidth / _this.slider.offsetWidth
        console.log(newWidth)
        console.log(_this.slider.offsetWidth)
        console.log(scale)
        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min)
        _this.per = Math.max(_this.per, _this.min)
        _this.per = Math.min(_this.per, _this.max)

        document.onmouseup = function () {
          _this.$emit('dragStart', 'click')
          _this.$emit('dragEnd', 'click')
          document.onmouseup = null
        }
        return false
      }
    }
  },
  mounted () {
    if (this.vertical) {
      this.verticalDrag()
    } else {
      this.horizontalDrag()
    }
  }
}
</script>
<style lang="less" scoped>
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.slider {
  position: relative;
  width: 280px;
  height: 25px;
  border-radius: 12px;
  border: solid 1px black;
  z-index: 100;
  .process {
    position: absolute;
    transition: width 0.2s linear;
    left: 0;
    top: 0;
    width: 112px;
    height: 25px;
    border-radius: 16px;
    background-color: #5596e8;
  }
  .thunk {
    position: absolute;
    touch-action: none;
    z-index: 99999;
    left: 100px;
    top: -7px;
    width: 45px;
    height: 45px;
    .tips {
      position: absolute;
      left: -7px;
      bottom: 30px;
      min-width: 15px;
      text-align: center;
      padding: 4px 8px;
      background: #000;
      border-radius: 5px;
      height: 24px;
      color: #fff;
      i {
        position: absolute;
        margin-left: -5px;
        left: 50%;
        bottom: -9px;
        font-size: 16px;
        color: #000;
      }
    }
    .block {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #409eff;
      background: rgba(255, 255, 255, 1);
      transition: 0.2s all linear;
      &:hover {
        transform: scale(1.1);
        opacity: 0.6;
      }
    }
  }
  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    height: 16px;
    width: 16px;
    // background-image: url("../../assets/images/light/light_icon_dark.png");
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    // &.full {
    //   background-image: url("../../assets/images/light/light_icon_bright.png");
    // }
  }
  &.is_vertical {
    height: 400px;
    width: 30px;
    // background-image: url("../../assets/images/light/氛围灯_vertical_close.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .process {
      width: 30px;
      height: 112px;
      bottom: 0;
      transition: height 0.2s;
      top: unset;
      left: 0;
      // background-image: url("../../assets/images/light/纵向_100%亮度_1300.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 0 100%;
      &.full {
        background-size: 100% 100%;
      }
    }
    .thunk {
      top: unset;
      left: -7px;
      bottom: 100px;
      width: 45px;
      height: 45px;
    }
    .icon {
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
