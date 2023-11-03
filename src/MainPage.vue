<template>
  <div>
    <NavBar_Components />
    <APIComponent :api-url="tidyHubApi + 'api/Dashboard/top-heaviest-files'">
      <template #default="{ data }">
        <div class="file-info">
          <h2>Informations sur les fichiers</h2>
          <ul>
            <li
              v-for="file in data" 
              :key="file.id"
            > 
              {{ file }}
            </li>
          </ul>
        </div>
      </template>
    </APIComponent>
  </div>
</template>

<script>
import NavBar_Components from '@/components/NavBar.vue'
import APIComponent from "./components/APIComponent.vue"

export default {
  name: 'MainPage',
  components: {
      NavBar_Components,
      APIComponent
  },  
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB
    };
  },
  async mounted() {
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
