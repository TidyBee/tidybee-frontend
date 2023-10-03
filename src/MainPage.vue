<template>
  <div>
    <NavBar_Components />
  </div>
</template>

<script>
import NavBar_Components from '@/components/NavBar.vue'

// import APIComponent from "./components/APIComponent.vue"

export default {
    name: 'MainPage',
    components: {
        NavBar_Components,
        // APIComponent,
    },
};

const axios = require('axios').default;
getFileInfo();
async function getFileInfo() {
  try {
    const response = await axios.get('https://localhost:7114/api/Dashboard/top-heaviest-files');
    console.log(response.data);
  } catch (error) {
    console.error(error);
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
</style>
