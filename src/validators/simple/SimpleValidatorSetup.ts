import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { ValidatorSetup } from "../../ValidatorSetup";

export interface SimpleValidatorSetup<TModel, K extends keyof TModel>
  extends ValidatorSetup<TModel, K> {
  getValidation: (
    value: TModel[K],
    model: TModel,
    key: K
  ) => Promise<ValidationPropertyResult>;
}
