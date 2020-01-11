export declare type ValidationErrorsModel<TModel> = {
    [k in keyof TModel]: string[];
};
