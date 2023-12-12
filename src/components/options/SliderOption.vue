<template>
  <v-list-item-title>  
    {{ option.name }}
  </v-list-item-title>
  <v-slider v-model="value" max="100" min="0" hide-details step="1" :label="option.name" @update:model-value="updateValue">
    <template #append>
      <v-text-field v-model="value" type="number" density="compact" hide-details variant="outlined" style="width: 80px" @update:model-value="updateValue" />
    </template>
  </v-slider>
</template>

<script>
export default {
  name: "SliderOption",
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
