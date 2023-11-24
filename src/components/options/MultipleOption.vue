<template>
  {{ option.name }} <br>
  <ul>
    <li
      v-for="choices in value"
      :key="choices.name"
      class="multichoice-list"
    >
      {{ choices.name }}
      <input
        v-model="choices.checked"
        type="checkbox"
        @input="updateValue"
      >
    </li>
  </ul>
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
    emits: ['configInput'],
    data() {
      return {
          value: [''],
      }
    },
    async mounted() {
      this.value = this.option.value;
    },
    methods: {
      updateValue() {
        this.$emit("configInput", this.value);
      },
    }
  }
  </script>
  
  <style src="./css/MultipleOption.css" scoped />