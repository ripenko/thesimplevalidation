import { ValidationPropertyResult } from "./ValidationPropertyResult";
import { ValidatorSetup } from "./ValidatorSetup";
export declare abstract class Validator<TModel, K extends keyof TModel, TSetup extends ValidatorSetup<TModel, K> = ValidatorSetup<TModel, K>> {
    protected name: string;
    protected setup: TSetup;
    constructor(name: string, setup: TSetup);
    protected getErrors: (value: TModel[K], model: TModel, field: K) => string[];
    isValid: (value: TModel[K], model: TModel, field: K) => Promise<ValidationPropertyResult>;
    protected abstract isValidInternal(value: TModel[K], model: TModel, field: K): Promise<ValidationPropertyResult>;
}
