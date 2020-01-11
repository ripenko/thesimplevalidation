import { IValidatorSetup } from "../../validator-setup";
import { IValidationPropertyResult } from "../../validation-property-result";
import { Validator } from "../../validator";

export interface IMaxValidatorSetup<TModel, K extends keyof TModel> extends IValidatorSetup<TModel, K> {
    maxValue: () => number;
}

export class MaxValidator<TModel, K extends keyof TModel> extends Validator<TModel, K, IMaxValidatorSetup<TModel, K>> {
    constructor(setup: IMaxValidatorSetup<TModel, K>) {
        super(setup);
    }

    public async isValidInternal(value: TModel[K]): Promise<IValidationPropertyResult> {
        let isValid: boolean = true;
        if (value != null) {
            const maxValue: number = this.setup.maxValue();
            if (Array.isArray(value)) {
                isValid = value.length <= maxValue;
            } else if (typeof value === "string") {
                isValid = value.length <= maxValue;
            } else if (typeof value === "number") {
                isValid = value <= maxValue;
            }
        }

        return {
            isValid: isValid,
            errors: []
        };
    }
}
