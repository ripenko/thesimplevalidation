import { describe, expect, test } from "vitest";

import { BooleanValidator } from "../BooleanValidator";

describe("[validation].[BooleanValidator] checking", () => {
  test("[validation].[BooleanValidator]: positiv", async () => {
    const validator = new BooleanValidator<{ value: boolean }, "value">({
      target: () => true,
    });
    const result = await validator.isValidInternal(true);
    expect(result.isValid).toEqual(true);
  });

  test("[validation].[BooleanValidator]: negative", async () => {
    const validator = new BooleanValidator<{ value: boolean }, "value">({
      target: () => false,
    });
    const result = await validator.isValidInternal(true);
    expect(result.isValid).toEqual(false);
  });
});
