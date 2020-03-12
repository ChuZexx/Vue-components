<template>
  <div id="form">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'j-form',
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate (callBack) {
      const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
      // 所有任务都通过才算校验通过
      Promise.all(tasks).then(() => callBack(true)
      ).catch(() => callBack(false)
      )
    }
  }
}
</script>
<style lang='less' scoped>
#form {
  display: inline-block;
  border: 1px solid gray;
  padding: 0 8px 0 8px;
}
</style>
