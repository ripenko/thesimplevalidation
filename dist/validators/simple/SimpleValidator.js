import { Validator } from "../../Validator";
export class SimpleValidator extends Validator {
    constructor(setup) {
        super("SimpleValidator", setup);
    }
    isValidInternal(value, model, field) {
        return this.setup.getValidation(value, model, field);
    }
}
//# sourceMappingURL=SimpleValidator.js.map