import Vue from 'vue'
import Loading from './Loading.vue'

let vm

function loading (props) {
  vm = new Vue({
    render (h) {
      return h(Loading, { props })
    }
  }).$mount()

  document.body.appendChild(vm.$el)

  const component = vm.$children[0]
  component.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  // component.show()
}

loading.close = () => {
  vm.$children[0].remove()
}

export default loading
