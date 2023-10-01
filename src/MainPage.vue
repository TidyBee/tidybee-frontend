<template>
  <div>
    <NavBar_Components />
    <div>
      <APIComponent :api-url="apiWorldTimeUrl">
        <template #default="{ data }">
          <div>
            <p>Timezone: {{ data.timezone }}</p>
            <p>Current Time: {{ data.datetime }}</p>
            <p>Day of the Week: {{ data.day_of_week }}</p>
          </div>
        </template>
      </APIComponent>
    </div>
  </div>
</template>

<script>
import NavBar_Components from '@/components/NavBar.vue'
import APIComponent from "./components/APIComponent.vue"

export default {
    name: 'MainPage',
    components: {
        NavBar_Components,
        APIComponent,
    },
    data() {
        return {
            apiWorldTimeUrl: process.env.VUE_APP_API
        };
    }
};
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
</style>
