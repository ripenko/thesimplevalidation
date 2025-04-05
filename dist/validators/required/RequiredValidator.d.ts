import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { ValidatorSetup } from "../../ValidatorSetup";
import { Validator } from "../../Validator";
export declare class RequiredValidator<TModel, K extends keyof TModel> extends Validator<TModel, K> {
    constructor(setup?: ValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K]): Promise<ValidationPropertyResult>;
}
