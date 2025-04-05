import get from "lodash.get";
import isEqual from "lodash.isequal";
import { ValidationPropertyResult } from "./ValidationPropertyResult";
import { ValidationResult } from "./ValidationResult";
import { Validator } from "./Validator";

export class ValidationScope<TModel extends {}> {
  private originalModel: TModel;
  private modelInfo: {
    [K in keyof TModel]?: {
      validators: Array<Validator<TModel, K>>;
    };
  };

  constructor(originalModel: TModel) {
    this.originalModel = structuredClone(originalModel);
    this.modelInfo = {};
  }

  public useOriginal = (model: TModel): ValidationScope<TModel> => {
    this.originalModel = structuredClone(model);
    return this;
  };

  public useValidators = <K extends keyof TModel>(
    key: K,
    ...validators: Array<Validator<TModel, K>>
  ): ValidationScope<TModel> => {
    this.modelInfo[key] = {
      validators: validators,
    };
    return this;
  };

  public isPropertyDirty = (
    model: TModel,
    field: keyof TModel,
    key: string | null = null
  ): boolean => {
    const originalField = this.originalModel[field];
    const modelField = model[field];
    if (Array.isArray(originalField) && Array.isArray(modelField)) {
      if (originalField.length !== modelField.length) return true;
      for (let index = 0; index < originalField.length; index++) {
        if (originalField[index] === modelField[index]) continue;
        if (key == null) return true;
        if (get(originalField[index], key) !== get(modelField[index], key))
          return true;
      }
      return false;
    }
    if (key == null) return !isEqual(this.originalModel[field], model[field]);
    return get(this.originalModel[field], key) !== get(model[field], key);
  };

  public getOriginalProperty = <K extends keyof TModel>(
    field: K
  ): TModel[K] => {
    return this.originalModel[field];
  };

  public isDirty = (model: TModel, ...fields: Array<keyof TModel>): boolean => {
    for (const property in this.originalModel) {
      if (!this.originalModel.hasOwnProperty(property)) continue;

      if (fields && fields.length > 0) {
        if (!fields.some((x) => x === property)) continue;
      }

      if (this.isPropertyDirty(model, property)) return true;
    }

    return false;
  };

  public isPropertyValid = async <K extends keyof TModel>(
    model: TModel,
    field: K
  ): Promise<ValidationPropertyResult> => {
    if (
      this.modelInfo[field] &&
      this.modelInfo[field].validators &&
      this.modelInfo[field].validators
    ) {
      let isValid: boolean = true;
      let errors: string[] = [];

      const value: TModel[K] = model[field];

      for (const validator of this.modelInfo[field].validators) {
        const validatorResult: ValidationPropertyResult =
          await validator.isValid(value, model, field);
        isValid = isValid && validatorResult.isValid;
        if (!validatorResult.isValid)
          errors = [...errors, ...validatorResult.errors];
      }

      return {
        isValid: isValid,
        errors: errors,
      };
    }

    return {
      isValid: true,
      errors: [],
    };
  };

  public isValid = async (
    model: TModel,
    ...fields: Array<keyof TModel>
  ): Promise<ValidationResult<TModel>> => {
    model = model ?? {};

    const properties: Array<keyof TModel> = (
      fields == null || fields.length === 0 ? Object.keys(model) : fields
    ) as Array<keyof TModel>;

    const result: ValidationResult<TModel> = {
      isValid: true,
      errors: [],
      properties: {} as {
        [K in keyof TModel]: ValidationPropertyResult;
      },
    } as ValidationResult<TModel>;

    for (const property of properties) {
      const propertyValidationResult: ValidationPropertyResult =
        await this.isPropertyValid(model, property);
      result.isValid = result.isValid && propertyValidationResult.isValid;
      result.properties[property] = propertyValidationResult;
      if (!propertyValidationResult.isValid)
        result.errors = [...result.errors, ...propertyValidationResult.errors];
    }

    return result;
  };
}
