<template>
  <v-app>
    <NavBar :prop-page="'Home'" />

    <div id="app">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import NavBar from "@/pages/NavBar.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
};
</script>

<style src="@/../css/App.css" scoped></style>
