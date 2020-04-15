<template>
  <ul>
    <item :model="model" />
  </ul>
</template>
<script>
import Item from './Item'
export default {
  name: 'j-tree',
  components: { Item },
  props: {
    model: Object
  }
}
</script>
<style lang='' scoped>
</style>
