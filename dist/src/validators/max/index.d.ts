import { IValidatorSetup } from "../../validator-setup";
import { IValidationPropertyResult } from "../../validation-property-result";
import { Validator } from "../../validator";
export interface IMaxValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    maxValue: () => number;
}
export declare class MaxValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, IMaxValidatorSetup<TModel, K>> {
    constructor(setup: IMaxValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<IValidationPropertyResult>;
}
