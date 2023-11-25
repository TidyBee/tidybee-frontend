<template>
  {{ option.name }} <br />
  <input v-model="value" type="number" @input="updateValue" />
</template>

<script>
export default {
  name: "InputOption",
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["configInput"],
  data() {
    return {
      value: 50,
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
