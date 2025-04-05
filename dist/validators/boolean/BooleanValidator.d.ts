import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { BooleanValidatorSetup } from "./BooleanValidatorSetup";
export declare class BooleanValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, BooleanValidatorSetup<TModel, K>> {
    constructor(setup: BooleanValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<ValidationPropertyResult>;
}
