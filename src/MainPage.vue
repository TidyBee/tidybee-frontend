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
import {getData} from './communication/communication.js'

export default {
  name: 'MainPage',
  components: {
      NavBar_Components,
  },  
  data() {
    return {
      filesInfos: []
    };
  },
  async mounted() {
    try {
      this.filesInfos = await getData(process.env.URL_HUB_API);
    } catch (error) {
      console.error(error);
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
