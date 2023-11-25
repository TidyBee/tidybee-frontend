<template>
  <div>
    <NavBar />
    <FileList
      :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
      :widget-name="'Top Heaviest Files'"
    />
    <PostButton :tidy-hub-api="tidyHubApi" />
    <HelpButton @open="isOpen = !isOpen" />
    <BaseModal :open="isOpen" @close="isOpen = !isOpen">
      <p>
        This is where I would put the tutorial for tidyBee<br />
        Once its written
      </p>
    </BaseModal>
  </div>
</template>

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
