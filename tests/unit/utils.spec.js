import { getGrade, formatFileSize } from "../../src/utils.js";

describe("getGrade function", () => {
  test("should return A", () => {
    const tidyScore = {
      misnamed: false,
      misplaced: false,
      unused: false,
      duplicated: false,
    };
    const result = getGrade(tidyScore);
    expect(result).toEqual("A");
  });

  test("should return B", () => {
    const tidyScore = {
      misnamed: false,
      misplaced: true,
      unused: false,
      duplicated: false,
    };
    const result = getGrade(tidyScore);
    expect(result).toEqual("B");
  });

  test("should return C", () => {
    const tidyScore = {
      misnamed: true,
      misplaced: false,
      unused: true,
      duplicated: false,
    };
    const result = getGrade(tidyScore);
    expect(result).toEqual("C");
  });

  test("should return D", () => {
    const tidyScore = {
      misnamed: false,
      misplaced: true,
      unused: true,
      duplicated: true,
    };
    const result = getGrade(tidyScore);
    expect(result).toEqual("D");
  });

  test("should return E", () => {
    const tidyScore = {
      misnamed: true,
      misplaced: true,
      unused: true,
      duplicated: true,
    };
    const result = getGrade(tidyScore);
    expect(result).toEqual("E");
  });

  test("should handle missing arguments and return A", () => {
    const tidyScore = {};
    const result = getGrade(tidyScore);
    expect(result).toEqual("A");
  });

  test("should handle undefined and return A", () => {
    const tidyScore = undefined;

    const result = getGrade(tidyScore);
    expect(result).toEqual("A");
  });

  test("should handle undefined arguments and return A", () => {
    const tidyScore = {
      misnamed: undefined,
      misplaced: undefined,
      unused: undefined,
      duplicated: undefined,
    };
    const result = getGrade(tidyScore);
    expect(result).toEqual("A");
  });
});

describe("formatFileSize function", () => {
  test("test should return in bytes", () => {
    const result = formatFileSize(353);
    expect(result).toEqual("353 B");
  });

  test("test should return in kilobytes", () => {
    const result = formatFileSize(532212);
    expect(result).toEqual("519.74 KB");
  });

  test("test should return in megabytes", () => {
    const result = formatFileSize(1235412);
    expect(result).toEqual("1.18 MB");
  });

  test("test should return in gigabytes", () => {
    const result = formatFileSize(233453456123);
    expect(result).toEqual("217.42 GB");
  });

  test("test should return in gigabytes", () => {
    const result = formatFileSize("Who knows");
    expect(result).toEqual("NaN");
  });
});
