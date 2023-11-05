<template>
  <div class="NavBar">
    <div class="logo">
      <img
        src="@/assets/tidybeelogo.png"
        alt="TidyBeeLogo"
      >
      <h2 class="nav-item">
        TidyBee
      </h2>
    </div>
    <div class="menu-items">
      <h3 class="nav-item">
        Configuration
      </h3>
      <h3 class="nav-item">
        À Propos
      </h3>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style src="./css/NavBar.css" scoped></style>