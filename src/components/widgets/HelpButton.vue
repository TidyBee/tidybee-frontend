<template>
  <v-btn class="help-button" @click="$emit('open')">?</v-btn>
</template>

<script>
export default {
  emits: ["open"],
};
</script>

<style src="@/../css/components/widgets/HelpButton.css" scoped></style>
