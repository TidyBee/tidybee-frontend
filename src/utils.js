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

export const calculateElapsedTime = (lastUsed, t) => {
  const now = new Date();
  const lastUsedTime = lastUsed * 1000;
  const timeDifference = now - lastUsedTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) return years + " " + (years > 1 ? t('common.years') : t('common.year'));
  else if (days > 0) return days + " " + t('common.day') + (days > 1 ? "s" : "");
  else if (hours > 0) return hours + " " + t('common.hour') + (hours > 1 ? "s" : "");
  else if (minutes > 0) return minutes + " " + t('common.minute') (minutes > 1 ? "s" : "");
  else return seconds + " " + t('common.second') + (seconds > 1 ? "s" : "");
}

export const getGradeColor = (grade) => {
  switch (grade) {
    case 'A':
      return '#2196F3';
    case 'B':
      return '#4CAF50';
    case 'C':
      return '#FAB239';
    case 'D':
      return '#EA4335';
    case 'E':
      return '#546E7A';
    default:
      return '';
  }
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
