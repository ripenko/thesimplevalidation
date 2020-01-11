import { IValidationPropertyResult } from "../../validation-property-result";
import { IValidatorSetup } from "../../validator-setup";
import { Validator } from "../../validator";

export class RequiredValidator<TModel, K extends keyof TModel> extends Validator<TModel, K> {
    constructor(setup: IValidatorSetup<TModel, K> = {}) {
        super(setup);
    }

    public async isValidInternal(value: TModel[K]): Promise<IValidationPropertyResult> {
        let isValid: boolean = true;
        // tslint:disable-next-line:prefer-conditional-expression
        if (Array.isArray(value)) {
            isValid = value.length > 0;
        } else {
            isValid = !!value;
        }

        return {
            isValid: isValid,
            errors: []
        };
    }
}
