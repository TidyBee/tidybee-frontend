<template>
  <div class="file-item">
    <div class="file-name">
      <span>{{ file.path }}</span>
      <span>{{ formatFileSize(file.size) }}</span>
      <span>{{ getGrade(file.tidyScore) }}</span>
    </div>
    <p>{{ getGradeTooltip(file.tidyScore) }}</p>
    <p>
      <strong>{{ $t("fileItem.lastUsed") }}</strong>
      {{ file.lastAccess }}
    </p>
  </div>
</template>

<script>
export default {
  name: "FileItem",
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
    getGrade(tidyScore) {
      let score = 0;
      const scores = ["A", "B", "C", "D", "E"];
      score += tidyScore.misnamed == true;
      score += tidyScore.misplaced == true;
      score += tidyScore.unused == true;
      score += tidyScore.duplicated == true;
      return scores[score];
    },
    getGradeTooltip(tidyScore) {
      let string = "";
      if (tidyScore.misnamed) string += this.$t("fileItem.misnamed");
      if (tidyScore.misplaced) string += this.$t("fileItem.misplaced");
      if (tidyScore.unused) string += this.$t("fileItem.unused");
      if (tidyScore.duplicated) string += this.$t("fileItem.duplicate");
      return string;
    },
  },
};
</script>

<style src="./css/FileItem.css" scoped></style>
