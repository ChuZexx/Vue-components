<template>
  <div id="form-item">
    <label v-if="label" class="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMsg" class="error-msg">{{errorMsg}}</p>
  </div>
</template>
<script>
import Schema from 'async-validator'
export default {
  name: 'j-form-item',
  components: {},
  inject: ['form'],
  data () {
    return {
      errorMsg: ''
    }
  },
  props: {
    label: {
      type: String,
      default: '',
      required: true
    },
    prop: {
      type: String
    }
  },
  mounted () {
    // 监听校验
    this.$on('validate', () => { this.validate() })
  },
  methods: {
    validate () {
      console.log('触发校验===')
      // 做校验
      const value = this.form.model[this.prop]
      console.log(this.prop)
      console.log(value)
      const rules = this.form.rules[this.prop]
      const desc = { [this.prop]: rules }
      const schema = new Schema(desc)
      // return的是校验结果的Promise
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          console.log('error', errors[0].message)
          this.errorMsg = errors[0].message
        } else {
          console.log('error', errors)
          this.errorMsg = ''
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
#form-item {
  height: 55px;
  display: flex;
  // align-items: center;
  .label {
    line-height: 55px;
    margin-right: 20px;
  }
  .error-msg {
    display: flex;
    align-items: center;
    color: red;
  }
}
</style>
