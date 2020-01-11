import { IValidationPropertyResult } from "../../validation-property-result";
import { IValidatorSetup } from "../../validator-setup";
import { Validator } from "../../validator";
export declare class RequiredValidator<TModel, K extends keyof TModel> extends Validator<TModel, K> {
    constructor(setup?: IValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<IValidationPropertyResult>;
}
