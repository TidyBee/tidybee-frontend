<template>
  <button
    class="help-button"
    @click="$emit('open')"
  >
    ?
  </button>
</template>

<script>
export default {
    emits: ['open']
}
</script>

<style scoped>
.help-button {
  position: fixed;
  left: 20px;
  bottom: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: larger;
  cursor: pointer;
  border: none;
}
</style>