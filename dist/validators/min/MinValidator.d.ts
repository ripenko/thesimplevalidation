import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { MinValidatorSetup } from "./MinValidatorSetup";
export declare class MinValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, MinValidatorSetup<TModel, K>> {
    constructor(setup: MinValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<ValidationPropertyResult>;
}
