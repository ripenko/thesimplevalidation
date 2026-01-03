import { ValidationPropertyResult } from "./ValidationPropertyResult";
import { ValidationResult } from "./ValidationResult";
import { Validator } from "./Validator";
export declare class Validation<TModel extends {}> {
    private originalModel;
    private modelInfo;
    private isDisabled;
    constructor(originalModel: TModel, modelInfo?: {
        [K in keyof TModel]?: {
            validators?: Array<Validator<TModel, K>>;
            key?: string;
        };
    });
    disable: () => Validation<TModel>;
    enable: () => Validation<TModel>;
    getisEnabled: () => boolean;
    useOriginal: (model: TModel) => Validation<TModel>;
    useNoValidators: () => Validation<TModel>;
    useValidators: <K extends keyof TModel>(key: K, ...validators: Array<Validator<TModel, K>>) => Validation<TModel>;
    isPropertyDirty: (model: TModel, field: keyof TModel, key?: string | null) => boolean;
    getOriginalProperty: <K extends keyof TModel>(field: K) => TModel[K];
    isDirty: (model: TModel, ...fields: Array<keyof TModel>) => boolean;
    isPropertyValid: <K extends keyof TModel>(model: TModel, field: K) => Promise<ValidationPropertyResult>;
    isValid: (model: TModel, ...fields: Array<keyof TModel>) => Promise<ValidationResult<TModel>>;
}
