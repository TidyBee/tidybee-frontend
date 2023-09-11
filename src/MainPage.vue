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
      <APIWorldTime :apiUrl="apiWorldTimeUrl">
        <template v-slot="{ data }">
          <div>
            <p>Timezone: {{ data.timezone }}</p>
            <p>Current Time: {{ data.datetime }}</p>
            <p>Day of the Week: {{ data.day_of_week }}</p>
          </div>
        </template>
      </APIWorldTime>
    </div>
</template>
  
<script>
import dotenv from 'dotenv'
import NavBar_Components from '@/components/NavBar.vue'
import APIWorldTime from "./components/APIWorldTime.vue"
//import sortByWidget from './components/widgets/sortByWidget.vue'
  
export default {
    name: 'MainPage',
    components: {
        NavBar_Components,
        APIWorldTime,
//        sortByWidget
    },
    data() {
        dotenv.config();
        console.log(process.env.API_WORLD_TIME)
        return {
            apiWorldTimeUrl: process.env.API_WORLD_TIME
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