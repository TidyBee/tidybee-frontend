export const getGrade = (tidyScore) => {
  let score = 0;
  const scores = ["A", "B", "C", "D", "E"];
  score += tidyScore?.misnamed == true;
  score += tidyScore?.heavy == true;
  score += tidyScore?.unused == true;
  score += tidyScore?.duplicated == true;
  return scores[score];
};

export const formatFileSize = (fileSize) => {
  const sizeThresholds = [
    [1024, "B"],
    [Math.pow(1024, 2), "KB"],
    [Math.pow(1024, 3), "MB"],
    [Math.pow(1024, 4), "GB"],
  ];
  if (typeof fileSize != "number") return "NaN";
  let fixed = 0;
  for (const [threshold, unit] of sizeThresholds) {
    if (fileSize < threshold) {
      return (fileSize / (threshold / 1024)).toFixed(fixed) + " " + unit;
    }
    fixed = 2;
  }
  return (
    (fileSize / (sizeThresholds[sizeThresholds.length - 1][0] / 1024)).toFixed(
      2,
    ) +
    " " +
    sizeThresholds[sizeThresholds.length - 1][1]
  );
};
