'<template>
    <div>
      <NavBar_Components />
      <!-- <div class="widget-container">
        <sortByWidget
            :files="filesData.files"
            :top="filesData.top"
            :sortBy="filesData.sortBy"
            :widgetName="filesData.widgetName"
        />
      </div> -->
      <APIComponent :apiUrl="apiWorldTimeUrl">
        <template v-slot="{ data }">
          <div>
            <p>Timezone: {{ data.timezone }}</p>
            <p>Current Time: {{ data.datetime }}</p>
            <p>Day of the Week: {{ data.day_of_week }}</p>
          </div>
        </template>
      </APIComponent>
    </div>
</template>
  
<script>
import NavBar_Components from '@/components/NavBar.vue'
import APIComponent from "./components/APIComponent.vue"
//import sortByWidget from './components/widgets/sortByWidget.vue'
  
export default {
    name: 'MainPage',
    components: {
        NavBar_Components,
        APIComponent,
//        sortByWidget
    },
    data() {
        return {
            apiWorldTimeUrl: process.env.VUE_APP_API
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