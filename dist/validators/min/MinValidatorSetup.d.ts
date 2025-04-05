import { ValidatorSetup } from "../../ValidatorSetup";
export interface MinValidatorSetup<TModel, K extends keyof TModel> extends ValidatorSetup<TModel, K> {
    minValue: () => number;
}
