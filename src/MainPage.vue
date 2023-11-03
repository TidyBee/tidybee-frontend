<template>
  <div>
    <NavBar_Components />
    <div>
      <APIComponent :api-url="apiWorldTimeUrl">
        <template #default="{ data }">
          <div>
            <p>Timezone: {{ data.timezone }}</p>
            <p>Current Time: {{ data.datetime }}</p>
            <p>Day of the Week: {{ data.day_of_week }}</p>
          </div>
        </template>
      </APIComponent>
    </div>
    <HelpButton @open="isOpen = !isOpen"/>
    <BaseModal
      :open="isOpen"
      @close="isOpen = !isOpen"
    >
      <p>
        This is where I would put the tutorial for tidyBee<br>
        Once its written
      </p>
    </BaseModal>
  </div>
</template>

<script>
import NavBar_Components from '@/components/NavBar.vue'
import APIComponent from "./components/APIComponent.vue"
import HelpButton from "@/components/HelpButton.vue"
import BaseModal from '@/components/BaseModal.vue';
import { ref } from 'vue';

export default {
    name: 'MainPage',
    components: {
        NavBar_Components,
        APIComponent,
        BaseModal,
        HelpButton
    },
    setup() {
      const isOpen = ref(false)

      return { isOpen }
    },
    data() {
        return {
            apiWorldTimeUrl: process.env.VUE_APP_HUB
        };
    }
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
