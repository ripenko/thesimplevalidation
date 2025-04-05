export class Validator {
    constructor(name, setup) {
        this.name = name;
        this.setup = setup;
        this.getErrors = (value, model, field) => {
            return [`${field.toString()}.${this.name}`];
        };
        this.isValid = async (value, model, field) => {
            if (this.setup.isDisabled != null && this.setup.isDisabled(value)) {
                return {
                    isValid: true,
                    errors: [],
                };
            }
            const result = await this.isValidInternal(value, model, field);
            if (result.isValid !== true) {
                if (this.setup.getErrors != null) {
                    result.errors = this.setup.getErrors(value);
                }
                else {
                    result.errors = this.getErrors(value, model, field);
                }
            }
            return result;
        };
    }
}
//# sourceMappingURL=Validator.js.map