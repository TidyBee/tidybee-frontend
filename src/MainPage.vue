'<template>
  <div>
    <NavBar_Components />
    <div class="widget-container" />
  </div>
</template>

<script>
import NavBar_Components from '@/components/NavBar.vue'

export default {
    name: 'MainPage',
    components: {
        NavBar_Components,
    },
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.widget-container {
    margin-left: 300px;
    display: flex;
    flex-wrap: wrap;
}
</style>
