<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <v-sheet rounded="lg">
          <FileList
            :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
            :widget-name="'Top Heaviest Files'"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import FileList from "@/components/widgets/FileList.vue";
// import PostButton from "@/components/widgets/PostButton.vue";

export default {
  name: "MainPage",
  components: {
    FileList,
    // PostButton,
  },
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  }
};
</script>


<style src="@/css/MainPage.css" scoped></style>
