<template>
  <div class="file-item">
    <div class="file-name">
      <p>
        <strong>{{ file.pretty_path }}</strong>
      </p>
      <span>{{ getGrade(file.tidy_score) }}</span>
      <img
        src="../assets/redirectIcon.svg"
        style="cursor: pointer; width: 30px; height: 30px; margin-top: -4px"
        @click="isOpen = !isOpen"
      />
    </div>
    <span>
      <v-dialog v-model="isOpen" max-width="300px">
        <v-card>
          <TidyScore :file="file" />
          <v-btn @click="closeDialog"> {{ $t("common.close") }} </v-btn>
        </v-card>
      </v-dialog>
    </span>
  </div>
</template>

<script>
import TidyScore from "./widgets/TidyScore.vue";
import { getGrade } from "@/utils";

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
    getGrade,
    closeDialog() {
      this.isOpen = false;
    },
  },
};
</script>

<style src="./css/FileItem.css" scoped></style>
