import { Validator } from "../../Validator";
export class MinValidator extends Validator {
    constructor(setup) {
        super("MinValidator", setup);
    }
    async isValidInternal(value) {
        let isValid = true;
        if (value != null) {
            const minValue = this.setup.minValue();
            // tslint:disable-next-line:prefer-conditional-expression
            if (Array.isArray(value)) {
                isValid = value.length >= minValue;
            }
            else if (typeof value === "string") {
                isValid = value.length >= minValue;
            }
            else if (typeof value === "number") {
                isValid = value >= minValue;
            }
        }
        return {
            isValid: isValid,
            errors: [],
        };
    }
}
//# sourceMappingURL=MinValidator.js.map