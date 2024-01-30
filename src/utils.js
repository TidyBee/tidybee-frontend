export const getGrade = (tidyScore) => {
    let score = 0;
    const scores = ["A", "B", "C", "D", "E"];
    score += tidyScore.misnamed == true;
    score += tidyScore.misplaced == true;
    score += tidyScore.unused == true;
    score += tidyScore.duplicated == true;
    return scores[score];
}