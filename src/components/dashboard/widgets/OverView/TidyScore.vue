<template>
  <div class="TidyScore">
    <div class="text-center">
      <img
        :data-cy="'tidyscore-grade-img'"
        :src="getGradeSVGPath()"
        alt="SVG Image"
        class="tidyscore-img"
      />
    </div>
    <p>
      <strong
        :data-cy="'tidyscore-file-name'"
        class="file-name"
      >
        {{ file.pretty_path }}
      </strong>
    </p>
    <div style="margin-left: 10px">
      <p :data-cy="'tidyscore-file-size'">
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
            <strong :data-cy="`tidyscore-${key}`">{{ $t(`fileItem.${key}`) }}</strong>
            <img
              :data-cy="`tidyscore-${key}-false`"
              src="@/assets/icons/false.svg"
              alt="False Icon"
              class="icons"
            />
          </div>
          <div v-else>
            <strong :data-cy="`tidyscore-${key}`">{{ $t(`fileItem.${key}`) }}</strong>
            <img
              :data-cy="`tidyscore-${key}-true`"
              src="@/assets/icons/true.svg"
              alt="True Icon"
              class="icons"
            />
          </div>
        </div>
      </div>
      <p :data-cy="`tidyscore-lastused`">
        <strong>
          {{ $t("fileItem.lastUsed") }}
        </strong>
        {{ calculateElapsedTime(file.last_modified.secs_since_epoch) }}
      </p>
    </div>
  </div>
</template>

<script>
import { getGrade, formatFileSize, calculateElapsedTime } from "@/utils";

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
    calculateElapsedTime,
    getGradeSVGPath() {
      const grade = getGrade(this.file.tidy_score);
      return this.gradeSVGPaths[grade] || "";
    }
  },
};
</script>

<style src="@/../css/components/dashboard/TidyScore.css" scoped></style>