import { IValidationPropertyResult } from "../../validation-property-result";
import { IValidatorSetup } from "../../validator-setup";
import { Validator } from "../../validator";

export interface IBooleanValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    target: () => boolean;
}

export class BooleanValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, IBooleanValidatorSetup<TModel, K>> {
    constructor(setup: IBooleanValidatorSetup<TModel, K>) {
        super(setup);
    }

    public async isValidInternal(value: TModel[K]): Promise<IValidationPropertyResult> {
        let isValid: boolean = true;
        const targetValue: boolean = this.setup.target();

        if (value != null && typeof value === "boolean") {
            isValid = targetValue === value;
        }

        return {
            isValid: isValid,
            errors: []
        };
    }
}
