<template>
  <div>
    <NavBar_Components />
    <div class="file-info">
      <h2>Informations sur les fichiers</h2>
      <ul>
        <li
          v-for="file in filesInfos" 
          :key="file.id"
        > 
          {{ file }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar_Components from '@/components/NavBar.vue'
import axios from 'axios'
// import APIComponent from "./components/APIComponent.vue"

export default {
  name: 'MainPage',
  components: {
      NavBar_Components,
      // APIComponent,
  },  
  data() {
    return {
      filesInfos: []
    };
  },
  mounted() {
    this.getFilesInfos();
  },
  methods: {
    async getFilesInfos() {
      try {
        const response = await axios.get('https://localhost:7114/api/Dashboard/top-heaviest-files');
        console.log(response.data);
        this.filesInfos = response.data;
      } catch (error) {
        console.error(error);
      }
    }
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

.widget-container {
    margin-left: 300px;
    display: flex;
    flex-wrap: wrap;
}

.file-info {
  margin-top: 20px;
}
</style>
