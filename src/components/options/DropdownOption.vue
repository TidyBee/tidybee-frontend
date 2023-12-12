<template>
  <v-list-item-title>
    {{ option.name }} <br />
  </v-list-item-title>
  <v-select v-model="value" :label="option.name" :items="option.choices" @update:model-value="updateValue" />
</template>

<script>
export default {
  name: "DropdownOption",
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["configInput"],
  data() {
    return {
      value: "",
    };
  },
  async mounted() {
    this.value = this.option.value;
  },
  methods: {
    updateValue() {
      this.$emit("configInput", this.value);
    },
  },
};
</script>
