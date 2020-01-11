import { IValidationPropertyResult } from "../../validation-property-result";
import { IValidatorSetup } from "../../validator-setup";
import { Validator } from "../../validator";
export interface IBooleanValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    target: () => boolean;
}
export declare class BooleanValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, IBooleanValidatorSetup<TModel, K>> {
    constructor(setup: IBooleanValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<IValidationPropertyResult>;
}
