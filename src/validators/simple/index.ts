import { IValidationPropertyResult } from "../../validation-property-result";
import { IValidatorSetup } from "../../validator-setup";
import { Validator } from "../../validator";

export interface ISimpleValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    getValidation: () => boolean;
}

export class SimpleValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, ISimpleValidatorSetup<TModel, K>> {
    constructor(setup: ISimpleValidatorSetup<TModel, K>) {
        super(setup);
    }

    public async isValidInternal(_value: TModel[K]): Promise<IValidationPropertyResult> {
        const isValid: boolean = this.setup.getValidation();

        return {
            isValid: isValid,
            errors: []
        };
    }
}
