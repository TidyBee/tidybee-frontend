<template>
  {{ option.name }} <br />
  <select v-model="value" @change="updateValue">
    <option disabled value="">Please select one</option>
    <option v-for="choice in option.choices" :key="choice">
      {{ choice }}
    </option>
  </select>
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
