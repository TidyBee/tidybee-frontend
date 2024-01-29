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
        {{ file.path }}
      </strong>
    </p>
    <div style="margin-left: 10px">
      <p>
        <strong>
          {{ $t("fileView.size") }}
        </strong>
        {{ formatFileSize(file.size) }}
      </p>
      <div v-if="file.tidyScore">
        <div v-for="(value, key) in file.tidyScore" :key="key">
          <div v-if="value">
            <strong>{{ $t(`fileItem.${key}`) }}</strong>
            <img
              src="../../assets/false.svg"
              alt="False Icon"
              style="width: 20px; height: 20px"
            />
          </div>
          <div v-else>
            <strong>{{ $t(`fileItem.${key}`) }}</strong>
            <img
              src="../../assets/true.svg"
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
        {{ file.lastAccess }}
      </p>
    </div>
  </div>
</template>

<script>
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
    getGradeSVGPath() {
      const grade = this.getGrade(this.file.tidyScore);
      return this.gradeSVGPaths[grade] || "";
    },
    getGrade(tidyScore) {
      let score = 0;
      const scores = ["A", "B", "C", "D", "E"];
      score += tidyScore.misnamed == true;
      score += tidyScore.misplaced == true;
      score += tidyScore.unused == true;
      score += tidyScore.duplicated == true;
      return scores[score];
    },
    formatFileSize(fileSize) {
      const sizeThresholds = [
        [1, "B"],
        [1024, "KB"],
        [Math.pow(1024, 2), "MB"],
        [Math.pow(1024, 3), "GB"],
      ];
      for (const [threshold, unit] of sizeThresholds) {
        if (fileSize < threshold) {
          return (fileSize / (threshold / 1024)).toFixed(2) + " " + unit;
        }
      }
      return (
        (
          fileSize /
          (sizeThresholds[sizeThresholds.length - 1][0] / 1024)
        ).toFixed(2) +
        " " +
        sizeThresholds[sizeThresholds.length - 1][1]
      );
    },
  },
};
</script>
