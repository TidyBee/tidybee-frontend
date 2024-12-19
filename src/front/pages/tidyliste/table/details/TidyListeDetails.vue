<template>
  <v-container fluid class="container">
    <v-card class="rounded-rectangle" elevation="10">
      <div class="back-arrow" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </div>
      
      <div>
        <h1>Détails de {{ currentItem.name }}</h1>
        <p>
          <img
              src="./assets/weight-icon.svg"
              alt="Weight Icon"
              class="icon"
          />
          <strong>Taille du fichier :</strong> {{ currentItem.size }}
        </p>
        <p>
          <strong>Dernière utilisation :</strong> 
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
          <strong>TidyScore :</strong> 
          {{ currentItem.tidyscore }}
        </p>
        <p>
          <strong>Espace :</strong> 
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
          <strong>Localisation :</strong> 
          {{ currentItem.fileDetails?.path }}
        </p>
        <div class="tidyscore-container">
          <TidyScore
            class="tidyscoreAll"
            :pie-data="globalPieData(currentItem.fileDetails?.tidyscore)"
            :color="getGradeColor(currentItem.tidyscore)"
            :tidyscore="currentItem.tidyscore"
          />
          <div class="tidyscore-text">
            <strong>Ici le TidyScore Global de votre fichier.</strong> 
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { getGrade, getGradeColor } from "../utils";
import TidyScore from "./tidyscore/TidyScore.vue";
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
      globaltidyscore : []
    };
  },
  mounted() {
    if (!this.currentItem.file_path) {
      const storedItem = localStorage.getItem("currentItem");
      if (storedItem) {
        this.currentItem = JSON.parse(storedItem);
      }
    }
  },
  methods: {
    getGradeColor,
    goBack() {
      this.$router.go(-1);
    },
    globalPieData(tidyScore) {
      let data = [];
      data.push({ value: 33.33, name: `Mal nommé: ${tidyScore?.misnamed?.grade}`, label: { show: false } });
      data.push({ value: 33.33, name: `Dupliqué: ${tidyScore?.duplicated?.grade}`, label: { show: false } });
      data.push({ value: 33.33, name: `Inutilisé: ${tidyScore?.unused?.grade}`, label: { show: false } });
      console.log(data);
      return data;
    },
    getSeriesData(tidyScore) {
        let data = [];
        if (tidyScore != null && tidyScore.length > 0) {
          for (let i = 0; i < tidyScore.length; i++) {
            data.push({ value: 1, name: tidyScore[i].name, label: { show: false } });
          }
        }
        return data;
    }
  },
};
</script>

<style scoped src="./TidyListeDetails.css"></style>
