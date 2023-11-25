<template>
  <div class="NavBar">
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
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    redirectToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style src="./css/NavBar.css" scoped></style>
