import { getGrade } from "@/utils";

export const sortBy = (responses, sortByParam, sortOrder) => {
  const sortFunctions = {
    secsAsc: sortBySecsAsc,
    secsDesc: sortBySecsDesc,
    sizeAsc: sortBySizeAsc,
    sizeDesc: sortBySizeDesc,
    tidyscoreAsc: sortByTidyScoreAsc,
    tidyscoreDesc: sortByTidyScoreDesc,
  };

  const sortKey = `${sortByParam}${
    sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)
  }`;
  const sortFunction = sortFunctions[sortKey];
  if (sortFunction) {
    return sortFunction(responses);
  } else {
    console.error("Invalid sortByParam or sortOrder");
    return responses;
  }
};

export const sortBySecsAsc = (responses) => {
  return responses.slice().sort((a, b) => {
    return a.last_modified.secs_since_epoch - b.last_modified.secs_since_epoch;
  });
};

export const sortBySecsDesc = (responses) => {
  return responses.slice().sort((a, b) => {
    return b.last_modified.secs_since_epoch - a.last_modified.secs_since_epoch;
  });
};

export const sortBySizeAsc = (responses) => {
  return responses.slice().sort((a, b) => {
    return a.size - b.size;
  });
};

export const sortBySizeDesc = (responses) => {
  return responses.slice().sort((a, b) => {
    return b.size - a.size;
  });
};

export const sortByTidyScoreAsc = (responses) => {
  const tidyScoreOrder = { A: 1, B: 2, C: 3, D: 4, E: 5 };
  return responses.slice().sort((a, b) => {
    return (
      tidyScoreOrder[getGrade(a.tidy_score)] -
      tidyScoreOrder[getGrade(b.tidy_score)]
    );
  });
};

export const sortByTidyScoreDesc = (responses) => {
  const tidyScoreOrder = { A: 1, B: 2, C: 3, D: 4, E: 5 };
  return responses.slice().sort((a, b) => {
    return (
      tidyScoreOrder[getGrade(b.tidy_score)] -
      tidyScoreOrder[getGrade(a.tidy_score)]
    );
  });
};
