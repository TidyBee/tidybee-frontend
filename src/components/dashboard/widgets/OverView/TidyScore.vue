<template>
  <div class="TidyScore">
    <div class="text-center">
      <img
        :src="getGradeSVGPath()"
        alt="SVG Image"
        style="width: 50px; height: 50px"
        class="mx-auto d-block"
      />
    </div>
    <p>
      <strong
        style="display: flex; flex-direction: column; align-items: center"
      >
        <!-- {{ file.pretty_path }} -->
        {{ file.name }}
      </strong>
    </p>
    <div style="margin-left: 10px">
      <p>
        <strong>
          {{ $t("fileView.size") }}
        </strong>
        {{ formatFileSize(file.size) }}
      </p>
      <div v-if="file.tidy_score">
        <div v-for="(value, key) in file.tidy_score" :key="key">
          <div v-if="value">
            <strong>{{ $t(`fileItem.${key}`) }}</strong>
            <img
              src="@/assets/icons/false.svg"
              alt="False Icon"
              style="width: 20px; height: 20px"
            />
          </div>
          <div v-else>
            <strong>{{ $t(`fileItem.${key}`) }}</strong>
            <img
              src="@/assets/icons/true.svg"
              alt="True Icon"
              style="width: 20px; height: 20px"
            />
          </div>
        </div>
      </div>
      <p>
        <strong>
          {{ $t("fileItem.lastUsed") }}
        </strong>
        {{ calculateElapsedTime(file.last_modified.secs_since_epoch) }}
      </p>
    </div>
  </div>
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
    calculateElapsedTime(lastUsed) {
      const now = new Date();
      const lastUsedTime = lastUsed * 1000;
      const timeDifference = now - lastUsedTime;

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365);

      if (years > 0) return years + (years > 1 ? " années" : " an");
      else if (days > 0) return days + (days > 1 ? " jours" : " jour");
      else if (hours > 0) return hours + (hours > 1 ? " heures" : " heure");
      else if (minutes > 0) return minutes + (minutes > 1 ? " minutes" : " minute");
      else return seconds + (seconds > 1 ? " secondes" : " seconde");
    }
  },
};
</script>
