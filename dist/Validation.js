import get from "lodash.get";
import isEqual from "lodash.isequal";
export class Validation {
    constructor(originalModel) {
        this.useOriginal = (model) => {
            this.originalModel = structuredClone(model);
            return this;
        };
        this.useNoValidators = () => {
            this.modelInfo = {};
            return this;
        };
        this.useValidators = (key, ...validators) => {
            this.modelInfo[key] = {
                validators: validators,
            };
            return this;
        };
        this.isPropertyDirty = (model, field, key = null) => {
            const originalField = this.originalModel[field];
            const modelField = model[field];
            if (Array.isArray(originalField) && Array.isArray(modelField)) {
                if (originalField.length !== modelField.length)
                    return true;
                for (let index = 0; index < originalField.length; index++) {
                    if (originalField[index] === modelField[index])
                        continue;
                    if (key == null)
                        return true;
                    if (get(originalField[index], key) !== get(modelField[index], key))
                        return true;
                }
                return false;
            }
            if (key == null)
                return !isEqual(this.originalModel[field], model[field]);
            return get(this.originalModel[field], key) !== get(model[field], key);
        };
        this.getOriginalProperty = (field) => {
            return this.originalModel[field];
        };
        this.isDirty = (model, ...fields) => {
            for (const property in this.originalModel) {
                if (!this.originalModel.hasOwnProperty(property))
                    continue;
                if (fields && fields.length > 0) {
                    if (!fields.some((x) => x === property))
                        continue;
                }
                if (this.isPropertyDirty(model, property))
                    return true;
            }
            return false;
        };
        this.isPropertyValid = async (model, field) => {
            if (this.modelInfo[field] &&
                this.modelInfo[field].validators &&
                this.modelInfo[field].validators) {
                let isValid = true;
                let errors = [];
                const value = model[field];
                for (const validator of this.modelInfo[field].validators) {
                    const validatorResult = await validator.isValid(value, model, field);
                    isValid = isValid && validatorResult.isValid;
                    if (!validatorResult.isValid)
                        errors = [...errors, ...validatorResult.errors];
                }
                return {
                    isValid: isValid,
                    errors: errors,
                };
            }
            return {
                isValid: true,
                errors: [],
            };
        };
        this.isValid = async (model, ...fields) => {
            model = model ?? {};
            const properties = (fields == null || fields.length === 0 ? Object.keys(model) : fields);
            const result = {
                isValid: true,
                errors: [],
                properties: {},
            };
            for (const property of properties) {
                const propertyValidationResult = await this.isPropertyValid(model, property);
                result.isValid = result.isValid && propertyValidationResult.isValid;
                result.properties[property] = propertyValidationResult;
                if (!propertyValidationResult.isValid)
                    result.errors = [...result.errors, ...propertyValidationResult.errors];
            }
            return result;
        };
        this.originalModel = structuredClone(originalModel);
        this.modelInfo = {};
    }
}
//# sourceMappingURL=Validation.js.map