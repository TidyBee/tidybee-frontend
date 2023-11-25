<template>
  <v-app-bar class="px-3" flat density="compact">
    <v-app-bar-icon>
      <v-icon> </v-icon>
    </v-app-bar-icon>
    <v-spacer></v-spacer>
    <v-tabs centered color="grey-darken-2">
      <v-tab
        v-for="link in links"
        :key="link"
        :text="link"
        @click="redirectToRoute(link)"
      ></v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
  </v-app-bar>
  <!-- <div class="NavBar">
    <div class="logo" @click="redirectToRoute('Home')">
      <img src="@/assets/tidybeelogo.png" alt="TidyBeeLogo" />
      <h2 class="nav-item">TidyBee</h2>
    </div>
    <div class="menu-items">
      <h3 class="nav-item" @click="redirectToRoute('Configuration')">
        Configuration
      </h3>
      <h3 class="nav-item">À Propos</h3>
    </div>
  </div> -->
</template>

<script>
export default {
  data: () => ({
    links: ["Home", "Configuration", "About"],
  }),
  methods: {
    redirectToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
