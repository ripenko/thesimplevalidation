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

  public isValidInternal(
    value: TModel[K],
    model: TModel,
    field: K
  ): Promise<ValidationPropertyResult> {
    return this.setup.getValidation(value, model, field);
  }
}
