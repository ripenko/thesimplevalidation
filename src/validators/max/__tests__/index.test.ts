import { MaxValidator } from "..";

describe("[validation].[MaxValidator] checking", () => {
    test("[validation].[MaxValidator]: null", async () => {
        const validator = new MaxValidator<{ value: string | null }, "value">({
            maxValue: () => 1,
        });
        const result = await validator.isValidInternal(null);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: function", async () => {
        const validator = new MaxValidator<{ value: () => void; }, "value">({
            maxValue: () => 1
        });
        const result = await validator.isValidInternal(() => { return; });
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: Empty String. Max=1", async () => {
        const validator = new MaxValidator<{ value: string; }, "value">({
            maxValue: () => 1
        });
        const result = await validator.isValidInternal("");
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: Empty String. Max=0", async () => {
        const validator = new MaxValidator<{ value: string; }, "value">({
            maxValue: () => 0
        });
        const result = await validator.isValidInternal("");
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: Empty Array. Max=1", async () => {
        const validator = new MaxValidator<{ value: string[]; }, "value">({
            maxValue: () => 1
        });
        const result = await validator.isValidInternal([]);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: Empty Array. Max=0", async () => {
        const validator = new MaxValidator<{ value: string[]; }, "value">({
            maxValue: () => 0
        });
        const result = await validator.isValidInternal([]);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: 0. Max=0", async () => {
        const validator = new MaxValidator<{ value: number; }, "value">({
            maxValue: () => 0
        });
        const result = await validator.isValidInternal(0);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: 0. Max=1", async () => {
        const validator = new MaxValidator<{ value: number; }, "value">({
            maxValue: () => 1
        });
        const result = await validator.isValidInternal(0);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: 1. Max=1", async () => {
        const validator = new MaxValidator<{ value: number; }, "value">({
            maxValue: () => 1
        });
        const result = await validator.isValidInternal(0);
        expect(result.isValid).toEqual(true);
    });

    test("[validation].[MaxValidator]: 2. Max=1", async () => {
        const validator = new MaxValidator<{ value: number; }, "value">({
            maxValue: () => 1
        });
        const result = await validator.isValidInternal(2);
        expect(result.isValid).toEqual(false);
    });

    test("[validation].[MaxValidator]: Disabled", async () => {
        const validator = new MaxValidator<{ value: number; }, "value">({
            maxValue: () => 1,
            isDisabled: () => true
        });
        const result = await validator.isValid(2, { value: 2 }, "value");
        expect(result.isValid).toEqual(true);
    });
});
