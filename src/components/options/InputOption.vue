<template>
  <v-list-item-title>
    {{ $t(`parameters.${option.name}`) }} <br />
  </v-list-item-title>
  <v-text-field
    v-model="value"
    :label="$t(`parameters.${option.name}`)"
    @update:model-value="updateValue"
  />
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
