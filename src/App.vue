<template>
  <v-app>
    <NavBar :prop-page="'Home'" />

    <div id="app">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style src="./css/App.css" scoped></style>
