import { Validator } from "../../Validator";
export class SimpleValidator extends Validator {
    constructor(setup) {
        super("SimpleValidator", setup);
    }
    async isValidInternal(_value) {
        const isValid = this.setup.getValidation();
        return {
            isValid: isValid,
            errors: [],
        };
    }
}
//# sourceMappingURL=SimpleValidator.js.map