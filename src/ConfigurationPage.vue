<template>
  <div>
    <NavBar_Components />
    <ul>
      <li
        v-for="option in getConfigTypes('Slider')"
        :key="option.name"
      >
        {{ option.name }} <br>
        <input
          v-model="option.value"
          type="range"
          min="0"
          max="100"
          class="slider"
        >
        <br>
        <input
          v-model="option.value"
          type="number"
        >
      </li>
      <li
        v-for="option in getConfigTypes('MultipleChoice')"
        :key="option.name"
      >
        <ul>
          <li
            v-for="choices in option.value"
            :key="choices.name"
          >
            {{ choices.name }}
            <input
              v-model="choices.checked"
              type="checkbox"
            >
          </li>
        </ul>
      </li>
      <li
        v-for="option in getConfigTypes('Input')"
        :key="option.name"
      >
        {{ option.name }} <br>
        <input
          v-model="option.value"
          type="number"
        >
      </li>
      <li
        v-for="option in getConfigTypes('Dropdown')"
        :key="option.name"
      >
        {{ option.name }} <br>
        <select v-model="option.value">
          <option
            disabled
            value=""
          >
            Please select one
          </option>
          <option
            v-for="choice in option.choices"
            :key="choice"
          >
            {{ choice }}
          </option>
        </select>
      </li>
    </ul>
    <button @click="saveConfig()">
      Save
    </button>
  </div>
</template>
  
<script>
import NavBar_Components from '@/components/NavBar.vue'
import json from "@/assets/configuration.json"
import { ref } from 'vue';

export default {
    name: 'ConfigurationPage',
    components: {
        NavBar_Components,
    },
    data() {
        return {
            filesInfos: [],
            tidyHubApi: process.env.VUE_APP_HUB,
            sliderValue: ref(50),
            myConfig: json,
        };
    },
    async mounted() {
    },
    methods: {
        getConfigTypes(configType) {
            return this.myConfig.filter(option => option.type == configType);
        },
        saveConfig() {
            let data = JSON.stringify(this.myConfig);
            console.log(data);
        }
    },
}
</script>
  
<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.widget-container {
    margin-left: 300px;
    display: flex;
    flex-wrap: wrap;
}

.file-info {
    margin-top: 20px;
}
</style>
  