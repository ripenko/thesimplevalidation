import { IValidationPropertyResult } from "../../validation-property-result";
import { IValidatorSetup } from "../../validator-setup";
import { Validator } from "../../validator";
export interface IMinValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    minValue: () => number;
}
export declare class MinValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, IMinValidatorSetup<TModel, K>> {
    constructor(setup: IMinValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<IValidationPropertyResult>;
}
