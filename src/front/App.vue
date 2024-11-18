<template>
  <div id="app">
    <v-app>
      <NavBar :prop-page="'Home'" />
      <v-container>
        <router-view />
      </v-container>
      <ThemeButton />
    </v-app>
  </div>
</template>

<script>

import NavBar from '@/front/components/navbar/NavBar.vue';
import ThemeButton from '@/front/components/themeButton/ThemeButton.vue'

export default {
  name: "App",
  components: {
    NavBar,
    ThemeButton
  },
};
</script>
