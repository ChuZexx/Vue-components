<template>
  <li>
    <div @click="toggle">
      {{model.title}}
      <span>[{{isOpen?"-":"+"}}]</span>
    </div>
    <ul v-show="isOpen" class="item">
      <item v-for="(item, index) in model.children" :key="index" :model="item" />
    </ul>
  </li>
</template>
<script>
export default {
  name: 'item',
  components: {},
  props: {
    model: Object
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<style lang='less' scoped>
li {
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */

  -webkit-user-select: none; /* Chrome/Safari/Opera */

  -khtml-user-select: none; /* Konqueror */

  -moz-user-select: none; /* Firefox */

  -ms-user-select: none; /* Internet Explorer/Edge */

  user-select: none;
}
</style>
