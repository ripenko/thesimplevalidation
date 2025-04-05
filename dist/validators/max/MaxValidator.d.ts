import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { MaxValidatorSetup } from "./MaxValidatorSetup";
export declare class MaxValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, MaxValidatorSetup<TModel, K>> {
    constructor(setup: MaxValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<ValidationPropertyResult>;
}
