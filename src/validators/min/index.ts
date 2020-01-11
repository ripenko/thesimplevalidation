import { IValidationPropertyResult } from "../../validation-property-result";
import { IValidatorSetup } from "../../validator-setup";
import { Validator } from "../../validator";

export interface IMinValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    minValue: () => number;
}

export class MinValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, IMinValidatorSetup<TModel, K>> {
    constructor(setup: IMinValidatorSetup<TModel, K>) {
        super(setup);
    }

    public async isValidInternal(value: TModel[K]): Promise<IValidationPropertyResult> {
        let isValid: boolean = true;
        if (value != null) {
            const minValue: number = this.setup.minValue();
            // tslint:disable-next-line:prefer-conditional-expression
            if (Array.isArray(value)) {
                isValid = value.length >= minValue;
            } else if (typeof value === "string") {
                isValid = value.length >= minValue;
            } else if (typeof value === "number") {
                isValid = value >= minValue;
            }
        }

        return {
            isValid: isValid,
            errors: []
        };
    }
}
