import cloneDeep from "lodash.clonedeep";
import get from "lodash.get";
import isEqual from "lodash.isequal";
import keys from "lodash.keys";
import { IValidationPropertyResult } from "./validation-property-result";
import { IValidationResult } from "./validation-result";
import { Validator } from "./validator";

export class ValidationScope<TModel extends {}> {
    private originalModel: TModel;
    private modelInfo: {
        [K in keyof TModel]: {
            validators: Array<Validator<TModel, K>>
        }
    };

    constructor(private setup: {
        getModel: () => TModel;
        onValidationChanged?: (result: IValidationResult<TModel>) => Promise<void>;

    }) {
        this.originalModel = cloneDeep(setup.getModel());
        this.modelInfo = {} as any;
    }

    public useOriginal = (model: TModel): ValidationScope<TModel> => {
        this.originalModel = cloneDeep(model);
        return this;
    }

    public useValidators = <K extends keyof TModel>(key: K, ...validators: Array<Validator<TModel, K>>): ValidationScope<TModel> => {
        this.modelInfo[key] = {
            validators: validators
        };
        return this;
    }

    public isPropertyDirty = (field: keyof TModel, key: string | null = null): boolean => {
        const model: TModel = this.setup.getModel();
        const originalField = this.originalModel[field];
        const modelField = model[field];
        if (Array.isArray(originalField) && Array.isArray(modelField)) {
            if (originalField.length !== modelField.length) return true;
            for (let index = 0; index < originalField.length; index++) {
                if (originalField[index] === modelField[index]) continue;
                if (key == null) return true;
                if (get(originalField[index], key) !== get(modelField[index], key)) return true;
            }
            return false;
        }
        if (key == null) return !isEqual(this.originalModel[field], model[field]);
        return get(this.originalModel[field], key) !== get(model[field], key);
    }

    public getOriginalProperty = <K extends keyof TModel>(field: K): TModel[K] => {
        return this.originalModel[field];
    }

    public isDirty = (...fields: Array<keyof TModel>): boolean => {
        for (const property in this.originalModel) {
            if (!this.originalModel.hasOwnProperty(property)) continue;

            if (fields && fields.length > 0) {
                if (!fields.some(x => x === property)) continue;
            }

            if (this.isPropertyDirty(property)) return true;
        }

        return false;
    }

    public isPropertyValid = async <K extends keyof TModel>(field: K): Promise<IValidationPropertyResult> => {
        if (this.modelInfo[field] && this.modelInfo[field].validators && this.modelInfo[field].validators) {
            let isValid: boolean = true;
            let errors: string[] = [];

            const model: TModel = this.setup.getModel();
            const value: TModel[K] = model[field];

            for (const validator of this.modelInfo[field].validators) {
                const validatorResult: IValidationPropertyResult = await validator.isValid(value, model, field);
                isValid = isValid && validatorResult.isValid;
                if (!validatorResult.isValid) errors = [...errors, ...validatorResult.errors];
            }
            return {
                isValid: isValid,
                errors: errors
            };
        }

        return {
            isValid: true,
            errors: []
        };
    }

    public isValid = async (): Promise<IValidationResult<TModel>> => {
        const properties: Array<keyof TModel> = keys(this.setup.getModel()) as Array<keyof TModel>;
        const result: IValidationResult<TModel> = {
            isValid: true,
            errors: [],
            properties: {} as {
                [K in keyof TModel]: IValidationPropertyResult;
            }
        } as IValidationResult<TModel>;

        for (const property of properties) {
            const propertyValidationResult: IValidationPropertyResult = await this.isPropertyValid(property);
            result.isValid = result.isValid && propertyValidationResult.isValid;
            result.properties[property] = propertyValidationResult;
            if (!propertyValidationResult.isValid) result.errors = [...result.errors, ...propertyValidationResult.errors];
        }

        if (this.setup.onValidationChanged != null) await this.setup.onValidationChanged(result);

        return result;
    }
}
