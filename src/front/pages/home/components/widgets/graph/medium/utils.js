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