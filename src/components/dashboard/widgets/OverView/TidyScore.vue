<template>
    <!-- <div class="TidyScore"> -->
    <v-col cols="10" class="text-left">
      <div>

        Général :
        <br>
        Type :
        <br>
        Type :
        <br>
        Type :
        <br>
        Type :
      </div>

    </v-col>
    <!-- <div class="text-center">
      <img
        :data-cy="$t('tidyscore-grade-img')"
        :src="getGradeSVGPath()"
        alt="SVG Image"
        class="tidyscore-img"
      />
    </div>
    <p>
      <strong
        :data-cy="$t('tidyscore-file-name')"
        class="file-name"
      >
        {{ file.pretty_path }}
      </strong>
    </p>
    <div style="margin-left: 10px">
      <p :data-cy="$t('tidyscore-file-size')">
        <strong>
          {{ $t("fileView.size") }}
        </strong>
        {{ formatFileSize(file.size) }}
      </p>
      <div v-if="file.tidy_score">
        <div 
          v-for="(value, key) in file.tidy_score" 
          :key="key"
        >
          <div v-if="value">
            <strong :data-cy="$t(`tidyscore-${key}`)">{{ $t(`fileItem.${key}`) }}</strong>
            <img
              :data-cy="$t(`tidyscore-${key}-false`)"
              src="@/assets/icons/false.svg"
              alt="False Icon"
              class="icons"
            />
          </div>
          <div v-else>
            <strong :data-cy="$t(`tidyscore-${key}`)">{{ $t(`fileItem.${key}`) }}</strong>
            <img
              :data-cy="$t(`tidyscore-${key}-true`)"
              src="@/assets/icons/true.svg"
              alt="True Icon"
              class="icons"
            />
          </div>
        </div>
      </div>
      <p :data-cy="$t(`tidyscore-lastused`)">
        <strong>
          {{ $t("fileItem.lastUsed") }}
        </strong>
        {{ calculateElapsedTime(file.last_modified.secs_since_epoch) }}
      </p>
    </div> -->
    <!-- </div> -->
</template>

<script>
import { getGrade, formatFileSize } from "@/utils";

export default {
  name: "TidyScore",
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      gradeSVGPaths: {
        A: require("@/assets/grades/grade-a.svg"),
        B: require("@/assets/grades/grade-b.svg"),
        C: require("@/assets/grades/grade-c.svg"),
        D: require("@/assets/grades/grade-d.svg"),
        E: require("@/assets/grades/grade-e.svg"),
      },
    };
  },
  methods: {
    formatFileSize,
    getGrade,
    getGradeSVGPath() {
      const grade = getGrade(this.file.tidy_score);
      return this.gradeSVGPaths[grade] || "";
    },
  },
};
</script>

<style src="@/../css/components/dashboard/TidyScore.css" scoped></style>