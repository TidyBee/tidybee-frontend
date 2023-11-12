<template>
  <div>
    <NavBar />
    <FileList
      :tidy-hub-api="'https://localhost:7114/api/Dashboard/top-heaviest-files'"
      :widget-name="'Top Heaviest Files'"
    />
    <triggerbtn />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FileList from "@/components/widgets/fileList.vue"

export default {
  name: 'MainPage',
  components: {
      NavBar,
      FileList,
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
