<template>
    <ApiLoader :api-url="this.tidyliste" widget-name="Widget aperçu" width="100vw">
      <template #default="{ data }">
        <div v-if="data">
          <v-row justify="center" class="table-container" width="100vw">
            <div class="selector">
              <a class="selection" @click="changeSelectedRule('unused')" :class="(selectedRule != 'all' && selectedRule != 'unused' ? 'grey' : '')" >Inutilisé</a>
              <a class="selection" @click="changeSelectedRule('duplicated')" :class="(selectedRule != 'all' && selectedRule != 'duplicated' ? 'grey' : '')">Dupliqué</a>
              <a class="selection" @click="changeSelectedRule('misnamed')" :class="(selectedRule != 'all' && selectedRule != 'misnamed' ? 'grey' : '')">Mal nommé</a>
            </div>
            <TidyListeTable ref="tidyList" :filesList="parseFileList(data)" />  
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
  data() {
    return {
      selectedRule: 'all',
      tidyliste: process.env.VUE_APP_WEBSOCKET_TIDYLISTE,
    };
  },
  methods: {
    changeSelectedRule(newFocus) {
      if (this.selectedRule == newFocus) {
        this.selectedRule = 'all';
        this.$refs.tidyList.updateSelectedRule(this.selectedRule);
        return;
      }
      this.selectedRule = newFocus;
      this.$refs.tidyList.updateSelectedRule(this.selectedRule);
    },
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
        size: this.formatFileSize(file.size),
        lastUsed: this.calculateElapsedTime(file.last_modified.secs_since_epoch),
        tidyscore: file.tidy_score.grade,
        location: file.provenance,
        fileDetails: {
          tidyscore: file.tidy_score,
          path: file.pretty_path
        }
      }));
      return filesList
    },
    formatFileSize(fileSize) {
      const sizeThresholds = [
        [1024, "B"],
        [Math.pow(1024, 2), "KB"],
        [Math.pow(1024, 3), "MB"],
        [Math.pow(1024, 4), "GB"],
      ];
      if (typeof fileSize != "number") return "NaN";
      let fixed = 0;
      for (const [threshold, unit] of sizeThresholds) {
        if (fileSize < threshold) {
          return (fileSize / (threshold / 1024)).toFixed(fixed) + " " + unit;
        }
        fixed = 2;
      }
      return (
        (fileSize / (sizeThresholds[sizeThresholds.length - 1][0] / 1024)).toFixed(
          2,
        ) +
        " " +
        sizeThresholds[sizeThresholds.length - 1][1]
      );
    }
  }
};
</script>

<style scoped>
.table-container {
  margin-top: 50px !important;
  width: 90vw !important;
  max-width: 100% !important;
}

.selector {
  display: grid;
  width: 50%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.selection {
  text-align: center;
  font-weight: bolder;
  font-size: 28px;
  line-height: 30px;
  border-right: solid 1px black;
  transition: all 400ms ease-in-out;
}

.selection:last-child {
  border-right: 0;
}

.grey {
  color: grey;
}

.selection:hover {
  font-size: 30px;
}
</style>


