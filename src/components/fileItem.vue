<template>
  <div class="file-item">
    <div class="file-name">
      <span>{{ file.path }}</span>
      <span>{{ formatFileSize(file.size) }}</span>
      <span>{{ getGrade(file.tidyScore) }}</span>
    </div>
    <p>{{ getGradeTooltip(file.tidyScore) }}</p>
    <p><strong>Last used: </strong>{{ file.lastAccess }}</p>
  </div>
</template>

<script>
export default {
  name : "FileItem",
  props: {
    file: {
      type: Object,
      required: true
    },
  },
  methods : {
    formatFileSize(fileSize) {
      const sizeThresholds = [
        [1, 'B'],
        [1024, 'KB'],
        [Math.pow(1024, 2), 'MB'],
        [Math.pow(1024, 3), 'GB'] ];
      for (const [threshold, unit] of sizeThresholds) {
        if (fileSize < threshold) {
          return (fileSize / (threshold / 1024)).toFixed(2) + ' ' + unit;
        }
      }
      return (fileSize / (sizeThresholds[sizeThresholds.length - 1][0] / 1024)).toFixed(2) + ' ' + sizeThresholds[sizeThresholds.length - 1][1];
    },
    getGrade(tidyScore) {
      let score = 0;
      const scores = ['A', 'B', 'C', 'D', 'E'];
      score += (tidyScore.misnamed == true);
      score += (tidyScore.misplaced == true);
      score += (tidyScore.unused == true);
      score += (tidyScore.duplicated == true);
      return scores[score];
    },
    getGradeTooltip(tidyScore) {
      let string = "";
      if (tidyScore.misnamed) 
        string += "Misnamed "
      if (tidyScore.misplaced)
        string += "Misplaced "
      if (tidyScore.unused)
        string += "Unused "
      if (tidyScore.duplicated)
        string += "Duplicate "
      return string;
    }
  }
}
</script>