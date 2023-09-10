<template>
  <div id="app">
    <MainPage />
    <APIComponent :apiUrl="apiUrlTest">
      <template v-slot="{ data }">
        <div>
          <p>Timezone: {{ data.timezone }}</p>
          <p>Current Time: {{ data.datetime }}</p>
          <p>Day of the Week: {{ data.day_of_week }}</p>
        </div>
      </template>
    </APIComponent>
  </div>
</template>

<script>
import MainPage from './MainPage.vue'
import APIComponent from "./components/APIComponent.vue"

export default {
  name: 'App',
  components: {
    MainPage,
    APIComponent
  },
  data() {
    return {
      apiUrlTest: 'http://worldtimeapi.org/api/timezone/Europe/Amsterdam',
    };
  }
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
</style>
