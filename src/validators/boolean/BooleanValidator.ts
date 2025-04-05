import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { BooleanValidatorSetup } from "./BooleanValidatorSetup";

export class BooleanValidator<TModel, K extends keyof TModel> extends Validator<
  TModel,
  K,
  BooleanValidatorSetup<TModel, K>
> {
  constructor(setup: BooleanValidatorSetup<TModel, K>) {
    super("BooleanValidator", setup);
  }

  public async isValidInternal(
    value: TModel[K]
  ): Promise<ValidationPropertyResult> {
    let isValid: boolean = true;
    const targetValue: boolean = this.setup.target();

    if (value != null && typeof value === "boolean") {
      isValid = targetValue === value;
    }

    return {
      isValid: isValid,
      errors: [],
    };
  }
}
