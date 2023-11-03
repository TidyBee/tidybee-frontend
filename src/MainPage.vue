<template>
  <div>
    <NavBar_Components />
    <FileList
      :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
      :widget-name="'Top Heaviest Files'"
    />
  </div>
</template>

<script>
import NavBar_Components from '@/components/NavBar.vue'
import FileList from "@/components/widgets/fileList.vue"

export default {
  name: 'MainPage',
  components: {
      NavBar_Components,
      FileList
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
