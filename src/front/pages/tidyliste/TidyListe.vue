<template>
    <ApiLoader :api-url="'SendOverviewAll'" widget-name="Widget aperçu" width="100vw">
      <template #default="{ data }">
        <div v-if="data">
          <v-row justify="center" class="table-container" width="100vw">
            <div>
              {{ "La TidyListe vous permet de visualiser l'ensemble des fichiers disponibles dans votre espace partagé." }}
            </div>
            <TidyListeTable :filesList="parseFileList(data)" />  
          </v-row>
        </div>
      </template>
    </ApiLoader>
</template>

<script>

import TidyListeTable from "./table/TidyListeTable.vue"
import ApiLoader from "@/front/utils/websockets/ApiLoader.vue";

export default {
  name: "TidyListe",
  components: {
    TidyListeTable,
    ApiLoader,
  },
  methods: {
    calculateElapsedTime(lastUsed) {
      const now = new Date();
      const lastUsedTime = lastUsed * 1000;
      const timeDifference = now - lastUsedTime;

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365);

      if (years > 0) return years + " " + (years > 1 ? 'an' : 'années');
      else if (days > 0) return days + " "  + (days > 1 ? "jours" : "jour");
      else if (hours > 0) return hours + " " +  (hours > 1 ? "heures" : "heure");
      else if (minutes > 0) return minutes + " " + (minutes > 1 ? "minutes" : "minute");
      else return seconds + " " + (seconds > 1 ? "secondes" : "seconde");
    },
    parseFileName(pretty_path) {
      if (pretty_path.includes('/')) {
        const segments = pretty_path.split('/');
        const fileName = segments[segments.length - 1];
        return fileName;
      } else {
        return pretty_path;
      }
    },
    parseFileList(data) {
      const filesList = data.map(file => ({
        name: this.parseFileName(file.pretty_path),
        size: file.size,
        lastUsed: this.calculateElapsedTime(file.last_modified.secs_since_epoch),
        tidyscore: file.tidy_score.grade,
        location: "intern",
        fileDetails: {
          tidyscore: file.tidy_score,
          path: file.pretty_path
        }
      }));

      console.log(filesList);
      return filesList
    },
  }
};
</script>

<style scoped>
.table-container {
  margin-top: 50px !important;
  width: 90vw !important;
  max-width: 100% !important;
}
</style>


