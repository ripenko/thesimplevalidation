import { IValidationPropertyResult } from "./validation-property-result";
import { IValidationResult } from "./validation-result";
import { Validator } from "./validator";
export declare class ValidationScope<TModel extends {}> {
    private setup;
    private originalModel;
    private modelInfo;
    constructor(setup: {
        getModel: () => TModel;
        onValidationChanged?: (result: IValidationResult<TModel>) => Promise<void>;
    });
    useOriginal: (model: TModel) => ValidationScope<TModel>;
    useValidators: <K extends keyof TModel>(key: K, ...validators: Validator<TModel, K, import("./validator-setup").IValidatorSetup<TModel, K>>[]) => ValidationScope<TModel>;
    isPropertyDirty: (field: keyof TModel, key?: string | null) => boolean;
    getOriginalProperty: <K extends keyof TModel>(field: K) => TModel[K];
    isDirty: (...fields: Array<keyof TModel>) => boolean;
    isPropertyValid: <K extends keyof TModel>(field: K) => Promise<IValidationPropertyResult>;
    isValid: () => Promise<IValidationResult<TModel>>;
}
