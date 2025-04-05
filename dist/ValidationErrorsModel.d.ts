export type ValidationErrorsModel<TModel> = {
    [k in keyof TModel]: string[];
};
