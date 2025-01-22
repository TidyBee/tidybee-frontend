<template>
  <ApiLoader :api-url="this.tidyliste" widget-name="Widget aperçu" width="100vw">
    <template #default="{ data }">
      <div v-if="data && data.length > 0">
        <v-row justify="center" class="table-container" width="100vw">
          <v-select
            v-model="selectedRules"
            :items="rules"
            label="Sélectionner des règles"
            chips
            width="20px"
            :menu-props="{ maxHeight: '400' }"
            class="selector"
            @update:model-value="onRuleChange" 
          />
          <v-select
            v-model="selectedLocations"
            :items="locations"
            label="Sélectionner l'espace surveillé"
            chips
            width="20px"
            :menu-props="{ maxHeight: '400' }"
            class="selector"
            @update:model-value="onLocationChange" 
          />
          <TidyListeTable ref="tidyList" :filesList="parseFileList(data)" />
        </v-row>
      </div>
      <div v-else>
        <p>Chargement des données...</p>
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
      selectedRules: ['Tout les fichiers'],
      selected:'',
      rules: [
        'Tout les fichiers',
        'Inutilisé',
        'Dupliqué',
        'Mal nommée'
      ],
      selectedLocation: 'Tout les espaces',
      selectedLocations: ['Tout les espaces'],
      locationSelected:'',
      locations: [
        'Tout les espaces',
        'Google Drive',
        'Notion',
        'Agent'
      ],
      tidyliste: process.env.VUE_APP_WEBSOCKET_TIDYLISTE,
    };
  },
  methods: {
    onRuleChange() {
      if ( this.selectedRules == 'Tout les fichiers') {
        this.selected = "all"
      } else if ( this.selectedRules == 'Inutilisé') {
        this.selected = "unused"
      } else if ( this.selectedRules == 'Dupliqué') {
        this.selected = "duplicated"
      } else if ( this.selectedRules == 'Mal nommée') {
        this.selected = "misnamed"
      }else {
        return;
      }
      const newFocus = this.selectedRules.length === 0 ? 'all' : this.selected;
      if (this.selectedRule == newFocus) {
        this.selectedRule = 'all';
        this.$refs.tidyList.updateSelectedRule(this.selectedRule);
        return;
      }
      this.selectedRule = newFocus;
      this.$refs.tidyList.updateSelectedRule(this.selectedRule);;
    },
    onLocationChange() {
      if ( this.selectedLocations == 'Tout les Espaces') {
        this.locationSelected = "all"
      } else if ( this.selectedLocations == 'Notion') {
        this.locationSelected = "notion"
      } else if ( this.selectedLocations == 'Google Drive') {
        this.locationSelected = "googledrive"
      } else if ( this.selectedLocations == 'Agent') {
        this.locationSelected = "agent"
      }else {
        return;
      }
      const newlocation = this.selectedRules.length === 0 ? 'all' : this.locationSelected;
      this.selectedLocation = newlocation;
      this.$refs.tidyList.updateSelectedLocation(this.selectedLocation);;
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
  width: 20%;
}

.grey {
  color: grey;
}

.v-chip {
  font-size: 16px;
  margin: 5px;
}
</style>
