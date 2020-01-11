import { MinValidator } from "..";

describe("[validation].[MinValidator] checking", () => {
    test("[validation].[MinValidator]: null", async () => {
        const validator = new MinValidator<{ value: string | null; }, "value">({
            minValue: () => 1
        });
        const result = await validator.isValidInternal(null);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MinValidator]: function", async () => {
        const validator = new MinValidator<{ value: () => void; }, "value">({
            minValue: () => 1
        });
        const result = await validator.isValidInternal(() => { return; });
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MinValidator]: Empty String. Min=1", async () => {
        const validator = new MinValidator<{ value: string; }, "value">({
            minValue: () => 1
        });
        const result = await validator.isValidInternal("");
        expect(result.isValid).toEqual(false);
    });

    test("[validation].[MinValidator]: Empty String. Min=0", async () => {
        const validator = new MinValidator<{ value: string; }, "value">({
            minValue: () => 0
        });
        const result = await validator.isValidInternal("");
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MinValidator]: Empty Array. Min=1", async () => {
        const validator = new MinValidator<{ value: string[]; }, "value">({
            minValue: () => 1
        });
        const result = await validator.isValidInternal([]);
        expect(result.isValid).toEqual(false);
    });

    test("[validation].[MinValidator]: Empty Array. Min=0", async () => {
        const validator = new MinValidator<{ value: string[]; }, "value">({
            minValue: () => 0
        });
        const result = await validator.isValidInternal([]);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MinValidator]: 0. Min=0", async () => {
        const validator = new MinValidator<{ value: number; }, "value">({
            minValue: () => 0
        });
        const result = await validator.isValidInternal(0);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MinValidator]: 0. Min=1", async () => {
        const validator = new MinValidator<{ value: number; }, "value">({
            minValue: () => 1
        });
        const result = await validator.isValidInternal(0);
        expect(result.isValid).toEqual(false);
    });

    test("[validation].[MinValidator]: 1. Min=1", async () => {
        const validator = new MinValidator<{ value: number; }, "value">({
            minValue: () => 1
        });
        const result = await validator.isValidInternal(0);
        expect(result.isValid).toEqual(false);
    });

    test("[validation].[MinValidator]: 8. Min=9", async () => {
        const validator = new MinValidator<{ value: number; }, "value">({
            minValue: () => 9
        });
        const result = await validator.isValidInternal(8);
        expect(result.isValid).toEqual(false);
    });

    test("[validation].[MinValidator]: Disabled", async () => {
        const validator = new MinValidator<{ value: number; }, "value">({
            minValue: () => 9,
            isDisabled: () => true
        });
        const result = await validator.isValid(8, { value: 8 }, "value");
        expect(result.isValid).toEqual(true);
    });
});
