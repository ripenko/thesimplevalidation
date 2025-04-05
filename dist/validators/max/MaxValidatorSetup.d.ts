import { ValidatorSetup } from "../../ValidatorSetup";
export interface MaxValidatorSetup<TModel, K extends keyof TModel> extends ValidatorSetup<TModel, K> {
    maxValue: () => number;
}
