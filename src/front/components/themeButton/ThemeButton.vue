<template>
  <div class="button-container">
    <v-switch
      v-model="isDarkTheme"
      @change="toggleTheme"
      inset
      hide-details
    />
  </div>
</template>

<script>
import { useTheme } from 'vuetify';
import { computed } from 'vue';

export default {
  name: "ThemeButton",
  setup() {
    const theme = useTheme();
    const isDarkTheme = computed(() => theme.global.name.value === 'dark');

    const toggleTheme = () => {
      theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light';
    };

    return {
      toggleTheme,
      isDarkTheme,
    };
  },
}
</script>

<style scoped>
.button-container {
  position: fixed;
  bottom: 20px !important;
  right: 20px !important;
  z-index: 1000;
}
</style>
