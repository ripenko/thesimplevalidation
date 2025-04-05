import { Validator } from "../../Validator";
export class BooleanValidator extends Validator {
    constructor(setup) {
        super("BooleanValidator", setup);
    }
    async isValidInternal(value) {
        let isValid = true;
        const targetValue = this.setup.target();
        if (value != null && typeof value === "boolean") {
            isValid = targetValue === value;
        }
        return {
            isValid: isValid,
            errors: [],
        };
    }
}
//# sourceMappingURL=BooleanValidator.js.map