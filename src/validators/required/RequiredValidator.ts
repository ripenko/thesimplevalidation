import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { ValidatorSetup } from "../../ValidatorSetup";
import { Validator } from "../../Validator";

export class RequiredValidator<
  TModel,
  K extends keyof TModel
> extends Validator<TModel, K> {
  constructor(setup: ValidatorSetup<TModel, K> = {}) {
    super("RequiredValidator", setup);
  }

  public async isValidInternal(
    value: TModel[K]
  ): Promise<ValidationPropertyResult> {
    let isValid: boolean = true;
    // tslint:disable-next-line:prefer-conditional-expression
    if (Array.isArray(value)) {
      isValid = value.length > 0;
    } else {
      isValid = !!value;
    }

    return {
      isValid: isValid,
      errors: [],
    };
  }
}
