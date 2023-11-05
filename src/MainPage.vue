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
}
</script>

<style src="./css/MainPage.css" scoped></style>
