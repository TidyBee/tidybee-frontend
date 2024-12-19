export const sortBy = (responses, sortByParam, sortOrder) => {
  const sortFunctions = {
    name: sortByName,
    weight: sortByWeight,
    lastUsed: sortByLastUsed,
    TidyScore: sortByTidyScore,
  };

  const sortFunction = sortFunctions[sortByParam];
  if (sortFunction) {
    return sortFunction(responses, sortOrder);
  } else {
    console.error("Invalid sortByParam");
    return responses;
  }
};

const sortByName = (responses, sortOrder) => {
  return responses.slice().sort((a, b) => {
    return sortOrder === 'desc'
      ? b.name.localeCompare(a.name, undefined, { numeric: true, sensitivity: 'base' })
      : a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  });
};

const sortByWeight = (responses, sortOrder) => {
  const parseSize = (size) => {
    const [value, unit] = size.split(' ');
    const multiplier = { KB: 1, MB: 1024, GB: 1024 * 1024 };
    return parseFloat(value) * (multiplier[unit] || 1);
  };

  return responses.slice().sort((a, b) => {
    const sizeA = parseSize(a.weight);
    const sizeB = parseSize(b.weight);
    return sortOrder === 'desc' ? sizeB - sizeA : sizeA - sizeB;
  });
};

const sortByLastUsed = (responses, sortOrder) => {
  const parseTime = (time) => {
    const units = { day: 1, month: 30, year: 365 };
    const [value, unit] = time.split(' ');
    return parseInt(value, 10) * (units[unit.replace(/s$/, '')] || 1);
  };

  return responses.slice().sort((a, b) => {
    const timeA = parseTime(a.lastUsed);
    const timeB = parseTime(b.lastUsed);
    return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
  });
};

const sortByTidyScore = (responses, sortOrder) => {
  const tidyScoreOrder = { A: 1, B: 2, C: 3, D: 4, E: 5 };

  return responses.slice().sort((a, b) => {
    const scoreA = tidyScoreOrder[(a.TidyScore)];
    const scoreB = tidyScoreOrder[(b.TidyScore)];
    return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
  });
};
