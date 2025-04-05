import { Validator } from "../../../Validator";
import { RequiredValidator } from "../RequiredValidator";

// String check
test("[validation].[RequiredValidator]: check null string", async () => {
  interface IModelType {
    val: string | null;
  }

  const model: IModelType = {
    val: null,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: ["Error.Message"],
    isValid: false,
  });
});

// String check
test("[validation].[RequiredValidator]: check null string. No setup", async () => {
  interface IModelType {
    val: string | null;
  }

  const model: IModelType = {
    val: null,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator();
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: ["val.RequiredValidator"],
    isValid: false,
  });
});

test("[validation].[RequiredValidator]: check empty string", async () => {
  interface IModelType {
    val: string | null;
  }

  const model: IModelType = {
    val: "",
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: ["Error.Message"],
    isValid: false,
  });
});

test("[validation].[RequiredValidator]: check non-empty string", async () => {
  interface IModelType {
    val: string | null;
  }

  const model: IModelType = {
    val: "HelloWorld",
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: [],
    isValid: true,
  });
});

// Number check
test("[validation].[RequiredValidator]: check null number", async () => {
  interface IModelType {
    val: number | null;
  }

  const model: IModelType = {
    val: null,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: ["Error.Message"],
    isValid: false,
  });
});

test("[validation].[RequiredValidator]: check 0 number", async () => {
  interface IModelType {
    val: number | null;
  }

  const model: IModelType = {
    val: 0,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: ["Error.Message"],
    isValid: false,
  });
});

test("[validation].[RequiredValidator]: check > 0 number", async () => {
  interface IModelType {
    val: number | null;
  }

  const model: IModelType = {
    val: 0.1,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: [],
    isValid: true,
  });
});

test("[validation].[RequiredValidator]: check < 0 number", async () => {
  interface IModelType {
    val: number | null;
  }

  const model: IModelType = {
    val: -0.1,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: [],
    isValid: true,
  });
});

// Array check
test("[validation].[RequiredValidator]: check null array", async () => {
  interface IModelType {
    val: string[] | null;
  }

  const model: IModelType = {
    val: null,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: ["Error.Message"],
    isValid: false,
  });
});

test("[validation].[RequiredValidator]: check empty array", async () => {
  interface IModelType {
    val: string[] | null;
  }

  const model: IModelType = {
    val: [],
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: ["Error.Message"],
    isValid: false,
  });
});

test("[validation].[RequiredValidator]: check non-empty array", async () => {
  interface IModelType {
    val: string[] | null;
  }

  const model: IModelType = {
    val: ["HelloWorld"],
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: [],
    isValid: true,
  });
});

// Object check
test("[validation].[RequiredValidator]: check null object", async () => {
  interface IModelType {
    val: {} | null;
  }

  const model: IModelType = {
    val: null,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: ["Error.Message"],
    isValid: false,
  });
});

test("[validation].[RequiredValidator]: check non-null object", async () => {
  interface IModelType {
    val: {} | null;
  }

  const model: IModelType = {
    val: {},
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: [],
    isValid: true,
  });
});

// Disabling
test("[validation].[RequiredValidator]: disabling check", async () => {
  interface IModelType {
    val: {} | null;
  }

  const model: IModelType = {
    val: null,
  };

  const validator: Validator<IModelType, "val"> = new RequiredValidator({
    getErrors: () => ["Error.Message"],
    isDisabled: () => true,
  });
  await expect(validator.isValid(model.val, model, "val")).resolves.toEqual({
    errors: [],
    isValid: true,
  });
});
