import { ValidationPropertyResult } from "./ValidationPropertyResult";
import { ValidationResult } from "./ValidationResult";
import { Validator } from "./Validator";
export declare class ValidationScope<TModel extends {}> {
    private originalModel;
    private modelInfo;
    constructor(originalModel: TModel);
    useOriginal: (model: TModel) => ValidationScope<TModel>;
    useValidators: <K extends keyof TModel>(key: K, ...validators: Array<Validator<TModel, K>>) => ValidationScope<TModel>;
    isPropertyDirty: (model: TModel, field: keyof TModel, key?: string | null) => boolean;
    getOriginalProperty: <K extends keyof TModel>(field: K) => TModel[K];
    isDirty: (model: TModel, ...fields: Array<keyof TModel>) => boolean;
    isPropertyValid: <K extends keyof TModel>(model: TModel, field: K) => Promise<ValidationPropertyResult>;
    isValid: (model: TModel, ...fields: Array<keyof TModel>) => Promise<ValidationResult<TModel>>;
}
