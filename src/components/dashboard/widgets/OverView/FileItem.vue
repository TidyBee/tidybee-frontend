<template>
  <v-row>
    <v-col cols="10">
      <div class="text-left">
        <!-- {{ parseFileName(file.pretty_path) }} -->
        {{ file.name }}
      </div>
    </v-col>
    <v-col cols="1">
      <span>{{ getGrade(file.tidy_score) }}</span>
    </v-col>
    <v-col cols="1">
      <img
        src="@/assets/redirectIcon.svg"
        style="cursor: pointer; width: 30px; height: 30px; margin-top: -4px"
        @click="isOpen = !isOpen"
      />
    </v-col>
    <span>
      <v-dialog v-model="isOpen" max-width="300px">
        <v-card>
          <TidyScore :file="file" />
          <v-btn @click="closeDialog"> {{ $t("common.close") }} </v-btn>
        </v-card>
      </v-dialog>
    </span>
  </v-row>
  <v-divider></v-divider>
</template>

<script>
import TidyScore from "@/components/widgets/TidyScore.vue";
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
    openDialog() {
      this.isOpen = true;
    },
    closeDialog() {
      this.isOpen = false;
    },
    parseFileName(pretty_path) {
      const segments = pretty_path.split('/');
      const fileName = segments[segments.length - 1];
      return fileName;
    }
  }
};
</script>

<style scoped>
.file-item {
  text-align : left;
  justify-content: space-evenly;
}
</style>
