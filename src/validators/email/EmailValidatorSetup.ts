import { ValidatorSetup } from "../../ValidatorSetup";

export interface EmailValidatorSetup<TModel, K extends keyof TModel>
  extends ValidatorSetup<TModel, K> {
  localAtom?: RegExp;
  domainLabel?: RegExp;
}
