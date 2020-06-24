<template>
  <div class="airCondition-wrap">
    <div id="temperature-degree">
      <canvas id="temperature-arc" width="162px" height="162px"></canvas>
      <div>
        <div class="setting">
          <span class="number">{{ setting_temperature }}</span>
          <span class="unit">°C</span>
        </div>
        <div class="real">
          <span>当前温度:</span>
          <span class="number">{{ indoor_temperature }}</span>
          <span class="unit">°C</span>
        </div>
      </div>
    </div>

    <div id="temperature-control">
      <div class="minus" @click="temperatureControl('down')"></div>
      <div class="separator"></div>
      <div class="plus" @click="temperatureControl('up')"></div>
    </div>
  </div>
</template>
<script>
import TWEEN from '@tweenjs/tween.js'
export default {
  name: 'j-arc',
  data () {
    return {
      setting_temperature: 25, // 空调温度
      indoor_temperature: 22 // 室内温度
    }
  },
  props: {
    settingTemp: {
      type: Number,
      default: 25
    }, // 空调温度
    indoorTemp: {
      type: Number,
      default: 22
    }, // 室内温度
    maxTemp: {
      type: Number,
      default: 35
    },
    minTemp: {
      type: Number,
      default: 20
    }
  },
  computed: {},
  watch: {
    setting_temperature (newValue) {
      this.animateTemperature(newValue)
    }
  },
  methods: {
    // 产生动画
    animateTemperature (newTemp) {
      if (newTemp > this.maxTemp) newTemp = this.maxTemp
      if (newTemp < this.minTemp) newTemp = this.minTemp

      animate()
      function animate () {
        requestAnimationFrame(animate)
        TWEEN.update()
      }

      const value = { y: this.setting_temperature }
      new TWEEN.Tween(value)
        .to({ y: newTemp }, 200)
        .onUpdate(() => {
          this.drawTemperatureArc(value.y)
        })
        .start()

      this.setting_temperature = newTemp
    },
    // 控制
    temperatureControl (direction) {
      if (direction === 'up') {
        this.setting_temperature += (this.setting_temperature >= this.maxTemp ? 0 : 0.5)
      } else if (direction === 'down') {
        this.setting_temperature -= (this.setting_temperature <= this.minTemp ? 0 : 0.5)
      }
    },
    // 绘画
    drawTemperatureArc (temp) {
      const radius = 81
      const stroke = 4

      // let canvas = this.temperatureArc.nativeElement;
      const canvas = document.getElementById('temperature-arc')
      const ctx = canvas.getContext('2d')
      const degree = 180 / (this.maxTemp - this.minTemp) * (temp - this.minTemp)
      const toRadius = degree * Math.PI / 180
      let diameterArcLength = Math.abs(Math.cos(toRadius) * radius)
      if (degree > 90) {
        diameterArcLength += radius
      } else {
        diameterArcLength = radius - diameterArcLength
      }

      const gradient = ctx.createLinearGradient(0, 0, diameterArcLength, 0)
      gradient.addColorStop(0, '#4e4338')
      gradient.addColorStop(1, '#dfaf7f')

      ctx.clearRect(0, 0, 2 * radius, 2 * radius)
      ctx.beginPath()
      ctx.arc(radius, radius, radius - stroke, -180 * Math.PI / 180, 0 * Math.PI / 180, false)
      ctx.lineWidth = stroke
      ctx.strokeStyle = '#373637'
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(radius, radius, radius - stroke, -180 * Math.PI / 180, (degree - 180) * Math.PI / 180, false)
      ctx.lineWidth = stroke
      ctx.strokeStyle = gradient
      ctx.stroke()
    }
  },
  created () {

  },
  mounted () {
    this.setting_temperature = this.settingTemp
    this.indoor_temperature = this.indoorTemp
    this.drawTemperatureArc(this.setting_temperature)
  }
}
</script>
<style lang='less' scoped>
.airCondition-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #temperature-degree {
    width: 180px;
    height: 180px;
    // color: #0096ff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-image: url("../../assets/temp-bg.png");
    background-size: contain;
    background-position: center;

    > div {
      width: 140px;
      height: 140px;
      //background-image: url("../assets/imgs/temp-upper.png");
      //background-size: contain;
      //background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .setting {
        display: flex;
        align-items: flex-start;

        .number {
          font-size: 32px;
          line-height: 48px;
          // color: white;
        }

        .unit {
          font-size: 17px;
          color: #6f6f6f;
          font-weight: bold;
          line-height: 17px;
        }
      }

      .real {
        margin-top: 2px;
        color: #6f6f6f;
        font-size: 12px;
        font-weight: bold;
      }

      .unit {
        // font-family: "PingFang SC";
      }
    }

    #temperature-arc {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  #temperature-control {
    display: flex;
    width: 160px;
    margin-top: -20px;

    > div.separator {
      flex: 1;
    }

    .plus,
    .minus {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .minus {
      background-image: url("../../assets/温度调节_加减号.png");
    }
    .plus {
      background-image: url("../../assets/温度调节_加号.png");
    }
  }
}
</style>
