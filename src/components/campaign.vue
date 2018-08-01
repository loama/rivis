<template>
  <div class="campaign">
    campaign {{$route.params.id}}
  </div>
</template>

<script>
export default {
  name: 'Campaign',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
