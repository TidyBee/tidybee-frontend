<template>
  <div class="file-item">
    <div class="file-name">
      <p>
        <strong>{{ file.path }}</strong>
      </p>
      <span>{{ getGrade(file.tidyScore) }}</span>
      <img
        src="../assets/redirectIcon.svg"
        style="cursor: pointer; width: 30px; height: 30px; margin-top: -4px"
        @click="isOpen = !isOpen"
      />
    </div>
<<<<<<< HEAD
    <p>{{ getGradeTooltip(file.tidyScore) }}</p>
    <p>
      <strong>{{ $t("fileItem.lastUsed") }}</strong>
      {{ file.lastAccess }}
    </p>
=======
    <span>
      <v-dialog v-model="isOpen" max-width="300px">
        <v-card>
          <TidyScore :file="file" />
          <v-btn @click="closeDialog"> {{ $t("common.close") }} </v-btn>
        </v-card>
      </v-dialog>
    </span>
>>>>>>> main
  </div>
</template>

<script>
import TidyScore from "./widgets/TidyScore.vue";

export default {
  name: "FileItem",
  components: {
    TidyScore,
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    getGrade(tidyScore) {
      let score = 0;
      const scores = ["A", "B", "C", "D", "E"];
      score += tidyScore.misnamed == true;
      score += tidyScore.misplaced == true;
      score += tidyScore.unused == true;
      score += tidyScore.duplicated == true;
      return scores[score];
    },
    closeDialog() {
      this.isOpen = false;
    },
  },
};
</script>

<style src="./css/FileItem.css" scoped></style>
