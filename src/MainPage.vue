<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-sheet rounded="lg" min-height="268">
            <!--  -->
          </v-sheet>
        </v-col>

        <v-col cols="12" md="8">
          <v-sheet min-height="70vh" rounded="lg">
            <!--  -->
          </v-sheet>
        </v-col>

        <v-col cols="12" md="2">
          <v-sheet rounded="lg" min-height="268">
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <!--
  <div>
    <NavBar />
    <FileList
      :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
      :widget-name="'Top Heaviest Files'"
    />
    <PostButton :tidy-hub-api="tidyHubApi + 'proxy/post'" />
    <HelpButton @open="isOpen = !isOpen" />
    <BaseModal :open="isOpen" @close="isOpen = !isOpen">
      <p>
        {{ $t("help.helpText1") }} <br />
        {{ $t("help.helpText2") }}
      </p>
    </BaseModal>
  </div>
--></template>

<script></script>

<!--
<script>
import NavBar from "@/components/NavBar.vue";
import FileList from "@/components/widgets/FileList.vue";
import PostButton from "@/components/widgets/PostButton.vue";
import HelpButton from "@/components/HelpButton.vue";
import BaseModal from "./components/BaseModal.vue";
import { ref } from "vue";

export default {
  name: "MainPage",
  components: {
    NavBar,
    FileList,
    PostButton,
    HelpButton,
    BaseModal,
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  },
};
</script>
<style src="@/css/MainPage.css" scoped></style>
-->
