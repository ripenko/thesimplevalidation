import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { MaxValidatorSetup } from "./MaxValidatorSetup";

export class MaxValidator<TModel, K extends keyof TModel> extends Validator<
  TModel,
  K,
  MaxValidatorSetup<TModel, K>
> {
  constructor(setup: MaxValidatorSetup<TModel, K>) {
    super("MaxValidator", setup);
  }

  public async isValidInternal(
    value: TModel[K]
  ): Promise<ValidationPropertyResult> {
    let isValid: boolean = true;
    if (value != null) {
      const maxValue: number = this.setup.maxValue();
      if (Array.isArray(value)) {
        isValid = value.length <= maxValue;
      } else if (typeof value === "string") {
        isValid = value.length <= maxValue;
      } else if (typeof value === "number") {
        isValid = value <= maxValue;
      }
    }

    return {
      isValid: isValid,
      errors: [],
    };
  }
}
