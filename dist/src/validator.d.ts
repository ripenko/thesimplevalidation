import { IValidationPropertyResult } from "./validation-property-result";
import { IValidatorSetup } from "./validator-setup";
export declare abstract class Validator<TModel, K extends keyof TModel, TSetup extends IValidatorSetup<TModel, K> = IValidatorSetup<TModel, K>> {
    protected setup: TSetup;
    constructor(setup: TSetup);
    isValid: (value: TModel[K], model: TModel, field: K) => Promise<IValidationPropertyResult>;
    protected abstract isValidInternal(value: TModel[K], model: TModel, field: K): Promise<IValidationPropertyResult>;
}
