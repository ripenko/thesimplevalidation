import { Validator } from "../../Validator";
export class RequiredValidator extends Validator {
    constructor(setup = {}) {
        super("RequiredValidator", setup);
    }
    async isValidInternal(value) {
        let isValid = true;
        // tslint:disable-next-line:prefer-conditional-expression
        if (Array.isArray(value)) {
            isValid = value.length > 0;
        }
        else {
            isValid = !!value;
        }
        return {
            isValid: isValid,
            errors: [],
        };
    }
}
//# sourceMappingURL=RequiredValidator.js.map