<template>
  <v-btn class="FileView" @click="$emit('open')"></v-btn>
</template>

<script>
export default {
  emits: ["open"],
};
</script>

<style src="./css/FileView.css" scoped></style>
