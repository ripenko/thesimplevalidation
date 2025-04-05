import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { MinValidatorSetup } from "./MinValidatorSetup";

export class MinValidator<TModel, K extends keyof TModel> extends Validator<
  TModel,
  K,
  MinValidatorSetup<TModel, K>
> {
  constructor(setup: MinValidatorSetup<TModel, K>) {
    super("MinValidator", setup);
  }

  public async isValidInternal(
    value: TModel[K]
  ): Promise<ValidationPropertyResult> {
    let isValid: boolean = true;
    if (value != null) {
      const minValue: number = this.setup.minValue();
      // tslint:disable-next-line:prefer-conditional-expression
      if (Array.isArray(value)) {
        isValid = value.length >= minValue;
      } else if (typeof value === "string") {
        isValid = value.length >= minValue;
      } else if (typeof value === "number") {
        isValid = value >= minValue;
      }
    }

    return {
      isValid: isValid,
      errors: [],
    };
  }
}
