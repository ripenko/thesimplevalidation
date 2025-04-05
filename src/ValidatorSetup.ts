export type ValidatorSetup<TModel, K extends keyof TModel> = {
  isDisabled?: (value: TModel[K]) => boolean;
  getErrors?: (value: TModel[K]) => string[];
};
