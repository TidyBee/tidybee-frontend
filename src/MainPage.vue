<template>
  <div>
    <NavBar />
    <FileList
      :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
      :widget-name="'Top Heaviest Files'"
    />
    <triggerbtn
      :tidy-hub-api-post="'tidyHubApiPOST'"
    />
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
      tidyHubApiPOST: process.env.VUE_APP_HUB_POST,
    };
  },
}
</script>

<style src="./css/MainPage.css" scoped></style>
