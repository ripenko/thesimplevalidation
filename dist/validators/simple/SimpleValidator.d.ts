import { ValidationPropertyResult } from "../../ValidationPropertyResult";
import { Validator } from "../../Validator";
import { SimpleValidatorSetup } from "./SimpleValidatorSetup";
export declare class SimpleValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, SimpleValidatorSetup<TModel, K>> {
    constructor(setup: SimpleValidatorSetup<TModel, K>);
    isValidInternal(value: TModel[K], model: TModel, field: K): Promise<ValidationPropertyResult>;
}
