import { IValidationPropertyResult } from "./validation-property-result";
import { IValidatorSetup } from "./validator-setup";

export abstract class Validator<TModel, K extends keyof TModel, TSetup extends IValidatorSetup<TModel, K> = IValidatorSetup<TModel, K>> {

    constructor(protected setup: TSetup) { }

    public isValid = async (value: TModel[K], model: TModel, field: K): Promise<IValidationPropertyResult> => {
        if (this.setup.isDisabled != null && this.setup.isDisabled(value)) {
            return {
                isValid: true,
                errors: []
            };
        }

        const result: IValidationPropertyResult = await this.isValidInternal(value, model, field);
        if (result.isValid !== true && this.setup.getErrors != null) {
            result.errors = this.setup.getErrors(value);
        }

        return result;
    }

    protected abstract isValidInternal(value: TModel[K], model: TModel, field: K): Promise<IValidationPropertyResult>;
}
