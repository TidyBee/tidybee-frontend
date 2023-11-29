<template>
  <v-list-item-title>
    {{ option.name }}
  </v-list-item-title>
  <v-list density="compact">
    <v-list-item v-for="choice in choices" :key="choice.name">
      {{ choice.name }}
      <input v-model="choice.checked" type="checkbox" @input="updateValue" />
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "MultipleOption",
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["configInput"],
  data() {
    return {
      choices: [""],
    };
  },
  async mounted() {
    this.choices = this.option.value;
  },
  methods: {
    updateValue() {
      this.$emit("configInput", this.choices);
    },
  },
};
</script>

<style src="./css/MultipleOption.css" scoped />
