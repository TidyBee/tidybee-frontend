<template>
  <v-btn class="add-button" @click="$emit('click')">+</v-btn>
</template>

<script>
export default {
  emits: ["click"],
};
</script>

<style src="./css/AddButton.css" scoped></style>
