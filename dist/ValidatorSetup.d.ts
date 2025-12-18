export type ValidatorSetup<TModel, K extends keyof TModel> = {
    isDisabled?: (value: TModel[K], model: TModel, key: K) => boolean;
    getErrors?: (value: TModel[K], model: TModel, key: K) => string[];
};
