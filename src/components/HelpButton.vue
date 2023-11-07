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

<style src="./css/HelpButton.css" scoped></style>