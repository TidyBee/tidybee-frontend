<template>
  <v-container fluid class="container">
    <v-card class="rounded-rectangle" elevation="10">
      <div>
        <h1>Détails de {{ currentItem.name }}</h1>
        <p>
          <img
              src="./assets/weight-icon.svg"
              alt="Weight Icon"
              class="icon"
          />
          <strong>Autres informations :</strong> {{ currentItem.size }}
        </p>
        <p>
          <strong>Autres informations :</strong> 
          {{ currentItem.lastUsed }}
          <img
              src="./assets/last-used-icon.svg"
              alt="LastUsed Icon"
              class="icon"
          />
        </p>
        <p>
          <img
              src="./assets/note-icon.svg"
              alt="Note Icon"
              class="icon"
          />
          <strong>Autres informations :</strong> 
          {{ currentItem.tidyscore }}
        </p>
        <p>
          <strong>Autres informations :</strong> 
          {{ currentItem.location }}
          <img
              src="./assets/location-icon.svg"
              alt="location Icon"
              class="icon"
          />
        </p>
        <p>
          <img
              src="./assets/path-icon.svg"
              alt="path Icon"
              class="icon"
          />
          <strong>Autres informations :</strong> 
          {{ currentItem.fileDetails?.path }}
        </p>
        <p><strong>Autres informations :</strong> {{ currentItem.fileDetails?.tidyscore }}</p>
        <TidyScore
          v-if="isOpen" :pie-data="getPieData(currentItem?.tidy_score)" :series-data="getSeriesData(currentItem?.tidy_score, tab)"
          :pie-color="getGradeColor(file?.tidy_score?.grade)" :score="file.tidy_score.grade" :t="$t" :tab="tab"
        >
        </TidyScore>
        <TidyScore
          v-if="isOpen" :pie-data="getPieData(file.tidy_score, tab)" :series-data="getSeriesData(file.tidy_score, tab)"
          :pie-color="getGradeColor(file?.tidy_score?.grade)" :score="file.tidy_score.grade" :t="$t" :tab="tab"
        >
        </TidyScore>
        <TidyScore
          v-if="isOpen" :pie-data="getPieData(file.tidy_score, tab)" :series-data="getSeriesData(file.tidy_score, tab)"
          :pie-color="getGradeColor(file?.tidy_score?.grade)" :score="file.tidy_score.grade" :t="$t" :tab="tab"
        >
        </TidyScore>
        <TidyScore
          v-if="isOpen" :pie-data="getPieData(file.tidy_score, tab)" :series-data="getSeriesData(file.tidy_score, tab)"
          :pie-color="getGradeColor(file?.tidy_score?.grade)" :score="file.tidy_score.grade" :t="$t" :tab="tab"
        >
        </TidyScore>
      </div>
    </v-card>
  </v-container>
</template>

<script>

import { getGrade, formatFileSize, calculateElapsedTime, parseFileName, getGradeColor } from "../utils";
import TidyScore from "./details/tidyscore/TidyScore.vue";
export default {
  name: "TidyListeDetails",
  components: {
    TidyScore,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentItem: this.item,
    };
  },
  mounted() {
    if (!this.currentItem.file_path) {
      // Récupérer l'objet depuis localStorage si les props sont vides
      const storedItem = localStorage.getItem("currentItem");
      if (storedItem) {
        this.currentItem = JSON.parse(storedItem);
      }
    }

    console.log("Item utilisé :", this.currentItem);
  },
  methods: {
    getPieData(tidyScore, tab) {
      if (tab == 'all') {
        return ([
          tidyScore?.misnamed?.grade,
          tidyScore?.duplicated?.grade,
          tidyScore?.unused?.grade
        ])
      }
      let data = [];
      const configurations = this.getConfigurations(tidyScore, tab);
      if (configurations != null && configurations.length > 0) {
        for (let i = 0; i < configurations.length; i++) {
          data.push(configurations[i].grade);
        }
      }
      return data;
    },
    getSeriesData(tidyScore, tab) {
        if (tab == 'all') {
          return ([
            { value: 1, name: 'fileView.misnamed', label: { show: false } },
            { value: 1, name: 'fileView.duplicated', label: { show: false } },
            { value: 1, name: 'fileView.unused', label: { show: false } },
          ])
        }
        let data = [];
        const configurations = this.getConfigurations(tidyScore, tab);
        if (configurations != null && configurations.length > 0) {
          for (let i = 0; i < configurations.length; i++) {
            data.push({ value: 1, name: configurations[i].name, label: { show: false } });
          }
        }
        return data;
    },
    getConfigurations(tidyScore, tab) {
      switch (tab) {
        case 'misnamed':
          return (tidyScore?.misnamed?.configurations);
        case 'duplicated':
          return (tidyScore?.duplicated?.configurations);
        case 'unused':
          return (tidyScore?.unused?.configurations);
        default:
          return;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  margin-top: 40px !important;
}
.rounded-rectangle {
  border-radius: 15px;
  height: 800px;
  width: 1600px;
  margin-top: 40px;
}
</style>
