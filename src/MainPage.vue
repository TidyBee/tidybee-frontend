<template>
  <div>
    <NavBar />
    <FileList
      :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
      :widget-name="'Top Heaviest Files'"
    />
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
      tidyHubApi: process.env.VUE_APP_HUB
     };
  },
}
</script>

<style src="./css/MainPage.css" scoped></style>
