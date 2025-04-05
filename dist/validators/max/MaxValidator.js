import { Validator } from "../../Validator";
export class MaxValidator extends Validator {
    constructor(setup) {
        super("MaxValidator", setup);
    }
    async isValidInternal(value) {
        let isValid = true;
        if (value != null) {
            const maxValue = this.setup.maxValue();
            if (Array.isArray(value)) {
                isValid = value.length <= maxValue;
            }
            else if (typeof value === "string") {
                isValid = value.length <= maxValue;
            }
            else if (typeof value === "number") {
                isValid = value <= maxValue;
            }
        }
        return {
            isValid: isValid,
            errors: [],
        };
    }
}
//# sourceMappingURL=MaxValidator.js.map