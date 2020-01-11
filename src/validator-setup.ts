export interface IValidatorSetup<TModel, K extends keyof TModel> {
    isDisabled?: (value: TModel[K]) => boolean;
    getErrors?: (value: TModel[K]) => string[];
}
