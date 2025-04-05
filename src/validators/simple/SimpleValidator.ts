import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { SimpleValidatorSetup } from "./SimpleValidatorSetup";

export class SimpleValidator<TModel, K extends keyof TModel> extends Validator<
  TModel,
  K,
  SimpleValidatorSetup<TModel, K>
> {
  constructor(setup: SimpleValidatorSetup<TModel, K>) {
    super("SimpleValidator", setup);
  }

  public async isValidInternal(
    _value: TModel[K]
  ): Promise<ValidationPropertyResult> {
    const isValid: boolean = this.setup.getValidation();

    return {
      isValid: isValid,
      errors: [],
    };
  }
}
