<template>
  <v-app>
    <NavBar :prop-page="'Home'" />

    <div id="app">
      <router-view />
    </div>
    <HelpButton @open="isOpen = !isOpen" />
    <BaseModal :open="isOpen" @close="isOpen = !isOpen">
      <p>
        {{ $t("help.helpText1") }} <br />
        {{ $t("help.helpText2") }}
      </p>
    </BaseModal>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import HelpButton from "@/components/HelpButton.vue";
import BaseModal from "./components/BaseModal.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    NavBar,
    HelpButton,
    BaseModal,
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
};
</script>

<style src="./css/App.css" scoped></style>
