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

export const getScoreGraphColors = (tidyScore) => {
  const GoodColor = "#66DA26";
  const BadColor = "#E91E63";

  const colors = [
    tidyScore?.misnamed ? GoodColor : BadColor,
    tidyScore?.heavy ? GoodColor : BadColor,
    tidyScore?.unused ? GoodColor : BadColor,
    tidyScore?.duplicated ? GoodColor : BadColor
  ];
  return colors;
}

export const calculateElapsedTime = (lastUsed) => {
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