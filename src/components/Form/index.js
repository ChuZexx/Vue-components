import Form from './Form.vue'
import FormItem from './FormItem.vue'
import Input from './Input.vue'

export default {
  install: (Vue) => {
    Vue.component(Form.name, Form)
    Vue.component(FormItem.name, FormItem)
    Vue.component(Input.name, Input)
  }
}
