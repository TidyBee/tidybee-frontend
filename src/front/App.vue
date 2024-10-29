<template>
  <div id="app">
    <v-app>
      <NavBar :prop-page="'Home'" />
      <v-container>
        <slot />
      </v-container>
    </v-app>
  </div>
</template>

<script>

import NavBar from '@/front/pages/NavBar.vue';

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>
