<template>
  <div id="input">
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>
<script>
export default {
  name: 'j-input',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (e) {
      console.log(e.target.value)
      // 监听数值变化
      this.$emit('change', e.target.value)
      // 触发校验
      this.$parent.$emit('validate')
    }
  }
}
</script>
<style lang='less' scoped>
#input {
  display: flex;
  align-items: center;
  margin-right: 20px;
  input {
    border: none;
    outline: none;
    border-bottom: 1px solid gray;
  }
}
</style>
