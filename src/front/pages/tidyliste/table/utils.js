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

export const calculateElapsedTime = (lastUsed) => {
  const now = new Date();
  const lastUsedTime = lastUsed * 1000;
  const timeDifference = now - lastUsedTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) return years + " " + (years > 1 ? 'an' : 'années');
  else if (days > 0) return days + " "  + (days > 1 ? "jours" : "jour");
  else if (hours > 0) return hours + " " +  (hours > 1 ? "heures" : "heure");
  else if (minutes > 0) return minutes + " " + (minutes > 1 ? "minutes" : "minute");
  else return seconds + " " + (seconds > 1 ? "secondes" : "seconde");
}

export const getGradeColor = (grade) => { 
  if (grade == 'A') {
    console.log("#2196F3");
    return "#2196F3";
  } else if (grade == 'B') {
    console.log("#4CAF50");
    return "#4CAF50";
  } else if (grade == 'C') {
    console.log("#FAB239");
    return "#FAB239";
  } else if (grade == 'D') {
    console.log("#ea4335");
    return "#ea4335";
  } else if (grade == 'E') {
    console.log("#546E7A");
    return "#546E7A";
  } 
  return '';
};




export const parseFileName = (pretty_path) => {
  if (pretty_path.includes('/')) {
    const segments = pretty_path.split('/');
    const fileName = segments[segments.length - 1];
    return fileName;
  } else {
    return pretty_path;
  }
};