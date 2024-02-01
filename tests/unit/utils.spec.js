import { getGrade } from "../../src/utils.js";

describe("getGrade function", () => {
    test("should return A", () => {
        const tidyScore = {
            misnamed: false,
            misplaced: false,
            unused: false,
            duplicated: false,
        }
        const result = getGrade(tidyScore);
        expect(result).toEqual("A");
    });

    test("should return B", () => {
        const tidyScore = {
            misnamed: false,
            misplaced: true,
            unused: false,
            duplicated: false,
        }
        const result = getGrade(tidyScore);
        expect(result).toEqual("B");
    });

    test("should return C", () => {
        const tidyScore = {
            misnamed: true,
            misplaced: false,
            unused: true,
            duplicated: false,
        }
        const result = getGrade(tidyScore);
        expect(result).toEqual("C");
    });

    test("should return D", () => {
        const tidyScore = {
            misnamed: false,
            misplaced: true,
            unused: true,
            duplicated: true,
        }
        const result = getGrade(tidyScore);
        expect(result).toEqual("D");
    });

    test("should return E", () => {
        const tidyScore = {
            misnamed: true,
            misplaced: true,
            unused: true,
            duplicated: true,
        }
        const result = getGrade(tidyScore);
        expect(result).toEqual("E");
    });

    test("should handle missing arguments and return A", () => {
        const tidyScore = {
        }
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
        }
        const result = getGrade(tidyScore);
        expect(result).toEqual("A");
    });
});