import get from "lodash.get";
import isEqual from "lodash.isequal";
import { ValidationPropertyResult } from "./ValidationPropertyResult";
import { ValidationResult } from "./ValidationResult";
import { Validator } from "./Validator";

export class Validation<TModel extends {}> {
  private originalModel: TModel;
  private modelInfo: {
    [K in keyof TModel]?: {
      validators?: Array<Validator<TModel, K>>;
      key?: string | null;
    };
  };
  private isDisabled: boolean = false;

  constructor(
    originalModel: TModel,
    modelInfo?: {
      [K in keyof TModel]?: {
        validators?: Array<Validator<TModel, K>>;
        key?: string;
      };
    },
  ) {
    this.originalModel = structuredClone(originalModel);
    this.modelInfo = modelInfo ?? {};
  }

  public disable = (): Validation<TModel> => {
    this.isDisabled = true;
    return this;
  };

  public enable = (): Validation<TModel> => {
    this.isDisabled = false;
    return this;
  };

  public getisEnabled = (): boolean => {
    return !this.isDisabled;
  };

  public useOriginal = (model: TModel): Validation<TModel> => {
    this.originalModel = structuredClone(model);
    return this;
  };

  public useNoValidators = (): Validation<TModel> => {
    for (const field in this.modelInfo) {
      delete this.modelInfo[field]?.validators;
    }
    return this;
  };

  public useValidators = <K extends keyof TModel>(
    key: K,
    ...validators: Array<Validator<TModel, K>>
  ): Validation<TModel> => {
    this.modelInfo[key] = {
      ...this.modelInfo?.[key],
      validators: validators,
    };
    return this;
  };

  public isPropertyDirty = (
    model: TModel,
    field: keyof TModel,
    key: string | null = null,
  ): boolean => {
    if (this.isDisabled === true) return false;
    const fieldKey: string | null = key ?? this.modelInfo[field]?.key ?? null;

    const originalField = this.originalModel[field];
    const modelField = model[field];
    if (Array.isArray(originalField) && Array.isArray(modelField)) {
      if (originalField.length !== modelField.length) return true;

      for (let index = 0; index < originalField.length; index++) {
        if (originalField[index] === modelField[index]) continue;

        if (fieldKey == null) {
          if (!isEqual(originalField[index], modelField[index])) return true;
          continue;
        }

        if (
          get(originalField[index], fieldKey) !==
          get(modelField[index], fieldKey)
        ) {
          return true;
        }
      }
      return false;
    }
    if (fieldKey == null)
      return !isEqual(this.originalModel[field], model[field]);
    return (
      get(this.originalModel[field], fieldKey) !== get(model[field], fieldKey)
    );
  };

  public getOriginalProperty = <K extends keyof TModel>(
    field: K,
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
    field: K,
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
