<template>
  <div>
    <NavBar />
    <ApiLoader :api-url="'https://localhost:7114/api/Dashboard/top-heaviest-files'">
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
    </ApiLoader>
    <triggerbtn />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ApiLoader from "./components/ApiLoader.vue"
import triggerbtn from "./components/widgets/triggerButton.vue"

export default {
  name: 'MainPage',
  components: {
      NavBar,
      ApiLoader,
      triggerbtn
  },  
  data() {
    return {
      filesInfos: [],
    };
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
