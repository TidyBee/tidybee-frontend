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
  }
}
</script>