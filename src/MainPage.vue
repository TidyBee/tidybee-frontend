<template>
  <div>
    <NavBar />
    <FileList
      :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
      :widget-name="'Top Heaviest Files'"
    />
    <triggerbtn />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FileList from "@/components/widgets/fileList.vue"
import triggerbtn from '@/components/widgets/triggerButton.vue'

export default {
  name: 'MainPage',
  components: {
      NavBar,
      FileList,
      triggerbtn,
  },  
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB,
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
