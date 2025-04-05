import { ValidationPropertyResult } from "./ValidationPropertyResult";
import { ValidatorSetup } from "./ValidatorSetup";

export abstract class Validator<
  TModel,
  K extends keyof TModel,
  TSetup extends ValidatorSetup<TModel, K> = ValidatorSetup<TModel, K>
> {
  constructor(protected name: string, protected setup: TSetup) {}

  protected getErrors = (
    value: TModel[K],
    model: TModel,
    field: K
  ): string[] => {
    return [`${field.toString()}.${this.name}`];
  };

  public isValid = async (
    value: TModel[K],
    model: TModel,
    field: K
  ): Promise<ValidationPropertyResult> => {
    if (this.setup.isDisabled != null && this.setup.isDisabled(value)) {
      return {
        isValid: true,
        errors: [],
      };
    }

    const result: ValidationPropertyResult = await this.isValidInternal(
      value,
      model,
      field
    );

    if (result.isValid !== true) {
      if (this.setup.getErrors != null) {
        result.errors = this.setup.getErrors(value);
      } else {
        result.errors = this.getErrors(value, model, field);
      }
    }

    return result;
  };

  protected abstract isValidInternal(
    value: TModel[K],
    model: TModel,
    field: K
  ): Promise<ValidationPropertyResult>;
}
